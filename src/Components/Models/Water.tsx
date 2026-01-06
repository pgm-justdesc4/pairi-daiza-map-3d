import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Water() {
  const { scene } = useGLTF("/Models/Water.glb");

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const videoSpeed = 0.35;

  useEffect(() => {
    if (!videoRef.current) {
      const video = document.createElement("video");
      video.src = "/Video/Water.mp4";
      video.crossOrigin = "anonymous";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.style.display = "none";
      videoRef.current = video;
      video.play();
      video.playbackRate = videoSpeed;
      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      videoTextureRef.current = texture;
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  useEffect(() => {
    const videoTexture = videoTextureRef.current;
    if (videoTexture && scene) {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (
            mesh.material &&
            (mesh.material as THREE.MeshStandardMaterial).map !== undefined
          ) {
            (mesh.material as THREE.MeshStandardMaterial).map = videoTexture;
            (mesh.material as THREE.MeshStandardMaterial).needsUpdate = true;
            (mesh.material as THREE.MeshStandardMaterial).transparent = true;
          }
        }
      });
    }
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[-350.0, 0, 420.0]}
      rotation={[-0.45, 9.2, 0]}
      scale={0.8}
    />
  );
}
