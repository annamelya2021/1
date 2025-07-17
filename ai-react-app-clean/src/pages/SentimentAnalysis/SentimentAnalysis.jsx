import React, { useState } from 'react';
import styles from './SentimentAnalysis.module.css';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      // TODO: Replace with your actual API call
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResponse = {
        sentiment: Math.random() > 0.5 ? 'positive' : 'negative',
        confidence: (Math.random() * 100).toFixed(2)
      };
      setSentiment(mockResponse);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      alert('Failed to analyze sentiment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sentiment Analysis</h1>
      <div className={styles.inputContainer}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to analyze sentiment..."
          className={styles.textarea}
          rows={6}
        />
        <button 
          onClick={analyzeSentiment} 
          disabled={!text.trim() || loading}
          className={styles.button}
        >
          {loading ? 'Analyzing...' : 'Analyze Sentiment'}
        </button>
      </div>
      
      {sentiment && (
        <div className={styles.result}>
          <h3>Analysis Result:</h3>
          <p>Sentiment: <span className={styles[sentiment.sentiment]}>{sentiment.sentiment}</span></p>
          <p>Confidence: {sentiment.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;