const User = require('../models/UserModel');

// Read (Get) user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password');
      
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { password, email, ...updateData } = req.body;
    
    // Map the allowed fields according to the UserModel schema
    const allowedUpdates = {
      name: updateData.name,
      age: updateData.age,
      weight: updateData.weight,
      height: updateData.height,
      gender: updateData.gender,
      activityLevel: updateData.activityLevel,
      dietarypreferences: updateData.dietarypreferences,
      waterIntake: updateData.waterIntake,
      goal: updateData.goal
    };
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      allowedUpdates,
      { 
        new: true,
        runValidators: true 
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
