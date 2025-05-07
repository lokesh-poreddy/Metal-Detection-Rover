'use client';

import DataVisualizer from './DataVisualizer';
import UnityViewer from './UnityViewer';
import RoverControls from './RoverControls';
import SensorData from './SensorData';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <UnityViewer />
        <DataVisualizer />
      </div>
      <div className="space-y-8">
        <RoverControls />
        <SensorData />
      </div>
    </div>
  );
}