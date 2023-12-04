type Props = {};

const ChatBubbleRight = (props: Props) => {
    return (
        
        <div className="chat chat-end">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
            </div>
        </div>
        <div className="chat-header text-primary-content opacity-50">
            Anakin
            <time className="text-xs">12:46</time>
        </div>
        <div className="chat-bubble bg-primary text-white">I hate you!</div>
        <div className="chat-footer text-primary-content opacity-50">
            Seen at 12:46
        </div>
    </div>
    );
};

export default ChatBubbleRight;
