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
    // console.log(last_contacted_at);
    function formatTime(inputTime: Date): string {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const inputDate = inputTime.toDateString();
        const todayDate = today.toDateString();
        const yesterdayDate = yesterday.toDateString();

        if (inputDate === todayDate) {
            // Return the time in "HH:mm" format
            const hours = String(inputTime.getHours()).padStart(2, "0");
            const minutes = String(inputTime.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        } else if (inputDate === yesterdayDate) {
            return "yesterday";
        } else {
            // Return the date in "MM-DD-YYYY" format
            const month = String(inputTime.getMonth() + 1).padStart(2, "0");
            const day = String(inputTime.getDate()).padStart(2, "0");
            const year = inputTime.getFullYear();
            return `${month}-${day}-${year}`;
        }
    }
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
                    {formatTime(last_contacted_at)}
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
