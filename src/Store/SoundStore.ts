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

    // Stop any currently playing animal sound
    if (state.currentAnimalSound) {
      state.currentAnimalSound.pause();
      state.currentAnimalSound.currentTime = 0;
    }

    // Only play if sound is enabled
    if (!state.isSoundEnabled) return;

    // Lower background music volume but ensure it's playing
    if (state.backgroundMusicRef) {
      state.backgroundMusicRef.volume = 0.07;
      // Ensure background music continues playing
      if (state.backgroundMusicRef.paused) {
        state.backgroundMusicRef.play().catch((error) => {
          console.error("Error resuming background music:", error);
        });
      }
    }

    // Create and play new animal sound
    const audio = new Audio(soundPath);
    audio.volume = 0.3;
    audio.loop = true;

    audio.play().catch((error) => {
      console.error("Error playing animal sound:", error);
      // Restore background music volume on error
      if (state.backgroundMusicRef) {
        state.backgroundMusicRef.volume = 0.15;
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

    // Restore background music volume
    if (state.backgroundMusicRef) {
      state.backgroundMusicRef.volume = 0.15; // Restore to 15%
    }

    set({ currentAnimalSound: null });
  },
}));
