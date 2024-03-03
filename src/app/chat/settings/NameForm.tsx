import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

type MyFormData = {
    name: string;
};

const NameForm = ({ name, session }: { name: string; session: any }) => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState<MyFormData>({
        name: name,
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
        if (formData.name.trim() === "") return;
        const data = { name: formData.name };
        try {
            const res = await axios.post("/api/private/userdata", data);
            // console.log(res.data);
            if (res.status === 200) {
                setMsg("Profile Updated Succesfully");
                if (res.data.name === formData.name) {
                    session.update({
                        name: res.data.name,
                    });
                }
                setTimeout(() => {
                    setMsg("");
                    location.reload();
                }, 1000);
            }
        } catch (error: any) {
            // console.log(error.message);
            setError(
                error.response.data ??
                    (error.message || "Something went wrong!")
            );
            setFormData({ name });
            setTimeout(() => setError(""), 3000);
        }
    };
    return (
        <div className="form_container ">
            <div className="">
                Personal Info<div>Update your personal info</div>
            </div>
            <form
                onSubmit={handleUserFormSubmit}
                className="bg-neutral max-w-md p-4 md:p-6 shadow-md rounded-md flex flex-col justify-between gap-6"
            >
                <div className="">
                    <label
                        htmlFor="name"
                        className="block text-sm font-bold mb-2 text-neutral-content"
                    >
                        Name
                    </label>
                    <input
                        required
                        value={formData.name}
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        className="w-full rounded-md bg-transparent py-2 px-3 ring-1 ring-secondary focus:ring-offset-1 focus:outline-none border-secondary text-neutral-content"
                        placeholder="Enter your name"
                    />
                </div>

                {/* <div className="">
                    <label
                        htmlFor="username"
                        className="block text-sm font-bold mb-2 text-neutral-content"
                    >
                        Username
                    </label>
                </div> */}
                <div className="flex flex-col">
                    <button
                        type="submit"
                        disabled={
                            formData.name.length === 0 || name === formData.name
                        }
                        className="disabled:bg-secondary disabled:cursor-not-allowed bg-primary hover:bg-primary/80 cursor-pointer text-primary-content w-full p-2 rounded-md"
                    >
                        Save
                    </button>
                    <span className="empty:h-0 empty:p-0 transition-all p-1  bg-error text-error-content">
                        {error}
                    </span>
                    <span className="empty:h-0 empty:p-0 transition-all p-1  bg-success text-success-content">
                        {msg}
                    </span>
                </div>
            </form>
        </div>
    );
};

export default NameForm;
