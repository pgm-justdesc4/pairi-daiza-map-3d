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
      {/* 3D POI Marker - subtle ground indicator */}
      <mesh
        onClick={onClick}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.1, 0]}
      >
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.2} />
      </mesh>

      {/* HTML Label - circular image POI */}
      {!isHidden && (
        <Html center transform={false} sprite>
          <button
            className="poi"
            onClick={onClick}
            aria-label={`Point of interest: ${data.name}`}
          >
            <img
              className="poi__image"
              src={`/Images/${data.picture}`}
              alt=""
              role="presentation"
            />
          </button>
        </Html>
      )}
    </group>
  );
}
