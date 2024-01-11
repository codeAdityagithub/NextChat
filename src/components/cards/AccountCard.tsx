import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import InviteNotifications from "../InviteNotifications";
import { InviteNotification } from "@/types";

type Props = {};

const getData = async (userId: string) => {
    const data = await fetch(`${process.env.NEXTAUTH_URL}/api/private/invite`, {
        body: JSON.stringify({ userId: userId }),
        method: "POST",
    })
        .then(async (res) => await res.json())
        .catch((err) => {
            console.log(err.message);
            return [];
        });
    return data;
};

const AccountCard = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const data: InviteNotification[] = await getData(session?.user.id!);
    const names = JSON.parse(session?.user.name!);
    // console.log(data);
    return (
        <div className="w-full flex items-center justify-between pr-2 gap-3 bg-transparent">
            <div className="flex items-center gap-3">
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
            <InviteNotifications invitations={data} />
        </div>
    );
};

export default AccountCard;
