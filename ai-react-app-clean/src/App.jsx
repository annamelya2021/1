import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Translation from './pages/Translation/Translation';
import ImageGeneration from './pages/ImageGeneration/ImageGeneration';
import SentimentAnalysis from './pages/SentimentAnalysis/SentimentAnalysis';
import TextToSpeech from './pages/TextToSpeech/TextToSpeech';
import Header from './components/Header/Header';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/translate" element={<Translation />} />
          <Route path="/image-generation" element={<ImageGeneration />} />
          <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;