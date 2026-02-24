import { io } from 'socket.io-client';

// In development, we use localhost. 
// In production (Netlify), we need to point to the dedicated backend server (e.g., on Render).
const isProd = import.meta.env.PROD;
const SERVER_URL = import.meta.env.VITE_SERVER_URL || (isProd ? window.location.origin : 'http://localhost:3000');

console.log('Connecting to Socket Server at:', SERVER_URL);

export const socket = io(SERVER_URL, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5
});
