'use client';

interface UnityViewerProps {
  onUnityEvent?: (eventName: string, data: any) => void;
  viewMode?: string;
}

export function UnityViewer({ onUnityEvent, viewMode }: UnityViewerProps) {
  return (
    <div className="w-full h-full bg-zinc-900 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Unity Viewer Placeholder</span>
    </div>
  );
}