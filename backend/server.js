const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ ADDED for serving frontend

dotenv.config();

const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const contributionRoutes = require('./routes/contributions');
const adminRoutes = require('./routes/admin');
const { seedAdmin } = require('./config/seed');

const app = express();

// ✅ UPDATED CORS: allows both local and production frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? '*'
    : (process.env.CLIENT_URL || 'http://localhost:3000'),
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'BackerSphere X API is running', timestamp: new Date() });
});

// ✅ ADDED: Serve React frontend in production
// This makes the entire app accessible from ONE single URL
if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Any route that is not an API route will serve the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedAdmin();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => { // ✅ UPDATED: '0.0.0.0' required for Fly.io/Render
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

 module.exports = app;