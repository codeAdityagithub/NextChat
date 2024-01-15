type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    status: "read" | "delivered";
    name: string;
};

const ChatBubbleRight = ({ content, created_at, name, status }: Props) => {
    const getTime = (time: Date) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
        }${minutes}`;
    };
    return (
        <div className="chat chat-end">
            <div className="chat-header text-primary-content opacity-50">
                {name}
            </div>
            <div className="chat-bubble bg-base text-gray-300 relative bg-primary rounded-md">
                {content}
            </div>
            <div className="chat-footer text-primary-content opacity-50">
                {getTime(created_at)} {status}
            </div>
        </div>
    );
};

export default ChatBubbleRight;
