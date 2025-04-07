/**
 * User Model
 * 
 * @module models/UserModel
 * @requires mongoose
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    age: { 
        type: Number,
        min: [13, 'Age must be at least 13'],
        max: [120, 'Age must be less than 120']
    },
    weight: { 
        type: Number,
        min: [20, 'Weight must be at least 20kg'],
        max: [500, 'Weight must be less than 500kg']
    },
    height: { 
        type: Number,
        min: [100, 'Height must be at least 100cm'],
        max: [300, 'Height must be less than 300cm']
    },
    gender: { 
        type: String, 
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: 'Gender must be Male, Female, or Other'
        }
    },
    activityLevel: { 
        type: String, 
        enum: {
            values: ['Sedentary', 'Light', 'Moderate', 'Active', 'Very Active'],
            message: 'Invalid activity level'
        },
        default: "Moderate"
    },
    dietaryPreferences: {
        type: String,
        enum: {
            values: ['Non-Vegetarian', 'Vegetarian', 'Vegan', 'Keto', 'High-Protein', 'Gluten-Free', 'Other'],
            message: 'Invalid dietary preference'
        }
    },
    waterIntake: { 
        type: String,
        enum: {
            values: ['1-L', '2-L', '3-L', '4-L', '5-L+'],
            message: 'Invalid water intake level'
        },
        default: "2-L"
    },
    goal: { 
        type: String,
        enum: {
            values: ['Gain Muscle', 'Lose Weight', 'Improve Overall Health', 'Increase Stamina', 'Eat Healthier'],
            message: 'Invalid goal'
        }
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for calculating BMI
UserSchema.virtual('bmi').get(function() {
    if (this.height && this.weight) {
        return (this.weight / Math.pow(this.height / 100, 2)).toFixed(2);
    }
    return null;
});

// Virtual for calculating daily calorie needs
UserSchema.virtual('dailyCalorieNeeds').get(function() {
    if (this.age && this.weight && this.height && this.gender && this.activityLevel) {
        // Basic BMR calculation (Harris-Benedict equation)
        let bmr;
        if (this.gender === 'Male') {
            bmr = 88.362 + (13.397 * this.weight) + (4.799 * this.height) - (5.677 * this.age);
        } else {
            bmr = 447.593 + (9.247 * this.weight) + (3.098 * this.height) - (4.330 * this.age);
        }

        // Activity level multipliers
        const activityMultipliers = {
            'Sedentary': 1.2,
            'Light': 1.375,
            'Moderate': 1.55,
            'Active': 1.725,
            'Very Active': 1.9
        };

        return Math.round(bmr * activityMultipliers[this.activityLevel]);
    }
    return null;
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
