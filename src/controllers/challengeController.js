const Challenge = require('../models/Challenge');

// Create challenge
exports.createChallenge = async (req, res) => {
    try {
        const { title, description, platform, startDate, endDate, difficulty } = req.body;

        const challenge = new Challenge({
            title,
            description,
            platform,
            startDate,
            endDate,
            difficulty,
            createdBy: req.user.id
        });

        await challenge.save();
        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Join challenge
exports.joinChallenge = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        const alreadyJoined = challenge.participants.some(
            p => p.userId.toString() === req.user.id
        );
        if (alreadyJoined) return res.status(400).json({ message: "Already joined" });

        challenge.participants.push({ userId: req.user.id, score: 0 });
        await challenge.save();

        res.json({ message: "Joined challenge successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id)
            .populate('participants.userId', 'username')
            .lean();

        if (!challenge) return res.status(404).json({ message: "Challenge not found" });

        const leaderboard = challenge.participants
            .sort((a, b) => b.score - a.score)
            .map((p, index) => ({
                rank: index + 1,
                username: p.userId.username,
                score: p.score
            }));

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
