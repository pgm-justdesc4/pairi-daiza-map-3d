import { useThree } from "@react-three/fiber";
import gsap from "gsap";

export function useCameraAnimation() {
  const { camera, gl } = useThree();

  const animateTo = (
    position: [number, number, number],
    target: [number, number, number],
    duration: number = 2
  ) => {
    gsap.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(target[0], target[1], target[2]);
      },
    });
  };

  return { animateTo };
}
