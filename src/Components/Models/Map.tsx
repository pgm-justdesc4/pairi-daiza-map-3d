import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useLoadingStore } from "../../Store/LoadingStore";

export default function Map() {
  const { scene } = useGLTF("/Models/Map.glb");
  const setMapReady = useLoadingStore((state) => state.setMapReady);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  useEffect(() => {
    scene.traverse((child) => {
      child.castShadow = false;
      child.receiveShadow = true;
    });
  }, [scene]);

  // Signal when rigid body and collider are ready
  useEffect(() => {
    // Small delay to ensure trimesh collider is fully computed
    const timer = setTimeout(() => {
      if (rigidBodyRef.current) {
        setMapReady(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [setMapReady]);

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
    <RigidBody ref={rigidBodyRef} type="fixed" colliders="trimesh">
      <primitive
        object={scene}
        position={[position.x, position.y, position.z]}
        rotation={[rotation.x, rotation.y, rotation.z]}
        scale={scale}
      />
    </RigidBody>
  );
}
