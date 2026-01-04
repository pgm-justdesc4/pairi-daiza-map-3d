import { StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import POIDialog from "./Components/UI/POIDialog/POIDialog.tsx";
import MusicToggle from "./Components/UI/MusicToggle/MusicToggle.tsx";
import { useCameraStore } from "./Store/CameraStore.ts";

const cameraSettings = {
  fov: 60,
  near: 0.1,
  far: 100000,
  position: [0, 600, 0] as [number, number, number],
};

function App() {
  const selectedPOI = useCameraStore((state) => state.selectedPOI);
  const setSelectedPOI = useCameraStore((state) => state.setSelectedPOI);
  const resetCameraRef = useRef<(() => void) | null>(null);

  const handleCloseDialog = () => {
    if (resetCameraRef.current) {
      resetCameraRef.current();
    }
    setSelectedPOI(null);
  };

  return (
    <>
      <Canvas camera={cameraSettings} shadows>
        <Experience
          onPOISelect={setSelectedPOI}
          resetCameraRef={resetCameraRef}
        />
      </Canvas>
      <MusicToggle />
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
