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
    dp,
    handleAccept,
    handleReject,
}: Props) => {
    return (
        <div className="w-full flex items-center transition-colors gap-4 rounded-md p-1 hover:bg-primary/60 hover:text-primary-content relative">
            <div className="flex items-center justify-center">
                <div className="w-10 h-10 rounded-full relative overflow-hidden">
                    <Image
                        src={dp && sender_id ? dp : "/account.png"}
                        alt="Invitation sender image"
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                        sizes="100px"
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col ml-3">
                <div className="font-medium text-sm">{name}</div>
                <div className="text-xs font-light line-clamp-1">
                    @{username}
                </div>
                <div className="text-xs font-light mt-1">
                    {formatTime(sent_at)}
                </div>
            </div>
            <div className="flex items-center space-x-2 absolute inset-y-0 right-0 pr-4">
                <button
                    className="rounded-full w-8 h-8 text-secondary bg-slate-100 hover:text-green-500"
                    onClick={() => handleAccept(invitation_id)}
                >
                    <FaCheckCircle className="w-full h-full" />
                </button>
                <button
                    className="rounded-full w-8 h-8 text-secondary bg-slate-100 hover:text-red-500"
                    onClick={() => handleReject(invitation_id)}
                >
                    <ImCross className="w-full h-full" />
                </button>
            </div>
        </div>
    );
};

export default InvitationCard;
