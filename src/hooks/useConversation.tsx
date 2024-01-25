import { Message } from "@/dbtypes";
import { UserCardInfo } from "@/types";
import { queryClient } from "@/utils/ReactQueryProvider";
import { socket } from "@/utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    initialData: UserCardInfo[];
};
type getMessagesReturn = {
    messages: Message[];
};

const useConversation = ({ initialData }: Props) => {
    const [chatUsers, setChatUsers] = useState<UserCardInfo[]>(initialData);
    const [areUnreadMesages, setAreUnreadMessages] = useState(false);
    const session = useSession();
    const { conversation_id } = useParams();
    const queryCl = useQueryClient(queryClient);

    useEffect(() => {
        const sound = new Audio("/messageSound1.mp3");
        sound.volume = 0.6;
        const getConv = (conversation: UserCardInfo) => {
            console.log("new conversation");
            setChatUsers((prev) => [
                { ...conversation, unread_message: true },
                ...prev,
            ]);
        };
        const messageHandler = (message: Message) => {
            // updating the cache if not on the page
            if (conversation_id !== message.conversation_id.toString()) {
                // console.log("updating the cache");
                queryCl.setQueryData(
                    ["messages", message.conversation_id.toString()],
                    (old: getMessagesReturn) => {
                        if (!old) return old;
                        return { messages: [message, ...old.messages] };
                    }
                );
            }
            // for the notification
            setAreUnreadMessages(
                conversation_id !== message.conversation_id.toString()
            );
            if (
                session.data?.user.id != message.sender_id &&
                conversation_id != message.conversation_id.toString()
            ) {
                sound.play();
            }
            // updating the chat according to latest message
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
