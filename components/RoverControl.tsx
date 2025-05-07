'use client';

import React, { useState, useEffect } from 'react';
import { Battery, Signal, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription 
} from './ui/alert-dialog';

interface RoverControlProps {
  onCommand: (direction: string) => Promise<void>;
  isConnected: boolean;
}

interface RoverData {
  movement: string;
  sensorData: string;
  detection: string;
  batteryLevel: number;
  position: [number, number];
  metalDetection?: {
    position: [number, number];
    timestamp: string;
    intensity: number;
  };
}

export function RoverControl({ onCommand, isConnected }: RoverControlProps) {
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '' });
  const [roverData, setRoverData] = useState<RoverData>({
    movement: 'Stopped',
    sensorData: '0',
    detection: 'None',
    batteryLevel: 0,
    position: [51.505, -0.09]
  });
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  const handleCommand = async (direction: string) => {
    if (!isConnected) {
      setAlertMessage({
        title: 'Not Connected',
        description: 'Please connect to the rover first.'
      });
      setShowAlert(true);
      return;
    }

    try {
      await onCommand(direction);
      setAlertMessage({
        title: `Moving ${direction}`,
        description: `Command sent successfully`
      });
    } catch (error) {
      setAlertMessage({
        title: 'Command Failed',
        description: 'Failed to send command to rover'
      });
    }
    setShowAlert(true);
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8081');

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionStatus('connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setRoverData(prevData => ({
          ...prevData,
          movement: data.movement || prevData.movement,
          sensorData: data.sensorData || prevData.sensorData,
          detection: data.detection || prevData.detection,
          batteryLevel: data.batteryLevel || prevData.batteryLevel,
          position: data.position || prevData.position,
          metalDetection: data.metalDetection || prevData.metalDetection
        }));
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setConnectionStatus('disconnected');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionStatus('disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-4">
        <Signal className={`w-4 h-4 ${connectionStatus === 'connected' ? 'text-green-500' : 'text-red-500'}`} />
        <span className="text-sm text-gray-400">
          {connectionStatus === 'connected' ? 'Connected to Rover' : 'Disconnected'}
        </span>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-start-2">
          <Button
            variant="outline"
            onClick={() => handleCommand('forward')}
            disabled={!isConnected}
            className="w-full"
          >
            Forward
          </Button>
        </div>
        <div className="col-start-1 row-start-2">
          <Button
            variant="outline"
            onClick={() => handleCommand('left')}
            disabled={!isConnected}
            className="w-full"
          >
            Left
          </Button>
        </div>
        <div className="col-start-3 row-start-2">
          <Button
            variant="outline"
            onClick={() => handleCommand('right')}
            disabled={!isConnected}
            className="w-full"
          >
            Right
          </Button>
        </div>
        <div className="col-start-2 row-start-2">
          <Button
            variant="destructive"
            onClick={() => handleCommand('stop')}
            disabled={!isConnected}
            className="w-full"
          >
            Stop
          </Button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Battery Level</span>
            <Battery className={`w-5 h-5 ${roverData.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div className="text-xl font-semibold mt-1">{roverData.batteryLevel}%</div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Movement Status</span>
          </div>
          <div className="text-xl font-semibold mt-1">{roverData.movement}</div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Sensor Distance</span>
          </div>
          <div className="text-xl font-semibold mt-1">{roverData.sensorData}</div>
        </div>

        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Metal Detection</span>
            {roverData.detection === 'Detected' && (
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            )}
          </div>
          <div className="text-xl font-semibold mt-1">{roverData.detection}</div>
          {roverData.metalDetection && (
            <div className="text-sm text-gray-400 mt-2">
              Last detected: {new Date(roverData.metalDetection.timestamp).toLocaleTimeString()}
              <br />
              Intensity: {Math.round(roverData.metalDetection.intensity * 100)}%
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>{alertMessage.description}</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default RoverControl;