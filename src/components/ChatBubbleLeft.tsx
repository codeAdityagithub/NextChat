import { getTime } from "@/lib/timeFormatters";
import Image from "next/image";

type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    name: string;
    dp?: string;
    id?: string;
    showDp: boolean;
};

const ChatBubbleLeft = ({
    content,
    created_at,
    name,
    dp,
    id,
    showDp,
}: Props) => {
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div
                    className={`w-10 h-10 rounded-full overflow-hidden relative ${
                        showDp ? "shadow-md" : ""
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
            </div>
            <div className="chat-header text-base-content ">{name}</div>
            <div
                className={
                    "chat-bubble bg-secondary rounded-md text-secondary-content relative  break-words max-w-[260px] sm:max-w-sm lg:max-w-lg"
                }
            >
                {showDp ? (
                    <div className="absolute top-0 -left-2 rounded-md w-0 h-0 border-[12px] border-secondary border-solid border-r-transparent border-l-transparent border-b-transparent"></div>
                ) : null}
                {content}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(created_at)}
            </div>
        </div>
    );
};

export default ChatBubbleLeft;
