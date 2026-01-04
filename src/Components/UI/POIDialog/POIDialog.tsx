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
  const maxApples = 50;
  const canDropApple = appleCount < maxApples;

  return (
    <div className="poi-dialog-overlay" onClick={onClose}>
      <div className="poi-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="poi-dialog-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="poi-dialog-title">{data.name}</h2>

        <p className="poi-dialog-description">{data.description}</p>

        <div className="poi-dialog-facts">
          <h3>Interesting Facts:</h3>
          <ul>
            {data.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>

        {isGibbonPOI && (
          <button
            className="apple-spawn-button"
            onClick={triggerAppleSpawn}
            disabled={!canDropApple}
          >
            🍎 Drop Apple {appleCount > 0 && `(${appleCount}/${maxApples})`}
          </button>
        )}
      </div>
    </div>
  );
}
