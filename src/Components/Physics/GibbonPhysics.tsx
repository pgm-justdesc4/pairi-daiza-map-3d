import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { usePhysicsStore } from "../../Store/PhysicsStore";

interface Apple {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
}

export default function GibbonPhysics() {
  const { scene: appleScene } = useGLTF("/Models/apple.glb");
  const shouldSpawnApple = usePhysicsStore((state) => state.shouldSpawnApple);
  const resetAppleSpawn = usePhysicsStore((state) => state.resetAppleSpawn);
  const incrementAppleCount = usePhysicsStore(
    (state) => state.incrementAppleCount
  );
  const [apples, setApples] = useState<Apple[]>([]);

  useEffect(() => {
    if (shouldSpawnApple) {
      // Random initial velocity so apples roll in different directions
      const randomVelX = (Math.random() - 0.5) * 15;
      const randomVelZ = (Math.random() - 0.5) * 15;

      const newApple: Apple = {
        id: Date.now() + Math.random(),
        position: [10, -420, -525], // Fixed spawn point
        velocity: [randomVelX, 0, randomVelZ],
      };
      setApples((prev) => [...prev, newApple]);
      incrementAppleCount();
      resetAppleSpawn();
    }
  }, [shouldSpawnApple, resetAppleSpawn, incrementAppleCount]);
  return (
    <group>
      {/* Falling Apples */}
      {apples.map((apple) => (
        <RigidBody
          key={apple.id}
          position={apple.position}
          linearVelocity={apple.velocity}
          colliders="ball"
          restitution={0.4}
          friction={0.6}
          mass={0.2}
        >
          <primitive
            object={appleScene.clone()}
            scale={0.05}
            castShadow
            receiveShadow
          />
        </RigidBody>
      ))}
    </group>
  );
}
