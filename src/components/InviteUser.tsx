"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useState } from "react";
import SearchUsers from "./SearchUsers";
import { RxCross2 } from "react-icons/rx";
import { sentInviteStore } from "./zustand/SentInviteStore";
import { SentInvites } from "@/types";

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
const findUsers = async (username: string, signal: AbortSignal) => {
    const res = await axios.get(`/api/private/users?username=${username}`, {
        signal: signal,
    });
    return res.data.users;
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
            setSuccess("Invite sent sucessfully");
            console.log(data);
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
    const { data: fetchedUsers, isLoading } = useQuery({
        queryKey: ["searchUsers", value],
        queryFn: ({ signal }) => findUsers(value, signal),
        enabled: value.length >= 3,
    });
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            username: value,
            apiAccessToken: apiAccessToken,
        });
    };
    const handleSelect = (username: string) => {
        mutate({
            username: username,
            apiAccessToken: apiAccessToken,
        });
    };
    return (
        <form
            className="w-full mb-2 flex flex-col items-center gap-3 bg-neutral text-neutral-content p-2 rounded-lg relative shadow-lg"
            onSubmit={handleSubmit}
        >
            <div className="flex items-center gap-3 w-full">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        id="invite_user_input"
                        placeholder="Send a invite to ..."
                        className="p-2 w-full min-w-0 bg-transparent text-neutral-content ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                    />

                    <SearchUsers users={fetchedUsers} select={handleSelect} />
                    <div
                        role="button"
                        title="clear"
                        style={{
                            opacity: value.trim() === "" ? 0 : 1,
                            visibility:
                                value.trim() === "" ? "hidden" : "visible",
                        }}
                        onClick={() => setValue("")}
                        className="absolute top-1/2 -translate-y-1/2 right-0 transition-opacity duration-200 p-3"
                    >
                        <RxCross2 />
                    </div>
                </div>
                <button
                    disabled={isPending || value.trim() === ""}
                    type="submit"
                    aria-label="send invite"
                    title="send invite"
                    className="_btn-sm h-full bg-accent hover:bg-accent/80 text-accent-content disabled:cursor-not-allowed"
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
