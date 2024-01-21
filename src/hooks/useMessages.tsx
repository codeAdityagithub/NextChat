import { Message, User } from "@/dbtypes";
import { queryClient } from "@/utils/ReactQueryProvider";
// import { queryClient } from "@/utils/ReactQueryProvider";
import { socket } from "@/utils/socket";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    initialData: Message[];
    userId: string;
};

type getMessagesReturn = {
    messages: Message[];
};

const useMessages = ({ initialData, userId }: Props) => {
    // const [messages, setMessages] = useState(initialData);
    const queryCl = useQueryClient(queryClient);
    const { conversation_id } = useParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ["messages", conversation_id],
        initialData: { messages: initialData },
        queryFn: async (): Promise<getMessagesReturn> => {
            const res = await axios.post("/api/private/messages", {
                conversation_id: conversation_id,
                userId: userId,
            });
            console.log("api called");
            return res.data;
        },
    });

    useEffect(() => {
        const messageHandler = (message: Message) => {
            // setMessages((prev) => [message, ...prev]);
            queryCl.setQueryData(
                ["messages", message.conversation_id.toString()],
                (old: getMessagesReturn) => {
                    if (!old) return old;
                    return { messages: [message, ...old.messages] };
                }
            );
        };
        const readMessages = (userId: string) => {
            queryCl.setQueryData(
                ["messages", conversation_id],
                (old: getMessagesReturn) => {
                    if (!old) return old;
                    return {
                        messages: old.messages.map((message) =>
                            message.status === "delivered" &&
                            message.sender_id !== userId
                                ? { ...message, status: "read" }
                                : message
                        ),
                    };
                }
            );
        };
        socket.on("recieve_message", messageHandler);
        socket.on("read_messages", readMessages);

        return () => {
            socket.off("recieve_message", messageHandler);
            socket.off("read_messages", readMessages);
        };
    }, [socket, queryClient, data]);
    return [data, isLoading, error] as const;
};

export default useMessages;
