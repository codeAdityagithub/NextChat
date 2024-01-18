import { Message } from "@/dbtypes";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

type Props = {
    initialData: Message[];
};

const useMessages = ({ initialData }: Props) => {
    const [messages, setMessages] = useState(initialData);

    useEffect(() => {
        const messageHandler = (message: Message) => {
            console.log(message, "recieve");
            setMessages((prev) => [...prev, message]);
        };
        socket.on("recieve_message", messageHandler);
        return () => {
            socket.off("recieve_message", messageHandler);
        };
    }, [socket, messages]);
    return [messages, setMessages] as const;
};

export default useMessages;
