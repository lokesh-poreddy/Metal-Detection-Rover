const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const WebSocket = require('ws');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["x-api-key"]
  },
  upgradeTimeout: 30000,
  pingTimeout: 30000
});

// Create WebSocket server with specific options
const wss = new WebSocket.Server({ 
  port: 8080,
  handleProtocols: (protocols, req) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return false;
    }
    return protocols[0];
  }
});

// Add authentication to WebSocket server
wss.on('connection', (ws, req) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    ws.close();
    return;
  }
  
  console.log('ESP8266 connected');
  esp8266Client = ws;

  ws.on('message', (data) => {
    try {
      const parsedData = JSON.parse(data);
      if (unityClient) {
        unityClient.emit('sensorData', parsedData);
      }
      io.emit('sensorData', parsedData);
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  });

  ws.on('close', () => {
    console.log('ESP8266 disconnected');
    esp8266Client = null;
  });
});

// Store connected clients
let unityClient = null;
let esp8266Client = null;

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('unity-client', () => {
    console.log('Unity client connected');
    unityClient = socket;
  });

  socket.on('moveCommand', (command) => {
    if (esp8266Client && esp8266Client.readyState === WebSocket.OPEN) {
      esp8266Client.send(JSON.stringify({ command }));
    }
  });

  socket.on('disconnect', () => {
    if (socket === unityClient) {
      console.log('Unity client disconnected');
      unityClient = null;
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});