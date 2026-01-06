import "./POIDialog.css";
import type { POI } from "../../../Types/poi";
import { useSoundStore } from "../../../Store/SoundStore";
import { useEffect } from "react";

interface POIDialogProps {
  data: POI | null;
  onClose: () => void;
}

export default function POIDialog({ data, onClose }: POIDialogProps) {
  const playAnimalSound = useSoundStore((state) => state.playAnimalSound);
  const stopAnimalSound = useSoundStore((state) => state.stopAnimalSound);
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled);

  useEffect(() => {
    if (data?.sound) {
      playAnimalSound(`/Sounds/${data.sound}`);
    }

    return () => {
      stopAnimalSound();
    };
  }, [data, playAnimalSound, stopAnimalSound]);

  useEffect(() => {
    if (!isSoundEnabled) {
      stopAnimalSound();
    } else if (data?.sound) {
      playAnimalSound(`/Sounds/${data.sound}`);
    }
  }, [isSoundEnabled, data, playAnimalSound, stopAnimalSound]);

  if (!data) return null;

  return (
    <div
      className="poi-dialog"
      role="dialog"
      aria-labelledby="poi-dialog-title"
      aria-modal="true"
    >
      <article
        className="poi-dialog__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="poi-dialog__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>

        <h2 id="poi-dialog-title" className="poi-dialog__title">
          {data.name}
        </h2>

        <p className="poi-dialog__description">{data.description}</p>

        <aside className="poi-dialog__facts">
          <h3 className="poi-dialog__facts-title">In short...</h3>
          <ul className="poi-dialog__facts-list">
            {data.facts.map((fact, index) => (
              <li key={index} className="poi-dialog__facts-item">
                {fact}
              </li>
            ))}
          </ul>
        </aside>
      </article>
    </div>
  );
}
