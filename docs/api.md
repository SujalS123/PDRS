# API Documentation

## Base URL
```
https://api.dietrium.com/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### User Profile

#### Get Profile
```http
GET /profile
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://...",
    "height": 180,
    "weight": 75,
    "age": 30,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "weight_loss"
  }
}
```

#### Update Profile
```http
PUT /profile
```

**Request Body:**
```json
{
  "name": "John Doe",
  "height": 180,
  "weight": 75,
  "age": 30,
  "gender": "male",
  "activityLevel": "moderate",
  "goal": "weight_loss"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "height": 180,
    "weight": 75,
    "age": 30,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "weight_loss"
  }
}
```

### Meals

#### Get All Meals
```http
GET /meals
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `date` (optional): Filter by date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  },
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "mealType": "breakfast",
      "foodItems": [
        {
          "name": "Oatmeal",
          "calories": 150,
          "protein": 5,
          "carbs": 27,
          "fats": 3
        }
      ],
      "totalCalories": 150,
      "date": "2024-01-01"
    }
  ]
}
```

#### Add Meal
```http
POST /meals
```

**Request Body:**
```json
{
  "mealType": "breakfast",
  "foodItems": [
    {
      "name": "Oatmeal",
      "calories": 150,
      "protein": 5,
      "carbs": 27,
      "fats": 3
    }
  ],
  "date": "2024-01-01"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "mealType": "breakfast",
    "foodItems": [
      {
        "name": "Oatmeal",
        "calories": 150,
        "protein": 5,
        "carbs": 27,
        "fats": 3
      }
    ],
    "totalCalories": 150,
    "date": "2024-01-01"
  }
}
```

#### Update Meal
```http
PUT /meals/:id
```

**Request Body:**
Same as Add Meal

**Response:**
Updated meal object

#### Delete Meal
```http
DELETE /meals/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Meal deleted successfully"
}
```

### Progress

#### Get Progress
```http
GET /progress
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `startDate` (optional): Filter start date (YYYY-MM-DD)
- `endDate` (optional): Filter end date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "count": 30,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "weight": 75,
      "date": "2024-01-01",
      "notes": "Feeling good"
    }
  ]
}
```

#### Add Progress Entry
```http
POST /progress
```

**Request Body:**
```json
{
  "weight": 75,
  "date": "2024-01-01",
  "notes": "Feeling good"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "weight": 75,
    "date": "2024-01-01",
    "notes": "Feeling good"
  }
}
```

#### Get Daily Nutrition
```http
GET /progress/nutrition
```

**Query Parameters:**
- `date` (optional): Date to get nutrition for (YYYY-MM-DD, default: today)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCalories": 2000,
    "totalProtein": 150,
    "totalCarbs": 200,
    "totalFats": 70,
    "meals": [
      {
        "mealType": "breakfast",
        "calories": 500,
        "protein": 30,
        "carbs": 60,
        "fats": 20
      }
    ]
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

### Authentication Error (401)
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Authorization Error (403)
```json
{
  "success": false,
  "error": "Access denied"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Headers included in response:
  - `X-RateLimit-Limit`: Maximum requests per window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time until limit resets

## Pagination

All list endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Filtering

Supported filter parameters:
- `date`: Filter by date (YYYY-MM-DD)
- `startDate`: Filter by date range start
- `endDate`: Filter by date range end
- `mealType`: Filter meals by type

## Sorting

Supported sort parameters:
- `date`: Sort by date (asc/desc)
- `calories`: Sort by calories (asc/desc)
- `weight`: Sort by weight (asc/desc)

Example:
```
GET /meals?sort=date:desc
```

## Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "data": { ... }
}
```

List responses include count and pagination:
```json
{
  "success": true,
  "count": 100,
  "pagination": { ... },
  "data": [ ... ]
}
``` 