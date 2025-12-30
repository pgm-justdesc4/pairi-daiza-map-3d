import "./POIDialog.css";
import { type PointOfInterestData } from "../../../Types/poi";

interface POIDialogProps {
  data: PointOfInterestData | null;
  onClose: () => void;
}

export default function POIDialog({ data, onClose }: POIDialogProps) {
  if (!data) return null;

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
      </div>
    </div>
  );
}
