import Map from "./Components/Models/Map";
import Clouds from "./Components/World/Clouds";
import Elephants from "./Components/Models/Elephants";
import PointOfInterest from "./Components/UI/POI/PointOfInterest";
import { useCameraAnimation } from "./Hooks/useCameraAnimation";
import { useCameraStore } from "./Store/CameraStore";
import { useLoadingStore } from "./Store/LoadingStore";
import data from "./Data/data.json";
import type { POI } from "./Types/poi";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import Water from "./Components/Models/Water.tsx";
import Orangutans from "./Components/Models/Orangutans.tsx";
import Gibbons from "./Components/Models/Gibbons.tsx";
import WalkingElephants from "./Components/Models/WalkingElephants.tsx";
// import { OrbitControls } from "@react-three/drei";
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
  const setPhysicsReady = useLoadingStore((state) => state.setPhysicsReady);

  useEffect(() => {
    setInitialPosition([
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ]);
  }, [camera.position, setInitialPosition]);

  // Signal physics ready after a delay to ensure everything is initialized
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhysicsReady(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setPhysicsReady]);

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
      {/* <OrbitControls makeDefault /> */}
      {/* Lightning */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[10, 120, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-600}
        shadow-camera-right={600}
        shadow-camera-top={600}
        shadow-camera-bottom={-600}
        shadow-camera-near={1}
        shadow-camera-far={800}
        shadow-bias={-0.0005}
        shadow-normalBias={0.05}
      />

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
