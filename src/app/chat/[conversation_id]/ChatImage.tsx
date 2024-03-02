import { Message, User } from "@/dbtypes";
import { getTime } from "@/lib/timeFormatters";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdImage } from "react-icons/md";

type otherPerson = Pick<User, "id" | "name" | "username" | "dp">;

type Props = {
    message: Message;
    otherPerson?: otherPerson;
    showDp?: boolean;
};

const ChatImage = ({ message, otherPerson, showDp }: Props) => {
    const session = useSession();
    const [blob, setBlob] = useState<string>("");
    useEffect(() => {
        if (session.data?.user.apiAccessToken) {
            fetch(message.content, {
                headers: {
                    Authorization: `Bearer ${session.data?.user.apiAccessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        );
                    }
                    return response.blob();
                })
                .then((blob) => {
                    // Handle the blob, e.g., display the image
                    setBlob(URL.createObjectURL(blob));
                })
                .catch((error) => {
                    console.error("Error fetching image:", error);
                });
        }
    }, [session, message]);

    return message.sender_id === otherPerson?.id ? (
        <div className="chat chat-start">
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
                className={
                    "chat-bubble p-2 bg-secondary rounded-md text-secondary-content relative break-words max-w-[260px] sm:max-w-xs lg:max-w-md"
                }
            >
                {showDp ? (
                    <div className="absolute top-0 -left-2 rounded-md w-0 h-0 border-[12px] border-secondary border-solid border-r-transparent border-l-transparent border-b-transparent"></div>
                ) : null}
                {blob === "" ? (
                    <div className="w-64 h-32 rounded-sm animate-pulse bg-secondary text-4xl flex items-center justify-center">
                        <MdImage />
                    </div>
                ) : (
                    <img
                        src={blob}
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
            <div className="chat-header text-base-content">You</div>
            <div className="chat-bubble p-2 bg-primary text-primary-content relative rounded-md break-words max-w-[260px] sm:max-w-xs lg:max-w-md">
                {blob == "" ? (
                    <div className="w-64 h-32 rounded-sm animate-pulse bg-secondary text-4xl flex items-center justify-center">
                        <MdImage />
                    </div>
                ) : (
                    <img
                        src={blob}
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
        </div>
    );
};

export default ChatImage;
