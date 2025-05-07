'use client';

import React from 'react';
import { Battery, Signal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RoverControlPanelProps {
  batteryLevel: number;
  connectionStatus: 'connected' | 'disconnected';
  onControlCommand: (direction: string) => void;
  sensorData: {
    temperature: number;
    humidity: number;
    metalDetected: boolean;
  };
}

export function RoverControlPanel({
  batteryLevel,
  connectionStatus,
  onControlCommand,
  sensorData
}: RoverControlPanelProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Battery Status */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Battery</span>
            <Battery className={`w-5 h-5 ${batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div className="text-xl font-semibold mt-1">{batteryLevel}%</div>
        </div>

        {/* Connection Status */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Status</span>
            <Signal className={`w-5 h-5 ${connectionStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div className="text-xl font-semibold mt-1">{connectionStatus}</div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button
            variant="outline"
            onClick={() => onControlCommand('forward')}
            disabled={connectionStatus !== 'connected'}
            className="w-full"
          >
            Forward
          </Button>
        </div>
        <div className="col-start-1 row-start-2">
          <Button
            variant="outline"
            onClick={() => onControlCommand('left')}
            disabled={connectionStatus !== 'connected'}
            className="w-full"
          >
            Left
          </Button>
        </div>
        <div className="col-start-3 row-start-2">
          <Button
            variant="outline"
            onClick={() => onControlCommand('right')}
            disabled={connectionStatus !== 'connected'}
            className="w-full"
          >
            Right
          </Button>
        </div>
        <div className="col-start-2 row-start-2">
          <Button
            variant="destructive"
            onClick={() => onControlCommand('stop')}
            disabled={connectionStatus !== 'connected'}
            className="w-full"
          >
            Stop
          </Button>
        </div>
      </div>

      {/* Sensor Data */}
      <div className="bg-zinc-800 p-4 rounded-lg">
        <div className="text-gray-400 mb-2">Sensor Data</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Temperature</span>
            <span>{sensorData.temperature}°C</span>
          </div>
          <div className="flex justify-between">
            <span>Humidity</span>
            <span>{sensorData.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span>Metal Detection</span>
            <span className={sensorData.metalDetected ? 'text-yellow-500' : 'text-gray-400'}>
              {sensorData.metalDetected ? 'Detected' : 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}