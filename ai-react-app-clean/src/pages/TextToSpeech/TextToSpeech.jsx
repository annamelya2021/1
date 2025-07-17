import React, { useState, useEffect } from 'react';
import styles from './TextToSpeech.module.css';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    // Load available voices when component mounts
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !voice) {
        setVoice(availableVoices[0]);
      }
    };

    // Load voices when they become available
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [voice]);

  const speak = () => {
    if (!text.trim()) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      console.error('SpeechSynthesis error:', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className={styles.container}>
      <h1>Text to Speech</h1>
      
      <div className={styles.inputContainer}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className={styles.textarea}
          rows={6}
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="voice">Voice:</label>
          <select
            id="voice"
            value={voice ? voice.voiceURI : ''}
            onChange={(e) => {
              const selectedVoice = voices.find(v => v.voiceURI === e.target.value);
              if (selectedVoice) setVoice(selectedVoice);
            }}
            className={styles.select}
          >
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang}) {v.default ? ' [Default]' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="pitch">Pitch: {pitch}</label>
          <input
            type="range"
            id="pitch"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="rate">Speed: {rate}</label>
          <input
            type="range"
            id="rate"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
          />
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="volume">Volume: {volume}</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          onClick={isSpeaking ? stopSpeaking : speak}
          className={`${styles.button} ${isSpeaking ? styles.stopButton : styles.speakButton}`}
          disabled={!text.trim()}
        >
          {isSpeaking ? 'Stop' : 'Speak'}
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;