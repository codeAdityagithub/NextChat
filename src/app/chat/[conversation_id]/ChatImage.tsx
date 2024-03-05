import { Message, User } from "@/dbtypes";
import { getTime } from "@/lib/timeFormatters";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdImage } from "react-icons/md";
import ImageViewDialog from "./ImageViewDialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MessageDeleteDropdown from "@/components/MessageOptionsDropdown";

type otherPerson = Pick<User, "id" | "name" | "username" | "dp">;

type Props = {
    message: Message;
    otherPerson?: otherPerson;
    showDp?: boolean;
};

const ChatImage = ({ message, otherPerson, showDp }: Props) => {
    const session = useSession();
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["chatImage", message.content],
        queryFn: async () => {
            const res = await axios.get(message.content, {
                headers: {
                    Authorization: `Bearer ${session.data?.user.apiAccessToken}`,
                },
                responseType: "blob",
            });
            const blob = URL.createObjectURL(res.data);
            return blob;
        },
        enabled: session.data?.user?.apiAccessToken !== undefined,
    });

    const handleImageView = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        // console.log(dialogRef.current);
        dialogRef.current?.showModal();
    };

    return message.sender_id === otherPerson?.id ? (
        <div className="chat chat-start">
            <ImageViewDialog dialogRef={dialogRef} blob={data} />
            <div className="chat-image avatar mb-auto mt-5">
                <div
                    className={`w-10 h-10 rounded-full overflow-hidden relative ${
                        showDp ? "shadow-md" : ""
                    }`}
                >
                    {showDp ? (
                        <Image
                            src={otherPerson?.dp ?? "/account.png"}
                            alt={`${otherPerson.name}'s Profile Picture`}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                            sizes="100px"
                        />
                    ) : null}
                </div>
            </div>
            <div className="chat-header text-base-content ">
                {otherPerson.name}
            </div>
            <div
                onClick={handleImageView}
                className={
                    "chat-bubble p-2 bg-secondary rounded-md text-secondary-content relative break-words max-w-[240px] sm:max-w-xs"
                }
            >
                {showDp ? (
                    <div className="absolute top-0 -left-2 rounded-md w-0 h-0 border-[12px] border-secondary border-solid border-r-transparent border-l-transparent border-b-transparent"></div>
                ) : null}
                {isLoading || isError || !data ? (
                    <div className="w-56 h-32 rounded-sm animate-pulse bg-secondary text-4xl flex items-center justify-center">
                        <MdImage />
                    </div>
                ) : (
                    <img
                        src={data}
                        alt="chat Image"
                        className="object-cover max-h-[350px]"
                        draggable={false}
                        crossOrigin="anonymous"
                    />
                )}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(message.created_at)}
            </div>
        </div>
    ) : (
        <div className="chat chat-end">
            <ImageViewDialog dialogRef={dialogRef} blob={data} />

            <div className="chat-header text-base-content">You</div>
            <div
                onClick={handleImageView}
                className="chat-bubble p-2 bg-primary text-primary-content relative rounded-md break-words max-w-[240px] sm:max-w-xs"
            >
                {isLoading || isError || !data ? (
                    <div className="w-56 h-32 rounded-sm animate-pulse bg-secondary text-4xl flex items-center justify-center">
                        <MdImage />
                    </div>
                ) : (
                    <img
                        src={data}
                        alt="chat Image"
                        className="object-cover max-h-[350px]"
                        draggable={false}
                        crossOrigin="anonymous"
                    />
                )}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(message.created_at)} {message.status}
            </div>
            <MessageDeleteDropdown
                message_id={message.message_id}
                messageType="image"
                otherPersonId={otherPerson?.id}
                messageContent={message.content}
            />
        </div>
    );
};

export default ChatImage;
