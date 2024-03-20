import { getTime } from "@/lib/timeFormatters";
import MessageOptionsDropdown from "./MessageOptionsDropdown";

type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    status: "read" | "delivered";
    name: string;
    message_id: number;
    otherPersonId?: string;
};

const ChatBubbleRight = ({
    content,
    created_at,
    name,
    status,
    message_id,
    otherPersonId,
}: Props) => {
    return (
        <div className="chat chat-end">
            <div className="chat-header text-base-content">{name}</div>
            <div className="chat-bubble animate-messagesend bg-primary text-primary-content relative rounded-md break-words max-w-[280px] sm:max-w-sm lg:max-w-lg">
                {content}
            </div>
            <div className="chat-footer text-xs text-base-content">
                {getTime(created_at)} {status}
            </div>
            <MessageOptionsDropdown
                message_id={message_id}
                otherPersonId={otherPersonId}
                messageType="text"
                messageContent={content}
            />
        </div>
    );
};

export default ChatBubbleRight;
