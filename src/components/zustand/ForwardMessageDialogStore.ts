import { create } from "zustand";

type ForwardDialogStore = {
    isDialogOpen: boolean;
    messageContent: string;
    messageType: "text" | "image";
    toggleDialog: () => void;
    setForwardContent: (content: string, type: "text" | "image") => void;
};

export const useForwardStore = create<ForwardDialogStore>((set) => ({
    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    isDialogOpen: false,
    messageContent: "",
    messageType: "text",
    toggleDialog: () => set((state) => ({ isDialogOpen: !state.isDialogOpen })),
    setForwardContent: (content: string, type: "text" | "image") =>
        set((state) => ({ messageContent: content, messageType: type })),
}));
