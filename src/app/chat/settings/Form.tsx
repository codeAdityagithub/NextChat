"use client";
import MyProfile from "@/components/MyProfile";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import NameForm from "./NameForm";

type Props = {
    name: string;
    username: string;
    profile?: string | null;
};

const Form = ({ name, username }: Props) => {
    const session = useSession();
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const labelRef = useRef<HTMLLabelElement>(null);
    const [profilePicture, setProfilePicture] = useState<File | null>(null);

    const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.currentTarget;
        if (!files) return;

        if (!["image/jpeg", "image/png"].includes(files[0]?.type)) {
            setError("Only jpeg/jpg and png are supported");
            setProfilePicture(null);
            labelRef.current &&
                (labelRef.current.innerText = "Upload an Image");

            setTimeout(() => setError(""), 3000);
            return;
        }
        labelRef.current && (labelRef.current.innerText = files[0].name);
        setProfilePicture(files[0]);
    };

    const handleProfileFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with formData, like sending it to a server
        if (!profilePicture) return;
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 250,
            useWebWorker: true,
        };
        try {
            const compressedImage = await imageCompression(
                profilePicture,
                options
            );
            const data = new FormData();
            data.set("profilePicture", compressedImage);
            // console.log(data.get("profilePicture"));
            // console.log(profilePicture);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(res.status);
            if (res.status === 200) {
                setMsg("Profile Updated Succesfully");
                labelRef.current &&
                    (labelRef.current.innerText = "Upload an Image");
                setProfilePicture(null);
                session.update({ image: session?.data?.user.id });
                setTimeout(() => setMsg(""), 3000);
            }
        } catch (error: any) {
            console.log(error);
            setError(
                error.response.data ??
                    (error?.message || "Something Went Wrong")
            );
            labelRef.current &&
                (labelRef.current.innerText = "Upload an Image");
            setProfilePicture(null);
            setTimeout(() => setError(""), 3000);
        }
    };
    return (
        <>
            <div className="form_container">
                <div className="">
                    Profile Picture
                    <div>Update your profile picture</div>
                </div>
                <form
                    onSubmit={handleProfileFormSubmit}
                    className="bg-white max-w-md p-4 md:p-6 shadow-md rounded-md flex flex-col gap-6 justify-between"
                >
                    <div className="relative rounded-full overflow-hidden w-20 h-20">
                        <MyProfile image={session.data?.user.image} />
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="profilePicture"
                            ref={labelRef}
                            className="w-full text-sm text-slate-600 h-28 border rounded-md hover:bg-slate-100 flex items-center justify-center select-none"
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
            </div>
            <NameForm name={name} username={username} session={session} />
        </>
    );
};

export default Form;
