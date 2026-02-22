import { WebSocketServer, WebSocket } from 'ws';
import Redis from 'ioredis';
import { Server } from 'http';
import { IncomingMessage } from 'http';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisSub = new Redis(REDIS_URL);

interface ExtendedWebSocket extends WebSocket {
    arenaId?: string;
    isAlive: boolean;
}

export class WebSocketService {
    private wss: WebSocketServer;

    constructor(server: Server) {
        this.wss = new WebSocketServer({ server, path: '/ws' });
        this.init();
    }

    private init() {
        redisSub.psubscribe('arena:*', (err) => {
            if (err) console.error('Redis subscription failed:', err);
        });

        redisSub.on('pmessage', (_pattern, channel, message) => {
            this.broadcastToArena(channel, message);
        });

        this.wss.on('connection', (ws: ExtendedWebSocket, req: IncomingMessage) => {
            ws.isAlive = true;
            const url = new URL(req.url || '', `http://${req.headers.host}`);
            const arenaId = url.searchParams.get('arenaId');

            if (arenaId) {
                ws.arenaId = arenaId;
            }

            ws.on('pong', () => { ws.isAlive = true; });
            ws.on('error', console.error);
        });

        setInterval(() => {
            this.wss.clients.forEach((ws) => {
                const extWs = ws as ExtendedWebSocket;
                if (!extWs.isAlive) return ws.terminate();
                extWs.isAlive = false;
                ws.ping();
            });
        }, 30000);
    }

    private broadcastToArena(channel: string, message: string) {
        const [, arenaId] = channel.split(':');
        this.wss.clients.forEach((client) => {
            const ws = client as ExtendedWebSocket;
            if (ws.readyState === WebSocket.OPEN && ws.arenaId === arenaId) {
                ws.send(message);
            }
        });
    }
}