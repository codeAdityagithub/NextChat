"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
    token: string;
};

const Proceed = ({ token }: Props) => {
    const router = useRouter();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const { mutate, isPending } = useMutation({
        mutationFn: async ({ otp, token }: { otp: string; token: string }) => {
            await axios.post("/api/auth/register/verifyotp", {
                token: token,
                otp: otp,
            });
        },
        onError() {
            setError("Something went wrong");
            setTimeout(() => setError(""), 2000);
        },
        onSuccess() {
            setMessage("User created successfully");
            setTimeout(() => {
                router.replace(`/userauth/login`);
            }, 2000);
        },
    });
    const handleProceed = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ otp, token });
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setOtp(value.toString());
        }
    };
    return (
        <>
            <form className="w-full flex flex-col" onSubmit={handleProceed}>
                <input
                    required
                    type="text"
                    value={otp}
                    maxLength={6}
                    onChange={handleChange}
                    name="name"
                    placeholder="Enter the 6 digit otp"
                    className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                />
                <button
                    disabled={isPending || otp.length != 6}
                    type="submit"
                    className="_btn-sm bg-accent mt-4 text-accent-content disabled:bg-secondary disabled:text-secondary-content"
                >
                    Proceed
                </button>
                <p className="w-full text-error-content bg-error test-xs text-center empty:p-0 p-1 rounded-md my-2 transition-all">
                    {error}
                </p>
                <p className="w-full text-success-content bg-success  test-xs text-center empty:p-0 p-1 rounded-md my-2">
                    {message}
                </p>
            </form>
        </>
    );
};

export default Proceed;
