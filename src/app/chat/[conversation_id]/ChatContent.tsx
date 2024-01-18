"use client";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import useMessages from "@/hooks/useMessages";
import { useEffect, useRef } from "react";

type otherPerson = Pick<User, "id" | "name" | "username">;

type Props = {
    messages: Message[];
    otherPerson?: otherPerson;
};

const ChatContent = ({ messages: initialData, otherPerson }: Props) => {
    const [messages, setMessages] = useMessages({ initialData });
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        divRef.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
        });
    }, []);
    return (
        <div className="flex-1 overflow-y-auto px-2 ver-scrollbar" ref={divRef}>
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
