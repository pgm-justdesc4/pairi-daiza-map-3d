import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Orangutan } from "../../Types/orangutan";

// Configuration for each Orangutan
const OrangutanConfigs: Orangutan[] = [
  {
    id: 1,
    position: [100, -225, -100],
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
    rotation: [-0.45, 6.5, 0],
    scale: 0.2,
    animation: "Animation",
  },
  {
    id: 4,
    position: [50, -117, 100],
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

function Orangutan({ position, rotation, scale, animation }: Orangutan) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/orangutan.glb");
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

export default function Orangutans() {
  return (
    <group>
      {OrangutanConfigs.map((config) => (
        <Orangutan
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
