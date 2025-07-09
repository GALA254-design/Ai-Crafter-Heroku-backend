require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Sequelize DB connection
const cors = require('cors');

const storyRoutes = require('./routes/storyRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const llmRoutes = require('./routes/llm.js');
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Body parser for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Root route for Heroku (shows basic message)
app.get('/', (req, res) => {
  res.send('🚀 AI Novel Assistant API Running on Heroku!');
});

// ✅ Optional health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Mount API routes
app.use('/api/stories', storyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/llm', llmRoutes);
app.use('/api/files', fileRoutes);
app.use('/api', authRoutes);

module.exports = app;
