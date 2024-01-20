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
    const [chatUsers, setChatUsers] = useConversation({
        initialData: initialData,
    });
    const { conversation_id } = useParams();
    // console.log(Number(conversation_id));
    return (
        <div
            id="conversations"
            className="bg-white flex-1 rounded-lg p-4 shadow-lg"
        >
            {chatUsers.map((cardInfo) => (
                <UserCard
                    key={cardInfo.conversation_id}
                    {...cardInfo}
                    cur_conversation_id={Number(conversation_id)}
                />
            ))}
        </div>
    );
};

export default Conversations;
