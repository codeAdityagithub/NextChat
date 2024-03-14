"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { User } from "@/dbtypes";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";

// export const metadata: Metadata = {
//     title: "Register | NextChat",
//     description: "Register yourself to NextChat, and create new Connections",
// };

const checkValid = (inputVal: string) => {
    return inputVal.includes("|") || inputVal.includes("_");
};

const createUser = async (data: User) => {
    try {
        const res = await axios.post(`/api/auth/register`, data);
        return res.data;
    } catch (err: any) {
        console.log("err", err);
        return err.response?.data?.error
            ? err.response?.data
            : { error: "Something went wrong" };
    }
};

const Register = () => {
    const router = useRouter();
    const session = useSession();
    const tokenError = useSearchParams().get("error");

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        username: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/chat");
        }
        if (tokenError) {
            setError(tokenError);
            setTimeout(() => setError(""), 3000);
        }
    }, [session, router, tokenError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(user.name, user.username);
        if (checkValid(user.name) || checkValid(user.username)) {
            setError("name or username cannot contain '|' or '_'");
            setTimeout(() => setError(""), 3000);
            return;
        }
        setLoading(true);
        const res = await createUser(user);
        if (res.error) {
            setError(res.error);
            setLoading(false);
            setTimeout(() => setError(""), 3000);
        } else if (res.message && res.token) {
            setLoading(false);
            setMessage(res.message);
            e.currentTarget?.reset();
            // setOtpSent(true);
            setTimeout(() => {
                setMessage("");
                router.replace(
                    `/userauth/register/verifyotp?token=${res.token}`
                );
            }, 2000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value.trim(),
        }));
    };

    // isError && console.log(error);

    return (
        <>
            <h2 className="w-full p-2 text-center text-xl text-base-content">
                Register | NextChat
            </h2>
            <div className="min-w-[280px] sm:w-[350px] p-4 sm:p-6 bg-neutral text-neutral-content rounded-lg shadow-lg">
                <p className="w-full text-success-content bg-success  test-xs text-center empty:p-0 p-1 rounded-md my-2">
                    {message}
                </p>
                <p className="w-full text-error-content bg-error test-xs text-center empty:p-0 p-1 rounded-md my-2">
                    {error}
                </p>
                {loading && (
                    <div className="w-full flex items-center justify-center gap-4 my-2">
                        <span className="animate-spin text-accent text-xl">
                            <ImSpinner9 />
                        </span>
                        Processing
                    </div>
                )}
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
                <div className="flex items-center gap-1 py-4 text-accent">
                    <span className="flex-1 h-[1px] bg-secondary"></span>or
                    <span className="flex-1 h-[1px] bg-secondary"></span>
                </div>
                <form
                    className="w-full flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        required
                        type="text"
                        value={user?.name}
                        maxLength={255}
                        name="name"
                        onChange={handleChange}
                        placeholder="Your name..."
                        className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                    />
                    <input
                        required
                        type="text"
                        value={user?.username}
                        maxLength={255}
                        name="username"
                        onChange={handleChange}
                        placeholder="Your Username thats unique ..."
                        className="p-2 min-w-0 bg-transparent text-neutral-content flex-1 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none rounded-md"
                    />
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
                        disabled={loading}
                        className="_btn-sm w-full bg-accent text-accent-content disabled:bg-secondary"
                    >
                        Submit
                    </button>
                </form>

                <div className="border-t border-secondary mt-4 pt-2">
                    <Link
                        href="/userauth/login"
                        className="text-sm flex items-center justify-center"
                    >
                        Already registered?
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Register;
