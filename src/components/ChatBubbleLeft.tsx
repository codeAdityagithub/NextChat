type Props = {
    // message: Pick<Message, "content" | "created_at" | "status">;
    content: string;
    created_at: Date;
    name: string;
};

const ChatBubbleLeft = ({ content, created_at, name }: Props) => {
    const getTime = (time: Date) => {
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
        }${minutes}`;
    };
    return (
        <div className="chat chat-start">
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                </div>
            </div>
            <div className="chat-header text-primary-content opacity-50">
                {name}
            </div>
            <div className="chat-bubble bg-slate-500 rounded-md text-gray-300 relative">
                {content}
            </div>
            <div className="chat-footer text-primary-content opacity-50">
                {getTime(created_at)}
            </div>
        </div>
    );
};

export default ChatBubbleLeft;
