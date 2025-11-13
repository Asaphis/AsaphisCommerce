import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Server } from 'socket.io';
import http from 'http';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const ORIGIN = process.env.CORS_ORIGIN || '*';
const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // Safe console message; avoids printing secrets
  console.warn('Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. Configure your .env');
}

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));

app.get('/health', async (_req, res) => {
  if (!supabase) return res.json({ ok: true, db: false });
  try {
    // lightweight DB ping (optional)
    const { data, error } = await supabase.from('app_health').select('ok').limit(1);
    if (error) throw error;
    res.json({ ok: true, db: !!data });
  } catch (e) {
    res.status(200).json({ ok: true, db: false });
  }
});

// Example API namespace
app.get('/api/v1/time', (_req, res) => {
  res.json({ now: new Date().toISOString() });
});

// HTTP + Socket.IO for realtime chat
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: ORIGIN, credentials: true } });

io.on('connection', (socket) => {
  logger.info({ id: socket.id }, 'client connected');

  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
  });

  socket.on('chat_message', async (payload: { roomId: string; text: string; senderId: string }) => {
    // Persist to DB (table: messages). Define schema in Supabase later
    try {
      if (supabase) {
        const { error } = await supabase.from('messages').insert({
          room_id: payload.roomId,
          sender_id: payload.senderId,
          text: payload.text,
        });
        if (error) throw error;
      }
      io.to(payload.roomId).emit('chat_message', { ...payload, at: new Date().toISOString() });
    } catch (e) {
      logger.error(e, 'failed to store message');
    }
  });

  socket.on('disconnect', () => {
    logger.info({ id: socket.id }, 'client disconnected');
  });
});

server.listen(PORT, () => {
  logger.info(`API listening on http://localhost:${PORT}`);
});
