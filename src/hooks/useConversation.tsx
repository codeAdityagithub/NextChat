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
        socket.on("add_conversation", getConv);
        return () => {
            socket.off("add_conversation", getConv);
        };
    }, [chatUsers, socket]);
    return [chatUsers, setChatUsers] as const;
};

export default useConversation;
