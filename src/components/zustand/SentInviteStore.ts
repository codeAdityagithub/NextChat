import { SentInvites } from "@/types";
import { create } from "zustand";

type Store = {
    invites: SentInvites[];
    rejectInvite: (invitation_id: number) => void;
    initialize: (initialValue: SentInvites[]) => void;
};

export const sentInviteStore = create<Store>((set) => ({
    invites: [],
    rejectInvite: (invitation_id) =>
        set((state) => ({
            invites: state.invites.map((invite) => {
                if (invite.invitation_id !== invitation_id) return invite;
                return {
                    ...invite,
                    status: "rejected",
                };
            }),
        })),
    initialize: (initialValue) => set((state) => ({ invites: initialValue })),
}));
