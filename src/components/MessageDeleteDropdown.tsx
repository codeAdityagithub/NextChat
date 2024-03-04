import { Message } from "@/dbtypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

type Props = {
    message_id: number;
    otherPersonId?: string;
    message_type: "text" | "image";
};

const MessageDeleteDropdown = ({
    message_id,
    otherPersonId,
    message_type,
}: Props) => {
    const session = useSession();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [error, setError] = useState("");
    const handleDelete = async () => {
        try {
            if (message_type === "text") {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/message`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.data?.user.apiAccessToken}`,
                        },
                        data: { message_id, otherPersonId },
                    }
                );
            } else if (message_type === "image") {
                await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/message/image`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.data?.user.apiAccessToken}`,
                        },
                        data: { message_id, otherPersonId },
                    }
                );
            }
        } catch (error) {
            setError("Something went wrong, Try again later!");
            setTimeout(() => setError(""), 3000);
        }
    };
    return (
        <div className="dropdown dropdown-end dropdown-top">
            <dialog
                className="modal bg-transparent transition-opacity duration-200 p-3"
                ref={dialogRef}
            >
                <div className="modal-box bg-neutral max-w-md text-neutral-content p-3 rounded-md shadow-lg transition-all">
                    <h3 className="font-bold text-lg">
                        Caution: Deleting Messages
                    </h3>
                    {error !== "" ? (
                        <p className="p-1 bg-error text-error-content rounded-md">
                            {error}
                        </p>
                    ) : null}
                    <p className="py-4">
                        Deleting messages is an{" "}
                        <span className="underline">irreversible</span> action.
                        Once a message is deleted, it cannot be recovered.
                    </p>
                    <div className="modal-action gap-4">
                        <button
                            className="_btn-sm bg-error"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <form
                            method="dialog"
                            className="flex items-center gap-4"
                        >
                            {/* if there is a button in form, it will close the modal */}
                            <button className="_btn-sm h-auto">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div
                tabIndex={0}
                role="button"
                aria-label="message options"
                className="text-lg"
            >
                <BsThreeDotsVertical />
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-1 shadow-md shadow-black bg-neutral text-neutral-content rounded-lg w-max "
            >
                <li tabIndex={0} className="p-2 hover:bg-secondary rounded-md">
                    <button
                        aria-label="delete message"
                        onClick={() => dialogRef.current?.showModal()}
                    >
                        Delete message <MdDelete />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default MessageDeleteDropdown;
