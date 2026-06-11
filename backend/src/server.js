import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './models/db.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for easier portfolio testing
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    message: '✓ Futuristic Sci-Fi Portfolio API Server is running',
    timestamp: new Date()
  });
});

// Start Server & Sync Database
const startServer = async () => {
  console.log('⚡ Starting Sci-Fi Portfolio Server...');
  await initDB();
  
  app.listen(PORT, () => {
    console.log(`✓ Server running in background on port: ${PORT}`);
    console.log(`✓ API Endpoint: http://localhost:${PORT}/api`);
  });
};

startServer();
