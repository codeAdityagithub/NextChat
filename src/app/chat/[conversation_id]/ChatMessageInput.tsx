import React, { ChangeEvent, useState } from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";

type Props = {};

const ChatMessageInput = (props: Props) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;

        if (!["image/jpeg", "image/png"].includes(files[0]?.type)) {
            setFile(null);
            return;
        }
        setFile(files[0]);
    };

    return (
        <div className=" relative">
            <div
                className={`${
                    file === null ? "hidden " : ""
                }w-60 md:w-72 transition-all bg-neutral p-2 rounded-lg absolute bottom-14 flex flex-col items-end gap-2`}
                hidden={file === null}
            >
                <img src={file ? URL.createObjectURL(file) : ""} />
                <div className="flex w-full p-1 justify-between">
                    <button
                        className="_btn-sm bg-error text-error-content"
                        onClick={() => setFile(null)}
                    >
                        Discard
                    </button>
                    <button className="_btn-sm bg-accent text-accent-content">
                        <BiSend />
                    </button>
                </div>
            </div>
            <label
                htmlFor="messageFile"
                className="p-3 pl-0 text-xl cursor-pointer flex items-center justify-center"
            >
                <MdOutlineAttachFile />
            </label>
            <input
                hidden
                type="file"
                name="messageFile"
                id="messageFile"
                onChange={handleFile}
            />
        </div>
    );
};

export default ChatMessageInput;
