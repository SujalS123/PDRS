# Controller Documentation

## Auth Controller

### Methods
- `registerUser(req, res)`
  - Registers a new user
  - Hashes password
  - Generates JWT token
  - Returns user data and token

- `loginUser(req, res)`
  - Authenticates user
  - Verifies password
  - Generates JWT token
  - Returns user data and token

## Profile Controller

### Methods
- `getProfile(req, res)`
  - Retrieves user profile
  - Excludes sensitive data
  - Populates related data

- `updateProfile(req, res)`
  - Updates user profile
  - Validates input data
  - Handles file uploads
  - Returns updated profile

- `deleteProfile(req, res)`
  - Deletes user profile
  - Removes related data
  - Returns success message

## Meal Controller

### Methods
- `getMeals(req, res)`
  - Retrieves user's meals
  - Supports filtering
  - Returns paginated results

- `createMeal(req, res)`
  - Creates new meal
  - Validates input
  - Calculates totals
  - Returns created meal

- `updateMeal(req, res)`
  - Updates existing meal
  - Validates input
  - Recalculates totals
  - Returns updated meal

- `deleteMeal(req, res)`
  - Deletes meal
  - Returns success message

## Progress Controller

### Methods
- `getProgress(req, res)`
  - Retrieves user progress
  - Supports date range
  - Returns progress data

- `createProgress(req, res)`
  - Creates progress entry
  - Validates input
  - Returns created entry

- `getNutritionSummary(req, res)`
  - Calculates nutrition summary
  - Returns aggregated data

## Error Handling
All controllers use the centralized error handling middleware:
- Validation errors return 400
- Authentication errors return 401
- Not found errors return 404
- Server errors return 500

## Response Format
All controllers return consistent response formats:
```javascript
// Success Response
{
    success: true,
    data: { ... }
}

// Error Response
{
    success: false,
    error: 'Error message'
}
```

## Authentication
Protected routes use the auth middleware:
```javascript
router.get('/protected', authMiddleware, controller.method);
```

## Input Validation
All controllers validate input data:
- Required fields
- Data types
- Value ranges
- Format validation

## Best Practices
- Consistent error handling
- Input validation
- Proper status codes
- Secure data handling
- Clean code structure 