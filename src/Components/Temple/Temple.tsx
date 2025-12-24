import { useGLTF } from "@react-three/drei";

export default function Temple() {
  const { scene } = useGLTF("/Models/Temple.glb");

  return <primitive object={scene} />;
}
