"use client";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useParams } from "next/navigation";
import imageCompression from "browser-image-compression";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { BiSolidSend } from "react-icons/bi";
import ChatMessageInput from "./ChatMessageInput";
import { useMutation } from "@tanstack/react-query";

type MutationParams = {
    otherPersonId: string;
    apiAccessToken?: string;
    conversation_id: string | string[];
    message: string;
};
type ImageMutationParams = {
    otherPersonId: string;
    apiAccessToken?: string;
    conversation_id: string | string[];
    file: File;
};

const sendMessage = async ({
    message,
    conversation_id,
    otherPersonId,
    apiAccessToken,
}: MutationParams) => {
    await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/message`,
        { message, otherPersonId, conversation_id },
        {
            headers: {
                Authorization: `Bearer ${apiAccessToken}`,
            },
        }
    );
};
const sendImage = async ({
    file,
    conversation_id,
    otherPersonId,
    apiAccessToken,
}: ImageMutationParams) => {
    const compressedImage = await imageCompression(file, {
        useWebWorker: true,
        maxWidthOrHeight: 1000,
        maxSizeMB: 0.1,
    });

    const data = new FormData();
    data.set("image", compressedImage);
    data.set("otherPersonId", otherPersonId);
    data.set("conversation_id", conversation_id as string);

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/message/image`, data, {
        headers: {
            Authorization: `Bearer ${apiAccessToken}`,
        },
    });
};

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
    const ref = useRef<HTMLTextAreaElement>(null);
    const { mutate: mutateMessage, isPending: isPendingMessage } = useMutation({
        mutationFn: sendMessage,
        onSuccess() {
            setMessage("");
            if (ref.current) ref.current.style.height = "48px";
        },
        onError(error: any) {
            console.log(error);
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        },
    });
    const {
        mutate: mutateImage,
        isPending: isPendingImage,
        isSuccess,
    } = useMutation({
        mutationFn: sendImage,
        onError(error: any) {
            console.log(error);
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        },
    });
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") return;
        mutateMessage({
            message,
            conversation_id,
            otherPersonId,
            apiAccessToken,
        });
    };
    const handleImageMessage = (file: File) => {
        mutateImage({ conversation_id, file, otherPersonId, apiAccessToken });
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        e.target.style.height = "1px";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 144)}px`;
    };

    useEffect(() => {
        socket.emit("join_conversation", conversation_id, otherPersonId);
        return () => {
            socket.emit("leave_conversation", conversation_id);
        };
    }, [conversation_id, otherPersonId]);

    return (
        <>
            <ChatMessageInput
                handleImageMessage={handleImageMessage}
                setError={setError}
                isPending={isPendingImage}
                isSuccess={isSuccess}
            />
            <form
                onSubmit={handleSubmit}
                className="relative flex items-end flex-1"
            >
                <div className="flex rounded-md flex-1 bg-neutral">
                    <textarea
                        ref={ref}
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
                    className="bg-secondary text-accent disabled:text-primary absolute right-3 bottom-2 text- p-2 rounded-full flex items-center justify-center"
                    type="submit"
                    title="send the message"
                    disabled={isPendingMessage}
                >
                    <BiSolidSend />
                </button>
                <div className="error empty:hidden z-20 absolute -top-8 left-2 bg-error text-error-content rounded-md px-2 py-1">
                    {error}
                </div>
            </form>
        </>
    );
};

export default ChatInput;
