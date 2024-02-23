"use client";
import { socket } from "@/utils/socket";
import axios from "axios";
import { useParams } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";

import { BiSolidSend } from "react-icons/bi";

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
    // const { data } = useSession();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") return;
        // socket.emit("message", message, otherPersonId, conversation_id);

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
            if (res.status === 200) setMessage("");
        } catch (error: any) {
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        }
    };
    useEffect(() => {
        socket.emit("join_conversation", conversation_id, otherPersonId);
        return () => {
            socket.emit("leave_conversation", conversation_id);
        };
    }, [conversation_id, otherPersonId]);

    return (
        <form onSubmit={handleSubmit} className="relative shadow-lg">
            <div className="flex rounded-lg">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-neutral-content bg-neutral focus:outline-none focus:ring-1 focus:ring-secondary p-3 pr-14 rounded-lg"
                    type="text"
                    name="message"
                    id="message_input"
                    placeholder="Type a message"
                />
            </div>
            <button
                className="bg-secondary text-accent absolute right-3 top-2 text- p-2 rounded-full flex items-center justify-center"
                type="submit"
            >
                <BiSolidSend />
            </button>
            <div className="error empty:hidden absolute -top-8 left-0 bg-error text-error-content rounded-md px-2 py-1">
                {error}
            </div>
        </form>
    );
};

export default ChatInput;
