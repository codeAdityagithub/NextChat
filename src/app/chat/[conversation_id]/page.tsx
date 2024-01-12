import ChatInput from "@/app/chat/[conversation_id]/ChatInput";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import UserHeader from "@/components/cards/UserHeader";
import { Message } from "@/dbtypes";
import sql from "@/utils/db";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type Props = {
    params: { conversation_id: string };
};
type getMessagesReturn = {
    messages: Message[];
    status: "unauthorised" | "success";
};
const getMessages = async (
    conversation_id: string,
    userId: string
): Promise<getMessagesReturn> => {
    try {
        if (!conversation_id) throw new Error("No conversation_id");

        const conversations =
            await sql`select conversation_id from conversation_users cu where cu.conversation_id=${conversation_id} and cu.user_id=${userId}`;
        console.log(conversations);
        if (conversations.count == 0)
            return { messages: [], status: "unauthorised" };
        const messages = await sql<
            Message[]
        >`select * from message where conversation_id=${conversation_id}`;
        return { messages: messages as Array<Message>, status: "success" };
    } catch (error) {
        console.log(error);
        return { messages: [], status: "unauthorised" };
    }
};

const ChatPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
    const data: getMessagesReturn = await getMessages(
        params.conversation_id,
        session?.user.id!
    );
    console.log(data);
    if (data.status == "unauthorised") return notFound();

    return (
        <div className="h-full flex-[2] max-h-screen flex flex-col gap-1">
            <UserHeader />
            <div className="flex-1 overflow-y-auto px-2">
                <ChatBubbleLeft />
                <ChatBubbleRight />
            </div>
            <ChatInput />
        </div>
    );
};

export default ChatPage;
