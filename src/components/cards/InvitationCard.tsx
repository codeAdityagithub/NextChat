"use client";
import { InviteNotification } from "@/types";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { formatTime } from "@/lib/timeFormatters";

type Props = InviteNotification & {
    handleAccept: (invitation_id: number) => Promise<void>;
    handleReject: (invitation_id: number) => Promise<void>;
};

const InvitationCard = ({
    username,
    name,
    sent_at,
    invitation_id,
    handleAccept,
    handleReject,
}: Props) => {
    return (
        <div className="w-full group flex items-center gap-3 transition-colors rounded-md p-2 bg-primary/60 text-primary-content relative">
            <div className="peer absolute inset-0 w-full flex gap-3 items-center justify-end opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all z-[2]">
                <button
                    className="rounded-full w-8 h-8 text-secondary bg-slate-100"
                    onClick={() => handleAccept(invitation_id)}
                >
                    <FaCheckCircle className="w-full h-full hover:text-green-500" />
                </button>
                <button
                    className="rounded-full flex items-center justify-center w-8 h-8 p-1 bg-secondary border hover:bg-red-500"
                    onClick={() => handleReject(invitation_id)}
                >
                    <ImCross className="w-4 h-4 text-slate-100" />
                </button>
            </div>
            <Image
                className="object-contain rounded-full h-full peer-hover:blur-[1px]"
                src={"/account.png"}
                alt="Acc"
                width={30}
                height={30}
            />
            <div className="flex relative items-start justify-center flex-col h-full w-full peer-hover:blur-[1px]">
                <div className="font-medium text-sm">{name}</div>
                <div className="text-xs font-light line-clamp-1">
                    @{username}
                </div>
                <div className="absolute text-xs font-light right-0 top-0">
                    {formatTime(sent_at)}
                </div>
            </div>
        </div>
    );
};

export default InvitationCard;
