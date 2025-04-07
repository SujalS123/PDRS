# Model Documentation

## User Model

### Schema Definition
```javascript
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
    // ... other fields
});
```

### Virtual Fields
- `bmi`: Calculates Body Mass Index
- `dailyCalorieNeeds`: Calculates daily calorie requirements based on BMR and activity level

### Relationships
- One-to-Many with Meal model
- One-to-Many with Progress model

## Meal Model

### Schema Definition
```javascript
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
    // ... other fields
});
```

### Virtual Fields
- `macrosPercentage`: Calculates the percentage distribution of macronutrients

### Relationships
- Many-to-One with User model

## Progress Model

### Schema Definition
```javascript
const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required'],
        min: [20, 'Weight must be at least 20kg'],
        max: [500, 'Weight must be less than 500kg']
    },
    // ... other fields
});
```

### Virtual Fields
- `macrosPercentage`: Calculates the percentage distribution of macronutrients

### Indexes
- Compound index on `userId` and `createdAt` for efficient querying

### Relationships
- Many-to-One with User model

## Model Methods

### User Model Methods
- `calculateBMI()`: Calculates BMI
- `calculateCalorieNeeds()`: Calculates daily calorie requirements

### Meal Model Methods
- `calculateMacros()`: Calculates macronutrient percentages
- `updateTotals()`: Updates total nutritional values

### Progress Model Methods
- `calculateMacros()`: Calculates macronutrient percentages
- `getTrend()`: Calculates progress trends

## Validation Rules

### User Model
- Name: Required, trimmed
- Email: Required, unique, valid format
- Password: Required, min 6 characters
- Age: Optional, 13-120
- Weight: Optional, 20-500 kg
- Height: Optional, 100-300 cm

### Meal Model
- User ID: Required, valid ObjectId
- Meal Type: Required, enum
- Food Items: Required array
- Nutritional Values: Required, non-negative

### Progress Model
- User ID: Required, valid ObjectId
- Weight: Required, 20-500 kg
- Nutritional Values: Required, non-negative
- Notes: Optional, max 500 characters 