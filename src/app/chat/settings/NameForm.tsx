import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type MyFormData = {
    name: string;
    username: string;
};

const NameForm = ({
    name,
    username,
    session,
}: {
    name: string;
    username: string;
    session: any;
}) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState<MyFormData>({
        name: name,
        username: username,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        // console.log(name);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleUserFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with formData, like sending it to a server
        if (formData.name.trim() === "" || formData.username.trim() === "")
            return;
        const data = { name: formData.name, username: formData.username };
        try {
            const res = await axios.post("/api/private/userdata", data);
            // console.log(res.data);
            if (res.status === 200) {
                setMsg("Profile Updated Succesfully");
                if (
                    res.data.name === formData.name &&
                    res.data.username === formData.username
                ) {
                    session.update({
                        name: res.data.name,
                        username: res.data.username,
                    });
                }
                setTimeout(() => {
                    setMsg("");
                    router.refresh();
                }, 1000);
            }
        } catch (error: any) {
            // console.log(error.message);
            setError(
                error.response.data ??
                    (error.message || "Something went wrong!")
            );
            setFormData({ name, username });
            setTimeout(() => setError(""), 3000);
        }
    };
    return (
        <form
            onSubmit={handleUserFormSubmit}
            className="max-w-md mx-auto bg-white p-8 shadow-md rounded-b-md flex flex-col gap-6"
        >
            <div className="">
                <label
                    htmlFor="name"
                    className="block text-primary-content text-sm font-bold mb-2"
                >
                    Name
                </label>
                <input
                    required
                    value={formData.name}
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-transparent py-2 px-3 text-primary-content outline-1 outline"
                    placeholder="Enter your name"
                />
            </div>

            <div className="">
                <label
                    htmlFor="username"
                    className="block text-primary-content text-sm font-bold mb-2"
                >
                    Username
                </label>
                <input
                    required
                    value={formData.username}
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    className="w-full rounded-md bg-transparent py-2 px-3 text-primary-content outline-1 outline"
                    placeholder="Enter your username"
                />
            </div>

            <button
                type="submit"
                disabled={
                    formData.name.length === 0 ||
                    formData.username.length === 0 ||
                    (name === formData.name && username === formData.username)
                }
                className="bg-slate-800 hover:bg-slate-900 p-2 rounded-md text-accent disabled:bg-slate-500"
            >
                Save
            </button>
            <span className="empty:hidden empty:p-0 transition-all p-1  bg-error text-error-content">
                {error}
            </span>
            <span className="empty:hidden empty:p-0 transition-all p-1  bg-success text-success-content">
                {msg}
            </span>
        </form>
    );
};

export default NameForm;
