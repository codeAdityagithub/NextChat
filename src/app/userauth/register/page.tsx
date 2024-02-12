"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { User } from "@/dbtypes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: "",
        username: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (session.status === "authenticated") {
            router.replace("/chat");
        }
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(user.name, user.username);
        if (checkValid(user.name) || checkValid(user.username)) {
            setError("name or username cannot contain '|' or '_'");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const res = await createUser(user);
        console.log(res);
        if (res.error) {
            setError(res.error);
            setTimeout(() => setError(""), 3000);
        } else if (res.message) {
            setMessage(res.message);
            setTimeout(() => {
                setMessage("");
                router.replace("/api/auth/signin");
            }, 2000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // isError && console.log(error);

    return (
        <div className="w-full h-full overflow-y-auto flex relative font-sans justify-center items-center box-border">
            <div className="w-[300px] p-4 bg-neutral text-neutral-content rounded-md shadow-lg shadow-primary">
                <p className="text-success-content bg-success  test-xs text-center">
                    {message}
                </p>
                <p className="text-error-content bg-error test-xs text-center">
                    {error}
                </p>
                <h2 className="w-full p-2 text-center text-2xl">Register</h2>
                <form
                    className="w-full p-4 flex flex-col gap-4"
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
                        className="w-full p-2 my-2 bg-transparent rounded-md border border-secondary"
                    />
                    <input
                        required
                        type="text"
                        value={user?.username}
                        maxLength={255}
                        name="username"
                        onChange={handleChange}
                        placeholder="Your Username thats unique ..."
                        className="w-full p-2 my-2 bg-transparent rounded-md border border-secondary"
                    />
                    <input
                        required
                        type="email"
                        value={user?.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="Your email..."
                        className="w-full p-2 my-2 bg-transparent rounded-md border border-neutral-content"
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
                        className="w-full p-2 my-2 bg-transparent rounded-md border border-neutral-content"
                    />
                    <button className="_btn-sm w-full">Submit</button>
                </form>

                <Link href="/api/auth/signin" className="text-sm p-2 mt-4">
                    Already registered? Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
