import { create } from "zustand";

interface SoundStore {
  isSoundEnabled: boolean;
  setSound: (enabled: boolean) => void;
  backgroundMusicRef: HTMLAudioElement | null;
  setBackgroundMusicRef: (ref: HTMLAudioElement | null) => void;
  playAnimalSound: (soundPath: string) => void;
  stopAnimalSound: () => void;
  currentAnimalSound: HTMLAudioElement | null;
}

export const useSoundStore = create<SoundStore>((set, get) => ({
  isSoundEnabled: true,
  setSound: (enabled) => set({ isSoundEnabled: enabled }),
  backgroundMusicRef: null,
  setBackgroundMusicRef: (ref) => set({ backgroundMusicRef: ref }),
  currentAnimalSound: null,
  playAnimalSound: (soundPath: string) => {
    const state = get();

    if (state.currentAnimalSound) {
      state.currentAnimalSound.pause();
      state.currentAnimalSound.currentTime = 0;
    }

    if (!state.isSoundEnabled) return;

    if (state.backgroundMusicRef) {
      state.backgroundMusicRef.volume = 0.05; // 5%
      if (state.backgroundMusicRef.paused) {
        state.backgroundMusicRef.play().catch((error) => {
          console.error("Error resuming background music:", error);
        });
      }
    }

    const audio = new Audio(soundPath);
    audio.volume = 0.25; // 25%
    audio.loop = true;

    audio.play().catch((error) => {
      console.error("Error playing animal sound:", error);
      if (state.backgroundMusicRef) {
        state.backgroundMusicRef.volume = 0.1; // 10%
      }
    });

    set({ currentAnimalSound: audio });
  },
  stopAnimalSound: () => {
    const state = get();

    if (state.currentAnimalSound) {
      state.currentAnimalSound.pause();
      state.currentAnimalSound.currentTime = 0;
    }

    if (state.backgroundMusicRef) {
      state.backgroundMusicRef.volume = 0.1; // 10%
    }

    set({ currentAnimalSound: null });
  },
}));
