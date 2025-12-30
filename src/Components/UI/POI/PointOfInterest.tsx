import "./PointOfInterest.css";
import { Html } from "@react-three/drei";
import { type PointOfInterestData } from "../../../Types/poi";

interface PointOfInterestProps {
  data: PointOfInterestData;
  onClick: () => void;
}

export default function PointOfInterest({
  data,
  onClick,
}: PointOfInterestProps) {
  return (
    <group position={data.position}>
      {/* 3D Marker */}
      <mesh onClick={onClick}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshStandardMaterial
          color="#ff6b35"
          emissive="#ff6b35"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Pulsing ring */}
      <mesh onClick={onClick} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 8, 32]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.3} />
      </mesh>

      {/* HTML Label */}
      <Html distanceFactor={100} center>
        <div className="poi-label" onClick={onClick}>
          {data.name}
        </div>
      </Html>
    </group>
  );
}
