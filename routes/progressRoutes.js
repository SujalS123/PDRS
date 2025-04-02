const express = require("express");
const router = express.Router();
const ProgressController = require("../controllers/progressController");

// Route to get daily nutritional summary
router.get("/nutrition-summary", ProgressController.getNutritionSummary);

// Route to get user progress (e.g., weight trends)
router.get("/user-progress", ProgressController.getUserProgress);

module.exports = router;
