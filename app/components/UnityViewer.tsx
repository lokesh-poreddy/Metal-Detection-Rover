'use client';

import { useState } from 'react';

export default function UnityViewer() {
  const [view, setView] = useState<'3D' | 'Map'>('3D');

  return (
    <div className="bg-zinc-900 rounded-xl p-5">
      <div className="flex gap-3 mb-4">
        <button 
          onClick={() => setView('3D')}
          className={`px-5 py-1.5 rounded-md text-sm font-medium ${
            view === '3D' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          3D View
        </button>
        <button 
          onClick={() => setView('Map')}
          className={`px-5 py-1.5 rounded-md text-sm font-medium ${
            view === 'Map' ? 'bg-white text-black' : 'text-white'
          }`}
        >
          Map View
        </button>
      </div>
      <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400 space-y-1">
          <p className="text-base">Unity 3D Viewer</p>
          <p className="text-sm">(Connect your Unity WebGL build here)</p>
        </div>
      </div>
    </div>
  );
}