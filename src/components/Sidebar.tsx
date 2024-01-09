import authOptions from "@/utils/nextauthOptions";
import InviteUser from "./InviteUser";
import AccountCard from "./cards/AccountCard";
import UserCard from "./cards/UserCard";
import { getServerSession } from "next-auth";

type Props = {};

const Sidebar = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const chatUsers = await fetch(
        `${process.env.NEXTAUTH_URL}/api/private/chats`,
        { body: JSON.stringify({ userId: session?.user.id }), method: "POST" }
    );
    return (
        <aside className="flex flex-1 flex-col gap-2 max-w-[350px]">
            <AccountCard />
            <InviteUser />
            <div className="bg-white h-full rounded-lg p-4 shadow-lg">
                <UserCard userId="1" />
            </div>
        </aside>
    );
};

export default Sidebar;
