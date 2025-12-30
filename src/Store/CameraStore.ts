import { create } from "zustand";
import type { PointOfInterest } from "../Types/poi";

interface CameraState {
  initialPosition: [number, number, number];
  selectedPOI: PointOfInterest | null;
  setInitialPosition: (position: [number, number, number]) => void;
  setSelectedPOI: (poi: PointOfInterest | null) => void;
  resetCamera: () => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  initialPosition: [0, 700, 0],
  selectedPOI: null,

  setInitialPosition: (position) => set({ initialPosition: position }),

  setSelectedPOI: (poi) => set({ selectedPOI: poi }),

  resetCamera: () => set({ selectedPOI: null }),
}));
