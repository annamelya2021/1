import { useState } from 'react';
import { translateText } from '../../api/hfApi';
import styles from './Translation.module.css';

export default function Translation() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const result = await translateText(inputText);
      setOutputText(result);
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('Translation error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.translationContainer}>
      <h2 className={styles.title}>Translation</h2>
      <textarea
        className={styles.textarea}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to translate..."
        disabled={isLoading}
      />
      <button
        className={styles.button}
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      {outputText && (
        <div className={styles.resultContainer}>
          <h3 className={styles.resultTitle}>Result:</h3>
          <p className={styles.resultText}>{outputText}</p>
        </div>
      )}
    </div>
  );
}