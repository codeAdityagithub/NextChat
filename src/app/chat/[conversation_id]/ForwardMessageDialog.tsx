"use client";
import MyProfile from "@/components/MyProfile";
import { useForwardStore } from "@/components/zustand/ForwardMessageDialogStore";
import { UserCardInfo } from "@/types";
import { sendImage, sendMessage } from "@/utils/messageUtils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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

    const setForwardContent = useForwardStore(
        (state) => state.setForwardContent
    );
    const router = useRouter();
    const session = useSession();

    const [selectedConvId, setSelectedConvId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string>("");

    const {
        mutate: mutateMessage,
        isPending: isPendingMessage,
        isError,
    } = useMutation({
        mutationFn: sendMessage,
        onError(error: any) {
            console.log(error);
        },
    });
    const {
        mutate: mutateImage,
        isPending: isPendingImage,
        isSuccess,
    } = useMutation({
        mutationFn: sendImage,
        onError(error: any) {
            console.log(error);
        },
    });

    const handleForward = async () => {
        if (!selectedConvId || !session.data) return;

        if (messageType === "text") {
            mutateMessage({
                message: messageContent,
                conversation_id: selectedConvId.toString(),
                otherPersonId: selectedUserId,
                apiAccessToken: session.data?.user.apiAccessToken,
            });
        } else if (messageType === "image") {
            const res = await axios.get(messageContent, {
                responseType: "blob",
            });
            const file = res.data;
            mutateImage({
                file,
                conversation_id: selectedConvId.toString(),
                otherPersonId: selectedUserId,
                apiAccessToken: session.data?.user.apiAccessToken,
            });
        }

        // Use a small delay or useEffect for the route change
        toggleDialog();
        setTimeout(() => {
            router.push(`/chat/${selectedConvId}`);
        }, 100);

        setSelectedConvId(null);
        setSelectedUserId("");
        setForwardContent("", "text");
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
                                onClick={() => {
                                    setSelectedConvId(conv.conversation_id);
                                    setSelectedUserId(conv.id!);
                                }}
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
                                disabled={
                                    isError ||
                                    isPendingImage ||
                                    isPendingMessage
                                }
                                className="_btn-sm bg-accent text-accent-content disabled:bg-secondary"
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
