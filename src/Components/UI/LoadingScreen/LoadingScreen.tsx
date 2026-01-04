import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useLoadingStore } from "../../../Store/LoadingStore";
import "./LoadingScreen.css";

function LoadingScreen() {
  const { progress } = useProgress();
  const isFullyLoaded = useLoadingStore((state) => state.isFullyLoaded());
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only hide when both assets are loaded (100%) AND physics/map are ready
    if (progress === 100 && isFullyLoaded) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, isFullyLoaded]);

  if (!visible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <figure className="loading-logo">
          <img
            src="/Images/Logo.png"
            alt="Pairi Daiza Logo"
            className="loading-logo-image"
          />
        </figure>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="loading-text">
          {progress < 100
            ? `${Math.round(progress)}%`
            : isFullyLoaded
            ? "Ready!"
            : "Initializing..."}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
