import { create } from "zustand";

interface LoadingStore {
  isMapReady: boolean;
  isPhysicsReady: boolean;
  setMapReady: (ready: boolean) => void;
  setPhysicsReady: (ready: boolean) => void;
  isFullyLoaded: () => boolean;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  isMapReady: false,
  isPhysicsReady: false,
  setMapReady: (ready) => set({ isMapReady: ready }),
  setPhysicsReady: (ready) => set({ isPhysicsReady: ready }),
  isFullyLoaded: () => {
    const state = get();
    return state.isMapReady && state.isPhysicsReady;
  },
}));
