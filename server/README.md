
# Quiz App Backend

This is the backend server for the Quiz App project. It provides RESTful APIs for managing users, questions, and quiz sessions.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bharatbhusal/online-quiz-maker.git
   ```

2. **Install dependencies:**

   ```bash
   cd online-quiz-maker/server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and define the following variables:

   ```plaintext
   PORT=8081
   MONGO_CONNECTION_STRING=<your-mongodb-uri>
   ACCESS_TOKEN_SECRECT=<your-secret-key-for-jwt>
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

   The server will start running on the specified port.
## API Endpoints

- **POST /users/register**

  Registers a new user. Requires `email` and `password` in the request body.

- **POST /users/login**

  Logs in an existing user. Requires `email` and `password` in the request body. Returns a JWT token.

- **GET /questions/categories**

  Retrieves a list of unique question categories.

- **GET /questions/category/:category**

  Retrieves questions for a specific category.

- **POST /questions**

  Creates a new question. Requires `question`, `category`, `options`, and `isCorrect` in the request body.

- **GET /quiz/:category**

  Starts a quiz session for the specified category.


## Authentication

This backend uses JSON Web Tokens (JWT) for authentication. When a user logs in successfully, a JWT token is generated and sent back in the response. This token should be included in the `Authorization` header for protected routes.

## Database Schema

The backend uses MongoDB as its database. The schema includes collections for users and questions.

- **User Schema:**

  ```javascript
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            require: true,
            default: 'user'
        }
    }

  ```

- **Question Schema:**

  ```javascript
    {
        question: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        creator: {
            type: String,
            required: true
        },
        options: [{
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }]
    }
  ```
