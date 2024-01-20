import { formatTime } from "@/lib/timeFormatters";
import { UserCardInfo } from "@/types";
import Image from "next/image";
import Link from "next/link";

const UserCard = ({
    conversation_id,
    last_contacted_at,
    name,
    latest_message,
    cur_conversation_id,
}: UserCardInfo & { cur_conversation_id: number }) => {
    // console.log(last_contacted_at);
    // console.log(cur_conversation_id === conversation_id);
    return (
        <Link
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
            </div>
        </Link>
    );
};

export default UserCard;
