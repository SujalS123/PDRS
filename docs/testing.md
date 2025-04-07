# Testing Documentation

## Setup

### Dependencies
Add the following to your `package.json`:
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "mongodb-memory-server": "^8.0.0"
  }
}
```

### Test Environment
Create a `.env.test` file:
```env
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/dietrium-test
JWT_SECRET=test_secret
```

## Test Structure

### Directory Structure
```
Backend/
├── tests/
│   ├── __tests__/
│   │   ├── auth.test.js
│   │   ├── user.test.js
│   │   ├── meal.test.js
│   │   └── progress.test.js
│   ├── setup/
│   │   ├── jest.setup.js
│   │   └── testUtils.js
│   └── fixtures/
│       ├── users.js
│       ├── meals.js
│       └── progress.js
```

## Test Categories

### 1. Unit Tests
```javascript
// Example: auth.test.js
const { generateToken, verifyToken } = require('../../utils/auth');

describe('Token Generation', () => {
    test('should generate valid JWT token', () => {
        const token = generateToken('test_user_id');
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
    });
});
```

### 2. Integration Tests
```javascript
// Example: meal.test.js
const request = require('supertest');
const app = require('../../app');
const Meal = require('../../models/MealModel');

describe('Meal API', () => {
    test('should create a new meal', async () => {
        const response = await request(app)
            .post('/api/meals')
            .set('Authorization', `Bearer ${testToken}`)
            .send(testMealData);

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
    });
});
```

### 3. End-to-End Tests
```javascript
// Example: user.test.js
describe('User Flow', () => {
    test('should complete user registration and login', async () => {
        // Register
        const registerResponse = await request(app)
            .post('/api/auth/register')
            .send(testUserData);

        // Login
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUserData.email,
                password: testUserData.password
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.token).toBeDefined();
    });
});
```

## Test Utilities

### Test Database Setup
```javascript
// jest.setup.js
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongod.getUri();
});

afterAll(async () => {
    await mongod.stop();
});
```

### Test Helpers
```javascript
// testUtils.js
const User = require('../../models/UserModel');

const createTestUser = async (userData) => {
    return await User.create(userData);
};

const getTestToken = async (user) => {
    return generateToken(user._id);
};

module.exports = {
    createTestUser,
    getTestToken
};
```

## Test Fixtures

### User Fixtures
```javascript
// fixtures/users.js
module.exports = {
    validUser: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
    },
    invalidUser: {
        name: '',
        email: 'invalid',
        password: '123'
    }
};
```

### Meal Fixtures
```javascript
// fixtures/meals.js
module.exports = {
    validMeal: {
        mealType: 'breakfast',
        foodItems: [
            {
                name: 'Oatmeal',
                calories: 150,
                protein: 5,
                carbs: 27,
                fats: 3
            }
        ],
        date: '2024-01-01'
    }
};
```

## Running Tests

### Scripts
Add to `package.json`:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Best Practices

1. **Test Organization**
   - Group related tests in describe blocks
   - Use clear, descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)

2. **Test Isolation**
   - Each test should be independent
   - Clean up after each test
   - Use beforeEach/afterEach for setup/teardown

3. **Test Coverage**
   - Aim for 80%+ coverage
   - Focus on critical paths
   - Test edge cases and error conditions

4. **Performance**
   - Use mock databases for tests
   - Avoid unnecessary API calls
   - Clean up resources properly

5. **Maintenance**
   - Keep tests up to date
   - Document test requirements
   - Review test coverage regularly

## Common Test Patterns

### Authentication Tests
```javascript
describe('Authentication', () => {
    test('should reject invalid credentials', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'wrong@example.com',
                password: 'wrong'
            });

        expect(response.status).toBe(401);
    });
});
```

### Validation Tests
```javascript
describe('User Validation', () => {
    test('should reject invalid email format', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'invalid-email',
                password: 'password123'
            });

        expect(response.status).toBe(400);
    });
});
```

### Authorization Tests
```javascript
describe('Protected Routes', () => {
    test('should reject unauthenticated requests', async () => {
        const response = await request(app)
            .get('/api/profile');

        expect(response.status).toBe(401);
    });
});
```

## Mocking

### External Services
```javascript
jest.mock('../../services/emailService', () => ({
    sendEmail: jest.fn().mockResolvedValue(true)
}));
```

### Database Operations
```javascript
jest.mock('../../models/UserModel', () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));
```

## Continuous Integration

### GitHub Actions
```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
``` 