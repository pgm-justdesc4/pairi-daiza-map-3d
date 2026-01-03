import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { OrangUtan } from "../../Types/orangutan";

// Configuration for each OrangUtan
const OrangUtanConfigs: OrangUtan[] = [
  {
    id: 1,
    position: [100, -200, -100],
    rotation: [-0.45, 5.8, 0],
    scale: 0.25,
    animation: "",
  },
  {
    id: 2,
    position: [170, -200, -50],
    rotation: [-0.45, 3.5, 0],
    scale: 0.18,
    animation: "Animation",
  },
  {
    id: 3,
    position: [0, -120, 100],
    rotation: [-0.45, 5.8, 0],
    scale: 0.2,
    animation: "Animation",
  },
  {
    id: 4,
    position: [50, -115, 100],
    rotation: [-0.45, 4, 0],
    scale: 0.2,
    animation: "Animation",
  },
  {
    id: 5,
    position: [230, -115, 145],
    rotation: [-0.45, 1, 0],
    scale: 0.2,
    animation: "Animation",
  },
];

function OrangUtan({ position, rotation, scale, animation }: OrangUtan) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/orang_utan.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [scene]);

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].play();
    }
  }, [actions, animation]);

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <Clone object={scene} />
    </group>
  );
}

export default function OrangUtans() {
  return (
    <group>
      {OrangUtanConfigs.map((config) => (
        <OrangUtan
          key={config.id}
          position={config.position}
          rotation={config.rotation}
          scale={config.scale}
          animation={config.animation}
        />
      ))}
    </group>
  );
}
