import Map from "./Components/Models/Map";
import Clouds from "./Components/World/Clouds";
import Elephants from "./Components/Models/Elephants";
import PointOfInterest from "./Components/UI/POI/PointOfInterest";
import { useCameraAnimation } from "./Hooks/useCameraAnimation";
import { useCameraStore } from "./Store/CameraStore";
import data from "./Data/data.json";
import type { POI } from "./Types/poi";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Water from "./Components/Models/Water.tsx";
import Orangutans from "./Components/Models/Orangutans.tsx";
import Gibbons from "./Components/Models/Gibbons.tsx";
import WalkingElephants from "./Components/Models/WalkingElephants.tsx";
import { Physics } from "@react-three/rapier";
import FoodSpawn from "./Components/Physics/FoodSpawn.tsx";

interface ExperienceProps {
  onPOISelect: (poi: POI) => void;
  resetCameraRef: React.MutableRefObject<(() => void) | null>;
}

function Experience({ onPOISelect, resetCameraRef }: ExperienceProps) {
  const { camera } = useThree();
  const { animateTo } = useCameraAnimation();
  const { initialPosition, selectedPOI, setInitialPosition, setSelectedPOI } =
    useCameraStore();

  useEffect(() => {
    setInitialPosition([
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);
  }, [camera.position, setInitialPosition]);

  const handlePOIClick = (poi: POI) => {
    animateTo(poi.cameraPosition, poi.cameraTarget, 2);
    setSelectedPOI(poi);
    onPOISelect(poi);
  };

  useEffect(() => {
    const resetCamera = () => {
      animateTo(initialPosition, [0, 0, 0], 2);
      setSelectedPOI(null);
    };

    resetCameraRef.current = resetCamera;
  }, [resetCameraRef, initialPosition, animateTo, setSelectedPOI]);
  return (
    <>
      {/* Lightning */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 120, 5]} intensity={2} />

      {/* Clouds */}
      <Clouds />

      {/* Physics */}
      <Physics gravity={[0, -50, 0]}>
        {/* Models */}
        <group>
          <Elephants />
          <Orangutans />
          <Gibbons />
          <WalkingElephants />
          <Map />
          <Water />
        </group>

        <FoodSpawn />
      </Physics>

      {/* Points of Interest */}
      {data.pointsOfInterest.map((poi) => (
        <PointOfInterest
          key={poi.id}
          data={poi as POI}
          onClick={() => handlePOIClick(poi as POI)}
          isHidden={selectedPOI !== null}
        />
      ))}
    </>
  );
}

export default Experience;
