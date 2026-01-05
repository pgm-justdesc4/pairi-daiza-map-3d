import { useEffect, useRef, useState } from "react";
import "./MusicToggle.css";
import { useSoundStore } from "../../../Store/SoundStore";

function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true);
  const setSound = useSoundStore((state) => state.setSound);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("/Sounds/background-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Set to 30% volume

    // Auto-play music on mount
    audioRef.current.play().catch((error) => {
      console.error("Error auto-playing audio:", error);
      setIsPlaying(false);
    });

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setSound(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setSound(true);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className="music-toggle"
      onClick={toggleMusic}
      aria-label={isPlaying ? "Mute music" : "Play music"}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <svg
          className="music-toggle__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      ) : (
        <svg
          className="music-toggle__icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      )}
    </button>
  );
}

export default MusicToggle;
