import { create } from "zustand";

type ForwardDialogStore = {
    isDialogOpen: boolean;
    isForwarding: boolean;
    messageContent: string;
    messageType: "text" | "image";
    toggleDialog: () => void;
    setIsForwarding: (value: boolean) => void;
    setForwardContent: (content: string, type: "text" | "image") => void;
};

export const useForwardStore = create<ForwardDialogStore>((set) => ({
    isDialogOpen: false,
    isForwarding: false,
    messageContent: "",
    messageType: "text",
    toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
    setIsForwarding: (value: boolean) =>
        set((state) => ({ isForwarding: value })),
    setForwardContent: (content: string, type: "text" | "image") =>
        set((state) => ({ messageContent: content, messageType: type })),
}));
