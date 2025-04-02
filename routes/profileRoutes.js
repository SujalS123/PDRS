const express = require('express');
const User = require('../models/UserModel');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware for authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Get User Profile
router.get('/user-profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update Profile
router.post('/update-profile', authenticate, async (req, res) => {
    try {
        const { name, age, weight, height, gender, activityLevel } = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            name, age, weight, height, gender, activityLevel
        }, { new: true }).select('-password');

        res.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Update Diet Preferences
router.post('/update-preferences', authenticate, async (req, res) => {
    try {
        const { dietType, allergies, dislikedFoods } = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.userId, {
            "preferences.dietType": dietType,
            "preferences.allergies": allergies,
            "preferences.dislikedFoods": dislikedFoods
        }, { new: true }).select('-password');

        res.json({ message: "Preferences updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
