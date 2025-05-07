'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AreaChart, LineChart } from '@tremor/react';
import { motion } from 'framer-motion';
import { Compass, Battery, Signal, Wifi, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { thinkVApi } from '@/services/api';
import { UnityViewer } from '@/components/UnityViewer/UnityViewer';
import React from 'react';

// Add to imports
import { ConnectionStatus } from '@/components/ConnectionStatus';
import dynamic from 'next/dynamic';
// Replace the existing MapView import with:
const MapView = dynamic(
  () => import('@/components/MapView/MapView').then(mod => mod.MapView),
  { 
    ssr: false,
    loading: () => <div className="h-full w-full bg-zinc-800 rounded-lg flex items-center justify-center">
      <span className="text-gray-400">Loading map...</span>
    </div>
  }
);
import { RoverControlPanel } from '@/components/RoverControlPanel';
// Remove unused import since RoverControl component doesn't exist yet
import { websocketService } from '@/services/websocket';

export default function Home() {
  const [viewMode, setViewMode] = useState<'3D' | 'Map'>('3D');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [roverPosition, setRoverPosition] = useState<[number, number]>([51.505, -0.09]);
  const [metalDetections, setMetalDetections] = useState<Array<{
    position: [number, number];
    timestamp: string;
    intensity: number;
  }>>([]);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (connectionStatus === 'disconnected') {
      try {
        // Add hardware check
        toast({
          title: "Hardware Not Found",
          description: "Please connect ESP8266 and ESP32 modules first.",
          variant: "destructive"
        });
        return;

        // Original connection code will be used once hardware is connected
        // const data = await thinkVApi.readData();
        // setConnectionStatus('connected');
        // setBatteryLevel(data.battery_level || 85);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Connection Failed",
          description: "Could not connect to the rover hardware.",
        });
      }
    } else {
      setConnectionStatus('disconnected');
      setBatteryLevel(null);
      toast({
        title: "Disconnected",
        description: "Connection terminated.",
      });
    }
  };

  const handleRoverControl = async (direction: string) => {
    if (connectionStatus === 'disconnected') return;
    
    try {
      await thinkVApi.updateData('direction', direction.toLowerCase());
      toast({
        title: `Moving ${direction}`,
        description: `Sending command to move ${direction.toLowerCase()}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Command Failed",
        description: `Failed to send ${direction.toLowerCase()} command`,
      });
    }
  };

  const handleEmergencyStop = async () => {
    if (connectionStatus === 'disconnected') return;
    
    try {
      await thinkVApi.updateData('command', 'stop');
      toast({
        variant: "destructive",
        title: "Emergency Stop Activated",
        description: "Rover has been stopped immediately.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Emergency Stop Failed",
        description: "Failed to stop the rover. Please try alternative methods.",
      });
    }
  };

  const handleUnityEvent = (eventName: string, data: any) => {
    switch (eventName) {
      case 'METAL_DETECTED':
        setMetalDetections(prev => [...prev, {
          position: data.position,
          timestamp: new Date().toISOString(),
          intensity: data.intensity
        }]);
        break;
      case 'POSITION_UPDATED':
        setRoverPosition(data.position);
        break;
    }
  };

  return (
    <main className="min-h-screen bg-black p-6">
      {/* Header with Connection Status */}
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Metal Detection Rover Control</h1>
          <div className="connection-status">
            <div className={`status-dot ${connectionStatus === 'connected' ? 'status-dot-connected' : 'status-dot-disconnected'}`} />
            <span className="text-sm text-gray-400">{connectionStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Viewer Section */}
          <div className="col-span-2">
            <div className="section-box">
              <div className="flex gap-2 mb-4">
                <button 
                  className={`px-4 py-2 rounded ${viewMode === '3D' ? 'bg-zinc-800' : 'bg-transparent'}`}
                  onClick={() => setViewMode('3D')}
                >
                  3D View
                </button>
                <button 
                  className={`px-4 py-2 rounded ${viewMode === 'Map' ? 'bg-zinc-800' : 'bg-transparent'}`}
                  onClick={() => setViewMode('Map')}
                >
                  Map View
                </button>
              </div>
              <div className="viewer-container h-[600px] relative bg-zinc-900 rounded-lg overflow-hidden">
                {viewMode === '3D' ? (
                  <UnityViewer onUnityEvent={handleUnityEvent} viewMode={viewMode} />
                ) : (
                  <div className="h-full w-full" key={`map-view-${Date.now()}`}>
                    <MapView 
                      roverPosition={roverPosition} 
                      metalDetections={metalDetections}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="controls-container">
            <div className="control-panel">
              <div className="panel-header">
                <h2>Rover Controls</h2>
              </div>
              <RoverControlPanel
                batteryLevel={batteryLevel || 0}
                connectionStatus={connectionStatus}
                onControlCommand={handleRoverControl}
                sensorData={{
                  temperature: 0,
                  humidity: 0,
                  metalDetected: metalDetections.length > 0
                }}
              />
            </div>

            <div className="control-panel">
              <div className="panel-header">
                <h2>Sensor Data</h2>
                {connectionStatus === 'connected' && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">Live</span>
                  </div>
                )}
              </div>
              {connectionStatus === 'connected' ? (
                <div className="space-y-4">
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Metal Detection</div>
                    <div className="text-xl font-semibold">
                      {metalDetections.length > 0 
                        ? `${metalDetections.length} metals detected`
                        : 'No metals detected'}
                    </div>
                    {metalDetections.length > 0 && (
                      <div className="mt-2 text-sm text-gray-400">
                        Latest: {new Date(metalDetections[metalDetections.length - 1].timestamp).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Distance</div>
                    <div className="text-xl font-semibold">-- cm</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Connect to rover to view sensor data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  useEffect(() => {
    const socket = websocketService.connect();
    
    // Subscribe to rover updates
    socket.on('roverUpdate', (data: any) => {
      if (data.position) {
        setRoverPosition(data.position);
      }
      if (data.batteryLevel) {
        setBatteryLevel(data.batteryLevel);
      }
      if (data.metalDetection) {
        setMetalDetections(prev => [...prev, {
          position: data.metalDetection.position,
          timestamp: new Date().toISOString(),
          intensity: data.metalDetection.intensity
        }]);
      }
    });

    return () => {
      websocketService.disconnect();
    };
  }, []);
}