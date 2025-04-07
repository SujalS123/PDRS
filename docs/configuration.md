# Configuration Documentation

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dietrium
MONGODB_USER=your_username
MONGODB_PASS=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d

# File Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=uploads

# Email Configuration (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

## Database Configuration

### MongoDB Connection
```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));
```

### Indexes
- User: email (unique)
- Meal: userId, date
- Progress: userId, date

## Security Configuration

### JWT Setup
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};
```

### Password Hashing
```javascript
const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
```

## File Upload Configuration

### Multer Setup
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE)
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});
```

## CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
```

## Error Handling Configuration

### Global Error Handler
```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});
```

## Logging Configuration

### Winston Logger Setup
```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
```

## Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Development vs Production

### Development
- Detailed error messages
- Stack traces
- Console logging
- No caching
- Slower security measures

### Production
- Sanitized error messages
- No stack traces
- File logging
- Caching enabled
- Strict security measures

## Best Practices

1. **Environment Variables**
   - Never commit .env file
   - Use different values for development and production
   - Keep sensitive data secure

2. **Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Validate all inputs
   - Sanitize user data
   - Use secure headers

3. **Performance**
   - Enable compression
   - Implement caching
   - Use proper indexes
   - Optimize queries
   - Monitor memory usage

4. **Error Handling**
   - Log all errors
   - Use proper status codes
   - Provide helpful messages
   - Implement retry logic
   - Monitor error rates

5. **Code Organization**
   - Follow consistent patterns
   - Use proper naming conventions
   - Document all configurations
   - Keep configurations separate
   - Use environment-specific settings 