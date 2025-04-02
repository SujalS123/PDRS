const express = require('express');
const router = express.Router();
const Meal = require('../models/MealModel');
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

// ✅ **1. Log a Meal (POST /log-meal)**
router.post('/log-meal', authenticate, async (req, res) => {
    try {
        const { mealType, foodItems } = req.body;

        if (!mealType || !foodItems || foodItems.length === 0) {
            return res.status(400).json({ message: "Meal type and food items are required" });
        }

        let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;

        foodItems.forEach(item => {
            totalCalories += item.calories;
            totalProtein += item.protein;
            totalCarbs += item.carbs;
            totalFats += item.fats;
        });

        const meal = new Meal({
            userId: req.userId,
            mealType,
            foodItems,
            totalCalories,
            totalProtein,
            totalCarbs,
            totalFats
        });

        await meal.save();
        res.status(201).json({ message: "Meal logged successfully", meal });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ✅ **2. Get Meal History (GET /meal-history)**
router.get('/meal-history', authenticate, async (req, res) => {
    try {
        const meals = await Meal.find({ userId: req.userId }).sort({ date: -1 });
        res.json(meals);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// ✅ **3. Delete a Meal (DELETE /delete-meal/:id)**
router.delete('/delete-meal/:id', authenticate, async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);

        if (!meal) {
            return res.status(404).json({ message: "Meal not found" });
        }

        if (meal.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Not authorized to delete this meal" });
        }

        await Meal.findByIdAndDelete(req.params.id);
        res.json({ message: "Meal deleted successfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
