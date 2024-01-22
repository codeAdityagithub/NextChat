"use client";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import useMessages from "@/hooks/useMessages";
import { formatTag } from "@/lib/timeFormatters";
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
    let curTag = "today";
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex-1 flex flex-col-reverse overflow-y-auto px-2 ver-scrollbar">
            {isLoading || !data || !isClient ? (
                <h2 className="h-full flex items-center justify-center text-xl text-primary-content">
                    Loading ...
                </h2>
            ) : (
                <>
                    {data.messages.map((message) => {
                        const formattedTag = formatTag(message.created_at);
                        // Show the tag only when the date changes
                        const showTag = formattedTag !== curTag;

                        if (showTag) {
                            const temp = curTag;
                            curTag = formattedTag;
                            return (
                                <div className="w-full flex justify-center">
                                    <span className="badge badge-outline rounded-badge outline outline-1 text-slate-500">
                                        {temp}
                                    </span>
                                </div>
                            );
                        }
                        return message.sender_id === otherPerson?.id ? (
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
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default ChatContent;
