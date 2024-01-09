"use client";
import { InviteNotification } from "@/types";
import Image from "next/image";
import { format } from "timeago.js";
import { FaCheckCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type Props = InviteNotification & {
    handleAccept: (invitation_id: number) => Promise<void>;
};

const InvitationCard = ({
    username,
    name,
    sent_at,
    invitation_id,
    handleAccept,
}: Props) => {
    return (
        <div className="w-full group flex items-center gap-3 transition-colors rounded-xl px-2 relative">
            <div className="peer absolute inset-0 w-full flex gap-3 items-center justify-end opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all z-[2]">
                <button
                    className="rounded-full w-8 h-8 text-slate-600"
                    onClick={() => handleAccept(invitation_id)}
                >
                    <FaCheckCircle className="w-full h-full hover:text-green-500" />
                </button>
                <button className="rounded-full flex items-center justify-center w-8 h-8 p-1 bg-slate-600 hover:bg-red-500">
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
                <div className="font-medium text-sm text-slate-400">{name}</div>
                <div className="text-xs font-light line-clamp-1 text-accent">
                    @{username}
                </div>
                <div className="absolute text-xs font-light right-0 top-0 text-slate-400">
                    {format(sent_at)}
                </div>
            </div>
        </div>
    );
};

export default InvitationCard;
