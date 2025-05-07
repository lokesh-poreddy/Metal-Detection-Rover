'use client';

import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected';
}

export function ConnectionStatus({ status }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'connected' ? (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-500">Disconnected</span>
        </>
      )}
    </div>
  );
}