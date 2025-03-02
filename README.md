# GeoGuesser API

A Node.js backend API for a geography trivia game that challenges players to identify locations based on clues. This API handles user management, provides geographic destination challenges, and tracks player scores.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Destination Endpoints](#destination-endpoints)
  - [Seed Endpoint](#seed-endpoint)
- [Data Models](#data-models)
  - [User Model](#user-model)
  - [Destination Model](#destination-model)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)

## 🚀 Features

- **Random Destination Challenge**: Get a random location with multiple-choice options
- **Answer Verification**: Check answers with immediate feedback
- **Fun Facts & Trivia**: Provide interesting information about destinations
- **User Management**: Create users and track their performance
- **Score Tracking**: Keep track of correct and incorrect answers
- **Invitation System**: Generate unique invitation codes for each user

## 💻 Technology Stack

- **Node.js**: JavaScript runtime for building the server
- **Express.js**: Web framework for creating the API endpoints
- **MongoDB**: NoSQL database for storing user data and destinations
- **Mongoose**: MongoDB object modeling for Node.js
- **UUID**: For generating unique invitation codes
- **Dotenv**: For managing environment variables
- **CORS**: Middleware to enable cross-origin resource sharing

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd geoguesser-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see next section)

4. Start the development server:

   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_API_KEY=your_mongodb_connection_string
```

## 📡 API Endpoints

### User Endpoints

- **POST /api/users**

  - Create a new user
  - Body: `{ "username": "string" }`
  - Returns: User object with ID, username, score, and invitation code

- **GET /api/users/invitation/:code**

  - Get user by invitation code
  - Params: `code` - Invitation code
  - Returns: User object with ID, username, and score

- **PATCH /api/users/:id/score**
  - Update a user's score
  - Params: `id` - User ID
  - Body: `{ "correct": number, "incorrect": number }`
  - Returns: Updated user object with new score

### Destination Endpoints

- **GET /api/destinations/random**

  - Get a random destination with multiple-choice options
  - Returns: Destination ID, clue, and multiple-choice options

- **POST /api/destinations/check-answer**
  - Check if an answer is correct and update user score
  - Body: `{ "destinationId": "string", "selectedOption": "string", "userId": "string" }`
  - Returns: Result with isCorrect, correctAnswer, feedback, and destination info

### Seed Endpoint

- **POST /api/seed**
  - Seed the database with initial data (mentioned in code but not shown in detail)

## 📊 Data Models

### User Model

```javascript
{
  username: String,       // Required, unique
  score: {
    correct: Number,      // Default: 0
    incorrect: Number     // Default: 0
  },
  invitationCode: String, // Unique, auto-generated with UUID
  createdAt: Date         // Default: current date
}
```

### Destination Model

```javascript
{
  city: String,
  country: String,
  clues: [String],       // Array of clues about the destination
  trivia: [String],      // Array of trivia facts (shown when answer is incorrect)
  fun_fact: [String]     // Array of fun facts (shown when answer is correct)
}
```

## ⚠️ Error Handling

The API implements consistent error handling with appropriate HTTP status codes:

- **400**: Bad Request - Missing required fields
- **404**: Not Found - Resource not found
- **409**: Conflict - Username already taken
- **500**: Server Error - Unexpected errors

## 🔮 Future Improvements

- Add authentication with JWT
- Implement rate limiting for API endpoints
- Add difficulty levels for destinations
- Create leaderboards and social features
- Expand destination database with more locations and clues
- Implement image clues in addition to text clues
