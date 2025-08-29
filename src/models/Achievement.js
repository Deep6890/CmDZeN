// src/models/Achievement.js
const mongoose = require('mongoose');
const Blogs = require('./Blogs');

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String,
    xpReward: Number
});

module.exports = mongoose.model('Achievement', achievementSchema);
