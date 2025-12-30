import { Cloud } from "@react-three/drei";

export default function Clouds() {
  return (
    <>
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
    </>
  );
}
