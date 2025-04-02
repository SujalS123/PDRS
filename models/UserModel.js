const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    weight: { type: Number },
    height: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    activityLevel: { type: String, default: "Moderate" },
    preferences: {
        dietType: { type: String, default: "Balanced" },
        allergies: [{ type: String }],
        dislikedFoods: [{ type: String }]
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
