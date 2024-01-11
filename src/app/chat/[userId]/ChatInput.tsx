"use client";
import { UserCardInfo } from "@/types";
import { socket } from "@/utils/socket";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

import { FormEvent, useEffect } from "react";

import { BiSolidSend } from "react-icons/bi";

const ChatInput = () => {
    const { userId } = useParams();
    const { data } = useSession();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as any;
        console.log(form[0].value);
        socket.emit("message", form[0].value);
        form.reset();
    };
    useEffect(() => {
        socket.emit("joined_user", userId);
        // console.log(data);
        const fn = (error: any) => {
            console.log(error.message);
        };
        socket.on("connect_error", fn);

        return () => {
            socket.off("connect_error", fn);
        };
    }, []);
    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex rounded-lg">
                <input
                    required
                    className="w-full text-primary-content bg-white focus:outline-none focus:ring-1 ring-offset-1 ring-primary placeholder:text-gray-300 p-3 rounded-lg"
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Type a message"
                />
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
