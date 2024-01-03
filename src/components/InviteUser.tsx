"use client";

import { FormEvent } from "react";

type Props = {};

const InviteUser = (props: Props) => {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget[0] as HTMLInputElement;
        if (input.value.trim() == "") return;
        await fetch("http://localhost:8000/invite", {
            method: "POST",
            body: JSON.stringify({ userId: input.value }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
    };

    return (
        <form
            className="w-full h-14 flex items-center gap-3 bg-white p-2 rounded-lg"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="invite_user_input"
                placeholder="Send a invite ..."
                className="p-2 bg-transparent text-primary-content flex-1 focus:ring-1 ring-primary-content outline-none rounded-md"
            />
            <button
                type="submit"
                className="bg-slate-900 p-2 rounded-md text-accent"
            >
                send
            </button>
        </form>
    );
};

export default InviteUser;
