import { useGLTF } from "@react-three/drei";

export default function Temple() {
  const { scene } = useGLTF("/Models/test.glb");

  return <primitive object={scene} />;
}
