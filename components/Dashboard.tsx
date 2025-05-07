'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown, Activity, Radio, Map } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataVisualizer from './DataVisualizer';
import UnityViewer from './UnityViewer';

const socket = io('http://localhost:3001');

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('sensorData', (data) => {
      setSensorData((prev) => [...prev, data].slice(-100)); // Keep last 100 readings
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('sensorData');
    };
  }, []);

  const sendMoveCommand = (direction: 'forward' | 'backward') => {
    socket.emit('moveCommand', direction);
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Metal Detection Rover Control</h1>
          <div className="flex items-center mt-2 space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2 p-4">
          <Tabs defaultValue="3d" className="w-full">
            <TabsList>
              <TabsTrigger value="3d">3D View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="3d">
              <UnityViewer />
            </TabsContent>
            <TabsContent value="map">
              <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                <Map className="w-12 h-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map View Coming Soon</span>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Rover Controls</h2>
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="w-full"
                onClick={() => sendMoveCommand('forward')}
              >
                <ArrowUp className="mr-2" /> Move Forward
              </Button>
              <Button
                size="lg"
                className="w-full"
                onClick={() => sendMoveCommand('backward')}
              >
                <ArrowDown className="mr-2" /> Move Backward
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sensor Data</h2>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-primary" />
                <Radio className="w-4 h-4 text-primary" />
              </div>
            </div>
            <ScrollArea className="h-[300px]">
              <DataVisualizer data={sensorData} />
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}