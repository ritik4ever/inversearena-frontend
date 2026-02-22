import express from 'express';
import { createServer } from 'http';
import { WebSocketService } from './services/websocketService';
import { OracleController } from './controllers/oracleController';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.get('/oracle/yield', OracleController.getYield);

// Initialize WebSocket Service
new WebSocketService(server);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});