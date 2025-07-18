import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home/Home';
import Translation from './pages/Translation/Translation';
import ImageGeneration from './pages/ImageGeneration/ImageGeneration';
import SentimentAnalysis from './pages/SentimentAnalysis/SentimentAnalysis';
import TextToSpeech from './pages/TextToSpeech/TextToSpeech';
import Login from './pages/Auth/Login';
import Header from './components/Header/Header';
import './styles/globals.css';

// Protected Route Component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          
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
        </Routes>
      </main>
    </>
  );
}

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