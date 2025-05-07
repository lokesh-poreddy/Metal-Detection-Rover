'use client';

export default function SensorData() {
  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white">Sensor Data</h2>
        <span className="text-white text-lg">↗</span>
      </div>
      <p className="text-gray-400 text-center text-sm py-4">No sensor data available</p>
    </div>
  );
}