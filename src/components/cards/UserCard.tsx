import { formatTime } from "@/lib/timeFormatters";
import { UserCardInfo } from "@/types";
import ImagewError from "@/utils/ImagewError";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { MdImage } from "react-icons/md";

const UserCard = ({
    conversation_id,
    last_contacted_at,
    name,
    id,
    dp,
    latest_message,
    cur_conversation_id,
    unread_message,
    handleUnreadMessage,
}: UserCardInfo & {
    cur_conversation_id: number;
    handleUnreadMessage: (conversation_id: number) => void;
}) => {
    // console.log(unread_message);
    // console.log(cur_conversation_id === conversation_id);
    const handleRead = () => {
        if (conversation_id === cur_conversation_id) return;
        handleUnreadMessage(conversation_id);
    };
    return (
        <Link
            onClick={handleRead}
            href={`/chat/${conversation_id}`}
            className={`w-full h-16 flex items-center gap-3 hover:bg-secondary/50 text-neutral-content transition-colors rounded-md px-2${
                cur_conversation_id === conversation_id
                    ? " bg-secondary/30"
                    : " bg-transparent"
            }`}
        >
            <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden">
                {/* TODO: shift to Image only */}
                <ImagewError
                    src={dp ?? "/account.png"}
                    alt="Acc"
                    fallback="/account.png"
                />
            </div>
            <div className="flex flex-1 w-[100px] relative items-start justify-start pt-2 flex-col h-full">
                <div className="font-medium w-full overflow-ellipsis overflow-hidden pr-14">
                    {name}
                </div>
                <div
                    className="text-sm text-neutral-content/80 w-full line-clamp-1"
                    title={
                        latest_message.startsWith(
                            `${process.env.NEXT_PUBLIC_API_URL}/upload/`
                        )
                            ? "image"
                            : latest_message
                    }
                >
                    {latest_message.startsWith(
                        `${process.env.NEXT_PUBLIC_API_URL}/upload/`
                    ) ? (
                        <span className="flex items-center gap-1.5">
                            <MdImage />
                            Image
                        </span>
                    ) : (
                        latest_message
                    )}
                </div>
                <div className="absolute text-xs right-2 top-2">
                    {formatTime(last_contacted_at)}
                </div>
                {unread_message ? (
                    <div className="absolute right-2 top-6">
                        <GoDotFill className="text-xl text-green-600" />
                    </div>
                ) : null}
            </div>
        </Link>
    );
};

export default UserCard;
