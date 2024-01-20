import { Message } from "@/dbtypes";
import { UserCardInfo } from "@/types";
import { socket } from "@/utils/socket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    initialData: UserCardInfo[];
};

const useConversation = ({ initialData }: Props) => {
    const [chatUsers, setChatUsers] = useState<UserCardInfo[]>(initialData);
    const [areUnreadMesages, setAreUnreadMessages] = useState(false);
    const session = useSession();
    const { conversation_id } = useParams();
    useEffect(() => {
        const sound = new Audio("/messageSound1.mp3");
        const getConv = (conversation: UserCardInfo) => {
            console.log("new conversation");
            setChatUsers((prev) => [conversation, ...prev]);
        };
        const messageHandler = (message: Message) => {
            console.log(message, "recieve");
            // console.log(conversation_id);
            setAreUnreadMessages(
                conversation_id !== message.conversation_id.toString()
            );
            if (session.data?.user.id != message.sender_id) sound.play();
            const newChats = chatUsers.map((conv) =>
                conv.conversation_id === message.conversation_id
                    ? {
                          ...conv,
                          latest_message: message.content.substring(
                              0,
                              Math.min(message.content.length, 100)
                          ),
                          last_contacted_at: message.created_at,
                          unread_message:
                              conversation_id !==
                              message.conversation_id.toString(),
                      }
                    : conv
            );
            if (!(chatUsers[0].conversation_id === message.conversation_id)) {
                newChats.sort(
                    (a, b) =>
                        new Date(b.last_contacted_at).getTime() -
                        new Date(a.last_contacted_at).getTime()
                );
            }
            setChatUsers(newChats);
        };
        socket.on("recieve_message", messageHandler);
        socket.on("add_conversation", getConv);
        return () => {
            socket.off("recieve_message", messageHandler);

            socket.off("add_conversation", getConv);
        };
    }, [chatUsers, socket, session, conversation_id]);
    return [
        chatUsers,
        setChatUsers,
        areUnreadMesages,
        setAreUnreadMessages,
    ] as const;
};

export default useConversation;
