import { useThree } from "@react-three/fiber";
import { useCallback } from "react";
import gsap from "gsap";
import * as THREE from "three";

export function useCameraAnimation() {
  const { camera } = useThree();

  const animateTo = useCallback(
    (
      position: [number, number, number],
      target: [number, number, number],
      duration: number = 2
    ) => {
      // Disable any existing animations
      gsap.killTweensOf(camera.position);

      // Calculate the target quaternion (rotation) for looking at the target
      const startQuaternion = camera.quaternion.clone();
      const tempCamera = camera.clone();
      tempCamera.position.set(position[0], position[1], position[2]);
      tempCamera.lookAt(target[0], target[1], target[2]);
      const endQuaternion = tempCamera.quaternion.clone();

      // Animate both position and rotation smoothly
      const animationState = { t: 0 };

      gsap.to(animationState, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          // Interpolate position
          camera.position.lerpVectors(
            new THREE.Vector3(
              camera.position.x,
              camera.position.y,
              camera.position.z
            ),
            new THREE.Vector3(position[0], position[1], position[2]),
            animationState.t
          );

          // Interpolate rotation using quaternion slerp
          camera.quaternion.slerpQuaternions(
            startQuaternion,
            endQuaternion,
            animationState.t
          );
        },
      });
    },
    [camera]
  );

  return { animateTo };
}
