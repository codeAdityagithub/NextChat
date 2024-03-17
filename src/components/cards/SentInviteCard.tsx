"use client";
import { SentInvites } from "@/types";
import Image from "next/image";

import { formatTime } from "@/lib/timeFormatters";

type Props = SentInvites;

const SentInviteCard = ({ username, name, sent_at, dp, status }: Props) => {
    return (
        <div className="w-full flex items-center transition-colors gap-4 rounded-md p-1 hover:bg-primary/60 relative">
            <div className="flex items-center justify-center">
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
            <div className="flex flex-1 w-16 flex-col ml-1 relative">
                <div className="font-medium text-sm pr-[50px] overflow-ellipsis overflow-hidden">
                    {name}
                </div>
                <div className="text-xs font-light line-clamp-1">
                    @{username}
                </div>
                <div className="text-xs font-light absolute top-0 right-0 pl-4 backdrop-blur-xl">
                    {formatTime(sent_at)}
                </div>
                <div className="text-sm text-accent absolute bottom-0 right-0">
                    {status}
                </div>
            </div>
        </div>
    );
};

export default SentInviteCard;
