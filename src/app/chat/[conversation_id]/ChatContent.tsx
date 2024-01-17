"use client";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import { socket } from "@/utils/socket";
import { useEffect, useState } from "react";

type otherPerson = Pick<User, "id" | "name" | "username">;

type Props = {
    messages: Message[];
    otherPerson?: otherPerson;
};

const ChatContent = ({ messages: initialMessages, otherPerson }: Props) => {
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        console.log("chat conetn");
        const messageHandler = (message: any) => {
            console.log(message, "recieve");
        };
        socket.on("recieve_message", messageHandler);
        return () => {
            socket.off("recieve_message", messageHandler);
        };
    }, [socket, messages]);
    return (
        <div className="flex-1 overflow-y-auto px-2">
            {messages.map((message) =>
                message.sender_id === otherPerson?.id ? (
                    <ChatBubbleLeft
                        key={message.message_id}
                        name={otherPerson.name}
                        created_at={message.created_at}
                        content={message.content}
                    />
                ) : (
                    <ChatBubbleRight
                        key={message.message_id}
                        name={"You"}
                        status={message.status}
                        created_at={message.created_at}
                        content={message.content}
                    />
                )
            )}
        </div>
    );
};

export default ChatContent;