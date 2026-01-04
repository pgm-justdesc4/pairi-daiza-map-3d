import { create } from "zustand";

interface SoundStore {
  isSoundEnabled: boolean;
  setSound: (enabled: boolean) => void;
}

export const useSoundStore = create<SoundStore>((set) => ({
  isSoundEnabled: true,
  setSound: (enabled) => set({ isSoundEnabled: enabled }),
}));
