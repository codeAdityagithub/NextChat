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
    sender_id,
    has_dp,
    handleAccept,
    handleReject,
}: Props) => {
    return (
        <div className="w-full group flex items-center gap-1 transition-colors rounded-md p-1 bg-primary/60 text-primary-content relative">
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

            <div className="w-10 h-10 rounded-full relative overflow-hidden">
                <Image
                    src={
                        has_dp && sender_id
                            ? `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${sender_id}.jpg`
                            : "/account.png"
                    }
                    alt="Invitation sender image"
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                    sizes="100px"
                />
            </div>
            <div className="flex flex-1 relative items-start justify-center flex-col h-full w-full">
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
