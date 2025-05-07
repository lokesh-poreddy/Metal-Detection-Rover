'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SensorData {
  timestamp: string;
  distance: number;
  metalDetected: boolean;
}

export default function DataVisualizer() {
  const [data, setData] = useState<SensorData[]>([]);
  const [view, setView] = useState<'graph' | 'table'>('graph');

  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-white">Sensor Data</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('graph')}
            className={`px-3 py-1 rounded ${
              view === 'graph' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            Graph
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1 rounded ${
              view === 'table' ? 'bg-white text-black' : 'text-white'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      <div className="bg-zinc-800 rounded-lg p-4 min-h-[300px]">
        {view === 'graph' ? (
          data.length > 0 ? (
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="distance" stroke="#8884d8" />
            </LineChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No data available
            </div>
          )
        ) : (
          <div className="overflow-auto max-h-[300px]">
            <table className="w-full text-left text-gray-400">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">Time</th>
                  <th className="p-2">Distance</th>
                  <th className="p-2">Metal Detected</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2">{entry.timestamp}</td>
                    <td className="p-2">{entry.distance}cm</td>
                    <td className="p-2">{entry.metalDetected ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}