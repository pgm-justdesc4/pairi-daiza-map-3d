import { useGLTF, useAnimations } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";

export default function Elephants() {
  const group = useRef(null);
  const { scene, animations } = useGLTF("/Models/african_elephant.glb");
  const { actions } = useAnimations(animations, group);

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

  useEffect(() => {
    // Play the Lying_01 animation
    if (actions && actions.Lying_01) {
      actions.Lying_01.play();
    }
  }, [actions]);

  return (
    <group ref={group}>
      <primitive
        object={scene}
        position={[-279.8, -294.2, -210.1]}
        rotation={[-0.45, 6.61, 0]}
        scale={1425}
      />
    </group>
  );
}
