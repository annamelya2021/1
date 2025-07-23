# AI React App

A full-stack application featuring AI capabilities including translation, sentiment analysis, text-to-speech, and a meme generator. The app includes user authentication with JWT and MongoDB.

## Features

- 🔐 User authentication (register, login, logout)
- 🌐 Multi-language translation
- 🎭 Meme generator with templates and custom image upload
- 😊 Sentiment analysis
- 🔊 Text-to-speech conversion
- 🎨 Modern, responsive UI
- 🔄 Real-time updates
- 🔒 Protected routes

## Tech Stack

### Frontend
- React 18
- React Router 6
- Axios for API requests
- CSS Modules for styling
- Canvas API for meme generation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Express Validator for input validation
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ai-react-app.git
cd ai-react-app
```

### 2. Set up the backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create a .env file in the server directory and add your environment variables:
cp .env.example .env

# Edit the .env file with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# etc.

# Start the development server
npm run dev
```

### 3. Set up the frontend

```bash
# Navigate to the project root
cd ..

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000`
The backend API will be available at `http://localhost:5000`

## Environment Variables

### Backend (server/.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai-react-app
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

## Available Scripts

### Frontend

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Backend

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests

## Project Structure

```
ai-react-app/
├── public/                 # Static files
├── server/                 # Backend server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── .env.example        # Environment variables example
│   └── server.js           # Main server file
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   └── Header/         # Header component
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   │   ├── Home/
│   │   ├── ImageGeneration/
│   │   ├── SentimentAnalysis/
│   │   ├── TextToSpeech/
│   │   └── Translation/
│   ├── api/                # API service functions
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles
├── .gitignore
├── package.json
├── README.md
└── setupProxy.js           # Development proxy configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- And all the amazing open-source libraries used in this project.