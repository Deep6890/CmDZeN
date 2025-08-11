// src/controllers/activityController.js
const Activity = require('../models/Activity');

exports.logActivity = async (req, res) => {
    try {
        const { appName, websiteUrl, category, durationMinutes } = req.body;

        const newActivity = new Activity({
            userId: req.user.id,
            appName,
            websiteUrl,
            category,
            durationMinutes
        });

        await newActivity.save();
        res.status(201).json({ message: "Activity logged successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserActivities = async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
