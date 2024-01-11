import authOptions from "@/utils/nextauthOptions";
import InviteUser from "./InviteUser";
import AccountCard from "./cards/AccountCard";
import UserCard from "./cards/UserCard";
import { getServerSession } from "next-auth";
import { UserCardInfo } from "@/types";
import Conversations from "./Conversations";

type Props = {};

const Sidebar = async (props: Props) => {
    const session = await getServerSession(authOptions);
    const chatUsers: UserCardInfo[] = await fetch(
        `${process.env.NEXTAUTH_URL}/api/private/chats`,
        { body: JSON.stringify({ userId: session?.user.id }), method: "POST" }
    )
        .then(async (res) => await res.json())
        .catch((err) => console.log(err.message));
    return (
        <aside className="flex flex-1 flex-col gap-2 max-w-[350px]">
            <AccountCard />
            <InviteUser />
            <Conversations chatUsers={chatUsers} />
        </aside>
    );
};

export default Sidebar;
