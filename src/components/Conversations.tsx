"use client";

import { UserCardInfo } from "@/types";
import UserCard from "./cards/UserCard";
import useConversation from "@/hooks/useConversation";
import { useParams } from "next/navigation";

type Props = {
    chatUsers: UserCardInfo[];
};

// const getChats = async (userId: string): Promise<UserCardInfo[]> => {
//     const data = await fetch(`/api/private/chats`, {
//         body: JSON.stringify({ userId }),
//         method: "POST",
//     }).then(async (res) => await res.json());
//     return data;
// };

const Conversations = ({ chatUsers: initialData }: Props) => {
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
            className="bg-white flex-1 rounded-lg p-4 shadow-lg flex flex-col gap-1"
        >
            {chatUsers.map((cardInfo) => (
                <UserCard
                    key={cardInfo.conversation_id}
                    {...cardInfo}
                    cur_conversation_id={Number(conversation_id)}
                    handleUnreadMessage={handleUnreadMessage}
                />
            ))}
        </div>
    );
};

export default Conversations;
