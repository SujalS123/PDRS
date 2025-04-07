# Routes Documentation

## Authentication Routes

### Register User
- **POST** `/api/auth/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Login User
- **POST** `/api/auth/login`
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

## User Profile Routes

### Get User Profile
- **GET** `/api/profile`
- **Description**: Get current user's profile
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "profilePicture": "string",
      "height": "number",
      "weight": "number",
      "age": "number",
      "gender": "string",
      "activityLevel": "string",
      "goal": "string"
    }
  }
  ```

### Update User Profile
- **PUT** `/api/profile`
- **Description**: Update user profile information
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "height": "number",
    "weight": "number",
    "age": "number",
    "gender": "string",
    "activityLevel": "string",
    "goal": "string"
  }
  ```
- **Response**: Updated user profile

## Meal Routes

### Get All Meals
- **GET** `/api/meals`
- **Description**: Get all meals for current user
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `date`: Filter by date (YYYY-MM-DD)
- **Response**:
  ```json
  {
    "success": true,
    "count": "number",
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number"
    },
    "data": [
      {
        "id": "string",
        "mealType": "string",
        "foodItems": [
          {
            "name": "string",
            "calories": "number",
            "protein": "number",
            "carbs": "number",
            "fats": "number"
          }
        ],
        "totalCalories": "number",
        "date": "string"
      }
    ]
  }
  ```

### Add Meal
- **POST** `/api/meals`
- **Description**: Add a new meal
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "mealType": "string",
    "foodItems": [
      {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fats": "number"
      }
    ],
    "date": "string"
  }
  ```
- **Response**: Created meal object

### Update Meal
- **PUT** `/api/meals/:id`
- **Description**: Update an existing meal
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: Same as Add Meal
- **Response**: Updated meal object

### Delete Meal
- **DELETE** `/api/meals/:id`
- **Description**: Delete a meal
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Meal deleted successfully"
  }
  ```

## Progress Routes

### Get Progress
- **GET** `/api/progress`
- **Description**: Get user's progress entries
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `startDate`: Filter start date (YYYY-MM-DD)
  - `endDate`: Filter end date (YYYY-MM-DD)
- **Response**:
  ```json
  {
    "success": true,
    "count": "number",
    "data": [
      {
        "id": "string",
        "weight": "number",
        "date": "string",
        "notes": "string"
      }
    ]
  }
  ```

### Add Progress Entry
- **POST** `/api/progress`
- **Description**: Add a new progress entry
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "weight": "number",
    "date": "string",
    "notes": "string"
  }
  ```
- **Response**: Created progress entry

### Get Daily Nutrition
- **GET** `/api/progress/nutrition`
- **Description**: Get daily nutritional summary
- **Headers**: `Authorization: Bearer <token>`
- **Query Parameters**:
  - `date`: Date to get nutrition for (YYYY-MM-DD)
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalCalories": "number",
      "totalProtein": "number",
      "totalCarbs": "number",
      "totalFats": "number",
      "meals": [
        {
          "mealType": "string",
          "calories": "number",
          "protein": "number",
          "carbs": "number",
          "fats": "number"
        }
      ]
    }
  }
  ```

## Error Responses
All routes may return the following error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error 