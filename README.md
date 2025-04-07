# Dietrium Backend

Dietrium is a comprehensive diet tracking and nutrition management application. This repository contains the backend implementation built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Profile management
- Meal tracking and nutrition logging
- Progress monitoring
- Daily nutrition summaries
- Data visualization
- Secure API endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **File Storage**: Local/Multer
- **Testing**: Jest
- **Documentation**: Markdown

## Project Structure

```
Backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── utils/           # Utility functions
├── docs/            # Documentation
├── tests/           # Test files
└── uploads/         # File uploads
```

## Documentation

- [API Documentation](docs/api.md)
- [Configuration Guide](docs/configuration.md)
- [Deployment Guide](docs/deployment.md)
- [Testing Guide](docs/testing.md)
- [Middleware Documentation](docs/middleware.md)
- [Models Documentation](docs/models.md)

## Getting Started

### Prerequisites

- Node.js v16 or higher
- MongoDB v4.4 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/dietrium.git
cd dietrium/Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update environment variables in `.env`

5. Start the development server:
```bash
npm run dev
```

## Development

### Scripts

- `npm run dev`: Start development server
- `npm run start`: Start production server
- `npm run test`: Run tests
- `npm run lint`: Run linter
- `npm run build`: Build for production

### Code Style

- Follow ESLint configuration
- Use Prettier for formatting
- Follow JavaScript Standard Style

## API Endpoints

### Authentication
- `POST /auth/register`: Register new user
- `POST /auth/login`: User login

### Profile
- `GET /profile`: Get user profile
- `PUT /profile`: Update profile

### Meals
- `GET /meals`: Get all meals
- `POST /meals`: Add new meal
- `PUT /meals/:id`: Update meal
- `DELETE /meals/:id`: Delete meal

### Progress
- `GET /progress`: Get progress entries
- `POST /progress`: Add progress entry
- `GET /progress/nutrition`: Get daily nutrition

## Security

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- Secure headers

## Testing

- Unit tests with Jest
- Integration tests
- End-to-end tests
- Test coverage reporting

## Deployment

### Requirements
- Node.js v16+
- MongoDB v4.4+
- 2GB RAM minimum
- 20GB storage minimum

### Methods
1. Manual deployment
2. Docker deployment
3. Kubernetes deployment

See [Deployment Guide](docs/deployment.md) for detailed instructions.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@dietrium.com or create an issue in the repository.

## Acknowledgments

- Express.js team
- MongoDB team
- Open source contributors