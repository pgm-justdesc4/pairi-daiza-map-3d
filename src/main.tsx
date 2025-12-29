import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";

const cameraSettings = {
  fov: 60,
  near: 0.1,
  far: 100000,
  position: [0, 700, 0] as [number, number, number],
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas camera={cameraSettings}>
      <Experience />
    </Canvas>
  </StrictMode>
);
