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
    const [areUnreadMesages, setAreUnreadMessages] = useState(
        initialData.some((chat) => chat.unread_message)
    );
    const session = useSession();
    const { conversation_id } = useParams();
    const queryCl = useQueryClient(queryClient);

    useEffect(() => {
        const soundRec = new Audio("/messageSound1.mp3");
        const soundSend = new Audio("/messageSound1.mp3");
        soundSend.volume = 0.5;
        soundRec.volume = 0.6;
        const getConv = (conversation: UserCardInfo) => {
            // console.log("new conversation");
            setChatUsers((prev) => [
                { ...conversation, unread_message: true },
                ...prev,
            ]);
        };
        const messageHandler = (message: Message) => {
            // updating the cache if not on the page
            // console.log("updating the cache");
            if (message.sender_id === session.data?.user.id) soundSend.play();

            queryCl.setQueryData(
                ["messages", message.conversation_id.toString()],
                (old: any) => {
                    if (!old) return old;
                    const newMessages = [message, ...old.pages[0]];
                    return {
                        pages: [newMessages, ...old.pages.slice(1)],
                        pageParams: old.pageParams,
                    };
                }
            );
            // for the notification
            setAreUnreadMessages(
                conversation_id !== message.conversation_id.toString()
            );
            if (
                session.data?.user.id !== message.sender_id &&
                conversation_id !== message.conversation_id.toString()
            ) {
                soundRec.play();
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
        const deleteMessage = (message_id: number) => {
            queryCl.setQueryData(["messages", conversation_id], (old: any) => {
                if (!old) return old;
                const newMessages = old.pages.map((page: Message[]) =>
                    page.filter((message) => message.message_id !== message_id)
                );
                return {
                    pages: newMessages,
                    pageParams: old.pageParams,
                };
            });
            // console.log("message deleted");
        };
        const readMessages = (userId: string, conversation_id: string) => {
            // console.log("first");
            queryCl.setQueryData(["messages", conversation_id], (old: any) => {
                if (!old) return old;
                const readMessages = old.pages[0].map((message: Message) =>
                    message.status === "delivered" &&
                    message.sender_id !== userId
                        ? { ...message, status: "read" }
                        : message
                );
                return {
                    pages: [readMessages, ...old.pages.slice(1)],
                    pageParams: old.pageParams,
                };
            });
            // console.log(data.pages.flatMap((page) => page));
        };
        socket.on("recieve_message", messageHandler);
        socket.on("delete_message", deleteMessage);
        socket.on("add_conversation", getConv);
        socket.on("read_messages", readMessages);

        return () => {
            socket.off("recieve_message", messageHandler);
            socket.off("delete_message", deleteMessage);

            socket.off("add_conversation", getConv);
            socket.off("read_messages", readMessages);
        };
    }, [chatUsers, session, conversation_id, queryCl]);
    return [
        chatUsers,
        setChatUsers,
        areUnreadMesages,
        setAreUnreadMessages,
    ] as const;
};

export default useConversation;
