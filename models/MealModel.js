/**
 * Meal Model
 * 
 * @module models/MealModel
 * @requires mongoose
 */

const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required']
    },
    mealType: { 
        type: String, 
        enum: {
            values: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
            message: 'Invalid meal type'
        },
        required: [true, 'Meal type is required']
    },
    foodItems: [
        {
            name: { 
                type: String, 
                required: [true, 'Food item name is required'],
                trim: true
            },
            calories: { 
                type: Number, 
                required: [true, 'Calories are required'],
                min: [0, 'Calories cannot be negative']
            },
            protein: { 
                type: Number, 
                required: [true, 'Protein content is required'],
                min: [0, 'Protein cannot be negative']
            },
            carbs: { 
                type: Number, 
                required: [true, 'Carbohydrate content is required'],
                min: [0, 'Carbohydrates cannot be negative']
            },
            fats: { 
                type: Number, 
                required: [true, 'Fat content is required'],
                min: [0, 'Fats cannot be negative']
            }
        }
    ],
    totalCalories: { 
        type: Number, 
        required: [true, 'Total calories are required'],
        min: [0, 'Total calories cannot be negative']
    },
    totalProtein: { 
        type: Number, 
        required: [true, 'Total protein is required'],
        min: [0, 'Total protein cannot be negative']
    },
    totalCarbs: { 
        type: Number, 
        required: [true, 'Total carbohydrates are required'],
        min: [0, 'Total carbohydrates cannot be negative']
    },
    totalFats: { 
        type: Number, 
        required: [true, 'Total fats are required'],
        min: [0, 'Total fats cannot be negative']
    },
    date: { 
        type: Date, 
        default: Date.now,
        required: [true, 'Date is required']
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating meal macros percentage
MealSchema.virtual('macrosPercentage').get(function() {
    const total = this.totalProtein + this.totalCarbs + this.totalFats;
    if (total === 0) return null;
    
    return {
        protein: ((this.totalProtein / total) * 100).toFixed(2),
        carbs: ((this.totalCarbs / total) * 100).toFixed(2),
        fats: ((this.totalFats / total) * 100).toFixed(2)
    };
});

const Meal = mongoose.model('Meal', MealSchema);
module.exports = Meal;
