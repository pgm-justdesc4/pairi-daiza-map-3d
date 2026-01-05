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
    <section
      className="loading-screen"
      role="alert"
      aria-live="polite"
      aria-label="Loading screen"
    >
      <div className="loading-screen__content">
        <figure className="loading-screen__logo">
          <img src="/Images/Logo.png" alt="Pairi Daiza Logo" />
        </figure>
        <h1 className="loading-screen__title">The Kingdom of Ganesha</h1>
        <div
          className="loading-screen__progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="loading-screen__progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="loading-screen__text">
          {progress < 100
            ? `${Math.round(progress)}%`
            : isFullyLoaded
            ? "Ready!"
            : "Initializing..."}
        </p>
      </div>
    </section>
  );
}

export default LoadingScreen;
