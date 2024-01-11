"use client";

import { UserCardInfo } from "@/types";
import UserCard from "./cards/UserCard";
import useConversation from "@/hooks/useConversation";

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
    const [chatUsers, setChatUsers] = useConversation({
        initialData: initialData,
    });
    return (
        <div
            id="conversations"
            className="bg-white h-full rounded-lg p-4 shadow-lg"
        >
            {chatUsers.map((cardInfo) => (
                <UserCard key={cardInfo.conversation_id} {...cardInfo} />
            ))}
        </div>
    );
};

export default Conversations;
