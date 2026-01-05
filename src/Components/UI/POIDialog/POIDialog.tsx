import "./POIDialog.css";
import type { POI } from "../../../Types/poi";
import { usePhysicsStore } from "../../../Store/PhysicsStore";

interface POIDialogProps {
  data: POI | null;
  onClose: () => void;
}

export default function POIDialog({ data, onClose }: POIDialogProps) {
  const triggerAppleSpawn = usePhysicsStore((state) => state.triggerAppleSpawn);
  const appleCount = usePhysicsStore((state) => state.appleCount);

  if (!data) return null;

  const isGibbonPOI = data.id === 3;
  const maxApples = 45;
  const canDropApple = appleCount < maxApples;

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
