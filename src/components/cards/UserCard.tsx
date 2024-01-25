import { formatTime } from "@/lib/timeFormatters";
import { UserCardInfo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { GoDotFill } from "react-icons/go";

const UserCard = ({
    conversation_id,
    last_contacted_at,
    name,
    latest_message,
    cur_conversation_id,
    unread_message,
    handleUnreadMessage,
}: UserCardInfo & {
    cur_conversation_id: number;
    handleUnreadMessage: (conversation_id: number) => void;
}) => {
    // console.log(last_contacted_at);
    // console.log(cur_conversation_id === conversation_id);
    const handleRead = () => {
        if (conversation_id === cur_conversation_id) return;
        handleUnreadMessage(conversation_id);
    };
    return (
        <Link
            onClick={handleRead}
            href={`/chat/${conversation_id}`}
            className={`w-full h-16 flex items-center gap-3 hover:bg-gray-100 transition-colors rounded-md px-2${
                cur_conversation_id === conversation_id
                    ? " bg-slate-200"
                    : " bg-transparent"
            }`}
        >
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="flex flex-1 relative items-start justify-start pt-2 flex-col h-full">
                <div className="font-medium text-primary-content">{name}</div>
                <div className="text-sm font-light line-clamp-1 text-gray-500">
                    {latest_message}
                </div>
                <div className="absolute text-xs right-2 top-2">
                    {formatTime(last_contacted_at)}
                </div>
                {unread_message ? (
                    <div className="absolute right-2 top-6">
                        <GoDotFill className="text-xl text-green-600" />
                    </div>
                ) : null}
                <div className="absolute text-xs right-2 top-2">
                    {formatTime(last_contacted_at)}
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
