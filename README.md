# QuizApp
# Quiz App with Webcam Backend Integration

This project is a combination of a frontend quiz application and a backend server that serves quiz questions from a MySQL database. The frontend is built using React, and the backend is implemented using Node.js and Express.js. The backend connects to a MySQL database to retrieve and store quiz questions.

## Features

- Frontend quiz app with a user-friendly interface.
- Real-time webcam-based quiz with face and eye detection.
- Questions retrieved from a MySQL database on the backend.
- Users can answer multiple-choice questions and see their score.
- Questions are randomly shuffled to enhance user experience.

## Backend

### Setup

1. Install Node.js and npm if not already installed.
2. Clone this repository to your local machine.

git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend
Install the required npm packages.

npm install
Set up a MySQL database with the name "quiz" and configure the database connection in backend/index.js.

Start the backend server.


npm start
The backend server will run on port 8800 by default. Make sure the backend server is up and running before starting the frontend.

Frontend
Setup
Navigate to the project root directory.

cd your-repo
Install the required npm packages.
npm install

Start the React development server.

npm start
The frontend server will run on port 3000 by default. You can access the quiz app in your web browser at http://localhost:3000.

Usage
Launch the quiz app from the frontend, and you will see random multiple-choice questions fetched from the backend.
The webcam will be activated to track user engagement during the quiz.
Answer the questions by selecting options.
Click the "Next" button to move to the next question.
At the end of the quiz, you will see your final score.
