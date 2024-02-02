import { getTime } from "@/lib/timeFormatters";
import Image from "next/image";

type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    name: string;
    has_dp?: boolean;
    id?: string;
    showDp: boolean;
};

const ChatBubbleLeft = ({
    content,
    created_at,
    name,
    has_dp,
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
                            src={
                                has_dp
                                    ? `${process.env.NEXT_PUBLIC_API_URL}/static/profiles/${id}.jpg`
                                    : "/account.png"
                            }
                            alt={`${name}'s Profile Picture`}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                            sizes="100px"
                        />
                    ) : null}
                </div>
            </div>
            <div className="chat-header text-primary-content opacity-50">
                {name}
            </div>
            <div className="chat-bubble bg-slate-500 rounded-md text-gray-100 relative">
                {content}
            </div>
            <div className="chat-footer text-primary-content opacity-50">
                {getTime(created_at)}
            </div>
        </div>
    );
};

export default ChatBubbleLeft;
