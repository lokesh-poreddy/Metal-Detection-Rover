'use client';

interface MapViewProps {
  roverPosition: [number, number];
  metalDetections: Array<{
    position: [number, number];
    timestamp: string;
    intensity: number;
  }>;
}

export function MapView({ roverPosition, metalDetections }: MapViewProps) {
  return (
    <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Map View Placeholder</span>
    </div>
  );
}