import { UserCardInfo } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { format } from "timeago.js";

const UserCard = ({
    conversation_id,
    last_contacted_at,
    name,
    username,
}: UserCardInfo) => {
    return (
        <Link
            href={`/chat/${conversation_id}`}
            className="w-full h-16 flex items-center gap-3 bg-transparent hover:bg-gray-100 transition-colors rounded-md px-2"
        >
            <Image
                className="object-contain rounded-full h-full"
                src={"/account.png"}
                alt="Acc"
                width={50}
                height={50}
            />
            <div className="flex flex-1 relative items-start justify-center flex-col h-full">
                <div className="font-medium text-primary-content">{name}</div>
                <div className="text-sm font-light line-clamp-1 text-gray-500">
                    @{username}
                </div>
                <div className="absolute text-xs font-light right-2 top-3">
                    {format(last_contacted_at)}
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
