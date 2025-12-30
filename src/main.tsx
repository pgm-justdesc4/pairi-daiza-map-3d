import { StrictMode, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import POIDialog from "./Components/UI/POI/POIDialog.tsx";
import type { PointOfInterestData } from "./Types/poi.d.ts";

const cameraSettings = {
  fov: 60,
  near: 0.1,
  far: 100000,
  position: [0, 700, 0] as [number, number, number],
};

function App() {
  const [selectedPOI, setSelectedPOI] = useState<PointOfInterestData | null>(
    null
  );
  const resetCameraRef = useRef<(() => void) | null>(null);

  const handleCloseDialog = () => {
    if (resetCameraRef.current) {
      resetCameraRef.current();
    }
    setSelectedPOI(null);
  };

  return (
    <>
      <Canvas camera={cameraSettings}>
        <Experience
          onPOISelect={setSelectedPOI}
          resetCameraRef={resetCameraRef}
        />
      </Canvas>
      {selectedPOI && (
        <POIDialog data={selectedPOI} onClose={handleCloseDialog} />
      )}
    </>
  );
}

export default App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
