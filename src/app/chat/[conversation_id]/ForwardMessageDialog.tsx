"use client";
import MyProfile from "@/components/MyProfile";
import UserCard from "@/components/cards/UserCard";
import { useForwardStore } from "@/components/zustand/ForwardMessageDialogStore";
import { UserCardInfo } from "@/types";
import { redirect, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

type Props = {
    chatUsers: UserCardInfo[];
};

const ForwardMessageDialog = ({ chatUsers }: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const isOpen = useForwardStore((state) => state.isDialogOpen);
    const messageContent = useForwardStore((state) => state.messageContent);
    const messageType = useForwardStore((state) => state.messageType);
    const toggleDialog = useForwardStore((state) => state.toggleDialog);
    const setIsForwarding = useForwardStore((state) => state.setIsForwarding);
    const setForwardContent = useForwardStore(
        (state) => state.setForwardContent
    );
    const router = useRouter();

    const [selectedConvId, setSelectedConvId] = useState<number | null>(null);

    const handleForward = () => {
        setIsForwarding(true);
        setSelectedConvId(null);
        toggleDialog();
        router.replace(`/chat/${selectedConvId}`);
    };

    return (
        <>
            <dialog
                className="modal bg-transparent transition-opacity duration-200 p-3"
                ref={dialogRef}
                open={isOpen}
            >
                <div className="modal-box bg-neutral text-neutral-content p-3 rounded-md shadow-lg flex flex-col gap-4 w-52">
                    <h3 className="font-bold text-lg">Forward To ...</h3>
                    <ul className="flex flex-col gap-1">
                        {chatUsers.map((conv) => (
                            <li
                                className={`${
                                    conv.conversation_id === selectedConvId
                                        ? "bg-primary text-primary-content hover:bg-primary/80 "
                                        : "text-neutral-content hover:bg-primary/60 "
                                }flex items-center gap-3 flex-1 cursor-pointer transition-colors rounded-md px-2 py-1`}
                                key={conv.conversation_id}
                                onClick={() =>
                                    setSelectedConvId(conv.conversation_id)
                                }
                            >
                                <div className="h-[50px] w-[50px] overflow-hidden relative rounded-full">
                                    <MyProfile image={conv.dp} />
                                </div>
                                <div className="flex items-start justify-center flex-col h-full">
                                    <div className="text-lg font-medium">
                                        {conv.name}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="modal-action justify-start gap-4">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                            className="_btn-sm"
                            onClick={() => {
                                setForwardContent("", "text");
                                setSelectedConvId(null);
                                toggleDialog();
                            }}
                        >
                            cancel
                        </button>
                        {selectedConvId !== null && (
                            <button
                                className="_btn-sm bg-accent text-accent-content"
                                onClick={handleForward}
                            >
                                send
                            </button>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ForwardMessageDialog;
