import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

export function useCameraAnimation() {
  const { camera } = useThree();

  const animateTo = (
    position: [number, number, number],
    target: [number, number, number],
    duration: number = 2
  ) => {
    gsap.killTweensOf(camera.position);

    const startPosition = camera.position.clone();
    const startQuaternion = camera.quaternion.clone();

    const tempCamera = camera.clone();
    tempCamera.position.set(position[0], position[1], position[2]);
    tempCamera.lookAt(target[0], target[1], target[2]);
    const endQuaternion = tempCamera.quaternion.clone();

    const endPosition = new THREE.Vector3(
      position[0],
      position[1],
      position[2]
    );

    const animationState = { t: 0 };

    gsap.to(animationState, {
      t: 1,
      duration,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.position.lerpVectors(
          startPosition,
          endPosition,
          animationState.t
        );

        camera.quaternion.slerpQuaternions(
          startQuaternion,
          endQuaternion,
          animationState.t
        );
      },
    });
  };

  return { animateTo };
}
