import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
    useState,
} from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";
import FileInputDialog from "./FileInputDialog";

type Props = {
    handleImageMessage: (file: File) => Promise<"error" | "success">;
    setError: Dispatch<SetStateAction<string>>;
};

const ChatMessageInput = ({ handleImageMessage, setError }: Props) => {
    // const dialogRef = useRef<HTMLDialogElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        if (!["image/jpeg", "image/png"].includes(files[0]?.type)) {
            setFile(null);
            setError("Only jpeg and png supported");
            setTimeout(() => setError(""), 3000);
            return;
        }
        setFile(files[0]);
    };
    const handleSend = async () => {
        if (file === null) return;

        const res = await handleImageMessage(file);
        if (res == "success" || res == "error") setFile(null);
    };

    return (
        <div className="relative">
            {file !== null ? <FileInputDialog setFile={setFile} /> : null}

            <div
                className={`${
                    file === null ? "hidden " : ""
                }w-max max-w-[240px] sm:max-w-xs transition-all bg-neutral p-2 z-20 rounded-lg absolute bottom-14 flex flex-col items-end gap-2`}
                hidden={file === null}
            >
                <img
                    src={file ? URL.createObjectURL(file) : ""}
                    alt="Your image"
                    className="object-cover max-h-[350px]"
                />
                <div className="flex w-full p-1 justify-between">
                    <button
                        className="_btn-sm bg-error text-error-content"
                        onClick={() => setFile(null)}
                    >
                        Discard
                    </button>
                    <button
                        disabled={file === null}
                        onClick={() => handleSend()}
                        className="_btn-sm bg-accent text-accent-content"
                    >
                        <BiSend />
                    </button>
                </div>
            </div>
            <label
                htmlFor="messageFile"
                className="p-3 text-xl h-full transition-colors cursor-pointer flex items-center justify-center hover:bg-secondary/80 rounded-md
                "
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
