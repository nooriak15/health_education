#!/bin/bash

# Start the backend server in the background
cd backend
python main.py &
BACKEND_PID=$!

# Start the frontend server
cd ../frontend
npm run dev

# When frontend is stopped, also stop the backend
kill $BACKEND_PID 