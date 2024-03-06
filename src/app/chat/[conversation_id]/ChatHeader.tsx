import Image from "next/image";

import OnlineStatus from "./OnlineStatus";
import GoBack from "../../../components/GoBack";
import ChatHeaderOptions from "@/components/ChatHeaderOptions";

type Props = {
    id?: string;
    name?: string;
    username?: string;
    dp?: string;
};

const ChatHeader = ({ id, name, username, dp }: Props) => {
    return (
        <div className="w-full h-16 flex items-center gap-3 bg-neutral text-neutral-content py-1 px-3 rounded-lg shadow-md">
            <GoBack />
            <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden">
                <Image
                    src={dp ?? "/account.png"}
                    alt="Acc"
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                    sizes="100px"
                />
            </div>
            <div className="text-lg font-medium flex-1">
                <div className="font-medium">{name}</div>
                <div className="text-sm font-light line-clamp-1">
                    @{username} <OnlineStatus id={id} />
                </div>
            </div>
            <ChatHeaderOptions
                id={id}
                name={name}
                username={username}
                dp={dp}
            />
        </div>
    );
};

export default ChatHeader;
