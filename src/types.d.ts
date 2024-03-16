// export type UserType = {
//     name: string;
//     email: string;
//     password: string;
// };
export type InviteNotification = {
    name: string;
    username: string;
    sent_at: Date;
    invitation_id: number;
    sender_id: string;
    dp: string;
};
export type SentInvites = {
    name: string;
    username: string;
    sent_at: Date;
    invitation_id: number;
    sender_id: string;
    dp: string;
    status: "pending" | "accepted" | "rejected";
};

export type UserCardInfo = {
    conversation_id: number;
    last_contacted_at: Date;
    name: string;
    id?: string;
    latest_message: string;
    unread_message?: boolean;
    dp?: string;
    latest_message_sender_id?: string;
};
