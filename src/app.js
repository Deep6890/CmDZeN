// src/app.js
require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const middleware= require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//middleware to log requests



// Routes
app.use('/api/auth', require('./routes/authRoutes')); // public
app.use('/api/activity', middleware, require('./routes/activityRoutes')); // protected
app.use('/api/challenges', middleware, require('./routes/challengeRoutes')); // protected
app.use('/api/questions', middleware, require('./routes/questionRoutes')); // protected
app.use('/api/answers', middleware, require('./routes/answerRoutes')); // protected
app.use('/api/blogs', middleware, require('./routes/blogRoutes')); // protected



module.exports = app;
