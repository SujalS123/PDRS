const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/auth');

// Get User Profile
router.get('/user-profile', authMiddleware, profileController.getProfile);

// Update Profile
router.put('/update-profile', authMiddleware, profileController.updateProfile);

// Delete Profile
router.delete('/delete-profile', authMiddleware, profileController.deleteProfile);

module.exports = router;
