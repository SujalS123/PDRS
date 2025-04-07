const Meal = require('../models/MealModel');

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({}); // Or add filters based on user preference
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logMeal = async (req, res) => {
  const { mealName, calories } = req.body;

  try {
    const meal = await Meal.create({
      user: req.user.userId,
      mealName,
      calories,
      date: new Date(),
    });

    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
