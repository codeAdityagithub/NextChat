"use client";

import { socket } from "@/utils/socket";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

type Props = {};

const sendInvite = async (userId: string) => {
    const data = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invite?userId=${userId}`,
        { withCredentials: true }
    );
    return data;
};

const InviteUser = (props: Props) => {
    const [error, setError] = useState<string | null>(null);
    const { mutate, isPending } = useMutation({
        mutationFn: sendInvite,
        onSuccess(data) {
            console.log(data);
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
        const req = (userId: string) => {
            console.log(userId, "userId");
        };
        socket.on("invite_request", req);

        return () => {
            socket.off("invite_request", req);
        };
    }, []);

    return (
        <form
            className="w-full flex flex-col items-center gap-3 bg-white p-2 rounded-lg relative shadow-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    id="invite_user_input"
                    placeholder="Send a invite ..."
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
            <div className="messages text-left w-full empty:hidden empty:opacity-0 transition-all duration-500 opacity-100 text-red-300">
                {error}
            </div>
        </form>
    );
};

export default InviteUser;
