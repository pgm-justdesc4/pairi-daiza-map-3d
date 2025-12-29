import { OrbitControls, Cloud } from "@react-three/drei";
import Map from "./Components/Models/Map";
import { useThree } from "@react-three/fiber";

function Experience() {
  const { camera } = useThree();
  return (
    <>
      {/* Controls */}
      {/* <OrbitControls
        makeDefault
        onEnd={() => {
          console.log("Camera position:", camera.position);
        }}
      /> */}

      {/* Lightning */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 150, 5]} intensity={2} />

      {/* Clouds - floating around camera level */}
      <Cloud
        opacity={0.3}
        speed={0.2}
        volume={500}
        segments={40}
        position={[-320, 400, 100]}
      />
      <Cloud
        opacity={0.3}
        speed={0.15}
        volume={500}
        segments={35}
        position={[270, 350, -200]}
      />
      <Cloud
        opacity={0.3}
        speed={0.25}
        volume={500}
        segments={38}
        position={[270, 450, 50]}
      />
      <Cloud
        opacity={0.25}
        speed={0.5}
        volume={500}
        segments={70}
        position={[-350, 380, -200]}
      />

      {/* Models */}
      <group>
        <Map />
      </group>
    </>
  );
}

export default Experience;
