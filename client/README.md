
# Frontend Documentation

Welcome to the frontend documentation of Online quiz maker project. This document provides detailed information on setting up, running, and contributing to the frontend development of our project.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Folder Structure](#folder-structure)
5. [Available Scripts](#available-scripts)
6. [Deployment](#deployment)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

This frontend application is built using React.js, a popular JavaScript library for building user interfaces. It provides an interactive user interface for our project, allowing users to perform various actions such as registering, logging in, viewing questions, attempting quizzes, and more.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- Access to the backend API endpoints

## Getting Started

To get started with the frontend development environment, follow these steps:

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/bharatbhusal/online-quiz-maker.git
```

### Navigate to the Frontend Directory

Navigate to the `frontend` directory of the project:

```bash
cd online-quiz-maker/client
```

### Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

### Start the Development Server

Start the development server to run the frontend application locally:

```bash
npm start
```

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Folder Structure

The folder structure of the frontend project is organized as follows:

```
frontend/
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   │   ├── ErrorBox.jsx
  │   │   ├── Question.jsx
  │   │   └── SuccessBox.jsx
  │   ├── context/
  │   │   ├── QuestionsContext.js
  │   │   ├── useQuestionContext.js
  │   │   ├── UserContext.js
  │   │   └── useUserContext.js
  │   ├── pages/
  │   │   ├── 404NotFound.jsx
  │   │   ├── CategorySelection.jsx
  │   │   ├── CreateQuestion.jsx
  │   │   ├── Login.jsx
  │   │   ├── QuizAttempt.jsx
  │   │   └── Register.jsx
  │   ├── styles/
  │   │   ├── login.css
  │   │   ├── quizAttempt.css
  │   │   └── ...
  │   ├── App.jsx
  │   └── index.js
  |───.env
  |───.gitignore
  |───package.json
  └── README.md
```

## Available Scripts

In the frontend project directory, you can run the following scripts:

- `npm start`: Starts the development server.
- `npm run build`: Builds the application for production.

## Deployment

The frontend application can be deployed to various hosting platforms such as Netlify, Vercel, GitHub Pages, etc. Refer to the documentation of the respective hosting platform for deployment instructions.

## Contributing

We welcome contributions from the community. To contribute to the frontend development of this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.
