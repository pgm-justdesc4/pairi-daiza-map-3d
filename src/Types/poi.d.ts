export type POI = {
  id: string;
  name: string;
  description: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  facts: string[];
};
