"use client";
import React from "react";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import { Message, User } from "@/dbtypes";
import useMessages from "@/hooks/useMessages";
import { formatTag } from "@/lib/timeFormatters";
import { useEffect, useRef, useState } from "react";

type otherPerson = Pick<User, "id" | "name" | "username" | "has_dp">;

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
                                    {message.sender_id === otherPerson?.id ? (
                                        <ChatBubbleLeft
                                            key={message.message_id}
                                            name={otherPerson.name}
                                            created_at={message.created_at}
                                            content={message.content}
                                            has_dp={otherPerson.has_dp}
                                            id={otherPerson.id}
                                            showDp={showDp}
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
                                has_dp={otherPerson.has_dp}
                                id={otherPerson.id}
                                showDp={showDp}
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
                    <button
                        className="btn btn-sm my-4 cursor-pointer bg-slate-600 disabled:bg-slate-400 text-white mb-auto"
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
    );
};

export default ChatContent;
