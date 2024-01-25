import ChatInput from "@/app/chat/[conversation_id]/ChatInput";
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

        const otherPerson = users.filter((user) => user.id !== userId)[0];
        // console.log(otherPerson);
        const messages = await sql<
            Message[]
        >`select * from message where conversation_id=${conversation_id} order by created_at desc limit 30`;
        const unread_messages = messages.flatMap((message) => {
            if (
                message.status === "delivered" &&
                message.sender_id === otherPerson.id
            )
                return [message.message_id];
            return [];
        });
        if (unread_messages.length > 0) {
            await sql`update message set status='read' where sender_id=${otherPerson.id!} and message_id in ${sql(
                unread_messages
            )}`;
        }
        return {
            messages: messages as Array<Message>,
            otherPerson: otherPerson,
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
        <div className="h-full min-h-full flex-1 md:flex-[2] lg:flex-[3] flex flex-col gap-1">
            <ChatHeader {...data.otherPerson} />
            <ChatContent
                otherPerson={data.otherPerson}
                messages={data.messages}
                cur_userId={session?.user.id}
            />
            <ChatInput username={data.otherPerson?.username!} />
        </div>
    );
};

export default ChatPage;
