import { create } from "zustand";
import type { POI } from "../Types/poi";

interface CameraState {
  initialPosition: [number, number, number];
  selectedPOI: POI | null;
  setInitialPosition: (position: [number, number, number]) => void;
  setSelectedPOI: (poi: POI | null) => void;
  resetCamera: () => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  initialPosition: [0, 600, 0],
  selectedPOI: null,

  setInitialPosition: (position) => set({ initialPosition: position }),

  setSelectedPOI: (poi) => set({ selectedPOI: poi }),

  resetCamera: () => set({ selectedPOI: null }),
}));
