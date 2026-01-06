import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Elephant } from "../../Types/elephant";
import * as THREE from "three";

interface WalkingElephant extends Elephant {
  waypoints: [number, number, number][];
  speed: number;
}

const ElephantConfigs: WalkingElephant[] = [
  {
    id: 1,
    position: [50, -472, -580],
    rotation: [-0.45, 2.57, 0],
    scale: 1425,
    animation: "Loco_WalkSlow",
    waypoints: [
      [-100, -485, -600],
      [-650, -485, -600],
    ],
    speed: 20,
  },
  {
    id: 2,
    position: [170, -490, -620],
    rotation: [-0.45, 2, 0],
    scale: 1425,
    animation: "Loco_Run",
    waypoints: [
      [-300, -500, -645],
      [500, -500, -645],
    ],
    speed: 50,
  },
];

function Elephant({
  rotation,
  scale,
  animation,
  waypoints,
  speed,
}: WalkingElephant) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/Models/african_elephant.glb");
  const { actions } = useAnimations(animations, group);

  const currentWaypointIndex = useRef(0);
  const currentPosition = useRef(new THREE.Vector3(...waypoints[0]));

  useEffect(() => {
    if (actions && actions[animation]) {
      actions[animation].play();
    }
  }, [actions, animation]);

  // movement
  useFrame((_state, delta) => {
    if (!group.current) return;

    const targetWaypoint = waypoints[currentWaypointIndex.current];
    const target = new THREE.Vector3(
      targetWaypoint[0],
      targetWaypoint[1],
      targetWaypoint[2]
    );

    const direction = new THREE.Vector3(
      target.x - currentPosition.current.x,
      0,
      target.z - currentPosition.current.z
    );
    const distance = direction.length();

    if (distance < 1) {
      currentWaypointIndex.current =
        (currentWaypointIndex.current + 1) % waypoints.length;
    } else {
      direction.normalize();
      const moveDistance = Math.min(speed * delta, distance);
      currentPosition.current.x += direction.x * moveDistance;
      currentPosition.current.z += direction.z * moveDistance;
      currentPosition.current.y = targetWaypoint[1];

      group.current.position.copy(currentPosition.current);

      // rotate
      const angle = Math.atan2(direction.x, direction.z);
      group.current.rotation.y = angle;
    }
  });

  return (
    <group ref={group} rotation={rotation} scale={scale}>
      <Clone object={scene} />
    </group>
  );
}

export default function WalkingElephants() {
  return (
    <group>
      {ElephantConfigs.map((config) => (
        <Elephant
          key={config.id}
          id={config.id}
          position={config.position}
          rotation={config.rotation}
          scale={config.scale}
          animation={config.animation}
          waypoints={config.waypoints}
          speed={config.speed}
        />
      ))}
    </group>
  );
}
