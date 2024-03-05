import Sidebar from "@/components/Sidebar";
import SocketConnect from "@/components/socketutils/SocketConnect";
import { UserCardInfo } from "@/types";
import sql from "@/utils/db";
import authOptions from "@/utils/nextauthOptions";

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ForwardMessageDialog from "./[conversation_id]/ForwardMessageDialog";

export const metadata: Metadata = {
    title: "Chats | NextChat",
    description:
        "Connect instantly. Chat website for seamless conversations and new connections. Join the conversation now!",
};

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

export default async function Layout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    if (!session) return redirect("/");

    const data = await getData(session?.user.id);
    return (
        <div className="h-full flex gap-3 lg:gap-6 justify-between bg-base-300 text-base-content p-4 overflow-x-hidden">
            {/* Include shared UI here e.g. a header or sidebar */}
            <ForwardMessageDialog chatUsers={data.chatUsers} />
            <SocketConnect apiAccessToken={session?.user.apiAccessToken} />
            <Sidebar data={data} />
            {children}
        </div>
    );
}
