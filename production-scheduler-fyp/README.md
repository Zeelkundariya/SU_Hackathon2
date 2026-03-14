# Production Scheduling Optimizer - Final Year Project

A full-stack manufacturing optimization system that schedules jobs across machines using a Genetic Algorithm.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed and running locally (`mongodb://127.0.0.1:27017`)

### 2. Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Seed the database (optional but recommended): `node seed.js`
4. Start the server: `npm start` (runs on port 5000)

### 3. Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start the application: `npm start` (runs on port 3000)

## Features
- **Genetic Algorithm**: Minimizes makespan and machine idle time.
- **Interactive Gantt Chart**: Visualizes the production timeline.
- **Resource Management**: Manage machines and job queues.
- **Real-time Analytics**: View utilization and completion predictions.

## Project Structure
Detailed in the project folder hierarchy. Focuses on modularity and separation of concerns.
