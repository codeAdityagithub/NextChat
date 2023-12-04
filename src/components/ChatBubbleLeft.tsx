type Props = {
    data?:{
        name:string
        text:string
        delivered:boolean
    }
};

const ChatBubbleLeft = ({data}: Props) => {
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
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble bg-base text-gray-300">
                You were the Chosen One!
            </div>
            <div className="chat-footer text-primary-content opacity-50">
                Delivered
            </div>
        </div>
    );
};

export default ChatBubbleLeft;
