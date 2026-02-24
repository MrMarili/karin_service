import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Allow CORS
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3000;

// Serve static files from the build folder (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Game State
let gameState = {
    status: 'lobby',
    currentQuestion: 0,
    players: {},
    answers: {}
};

io.on('connection', (socket) => {
    // ... (rest of the socket logic remains identical)
    console.log('User connected:', socket.id);

    socket.on('host_connect', () => {
        socket.join('host');
        socket.emit('update_players', Object.values(gameState.players));
    });

    socket.on('start_game', () => {
        gameState.status = 'playing';
        gameState.currentQuestion = 0;
        gameState.answers = {};
        io.emit('game_started');
        io.emit('prepare_round', gameState.currentQuestion);
    });

    socket.on('next_question', () => {
        gameState.currentQuestion++;
        gameState.answers = {};
        io.emit('prepare_round', gameState.currentQuestion);
    });

    socket.on('open_voting', () => {
        io.emit('open_voting');
    });

    socket.on('show_results', () => {
        io.emit('question_ended');
    });

    socket.on('end_game', () => {
        gameState.status = 'summary';
        io.emit('game_ended', Object.values(gameState.players).sort((a, b) => b.score - a.score));
    });

    socket.on('host_sync_question', (text) => {
        io.emit('sync_question_text', text);
    });

    socket.on('reset_game', () => {
        gameState.players = {};
        gameState.status = 'waiting';
        io.emit('update_players', []);
        io.emit('game_reset');
    });

    socket.on('player_join', (name) => {
        const cleanName = name?.trim() || `Guest ${socket.id.substr(0, 4)}`;
        const existingSocketId = Object.keys(gameState.players).find(
            sid => gameState.players[sid].name === cleanName
        );

        if (existingSocketId) {
            const playerData = gameState.players[existingSocketId];
            delete gameState.players[existingSocketId];
            gameState.players[socket.id] = { ...playerData, id: socket.id, connected: true };
        } else {
            gameState.players[socket.id] = { id: socket.id, name: cleanName, score: 0, connected: true };
        }
        io.emit('update_players', Object.values(gameState.players));
        socket.emit('joined_successfully', gameState.status);
    });

    socket.on('player_answer', ({ answerIdx, timeLeft }) => {
        if (gameState.answers[socket.id]) return;
        gameState.answers[socket.id] = answerIdx;
        io.to('host').emit('player_answered', { playerId: socket.id, answerIdx, timeLeft });
    });

    socket.on('update_score', ({ playerId, points }) => {
        if (gameState.players[playerId]) {
            gameState.players[playerId].score += points;
        }
    });

    socket.on('disconnect', () => {
        if (gameState.players[socket.id]) {
            gameState.players[socket.id].connected = false;
            io.emit('update_players', Object.values(gameState.players));
        }
    });
});

// All other routes serve React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
