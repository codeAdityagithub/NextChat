import authOptions from "@/utils/nextauthOptions";
import InviteUser from "./InviteUser";
import AccountCard from "./cards/AccountCard";
import { getServerSession } from "next-auth";
import { UserCardInfo } from "@/types";
import Conversations from "./Conversations";
import sql from "@/utils/db";
import { FetchError } from "@/lib/exceptions";
import SidebarWrapper from "@/utils/SidebarWrapper";

const getData = async (
    userId: string
): Promise<{ chatUsers: UserCardInfo[]; status: "error" | "success" }> => {
    if (!userId) return { chatUsers: [], status: "error" };
    try {
        const conversations = await sql<UserCardInfo[]>`WITH ids AS (
            SELECT conversation_id
            FROM conversation_users
            WHERE user_id = ${userId}
        )
        SELECT 
            c.conversation_id, 
            c.last_contacted_at,
            u.id,
            u.name,
            u.dp,
            c.latest_message,
            c.unread_message,
            c.latest_message_sender_id
            from 
            conversation_users cu
        JOIN 
            users u ON u.id = cu.user_id
        JOIN 
            conversation c ON cu.conversation_id = c.conversation_id
        JOIN
            ids ON cu.conversation_id = ids.conversation_id
        WHERE
            cu.user_id != ${userId} order by c.last_contacted_at desc`;

        return {
            chatUsers: conversations as Array<UserCardInfo>,
            status: "success",
        };
    } catch (error: any) {
        console.log(error.message);
        return { chatUsers: [], status: "error" };
    }
};

const Sidebar = async () => {
    const session = await getServerSession(authOptions);
    const data = await getData(session?.user.id!);
    // console.log(session);
    if (data.status === "error")
        throw new FetchError("Couldn't Fetch your chats");
    return (
        <SidebarWrapper>
            <AccountCard />
            <InviteUser apiAccessToken={session?.user.apiAccessToken} />
            <Conversations
                userId={session?.user.id}
                chatUsers={data.chatUsers}
            />
        </SidebarWrapper>
    );
};

export default Sidebar;
