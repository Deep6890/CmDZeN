// src/app.js
require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));
app.use('/api/challenges', require('./routes/challengeRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/answers', require('./routes/answerRoutes'));
app.use('/api/blogs',require('./routes/blogRoutes'));



module.exports = app;
