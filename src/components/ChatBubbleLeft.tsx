import { getTime } from "@/lib/timeFormatters";
import LongPressDiv from "@/utils/LongPressDiv";
import Image from "next/image";
import { useRef, useState } from "react";
import MessageOptionsDropdown from "./MessageOptionsDropdown";
import OtherPersonMessageDropdown from "./OtherPersonMessageDropdown";

type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    name: string;
    dp?: string;
    message_id: number;
    showDp: boolean;
};

// all the props are about the otherPerson and his message
const ChatBubbleLeft = ({
    content,
    created_at,
    name,
    dp,
    message_id,
    showDp,
}: Props) => {
    // const [vis, setVis] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    // const onLongPress = () => {
    //     console.log("long press!");
    //     dialogRef.current?.show();
    // };
    return (
        <div className="chat chat-start gap-x-2">
            <div className="chat-image h-full justify-between flex flex-col items-center gap-2">
                <div
                    className={`w-8 mt-1 rounded-full overflow-hidden relative ${
                        showDp ? "shadow-md h-8" : "h-0"
                    }`}
                >
                    {showDp ? (
                        <Image
                            src={dp ?? "/account.png"}
                            alt={`${name}'s Profile Picture`}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                            sizes="100px"
                        />
                    ) : null}
                </div>
                <OtherPersonMessageDropdown
                    messageType="text"
                    messageContent={content}
                />
            </div>
            {showDp ? (
                <div className="text-base-content text-xs max-w-[120px] overflow-ellipsis overflow-hidden">
                    {name}
                </div>
            ) : null}
            <div className="chat-bubble animate-messagerec bg-secondary rounded-md text-secondary-content relative  break-words max-w-[260px] sm:max-w-sm lg:max-w-lg">
                {content}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(created_at)}
            </div>
        </div>
    );
};

export default ChatBubbleLeft;
