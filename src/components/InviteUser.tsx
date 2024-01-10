"use client";

import { UserCardInfo } from "@/types";
import { socket } from "@/utils/socket";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

type Props = {};

const sendInvite = async (username: string) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invite?username=${username}`,
        { withCredentials: true }
    );
    return res.data;
};

const InviteUser = (props: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { mutate, isPending } = useMutation({
        mutationFn: sendInvite,
        onSuccess(data) {
            setSuccess(data);
            setTimeout(() => setSuccess(null), 3000);
        },
        onError(error: any) {
            // console.log((error))
            setError(error.response ? error.response.data : error.message);
            setTimeout(() => setError(null), 3000);
        },
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget[0] as HTMLInputElement;
        if (input.value.trim() == "") return;
        mutate(input.value);
    };

    useEffect(() => {
        const getConv = (conversation: UserCardInfo) => {
            console.log(conversation);
        };
        socket.on("add_conversation", getConv);
        return () => {
            socket.off("add_conversation", getConv);
        };
    }, []);

    return (
        <form
            className="w-full flex flex-col items-center gap-3 bg-white p-2 rounded-lg relative shadow-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-3 w-full">
                <input
                    type="text"
                    id="invite_user_input"
                    placeholder="Send a invite to ..."
                    className="p-2 bg-transparent text-primary-content flex-1 focus:ring-1 ring-primary-content outline-none rounded-md"
                />
                <button
                    disabled={isPending}
                    type="submit"
                    className="bg-slate-900 p-2 rounded-md text-accent disabled:bg-slate-400"
                >
                    send
                </button>
            </div>
            <div className="messages text-left w-full empty:hidden empty:opacity-0 transition-all duration-500 opacity-100 text-red-500">
                {error}
            </div>
            <div className="messages text-left w-full empty:hidden empty:opacity-0 transition-all duration-500 opacity-100 text-green-500">
                {success}
            </div>
        </form>
    );
};

export default InviteUser;
