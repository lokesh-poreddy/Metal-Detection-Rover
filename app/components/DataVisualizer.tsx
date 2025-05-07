'use client';

import { useState } from 'react';

export default function DataVisualizer() {
  const [data, setData] = useState<any[]>([]);

  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <h2 className="text-xl font-semibold text-white mb-5">Data Visualization</h2>
      <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
        {data.length === 0 ? (
          <p className="text-gray-400">No data to visualize</p>
        ) : (
          <div className="w-full h-full p-4">
            {/* Visualization content will go here */}
          </div>
        )}
      </div>
    </div>
  );
}