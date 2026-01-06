import { useGLTF } from "@react-three/drei";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rigidBodyRef.current) {
        setMapReady(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [setMapReady]);

  return (
    <RigidBody ref={rigidBodyRef} type="fixed" colliders="trimesh">
      <primitive
        object={scene}
        position={[-350.0, 0, 420.0]}
        rotation={[-0.45, 9.2, 0]}
        scale={0.8}
      />
    </RigidBody>
  );
}
