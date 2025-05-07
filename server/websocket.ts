import WebSocket from 'ws';
import { RoverData, MetalDetection } from '../types';

interface RoverUpdate {
  position?: [number, number];
  batteryLevel?: number;
  metalDetection?: MetalDetection;
  movement?: string;
  sensorData?: string;
  detection?: string;
}

const PORT = parseInt(process.env.WS_PORT || '8081', 10);

const wss = new WebSocket.Server({ port: PORT });

// Keep track of connected clients
const clients = new Set<WebSocket>();

// Broadcast to all connected clients
const broadcast = (data: RoverUpdate) => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  // Send initial connection confirmation
  ws.send(JSON.stringify({ 
    message: 'Connected to rover',
    timestamp: new Date().toISOString()
  }));

  // Simulate rover updates
  const updateInterval = setInterval(() => {
    const update: RoverUpdate = {
      position: [51.505 + (Math.random() - 0.5) * 0.001, -0.09 + (Math.random() - 0.5) * 0.001],
      batteryLevel: Math.floor(Math.random() * 20 + 80), // 80-100%
      movement: "Moving",
      sensorData: `${Math.floor(Math.random() * 100 + 150)}cm`, // 150-250cm
      detection: Math.random() > 0.8 ? "Detected" : "None" // 20% chance of detection
    };

    if (update.detection === "Detected") {
      update.metalDetection = {
        position: update.position!,
        timestamp: new Date().toISOString(),
        intensity: Math.random()
      };
    }

    broadcast(update);
  }, 1000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
    clearInterval(updateInterval);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
    clearInterval(updateInterval);
  });
});

// Error handling for the server
wss.on('error', (error) => {
  console.error('WebSocket server error:', error);
});

console.log(`WebSocket server running on port ${PORT}`);