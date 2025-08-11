// src/models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String,
    xpReward: Number
});

module.exports = mongoose.model('Achievement', achievementSchema);
