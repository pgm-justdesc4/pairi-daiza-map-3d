import { StrictMode, Suspense, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import POIDialog from "./Components/UI/POIDialog/POIDialog.tsx";
import SoundToggle from "./Components/UI/SoundToggle/SoundToggle.tsx";
import QuitButton from "./Components/UI/QuitButton/QuitButton.tsx";
import LaunschScreen from "./Components/UI/LaunchScreen/LaunchScreen.tsx";
import Logo from "./Components/UI/Logo/Logo.tsx";
import { useCameraStore } from "./Store/CameraStore.ts";
import { useLoadingStore } from "./Store/LoadingStore.ts";

const cameraSettings = {
  fov: 60,
  near: 0.1,
  far: 100000,
  position: [0, 600, 0] as [number, number, number],
};

function App() {
  const selectedPOI = useCameraStore((state) => state.selectedPOI);
  const setSelectedPOI = useCameraStore((state) => state.setSelectedPOI);
  const hasLaunched = useLoadingStore((state) => state.hasLaunched);
  const resetCameraRef = useRef<(() => void) | null>(null);

  const handleCloseDialog = () => {
    if (resetCameraRef.current) {
      resetCameraRef.current();
    }
    setSelectedPOI(null);
  };

  return (
    <>
      {hasLaunched && (
        <Canvas camera={cameraSettings}>
          <Suspense fallback={null}>
            <Experience
              onPOISelect={setSelectedPOI}
              resetCameraRef={resetCameraRef}
            />
          </Suspense>
        </Canvas>
      )}
      <LaunschScreen />
      <Logo />
      <SoundToggle />
      <QuitButton />
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
