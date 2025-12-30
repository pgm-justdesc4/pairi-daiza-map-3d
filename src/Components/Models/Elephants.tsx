import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Elephant } from "../../Types/elephant";

// Configuration for each elephant
const elephantConfigs: Elephant[] = [
  {
    id: 1,
    position: [-279.8, -294.2, -210.1],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Lying_01",
  },
  {
    id: 2,
    position: [-350, -275, -175],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Attack_1",
  },
  {
    id: 3,
    position: [-279.8, -294.2, -90.1],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Lying_01",
  },
];

function Elephant({ position, rotation, scale, animation }: Elephant) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/african_elephant.glb");
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

export default function Elephants() {
  return (
    <group>
      {elephantConfigs.map((config) => (
        <Elephant
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
