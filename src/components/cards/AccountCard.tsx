import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import InviteNotifications from "../InviteNotifications";
import { InviteNotification } from "@/types";
import sql from "@/utils/db";
import Settings from "../Settings";
import ImagewError from "@/utils/ImagewError";
import MyProfile from "../MyProfile";
import ThemeToggle from "../ThemeToggle";

type Props = {};

const getData = async (userId: string) => {
    if (!userId) return [];
    try {
        const invitations = await sql<
            InviteNotification[]
        >`select u.name, u.has_dp, u.username, i.sent_at, i.invitation_id, i.sender_id from users u
         join invitation i
          on i.sender_id=u.id
           where i.recipient_id=${userId} and i.status='pending'`;
        return invitations;
    } catch (error: any) {
        console.log(error.message);
        return [];
    }
};

const AccountCard = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const data: InviteNotification[] = await getData(session?.user.id!);
    const names = JSON.parse(session?.user.name!);
    // console.log(data);
    return (
        <div className="w-full min-h-[75px] mb-2 flex items-center justify-between pr-2 gap-1 bg-transparent">
            <div className="flex items-center gap-3 flex-1">
                <div className="h-[60px] w-[60px] overflow-hidden relative rounded-full">
                    {/* <Image
                        src={
                            session?.user.image
                                ? `${
                                      session?.user.image
                                  }?timestamp=${Date.now()}`
                                : "/account.png"
                        }
                        alt="Your account Profile"
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                        sizes="100px"
                    /> */}
                    <MyProfile image={session?.user.image} />
                </div>
                <div className="flex items-start justify-center flex-col h-full">
                    <div className="text-lg font-medium text-base-content">
                        {names.name}
                    </div>
                    <div className="text-sm text-accent/80">
                        @{names.username}
                    </div>
                </div>
            </div>
            <ThemeToggle />
            <Settings />
            <InviteNotifications invitations={data} />
        </div>
    );
};

export default AccountCard;
