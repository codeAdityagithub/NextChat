"use client";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import useMessages from "@/hooks/useMessages";
import { useEffect, useRef, useState } from "react";

type otherPerson = Pick<User, "id" | "name" | "username">;

type Props = {
    messages: Message[];
    otherPerson?: otherPerson;
    cur_userId?: string;
};

const ChatContent = ({
    messages: initialMessages,
    otherPerson,
    cur_userId,
}: Props) => {
    const [data, isLoading, error] = useMessages({
        initialData: initialMessages,
        userId: cur_userId!,
    });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex-1 flex flex-col-reverse overflow-y-auto px-2 ver-scrollbar">
            {" "}
            {isLoading || !data || !isClient ? (
                <h2 className="">Loading ... </h2>
            ) : (
                <>
                    {data.messages.map((message) =>
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
                </>
            )}
        </div>
    );
};

export default ChatContent;
