import { OrbitControls } from "@react-three/drei";
import Temple from "./Components/Temple/Temple";

function Experience() {
  return (
    <>
      {/* Controls */}
      <OrbitControls makeDefault />

      {/* Lightning */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Models */}
      <group>
        <Temple />
      </group>
    </>
  );
}

export default Experience;
