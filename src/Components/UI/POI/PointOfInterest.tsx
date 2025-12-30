import "./PointOfInterest.css";
import { Html } from "@react-three/drei";
import type { POI } from "../../../Types/poi";

interface PointOfInterestProps {
  data: POI;
  onClick: () => void;
  isHidden?: boolean;
}

export default function PointOfInterest({
  data,
  onClick,
  isHidden = false,
}: PointOfInterestProps) {
  return (
    <group position={data.position}>
      {/* POI */}
      <mesh onClick={onClick} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 8, 32]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.3} />
      </mesh>

      {/* HTML Label */}
      {!isHidden && (
        <Html center transform={false} sprite>
          <div className="poi-label" onClick={onClick}>
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
}
