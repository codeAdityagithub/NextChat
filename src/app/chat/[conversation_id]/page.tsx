import ChatInput from "@/app/chat/[conversation_id]/ChatInput";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import ChatHeader from "@/app/chat/[conversation_id]/ChatHeader";
import { Message, User } from "@/dbtypes";
import sql from "@/utils/db";
import authOptions from "@/utils/nextauthOptions";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ChatContent from "./ChatContent";

type Props = {
    params: { conversation_id: string };
};
type otherPerson = Pick<User, "id" | "name" | "username">;
type getMessagesReturn = {
    messages: Message[];
    otherPerson?: otherPerson;
    status: "unauthorised" | "success";
};
const getMessages = async (
    conversation_id: string,
    userId: string
): Promise<getMessagesReturn> => {
    try {
        if (!conversation_id) throw new Error("No conversation_id");

        const users = await sql<
            otherPerson[]
        >`select u.id, u.name, u.username from conversation_users cu join users u on u.id=cu.user_id where cu.conversation_id=${conversation_id}`;
        // console.log(users);

        const user = users.filter((user) => user.id === userId);
        if (user.length === 0) return { messages: [], status: "unauthorised" };

        const otherPerson = users.filter((user) => user.id !== userId);
        // console.log(otherPerson);
        const messages = await sql<
            Message[]
        >`select * from message where conversation_id=${conversation_id} order by created_at desc`;
        return {
            messages: messages as Array<Message>,
            otherPerson: otherPerson[0],
            status: "success",
        };
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
    // console.log(data);
    if (data.status == "unauthorised") return notFound();

    return (
        <div className="h-full flex-[2] max-h-screen flex flex-col gap-1">
            <ChatHeader {...data.otherPerson} />
            <ChatContent
                otherPerson={data.otherPerson}
                messages={data.messages}
            />
            <ChatInput username={data.otherPerson?.username!} />
        </div>
    );
};

export default ChatPage;
