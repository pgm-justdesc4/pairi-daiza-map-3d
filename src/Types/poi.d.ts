export type POI = {
  id: number;
  name: string;
  description: string;
  position: [number, number, number];
  picture: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  facts: string[];
};
