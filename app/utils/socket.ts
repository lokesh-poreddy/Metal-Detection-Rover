import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  extraHeaders: {
    'x-api-key': process.env.NEXT_PUBLIC_THINKV_API_KEY || 'thinkv_1fd29d2c-8321-4648-92c3-1cd5cd765f9f'
  },
  transports: ['websocket'],
  upgrade: true,
  reconnection: true,
  reconnectionAttempts: 5
});

export default socket;