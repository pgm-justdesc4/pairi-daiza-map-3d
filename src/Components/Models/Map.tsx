import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect } from "react";

export default function Map() {
  const { scene } = useGLTF("/Models/Map.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const { position, rotation, scale } = useControls("Map", {
    position: {
      value: { x: -350.0, y: 0, z: 420.0 },
      step: 0.1,
    },
    rotation: {
      value: { x: -0.45, y: 9.2, z: 0 },
      step: 0.01,
    },
    scale: {
      value: 0.8,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
  });

  return (
    <primitive
      object={scene}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={scale}
    />
  );
}
