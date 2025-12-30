import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

// Configuration for each elephant
const elephantConfigs = [
  {
    id: "elephant1",
    position: [-279.8, -294.2, -210.1],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Lying_01",
  },
  {
    id: "elephant2",
    position: [-350, -275, -175],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Attack_1",
  },
  {
    id: "elephant3",
    position: [-279.8, -294.2, -90.1],
    rotation: [-0.45, 6.61, 0],
    scale: 1425,
    animation: "Lying_01",
  },
];

function Elephant({ position, rotation, scale, animation }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/african_elephant.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
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
  const { position, rotation, scale } = useControls("Elephants", {
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
      max: 10000,
      step: 0.1,
    },
  });

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
