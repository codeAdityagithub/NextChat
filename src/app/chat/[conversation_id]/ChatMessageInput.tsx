import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useRef,
    useState,
} from "react";
import { BiSend } from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";

type Props = {
    handleImageMessage: (file: File) => Promise<"error" | "success">;
    setError: Dispatch<SetStateAction<string>>;
};

const ChatMessageInput = ({ handleImageMessage, setError }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
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
            {file !== null ? (
                <>
                    <div
                        className="z-10 fixed inset-0 backdrop-blur-[1px]"
                        onClick={() => dialogRef.current?.showModal()}
                    ></div>
                    <dialog
                        id="my_modal_1"
                        className="modal bg-transparent transition-opacity duration-200"
                        ref={dialogRef}
                    >
                        <div className="modal-box bg-neutral text-neutral-content p-3 rounded-md shadow-lg">
                            <h3 className="font-bold text-lg">
                                Discard Unsent Message?
                            </h3>
                            <p className="py-4">
                                If you close this dialog, the message won&apos;t
                                be sent
                            </p>
                            <div className="modal-action">
                                <form
                                    method="dialog"
                                    className="flex items-center gap-4"
                                >
                                    {/* if there is a button in form, it will close the modal */}
                                    <button
                                        className="_btn bg-error"
                                        onClick={() => setFile(null)}
                                    >
                                        Discard
                                    </button>
                                    <button className="_btn">
                                        return to media
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>
            ) : null}

            <div
                className={`${
                    file === null ? "hidden " : ""
                }w-60 md:w-72 transition-all bg-neutral p-2 z-20 rounded-lg absolute bottom-14 flex flex-col items-end gap-2`}
                hidden={file === null}
            >
                <img
                    src={file ? URL.createObjectURL(file) : ""}
                    alt="Your image"
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
