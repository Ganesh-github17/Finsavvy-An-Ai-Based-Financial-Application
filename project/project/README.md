# Financial Education Platform

A comprehensive financial education platform that combines interactive learning, AI-powered tutoring, and practical financial simulations.

## Project Structure

```
project/
├── backend/                 # Python FastAPI backend
│   ├── routes/             # API route handlers
│   ├── uploads/            # File upload directory
│   ├── ai_service.py       # AI integration services
│   ├── ai_tutor.py         # AI tutoring system
│   ├── app.py             # Main FastAPI application
│   ├── collaboration.py    # Real-time collaboration features
│   ├── course_data.py      # Course content management
│   ├── game_data.py        # Financial game data
│   ├── market_data.py      # Real-time market data integration
│   ├── recommendation_system.py # Personalized learning recommendations
│   └── websocket_manager.py # WebSocket connection management
├── src/                    # Frontend React application
├── public/                 # Static assets
└── Portfolio/             # Portfolio management module
└── Recommendations/       # Recommendation engine
└── VirtualBank/          # Virtual banking simulation
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- Virtual environment (recommended)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd project/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On Unix/MacOS
   source venv/bin/activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the project root:
   ```bash
   cd project
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Backend Server

1. Start the FastAPI server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   The backend server will run on `http://localhost:8000`

### Frontend Development Server

1. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## Features

### 1. AI-Powered Tutoring
- Personalized learning experience
- Real-time feedback and guidance
- Adaptive learning paths
- Interactive Q&A sessions

### 2. Virtual Banking Simulation
- Realistic banking operations
- Transaction simulations
- Account management
- Financial planning tools

### 3. Portfolio Management
- Stock market simulation
- Portfolio tracking
- Risk analysis
- Performance metrics

### 4. Recommendation System
- Personalized course recommendations
- Learning path suggestions
- Content adaptation based on progress
- Skill gap analysis

### 5. Real-time Collaboration
- Live chat functionality
- Shared learning spaces
- Group projects
- Peer-to-peer learning

## API Documentation

The API documentation is available at `http://localhost:8000/docs` when the backend server is running.

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
DATABASE_URL=your_database_url
API_KEY=your_api_key
MODEL_PATH=path_to_ai_model
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.