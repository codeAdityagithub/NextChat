import { SentInvites } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
    invites: SentInvites[];
    rejectInvite: (username: string) => void;
    initialize: (initialValue: SentInvites[]) => void;
    insertInvite: (invite: SentInvites) => void;
};

export const sentInviteStore = create<Store>((set) => ({
    invites: [],
    rejectInvite: (username) =>
        set((state) => ({
            invites: state.invites.map((invite) => {
                if (invite.username !== username) return invite;
                return {
                    ...invite,
                    status: "rejected",
                };
            }),
        })),
    initialize: (initialValue) => set((state) => ({ invites: initialValue })),
    insertInvite: (invite) =>
        set((state) => {
            console.log(invite);
            return { invites: [invite, ...state.invites] };
        }),
}));
