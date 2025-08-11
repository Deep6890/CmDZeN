// src/models/Challenge.js
const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: String,
    description: String,
    platform: String,
    startDate: Date,
    endDate: Date,
    difficulty: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    participants: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, default: 'pending' },
        score: { type: Number, default: 0 }
    }]
});

module.exports = mongoose.model('Challenge', challengeSchema);
