import { RigidBody } from "@react-three/rapier";
import { useGLTF, Html } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { usePhysicsStore } from "../../Store/PhysicsStore";
import { useSoundStore } from "../../Store/SoundStore";
import { useCameraStore } from "../../Store/CameraStore";
import "./FoodSpawn.css";

interface Apple {
  id: number;
  position: [number, number, number];
  velocity: [number, number, number];
}

export default function FoodSpawn() {
  const { scene: appleScene } = useGLTF("/Models/apple.glb");
  const shouldSpawnApple = usePhysicsStore((state) => state.shouldSpawnApple);
  const resetAppleSpawn = usePhysicsStore((state) => state.resetAppleSpawn);
  const incrementAppleCount = usePhysicsStore(
    (state) => state.incrementAppleCount
  );
  const triggerAppleSpawn = usePhysicsStore((state) => state.triggerAppleSpawn);
  const appleCount = usePhysicsStore((state) => state.appleCount);
  const isSoundEnabled = useSoundStore((state) => state.isSoundEnabled);
  const selectedPOI = useCameraStore((state) => state.selectedPOI);
  const [apples, setApples] = useState<Apple[]>([]);
  const clapSoundRef = useRef<HTMLAudioElement | null>(null);

  const maxApples = 45;
  const canDropApple = appleCount < maxApples;
  const isGibbonDialogOpen = selectedPOI?.id === 3;

  useEffect(() => {
    clapSoundRef.current = new Audio("/Sounds/383008__thedcheck__clap-3.wav");
    clapSoundRef.current.volume = 0.5;
    return () => {
      if (clapSoundRef.current) {
        clapSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (shouldSpawnApple) {
      setTimeout(() => {
        const randomVelX = (Math.random() - 0.5) * 15;
        const randomVelZ = (Math.random() - 0.5) * 15;

        const newApple: Apple = {
          id: Date.now() + Math.random(),
          position: [10, -420, -525],
          velocity: [randomVelX, 0, randomVelZ],
        };

        setApples((prev) => [...prev, newApple]);

        if (isSoundEnabled && clapSoundRef.current) {
          clapSoundRef.current.currentTime = 0;
          clapSoundRef.current.play().catch((error) => {
            console.error("Error playing clap sound:", error);
          });
        }
      }, 0);

      incrementAppleCount();
      resetAppleSpawn();
    }
  }, [shouldSpawnApple, resetAppleSpawn, incrementAppleCount, isSoundEnabled]);

  return (
    <group>
      {isGibbonDialogOpen && (
        <Html position={[10, -460, -525]} center transform={false} sprite>
          <button
            className="apple-spawn-button"
            onClick={triggerAppleSpawn}
            disabled={!canDropApple}
          >
            {canDropApple ? "Fill the food chest" : "The chest is full"}
          </button>
        </Html>
      )}

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
          <primitive object={appleScene.clone()} scale={0.05} />
        </RigidBody>
      ))}
    </group>
  );
}
