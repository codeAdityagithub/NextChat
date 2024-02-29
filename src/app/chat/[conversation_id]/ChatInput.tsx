"use client";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useParams } from "next/navigation";
import imageCompression from "browser-image-compression";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { BiSolidSend } from "react-icons/bi";
import ChatMessageInput from "./ChatMessageInput";

const ChatInput = ({
    otherPersonId,
    apiAccessToken,
}: {
    otherPersonId: string;
    apiAccessToken?: string;
}) => {
    const { conversation_id } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") return;

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/message`,
                { message, otherPersonId, conversation_id },
                {
                    headers: {
                        Authorization: `Bearer ${apiAccessToken}`,
                    },
                }
            );
            if (res.status === 200) {
                setMessage("");
            }
        } catch (error: any) {
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        }
    };
    const handleImageMessage = async (file: File) => {
        const compressedImage = await imageCompression(file, {
            useWebWorker: true,
            maxWidthOrHeight: 1000,
            maxSizeMB: 0.1,
        });

        const data = new FormData();
        data.set("image", compressedImage);
        data.set("otherPersonId", otherPersonId);
        data.set("conversation_id", conversation_id as string);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/message/image`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${apiAccessToken}`,
                    },
                }
            );
            if (res.status === 200) {
                return "success";
            }
        } catch (error: any) {
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        }
        return "error";
    };
    useEffect(() => {
        socket.emit("join_conversation", conversation_id, otherPersonId);
        return () => {
            socket.emit("leave_conversation", conversation_id);
        };
    }, [conversation_id, otherPersonId]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        e.target.style.height = "1px";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 144)}px`;
    };

    return (
        <>
            <ChatMessageInput handleImageMessage={handleImageMessage} />
            <form
                onSubmit={handleSubmit}
                className="relative flex items-end flex-1"
            >
                <div className="flex rounded-md flex-1 bg-neutral">
                    <textarea
                        autoFocus
                        value={message}
                        onChange={handleChange}
                        className="w-full resize-none text-neutral-content bg-neutral focus:outline-none focus:ring-1 focus:ring-secondary p-3 pr-14 rounded-lg"
                        // type="text"
                        rows={1}
                        name="message"
                        id="message_input"
                        placeholder="Type a message"
                    />
                </div>
                <button
                    className="bg-secondary text-accent absolute right-3 bottom-2 text- p-2 rounded-full flex items-center justify-center"
                    type="submit"
                >
                    <BiSolidSend />
                </button>
                <div className="error empty:hidden absolute -top-8 left-0 bg-error text-error-content rounded-md px-2 py-1">
                    {error}
                </div>
            </form>
        </>
    );
};

export default ChatInput;
