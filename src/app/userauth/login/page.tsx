"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { User } from "@/dbtypes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import type { Metadata } from "next";
import ThemeSetter from "@/components/ThemeSetter";
import { FcGoogle } from "react-icons/fc";

// export const metadata: Metadata = {
//     title: "Register | NextChat",
//     description: "Register yourself to NextChat, and create new Connections",
// };

const Register = () => {
    const router = useRouter();
    const session = useSession();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const isError = !!useSearchParams().get("error");
    const callback = useSearchParams().get("callbackUrl");

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/chat");
        }
        if (isError) {
            setError("Check your credentials");
            setTimeout(() => setError(""), 3000);
        }
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(user.name, user.username);
        signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: true,
            callbackUrl: callback ?? "/chat",
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // isError && console.log(error);

    return (
        <div className="w-full h-full p-4 overflow-y-auto flex flex-col relative font-sans justify-center items-center box-border">
            <ThemeSetter />
            <h2 className="w-full p-2 text-center text-xl text-base-content">
                Login | NextChat
            </h2>
            <div className="min-w-[280px] sm:w-[350px] p-4 sm:p-6 bg-neutral text-neutral-content rounded-lg shadow-lg">
                <p className="w-full text-error-content bg-error test-xs text-center empty:p-0 p-1 rounded-md my-2">
                    {error}
                </p>
                <div
                    role="button"
                    onClick={() =>
                        signIn("google", {
                            redirect: true,
                            callbackUrl: `/chat`,
                        })
                    }
                    className="rounded-lg flex items-center gap-2 bg-primary text-primary-content p-2"
                >
                    <FcGoogle className="text-3xl" />{" "}
                    <span className="flex-1 flex items-center justify-center">
                        Sign in with Google
                    </span>
                </div>
                <div className="flex items-center gap-1 py-4 text-secondary">
                    <span className="flex-1 h-[1px] bg-secondary"></span>or
                    <span className="flex-1 h-[1px] bg-secondary"></span>
                </div>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        required
                        type="email"
                        value={user?.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Your email..."
                        className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={user?.password}
                        minLength={8}
                        maxLength={255}
                        placeholder="Your Password"
                        className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                    />
                    <button
                        type="submit"
                        className="_btn-sm w-full bg-accent text-accent-content"
                    >
                        Submit
                    </button>
                </form>
                <div className="border-t border-secondary mt-4 pt-2">
                    <Link
                        href="/userauth/register"
                        className="text-sm flex items-center justify-center"
                    >
                        Don&apos;t have a account?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
