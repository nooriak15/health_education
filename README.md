# Health Education App

A web application designed to help users identify and understand health misinformation through interactive learning and quizzes.

## Prerequisites

- Python 3.x
- Node.js and npm
- Git

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd health_education
```

2. Set up the backend:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

## Running the Application

The simplest way to run the application is using the provided start script:

```bash
./start.sh
```

This will start both the frontend and backend servers. The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## Manual Start (Alternative)

If you prefer to start the servers separately:

1. Start the backend:
```bash
cd backend
python main.py
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

## Features

- Interactive learning cards with health misinformation detection rules
- Quiz interface for practicing identification of misleading health claims
- Drag-and-drop functionality for categorizing health claims
- Immediate feedback on quiz answers
- Educational explanations for each rule

## Project Structure

- `/frontend`: React application with TypeScript
- `/backend`: Python FastAPI server
- `start.sh`: Script to run both servers simultaneously 