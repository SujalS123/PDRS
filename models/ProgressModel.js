const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    weight: {
        type: Number, // User's weight in kg
        required: true
    },
    calorieIntake: {
        type: Number, // Calories consumed per day
        required: true
    },
    proteinIntake: {
        type: Number, // Protein consumed (in grams)
        required: true
    },
    carbsIntake: {
        type: Number, // Carbohydrates intake (in grams)
        required: true
    },
    fatIntake: {
        type: Number, // Fat intake (in grams)
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically store entry date
    }
});

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
