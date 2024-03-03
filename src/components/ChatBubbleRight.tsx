import { getTime } from "@/lib/timeFormatters";

type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    status: "read" | "delivered";
    name: string;
};

const ChatBubbleRight = ({ content, created_at, name, status }: Props) => {
    return (
        <div className="chat chat-end">
            <div className="chat-header text-base-content">{name}</div>
            <div className="chat-bubble bg-primary text-primary-content relative rounded-md break-words max-w-[280px] sm:max-w-sm lg:max-w-lg">
                {content}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(created_at)} {status}
            </div>
        </div>
    );
};

export default ChatBubbleRight;
