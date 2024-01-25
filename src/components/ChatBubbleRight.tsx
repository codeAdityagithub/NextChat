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
            <div className="chat-header text-primary-content opacity-50">
                {name}
            </div>
            <div className="chat-bubble bg-base text-gray-100 relative bg-primary rounded-md">
                {content}
            </div>
            <div className="chat-footer text-primary-content opacity-50">
                {getTime(created_at)} {status}
            </div>
        </div>
    );
};

export default ChatBubbleRight;
