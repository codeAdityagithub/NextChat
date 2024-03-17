import { create } from "zustand";

type lastContactType = {
    lastContactedAt: string;
    setLastContacted: (time: string) => void;
};

export const lastContactStore = create<lastContactType>((set) => ({
    lastContactedAt: "",

    setLastContacted: (time: string) =>
        set((state) => ({ lastContactedAt: time })),
}));
