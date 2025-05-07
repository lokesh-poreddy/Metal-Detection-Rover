'use client';

import { useEffect, useRef } from 'react';

interface UnityViewerProps {
  unityContent?: string;
  viewMode: '3D' | 'Map';
}

export function UnityViewer({ unityContent, viewMode }: UnityViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Unity WebGL integration will go here
    }
  }, [unityContent]);

  return (
    <div className="section-box">
      <div className="flex gap-2 mb-4">
        <button 
          className={`px-4 py-2 rounded ${viewMode === '3D' ? 'bg-zinc-800' : 'bg-transparent'}`}
        >
          3D View
        </button>
        <button 
          className={`px-4 py-2 rounded ${viewMode === 'Map' ? 'bg-zinc-800' : 'bg-transparent'}`}
        >
          Map View
        </button>
      </div>
      <div 
        ref={containerRef} 
        className="w-full h-[500px] bg-zinc-900/80 rounded-lg flex items-center justify-center text-zinc-400"
      >
        {!unityContent && (
          <div className="text-center">
            <div className="text-sm">Unity 3D Viewer</div>
            <div className="text-xs mt-1">(Connect your Unity WebGL build here)</div>
          </div>
        )}
      </div>
    </div>
  );
}