"use client";

import { UserCardInfo } from "@/types";
import UserCard from "./cards/UserCard";
import useConversation from "@/hooks/useConversation";
import { useParams } from "next/navigation";

type Props = {
    chatUsers: UserCardInfo[];
    userId: string | undefined;
};

const Conversations = ({ chatUsers: initialData, userId }: Props) => {
    const { conversation_id } = useParams();
    const [chatUsers, setChatUsers, areUnreadMesages, setAreUnreadMessages] =
        useConversation({
            initialData: initialData,
        });

    const handleUnreadMessage = (conversation_id: number) => {
        if (areUnreadMesages) {
            // console.log("fn call");
            setChatUsers((prev) =>
                prev.map((info) =>
                    info.conversation_id === conversation_id
                        ? { ...info, unread_message: false }
                        : info
                )
            );
            setAreUnreadMessages(false);
        }
    };
    return (
        <div
            id="conversations"
            className="bg-neutral text-neutral-content flex-1 rounded-lg p-2 shadow-lg flex flex-col gap-1"
        >
            {chatUsers.map((cardInfo) => (
                <UserCard
                    key={cardInfo.conversation_id}
                    {...cardInfo}
                    unread_message={
                        cardInfo.unread_message &&
                        cardInfo.latest_message_sender_id !== userId
                    }
                    cur_conversation_id={Number(conversation_id)}
                    handleUnreadMessage={handleUnreadMessage}
                />
            ))}
        </div>
    );
};

export default Conversations;
