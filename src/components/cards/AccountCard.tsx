import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import InviteNotifications from "../InviteNotifications";
import { InviteNotification } from "@/types";
import sql from "@/utils/db";
import Settings from "../Settings";

type Props = {};

const getData = async (userId: string) => {
    if (!userId) return [];
    try {
        const invitations = await sql<
            InviteNotification[]
        >`select u.name, u.username, i.sent_at, i.invitation_id from users u join invitation i on i.sender_id=u.id where i.recipient_id=${userId} and i.status='pending'`;
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
        <div className="w-full mb-2 flex items-center justify-between pr-2 gap-1 bg-transparent">
            <div className="flex items-center gap-3 flex-1">
                <Image
                    className="object-contain rounded-full h-full"
                    src={
                        session?.user.image
                            ? session.user.image
                            : "/account.png"
                    }
                    alt="Acc"
                    width={50}
                    height={50}
                />
                <div className="flex items-start justify-center flex-col h-full">
                    <div className="text-lg font-medium text-primary-content">
                        {names.name}
                    </div>
                    <div className="text-sm font-light text-gray-500">
                        @{names.username}
                    </div>
                </div>
            </div>
            <Settings />
            <InviteNotifications invitations={data} />
        </div>
    );
};

export default AccountCard;
