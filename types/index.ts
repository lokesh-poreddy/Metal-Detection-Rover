export interface RoverData {
  movement: string;
  sensorData: string;
  detection: string;
}

export interface MetalDetection {
  position: [number, number];
  timestamp: string;
  intensity: number;
}