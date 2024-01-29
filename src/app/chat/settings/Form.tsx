"use client";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

type Props = {
    names: { name: string; username: string };
    profile?: string | null;
};
type MyFormData = {
    name: string;
    username: string;
};

const Form = ({ names, profile }: Props) => {
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const labelRef = useRef<HTMLLabelElement>(null);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [formData, setFormData] = useState<MyFormData>({
        name: names.name,
        username: names.username,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        console.log(name);
        if (!value) return;

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget;
        if (!files) return;

        if (!["image/jpeg", "image/png"].includes(files[0]?.type)) {
            setError("Only jpeg/jpg and png are supported");
            setProfilePicture(null);
            labelRef.current &&
                (labelRef.current.innerText = "Upload an Image");

            setTimeout(() => setError(""), 5000);
            return;
        }
        labelRef.current && (labelRef.current.innerText = files[0].name);
        setProfilePicture(files[0]);
    };

    const handleUserFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with formData, like sending it to a server
        console.log(profilePicture !== null);
    };
    const handleProfileFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with formData, like sending it to a server
        if (!profilePicture) return;
        const data = new FormData(e.currentTarget);
        data.set("profilePicture", profilePicture);
        // console.log(data.get("profilePicture"));
        // console.log(profilePicture);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (res.status === 200) {
                setMsg("File Uploaded Succesfully");
                setTimeout(() => setMsg(""), 3000);
            }
        } catch (error: any) {
            setError(error?.message);
            setTimeout(() => setError(""), 5000);
        }
    };
    return (
        <>
            <form
                onSubmit={handleProfileFormSubmit}
                className="max-w-md mx-auto bg-white p-8 pb-0 shadow-md rounded-t-md flex flex-col gap-6"
            >
                <div className="relative rounded-full overflow-hidden w-[100px] h-[100px] outline outline-1 outline-accent">
                    <Image
                        src={profile ?? ""}
                        alt="Your Profile Picture"
                        height={100}
                        width={100}
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="profilePicture"
                        ref={labelRef}
                        className="w-full text-sm text-slate-600 h-28 border hover:bg-slate-100 flex items-center justify-center select-none"
                    >
                        Upload an Image
                    </label>
                    <input
                        type="file"
                        name="profilePicture"
                        id="profilePicture"
                        onChange={handleProfileChange}
                        className="file-input file-input-bordered file-input-sm w-full hidden"
                    />
                    <span className="empty:h-0 empty:p-0 transition-all p-1  bg-error text-error-content">
                        {error}
                    </span>
                    <span className="empty:h-0 empty:p-0 transition-all p-1  bg-success text-success-content">
                        {msg}
                    </span>
                </div>
                <button
                    type="submit"
                    disabled={!profilePicture}
                    className="bg-slate-800 hover:bg-slate-900 p-2 rounded-md text-accent disabled:bg-slate-500"
                >
                    Save
                </button>
            </form>
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
                        names.name === formData.name &&
                        names.username === formData.username
                    }
                    className="bg-slate-800 hover:bg-slate-900 p-2 rounded-md text-accent disabled:bg-slate-500"
                >
                    Save
                </button>
            </form>
        </>
    );
};

export default Form;
