/**
 * Progress Model
 * 
 * @module models/ProgressModel
 * @requires mongoose
 */

const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: [true, 'User ID is required']
    },
    weight: {
        type: Number, // User's weight in kg
        required: [true, 'Weight is required'],
        min: [20, 'Weight must be at least 20kg'],
        max: [500, 'Weight must be less than 500kg']
    },
    calorieIntake: {
        type: Number, // Calories consumed per day
        required: [true, 'Calorie intake is required'],
        min: [0, 'Calorie intake cannot be negative']
    },
    proteinIntake: {
        type: Number, // Protein consumed (in grams)
        required: [true, 'Protein intake is required'],
        min: [0, 'Protein intake cannot be negative']
    },
    carbsIntake: {
        type: Number, // Carbohydrates intake (in grams)
        required: [true, 'Carbohydrate intake is required'],
        min: [0, 'Carbohydrate intake cannot be negative']
    },
    fatIntake: {
        type: Number, // Fat intake (in grams)
        required: [true, 'Fat intake is required'],
        min: [0, 'Fat intake cannot be negative']
    },
    waterIntake: {
        type: Number,
        required: [true, 'Water intake is required'],
        min: [0, 'Water intake cannot be negative']
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: [true, 'Creation date is required']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating macros percentage
ProgressSchema.virtual('macrosPercentage').get(function() {
    const total = this.proteinIntake + this.carbsIntake + this.fatIntake;
    if (total === 0) return null;
    
    return {
        protein: ((this.proteinIntake / total) * 100).toFixed(2),
        carbs: ((this.carbsIntake / total) * 100).toFixed(2),
        fats: ((this.fatIntake / total) * 100).toFixed(2)
    };
});

// Index for faster queries
ProgressSchema.index({ userId: 1, createdAt: -1 });

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
