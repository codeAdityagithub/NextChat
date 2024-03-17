"use client";
import { useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const isError = useSearchParams().get("error");
    const callback = useSearchParams().get("callbackUrl");

    useEffect(() => {
        if (isError) {
            setError(
                isError == "CredentialsSignin"
                    ? "Check your credentials"
                    : isError
            );
            setTimeout(() => setError(""), 3000);
        }
    }, [router, isError]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(user.name, user.username);
        setLoading(true);
        const res = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: true,
            callbackUrl: callback ?? "/chat",
        });
        setLoading(false);
        console.log(res?.status);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // isError && console.log(error);

    return (
        <>
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
                        type="email"
                        value={user?.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Your email..."
                        className="my_input"
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
                        className="my_input"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="_btn-sm w-full bg-accent text-accent-content disabled:bg-secondary disabled:text-secondary-content"
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
        </>
    );
};

export default Login;
