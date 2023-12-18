"use client";
import { socket } from "@/utils/socket";

import { FormEvent, useEffect } from "react";

import { BiSolidSend } from "react-icons/bi";

type Props = {};

const ChatInput = (props: Props) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as any;
        console.log(form[0].value);
    };
    useEffect(() => {
        socket.connect();
        socket.emit("test");
        const fn = (hi: string) => {
            console.log(hi);
        };
        socket.on("hi", fn);
        return () => {
            socket.off("hi", fn);
            socket.disconnect();
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
