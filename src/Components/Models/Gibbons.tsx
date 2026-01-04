import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { Gibbon } from "../../Types/gibbon";

// Configuration for each Gibbon
const GibbonConfigs: Gibbon[] = [
  {
    id: 1,
    position: [100, -450, -530],
    rotation: [-0.45, 3, 0],
    scale: 50,
    animation: "Armature|Idle",
  },
  {
    id: 2,
    position: [150, -515, -665],
    rotation: [-0.45, 3.2, 0],
    scale: 50,
    animation: "Armature|Smile",
  },
];

function Gibbon({ position, rotation, scale, animation }: Gibbon) {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/Gibbon.glb");
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

export default function Gibbons() {
  return (
    <group>
      {GibbonConfigs.map((config) => (
        <Gibbon
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
