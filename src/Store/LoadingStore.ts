import { create } from "zustand";

interface LoadingStore {
  isMapReady: boolean;
  isPhysicsReady: boolean;
  hasLaunched: boolean;
  setMapReady: (ready: boolean) => void;
  setPhysicsReady: (ready: boolean) => void;
  setHasLaunched: (launched: boolean) => void;
  isFullyLoaded: () => boolean;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  isMapReady: false,
  isPhysicsReady: false,
  hasLaunched: false,
  setMapReady: (ready) => set({ isMapReady: ready }),
  setPhysicsReady: (ready) => set({ isPhysicsReady: ready }),
  setHasLaunched: (launched) => set({ hasLaunched: launched }),
  isFullyLoaded: () => {
    const state = get();
    return state.isMapReady && state.isPhysicsReady;
  },
}));
