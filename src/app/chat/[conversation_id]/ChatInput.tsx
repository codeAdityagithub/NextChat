"use client";
import { socket } from "@/utils/socket";
import { useParams } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";

import { BiSolidSend } from "react-icons/bi";

const ChatInput = ({ username }: { username: string }) => {
    const { conversation_id } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    // const { data } = useSession();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() === "") return;
        socket.emit("message", message, username, conversation_id);
        setMessage("");
    };
    useEffect(() => {
        socket.emit("join_conversation", conversation_id);
        const handleMessageError = (error: any, message: string) => {
            console.log(error, message);
            setMessage(message);
            setError("Couldn't send message now!");
            setTimeout(() => setError(""), 3000);
        };
        socket.on("message_error", handleMessageError);

        return () => {
            socket.emit("leave_conversation", conversation_id);
            socket.off("message_error", handleMessageError);
        };
    }, []);
    return (
        <form onSubmit={handleSubmit} className="relative shadow-lg">
            <div className="flex rounded-lg">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-primary-content bg-white focus:outline-none focus:ring-1 ring-offset-1 ring-primary placeholder:text-gray-300 p-3 rounded-lg"
                    type="text"
                    name="message"
                    id="message_input"
                    placeholder="Type a message"
                />
            </div>
            <div className="error empty:hidden absolute -top-8 left-0 bg-error text-error-content rounded-md px-2 py-1">
                {error}
            </div>
            <button
                className="bg-gray-200 text-primary absolute right-3 top-2 text- p-2 rounded-full flex items-center justify-center"
                type="submit"
            >
                <BiSolidSend />
            </button>
        </form>
    );
};

export default ChatInput;
