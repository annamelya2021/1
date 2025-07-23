import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home/Home';
import Translation from './pages/Translation/Translation';
import ImageGeneration from './pages/ImageGeneration/ImageGeneration';
import SentimentAnalysis from './pages/SentimentAnalysis/SentimentAnalysis';
import TextToSpeech from './pages/TextToSpeech/TextToSpeech';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import Header from './components/Header/Header';
import './styles/globals.css';

// Main App Content Component
function AppContent() {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
          
          {/* Protected Routes */}
          <Route
            path="/translate"
            element={
              <PrivateRoute>
                <Translation />
              </PrivateRoute>
            }
          />
          <Route
            path="/image-generation"
            element={
              <PrivateRoute>
                <ImageGeneration />
              </PrivateRoute>
            }
          />
          <Route
            path="/sentiment-analysis"
            element={
              <PrivateRoute>
                <SentimentAnalysis />
              </PrivateRoute>
            }
          />
          <Route
            path="/text-to-speech"
            element={
              <PrivateRoute>
                <TextToSpeech />
              </PrivateRoute>
            }
          />
          
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;