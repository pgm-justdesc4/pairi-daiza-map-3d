import { create } from "zustand";

interface LoadingStore {
  isMapReady: boolean;
  hasLaunched: boolean;
  setMapReady: (ready: boolean) => void;
  setHasLaunched: (launched: boolean) => void;
  isFullyLoaded: () => boolean;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  isMapReady: false,
  hasLaunched: false,
  setMapReady: (ready) => set({ isMapReady: ready }),
  setHasLaunched: (launched) => set({ hasLaunched: launched }),
  isFullyLoaded: () => {
    const state = get();
    return state.isMapReady;
  },
}));
