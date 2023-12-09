import ChatInput from "@/app/chat/[userId]/ChatInput";
import ChatBubbleLeft from "@/components/ChatBubbleLeft";
import ChatBubbleRight from "@/components/ChatBubbleRight";
import UserHeader from "@/components/cards/UserHeader";

type Props = {
    params: { userId: string };
};

const ChatPage = ({ params }: Props) => {
    // console.log(params.userId);
    return (
        <div className="h-full flex-[2] max-h-screen flex flex-col gap-1">
            <UserHeader />
            <div className="flex-1 overflow-y-auto px-2">
                <ChatBubbleLeft />
                <ChatBubbleRight />
            </div>
            <ChatInput />
        </div>
    );
};

export default ChatPage;
