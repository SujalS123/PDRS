const Progress = require('../models/ProgressModel');

// Fetch daily nutritional intake
exports.getNutritionSummary = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming authentication middleware
        const summary = await Progress.findOne({ userId });

        if (!summary) {
            return res.status(404).json({ message: "No nutrition data found." });
        }

        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Fetch user progress (e.g., weight trends)
exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.user.id;
        const progress = await Progress.find({ userId });

        if (!progress) {
            return res.status(404).json({ message: "No progress data found." });
        }

        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
