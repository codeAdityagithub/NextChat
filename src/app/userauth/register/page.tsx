"use client";
import axios from "axios";
import { useState } from "react";

import { UserType } from "@/types";
import Link from "next/link";

const createUser = async (data: UserType) => {
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
    const [user, setUser] = useState<UserType>({
        user_name: "",
        user_email: "",
        user_password: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await createUser(user);
        console.log(res);
        if (res.error) setError(res.error);
        else if (res.message) setMessage(res.message);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // isError && console.log(error);

    return (
        <div className="w-full h-full overflow-y-auto flex relative font-sans justify-center items-center box-border">
            <div className="w-[300px] p-4 bg-primary-content rounded-md shadow-md shadow-gray-800">
                <p className="bg-green-400 text-gray-200 test-xs">{message}</p>
                <p className="bg-red-400 text-gray-200 test-xs">{error}</p>
                <h2 className="w-full p-2 text-gray-200 text-center text-2xl">
                    Register
                </h2>
                <form className="w-full p-2" onSubmit={handleSubmit}>
                    <input
                        required
                        type="text"
                        value={user?.user_name}
                        maxLength={255}
                        name="user_username"
                        onChange={handleChange}
                        placeholder="Your Username..."
                        className="w-full p-2 text-gray-200 placeholder:text-gray-400 my-2 bg-transparent rounded-md"
                    />
                    <input
                        required
                        type="email"
                        value={user?.user_email}
                        name="user_email"
                        onChange={handleChange}
                        placeholder="Your email..."
                        className="w-full p-2 text-gray-200 placeholder:text-gray-400 my-2 bg-transparent rounded-md"
                    />
                    <input
                        required
                        type="password"
                        name="user_password"
                        onChange={handleChange}
                        value={user?.user_password}
                        minLength={8}
                        maxLength={255}
                        placeholder="Your Password"
                        className="w-full p-2 text-gray-200 placeholder:text-gray-400 my-2 bg-transparent rounded-md"
                    />
                    <button className="button w-full my-4">Submit</button>
                </form>

                <Link
                    href="/api/auth/login"
                    className="text-gray-400 text-sm p-2 mt-4"
                >
                    Already registered? Login
                </Link>
            </div>
        </div>
    );
};

export default Register;
