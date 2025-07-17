import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import bookmarkRoutes from './routes/bookmarkRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

export default app;
