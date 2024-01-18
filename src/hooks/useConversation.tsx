import { Message } from "@/dbtypes";
import { UserCardInfo } from "@/types";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

type Props = {
    initialData: UserCardInfo[];
};

const useConversation = ({ initialData }: Props) => {
    const [chatUsers, setChatUsers] = useState<UserCardInfo[]>(initialData);

    useEffect(() => {
        const getConv = (conversation: UserCardInfo) => {
            console.log("new conversation");
            setChatUsers((prev) => [conversation, ...prev]);
        };
        const messageHandler = (message: Message) => {
            // console.log(message, "recieve");
            setChatUsers((prev) =>
                prev.map((conv) =>
                    conv.conversation_id === message.conversation_id
                        ? {
                              ...conv,
                              latest_message: message.content.substring(
                                  0,
                                  Math.min(message.content.length, 100)
                              ),
                              last_contacted_at: message.created_at,
                          }
                        : conv
                )
            );
        };
        socket.on("recieve_message", messageHandler);
        socket.on("add_conversation", getConv);
        return () => {
            socket.off("recieve_message", messageHandler);

            socket.off("add_conversation", getConv);
        };
    }, [chatUsers, socket]);
    return [chatUsers, setChatUsers] as const;
};

export default useConversation;
