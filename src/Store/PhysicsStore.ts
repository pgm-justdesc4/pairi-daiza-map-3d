import { create } from "zustand";

interface PhysicsStore {
  shouldSpawnApple: boolean;
  appleCount: number;
  triggerAppleSpawn: () => void;
  resetAppleSpawn: () => void;
  incrementAppleCount: () => void;
}

export const usePhysicsStore = create<PhysicsStore>((set) => ({
  shouldSpawnApple: false,
  appleCount: 0,
  triggerAppleSpawn: () => set({ shouldSpawnApple: true }),
  resetAppleSpawn: () => set({ shouldSpawnApple: false }),
  incrementAppleCount: () =>
    set((state) => ({ appleCount: state.appleCount + 1 })),
}));
