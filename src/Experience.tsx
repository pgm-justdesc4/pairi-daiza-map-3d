import { OrbitControls } from "@react-three/drei";
import Map from "./Components/Models/Map";
import Clouds from "./Components/World/Clouds";
import Elephants from "./Components/Models/Elephants";
import PointOfInterest from "./Components/UI/POI/PointOfInterest";
import { useCameraAnimation } from "./Hooks/useCameraAnimation";
import data from "./Data/data.json";
import type { PointOfInterestData } from "./Types/poi";
import { useEffect } from "react";

interface ExperienceProps {
  onPOISelect: (poi: PointOfInterestData) => void;
  resetCameraRef: React.MutableRefObject<(() => void) | null>;
}

function Experience({ onPOISelect, resetCameraRef }: ExperienceProps) {
  const { animateTo } = useCameraAnimation();

  const handlePOIClick = (poi: PointOfInterestData) => {
    animateTo(poi.cameraPosition, poi.cameraTarget, 2);
    onPOISelect(poi);
  };

  const resetCamera = () => {
    animateTo([0, 700, 0], [0, -200, 0], 2);
  };

  // Expose resetCamera to parent via ref
  useEffect(() => {
    resetCameraRef.current = resetCamera;
  }, []);
  return (
    <>
      {/* Controls */}
      {/* <OrbitControls makeDefault /> */}

      {/* Lightning */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 120, 5]} intensity={2} />

      {/* Clouds */}
      <Clouds />

      {/* Models */}
      <group>
        <Elephants />
        <Map />
      </group>

      {/* Points of Interest */}
      {data.pointsOfInterest.map((poi) => (
        <PointOfInterest
          key={poi.id}
          data={poi as PointOfInterestData}
          onClick={() => handlePOIClick(poi as PointOfInterestData)}
        />
      ))}
    </>
  );
}

export default Experience;
