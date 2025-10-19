#!/bin/bash

# Bash script to run all microservices in the background

echo "Starting all microservices..."

# Start User Microservice on port 3001
cd "User Microservice" && node app.js &
USER_PID=$!
echo "User Microservice started (PID: $USER_PID)"

# Start Chat Microservice on port 3002 (assuming, as per context)
cd "../Chat Microservice" && node app.js &
CHAT_PID=$!
echo "Chat Microservice started (PID: $CHAT_PID)"

# Start Message Microservice on port 3003
cd "../Message Microservice" && node app.js &
MESSAGE_PID=$!
echo "Message Microservice started (PID: $MESSAGE_PID)"

echo "All microservices are running. Press Ctrl+C to stop."

# Wait for all processes
wait $USER_PID $CHAT_PID $MESSAGE_PID
