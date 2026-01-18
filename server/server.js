import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipesRouter from './routes/recipes.js';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Multer configuration is handled in routes file

// Routes
app.use('/api/recipes', recipesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Fridge Recipe API is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
