"use client";
import React from "react";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import useMessages from "@/hooks/useMessages";
import { formatTag } from "@/lib/timeFormatters";
import { useEffect, useRef, useState } from "react";
import ChatContentLoader from "./ChatContentLoader";
import ChatImage from "./ChatImage";

type otherPerson = Pick<User, "id" | "name" | "username" | "dp">;

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
    const [
        data,
        isLoading,
        error,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    ] = useMessages({
        initialData: initialMessages,
        userId: cur_userId!,
    });
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <>
            <div className="flex-1 flex flex-col-reverse overflow-y-auto pt-2 px-2 ver_scrollbar w-full lg:px-10 xl:px-20 2xl:px-28 second_last_child ">
                {isLoading || !data || !isClient ? (
                    <ChatContentLoader />
                ) : (
                    <>
                        {data.messages.map((message, ind) => {
                            const formattedTag = formatTag(message.created_at);
                            const showTag =
                                ind === data.messages.length - 1 ||
                                formattedTag !==
                                    formatTag(
                                        data.messages[ind + 1].created_at
                                    );
                            const showDp =
                                message.sender_id === otherPerson?.id &&
                                (ind === data.messages.length - 1 ||
                                    data.messages[ind + 1].sender_id !==
                                        otherPerson.id);
                            if (showTag) {
                                return (
                                    <React.Fragment
                                        key={new Date(
                                            message.created_at
                                        ).toString()}
                                    >
                                        {message.type === "image" ? (
                                            <ChatImage
                                                key={message.message_id}
                                                message={message}
                                                otherPerson={otherPerson}
                                                showDp={showDp}
                                            />
                                        ) : message.sender_id ===
                                          otherPerson?.id ? (
                                            <ChatBubbleLeft
                                                key={message.message_id}
                                                name={otherPerson.name}
                                                created_at={message.created_at}
                                                content={message.content}
                                                dp={otherPerson.dp}
                                                message_id={message.message_id}
                                                showDp={showDp}
                                            />
                                        ) : (
                                            <ChatBubbleRight
                                                key={message.message_id}
                                                name={"You"}
                                                status={message.status}
                                                created_at={message.created_at}
                                                message_id={message.message_id}
                                                content={message.content}
                                                otherPersonId={otherPerson?.id}
                                            />
                                        )}
                                        <div className="w-full flex justify-center">
                                            <span className="empty:hidden badge badge-outline rounded-box outline outline-1 text-xs text-accent">
                                                {formattedTag}
                                            </span>
                                        </div>
                                    </React.Fragment>
                                );
                            }
                            return message.type === "image" ? (
                                <ChatImage
                                    key={message.message_id}
                                    message={message}
                                    otherPerson={otherPerson}
                                    showDp={showDp}
                                />
                            ) : message.sender_id === otherPerson?.id ? (
                                <ChatBubbleLeft
                                    key={message.message_id}
                                    name={otherPerson.name}
                                    created_at={message.created_at}
                                    content={message.content}
                                    dp={otherPerson.dp}
                                    message_id={message.message_id}
                                    showDp={showDp}
                                />
                            ) : (
                                <ChatBubbleRight
                                    key={message.message_id}
                                    name={"You"}
                                    status={message.status}
                                    created_at={message.created_at}
                                    message_id={message.message_id}
                                    content={message.content}
                                    otherPersonId={otherPerson?.id}
                                />
                            );
                        })}
                        <button
                            className="btn btn-sm my-4 rounded-box cursor-pointer bg-primary disabled:bg-secondary/80 text-primary-content disabled:text-secondary-content mb-auto"
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage || !hasNextPage}
                        >
                            {hasNextPage
                                ? "Load Previous Messages"
                                : "No More Messages"}
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default ChatContent;
