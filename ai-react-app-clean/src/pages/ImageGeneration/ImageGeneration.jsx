import { useState } from 'react';
import styles from './ImageGeneration.module.css';

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(null);

  const generateImage = async () => {
    // Тут буде логіка генерації
  };

  return (
    <div className={styles.container}>
      <h2>Генератор зображень</h2>
      <input 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage}>Згенерувати</button>
      {image && <img src={image} alt="Згенероване зображення" />}
    </div>
  );
}