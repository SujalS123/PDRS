# Middleware Documentation

## Authentication Middleware

### Purpose
- Verifies JWT tokens
- Attaches user data to request
- Protects routes

### Usage
```javascript
const authMiddleware = require('../middleware/auth');

router.get('/protected', authMiddleware, controller.method);
```

### Implementation
```javascript
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
```

## Error Handling Middleware

### Purpose
- Centralizes error handling
- Provides consistent error responses
- Logs errors

### Usage
```javascript
const errorMiddleware = require('../middleware/errorHandler');

app.use(errorMiddleware);
```

### Implementation
```javascript
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(error => error.message).join(', ');
    }
    // ... other error types

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
```

## Error Types Handled
- Validation Errors (400)
- Authentication Errors (401)
- Authorization Errors (403)
- Not Found Errors (404)
- Database Errors (500)
- JWT Errors (401)
- Cast Errors (400)
- Duplicate Key Errors (400)

## Development vs Production
- Development: Includes stack traces
- Production: Sanitized error messages

## Best Practices
- Centralized error handling
- Proper status codes
- Consistent error format
- Secure error messages
- Error logging

## Custom Error Classes
```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
```

## Usage Example
```javascript
// In controllers
if (!user) {
    throw new AppError('User not found', 404);
}

// In routes
try {
    // ... code
} catch (error) {
    next(error);
}
```

## Error Response Format
```javascript
// Development
{
    success: false,
    error: 'Error message',
    stack: 'Error stack trace'
}

// Production
{
    success: false,
    error: 'Error message'
}
``` 