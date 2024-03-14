import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";
import FileInputDialog from "./FileInputDialog";

type Props = {
    handleImageMessage: (file: File) => void;
    setError: Dispatch<SetStateAction<string>>;
    isPending: boolean;
    isSuccess: boolean;
};

const ChatImageInput = ({
    handleImageMessage,
    setError,
    isPending,
    isSuccess,
}: Props) => {
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
        // setIsForwardingTo("");
        // setForwardContent("", "text");
        handleImageMessage(file);
        // if (isSuccess) setFile(null);
    };

    useEffect(() => {
        if (isSuccess) setFile(null);
    }, [isSuccess]);

    return (
        <div className="relative">
            {file !== null ? <FileInputDialog setFile={setFile} /> : null}

            <div
                className={`${
                    file === null ? "hidden " : ""
                }w-max max-w-[240px] sm:max-w-xs transition-all bg-neutral p-2 z-20 rounded-lg absolute bottom-16 flex flex-col items-end gap-2`}
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
                        onClick={() => {
                            setFile(null);
                        }}
                    >
                        Discard
                    </button>
                    <button
                        disabled={file === null || isPending}
                        onClick={() => handleSend()}
                        className="_btn-sm bg-accent text-accent-content disabled:bg-secondary disabled:text-secondary-content"
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

export default ChatImageInput;
