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
    name,
    sent_at,
    invitation_id,
    dp,
    handleAccept,
    handleReject,
}: Props) => {
    return (
        <div className="w-full flex items-center transition-colors gap-4 rounded-md p-1 hover:bg-primary/60 hover:text-primary-content relative">
            <div className="flex items-center justify-center gap-1">
                <div className="w-10 h-10 rounded-full relative overflow-hidden">
                    <Image
                        src={dp ? dp : "/account.png"}
                        alt="Invitation sender image"
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                        sizes="100px"
                    />
                </div>
            </div>
            <div className="flex flex-1 w-12 flex-col">
                <div className="font-medium text-sm overflow-ellipsis overflow-hidden line-clamp-1">
                    {name}
                </div>
                <div className="text-sm line-clamp-1">
                    <span className="text-xs">{formatTime(sent_at)}</span>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <button
                    className="rounded-full w-8 h-8 p-0 text-green-500 bg-primary"
                    onClick={() => handleAccept(invitation_id)}
                >
                    <FaCheckCircle className="w-full h-full" />
                </button>
                <button
                    className="rounded-full relative w-8 h-8 bg-red-500"
                    onClick={() => handleReject(invitation_id)}
                >
                    <ImCross className="m-auto text-lg text-primary" />
                </button>
            </div>
        </div>
    );
};

export default InvitationCard;
