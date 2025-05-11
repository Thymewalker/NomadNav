# NomadNav Backend

This is the backend server for the NomadNav application, built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nomadnav
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Prices
- GET `/api/prices` - Get all prices (with optional filtering)
- GET `/api/prices/:id` - Get a single price
- POST `/api/prices` - Create a new price report
- PATCH `/api/prices/:id` - Update a price report
- DELETE `/api/prices/:id` - Delete a price report

### Countries
- GET `/api/countries` - Get all countries
- GET `/api/countries/:code` - Get a single country
- POST `/api/countries` - Create a new country (admin only)
- PATCH `/api/countries/:code` - Update a country (admin only)
- DELETE `/api/countries/:code` - Delete a country (admin only)

## Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required)
- role (String, enum: ['user', 'admin'], default: 'user')

### Price
- country (String, required)
- category (String, required, enum: ['Transport', 'Food', 'Accommodation', 'Activities', 'Shopping', 'Other'])
- item (String, required)
- price (Number, required)
- currency (String, required)
- location (String, required)
- notes (String)
- reportedBy (ObjectId, ref: 'User')

### Country
- name (String, required)
- code (String, required, unique)
- currency (String, required)
- language (String, required)
- emergencyNumbers (Object)
- visaRequirements (String, required)
- guides (Array)
- transport (Array)
- hagglingTips (Array)

## Development

The backend uses:
- Express.js for the server
- MongoDB with Mongoose for the database
- JWT for authentication
- bcrypt for password hashing
- cors for cross-origin resource sharing
- dotenv for environment variables 