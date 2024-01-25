"use client";
import React from "react";
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
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex-1 flex flex-col-reverse overflow-y-auto pt-2 px-2 ver-scrollbar w-full lg:px-10 xl:px-20 2xl:px-28">
            {isLoading || !data || !isClient ? (
                <h2 className="h-full flex items-center justify-center text-xl text-primary-content">
                    Loading ...
                </h2>
            ) : (
                <>
                    {data.messages.map((message, ind) => {
                        const formattedTag = formatTag(message.created_at);
                        const showTag =
                            ind === data.messages.length - 1 ||
                            formattedTag !==
                                formatTag(data.messages[ind + 1].created_at);

                        if (showTag) {
                            return (
                                <React.Fragment
                                    key={new Date(
                                        message.created_at
                                    ).toString()}
                                >
                                    {message.sender_id === otherPerson?.id ? (
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
                                    )}
                                    <div className="w-full flex justify-center">
                                        <span className="empty:hidden badge badge-outline rounded-badge outline outline-1 text-slate-500">
                                            {formattedTag}
                                        </span>
                                    </div>
                                    {/* {ind === data.messages.length - 1 ? (
                                        <div className="w-full flex justify-center">
                                            <span className="badge badge-outline rounded-badge outline outline-1 text-slate-500">
                                                {formattedTag}
                                            </span>
                                        </div>
                                    ) : null} */}
                                </React.Fragment>
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
