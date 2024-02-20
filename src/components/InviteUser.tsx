"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";

type Props = {
    apiAccessToken?: string;
};

const sendInvite = async (username: string, apiAccessToken?: string) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invite?username=${username}`,
        { headers: { Authorization: `Bearer ${apiAccessToken}` } }
    );
    return res.data;
};

const InviteUser = ({ apiAccessToken }: Props) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { mutate, isPending } = useMutation({
        mutationFn: ({
            username,
            apiAccessToken,
        }: {
            username: string;
            apiAccessToken?: string;
        }) => sendInvite(username, apiAccessToken),
        onSuccess(data) {
            setSuccess(data);
            setTimeout(() => setSuccess(null), 3000);
            setValue("");
        },
        onError(error: any) {
            // console.log((error))
            setValue("");
            setError(error.response ? error.response.data : error.message);
            setTimeout(() => setError(null), 3000);
        },
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value.trim() == "") return;
        mutate({ username: value, apiAccessToken: apiAccessToken });
    };

    return (
        <form
            className="w-full mb-2 flex flex-col items-center gap-3 bg-neutral text-neutral-content p-2 rounded-lg relative shadow-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-3 w-full">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id="invite_user_input"
                    placeholder="Send a invite to ..."
                    className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                />
                <button
                    disabled={isPending}
                    type="submit"
                    className="bg-primary hover:bg-primary/80 text-primary-content p-2 rounded-md disabled:bg-secondary"
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
