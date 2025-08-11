// src/models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appName: String,
    websiteUrl: String,
    category: String,
    durationMinutes: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);
