import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import InviteNotifications from "../InviteNotifications";
import { InviteNotification, SentInvites } from "@/types";
import sql from "@/utils/db";
import Settings from "../Settings";
import ImagewError from "@/utils/ImagewError";
import MyProfile from "../MyProfile";
import ThemeToggle from "../ThemeToggle";
import dynamic from "next/dynamic";
const SentInvitations = dynamic(() => import("../SentInvitations"), {
    ssr: false,
});

type Props = {};

const getInvitations = async (userId: string) => {
    if (!userId) return [];
    try {
        const invitations = await sql<
            InviteNotification[]
        >`select u.name, u.dp, u.username, i.sent_at, i.invitation_id, i.sender_id from users u
         join invitation i
          on i.sender_id=u.id
           where i.recipient_id=${userId} and status='pending'`;
        return invitations;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};

const getSentInvites = async (userId: string) => {
    if (!userId) return [];
    try {
        await sql`delete from invitation where sent_at<NOW() - INTERVAL '7 days' and status='rejected'`;
        const invitations = await sql<
            SentInvites[]
        >`select u.name, u.dp, u.username, i.sent_at, i.invitation_id, i.sender_id, i.status from users u
         join invitation i
          on i.recipient_id=u.id
           where i.sender_id=${userId} and i.status!='accepted' order by sent_at desc`;
        return invitations;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};

const AccountCard = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const invitations: InviteNotification[] = await getInvitations(
        session?.user.id!
    );
    const sentInvites: SentInvites[] = await getSentInvites(session?.user.id!);
    const names = JSON.parse(session?.user.name!);
    // console.log(data);
    return (
        <div className="w-full min-h-[75px] mb-2 flex items-center justify-between pr-2 gap-2 bg-transparent">
            <div className="flex items-center gap-3 flex-1">
                <div className="h-[60px] w-[60px] overflow-hidden relative rounded-full">
                    <MyProfile image={session?.user.image} />
                </div>
                <div className="flex items-start justify-center flex-col h-full flex-1 w-20">
                    <div className="text-lg font-medium text-base-content w-full overflow-hidden overflow-ellipsis">
                        {names.name}
                    </div>
                    <div className="text-sm text-accent/80">
                        @{names.username}
                    </div>
                </div>
            </div>
            <ThemeToggle />
            <Settings />
            <InviteNotifications
                invitations={invitations}
                apiAccessToken={session?.user.apiAccessToken}
            />
            <SentInvitations invitations={sentInvites} />
        </div>
    );
};

export default AccountCard;
