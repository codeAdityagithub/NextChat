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
};

export type UserCardInfo = {
    conversation_id: string;
    last_contacted_at: Date;
    name: string;
    username: string;
};
