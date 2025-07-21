import { useState, useRef, useCallback } from 'react';
import styles from './ImageGeneration.module.css';

// List of meme templates with image URLs and text positions
export const memeTemplates = [
  {
    id: 1,
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1bij.jpg',
    textPositions: [
      { x: 50, y: 70, text: 'Top text' },
      { x: 250, y: 70, text: 'Bottom text' }
    ]
  },
  {
    id: 2,
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'Left option' },
      { x: 50, y: 230, text: 'Right option' }
    ]
  },
  {
    id: 3,
    name: 'One Does Not Simply',
    url: 'https://i.imgflip.com/1bgw.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'One Does Not Simply' },
      { x: 50, y: 350, text: 'Make a Meme' }
    ]
  },
  {
    id: 4,
    name: 'Batman Slap',
    url: 'https://i.imgflip.com/9ehk.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'When someone says' },
      { x: 50, y: 250, text: 'memes are not funny' }
    ]
  },
  {
    id: 5,
    name: 'Drake Hotline Bling',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    textPositions: [
      { x: 50, y: 50, text: 'Bad' },
      { x: 50, y: 300, text: 'Good' }
    ]
  },
  {
    id: 6,
    name: 'Change My Mind',
    url: 'https://i.imgflip.com/24y43o.jpg',
    textPositions: [
      { x: 50, y: 100, text: 'Change my mind:' },
      { x: 50, y: 150, text: 'This is a great meme generator' }
    ]
  },
  {
    id: 7,
    name: 'Expanding Brain',
    url: 'https://i.imgflip.com/1jwh0h.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'Small brain' },
      { x: 50, y: 130, text: 'Galaxy brain' },
      { x: 50, y: 230, text: 'Universe brain' },
      { x: 50, y: 330, text: 'Multiverse brain' }
    ]
  },
  {
    id: 8,
    name: 'Woman Yelling at Cat',
    url: 'https://i.imgflip.com/2hgfw.jpg',
    textPositions: [
      { x: 150, y: 50, text: 'When you see' },
      { x: 150, y: 100, text: 'a good meme' },
      { x: 50, y: 350, text: 'Me:' },
      { x: 50, y: 400, text: 'I need to make one too!' }
    ]
  },
  {
    id: 9,
    name: 'Disaster Girl',
    url: 'https://i.imgflip.com/23ls.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'When you finally' },
      { x: 50, y: 80, text: 'understand the joke' },
      { x: 50, y: 350, text: 'But it\'s too late' }
    ]
  },
  {
    id: 10,
    name: 'Left Exit 12 Off Ramp',
    url: 'https://i.imgflip.com/22bdq6.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'Me trying to explain' },
      { x: 50, y: 80, text: 'why memes are funny' },
      { x: 50, y: 350, text: 'My friends:' }
    ]
  },
  {
    id: 11,
    name: 'Ancient Aliens Guy',
    url: 'https://i.imgflip.com/26am.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'I\'m not saying it was aliens...' },
      { x: 50, y: 80, text: 'But these memes are out of this world!' }
    ]
  },
  
  {
    id: 13,
    name: 'Surprised Pikachu',
    url: 'https://i.imgflip.com/2kbn1e.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'When you spend hours making memes' },
      { x: 50, y: 80, text: 'And they actually get likes' },
      { x: 50, y: 350, text: 'Pikachu face' }
    ]
  },
 
  {
    id: 15,
    name: 'Woman Cheersing',
    url: 'https://i.imgflip.com/2odckz.jpg',
    textPositions: [
      { x: 50, y: 30, text: 'When you find the perfect' },
      { x: 50, y: 80, text: 'meme template' },
      { x: 50, y: 350, text: 'Time to go viral!' }
    ]
  }
];

export default function ImageGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState(memeTemplates[0]);
  const [texts, setTexts] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [memeUrl, setMemeUrl] = useState('');
  const [customImage, setCustomImage] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Update text when input changes
  const handleTextChange = (index, value) => {
    setTexts(prev => ({
      ...prev,
      [index]: value || selectedTemplate.textPositions[index]?.text || ''
    }));
  };

  // Handle custom image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setCustomImage({
          url: event.target.result,
          width: img.width,
          height: img.height,
          textPositions: [
            { x: 50, y: 50, text: 'Top text' },
            { x: 50, y: img.height - 50, text: 'Bottom text' }
          ]
        });
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Generate the meme
  const generateMeme = useCallback(() => {
    setIsGenerating(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    // Allow loading images from other sources
    img.crossOrigin = 'Anonymous';
    
    const currentTemplate = customImage || selectedTemplate;
    
    img.onload = () => {
      // Set canvas size to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Text settings
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = Math.max(3, img.width / 200);
      ctx.textAlign = 'center';
      
      // Calculate font size based on image width
      const fontSize = Math.max(20, img.width / 15);
      ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;
      
      // Add text to the image
      currentTemplate.textPositions.forEach((pos, index) => {
        const text = texts[index] !== undefined ? texts[index] : pos.text;
        if (!text) return;
        
        // Draw text outline
        ctx.strokeText(text, pos.x * (img.width / 500), pos.y * (img.height / 500));
        // Draw main text
        ctx.fillText(text, pos.x * (img.width / 500), pos.y * (img.height / 500));
      });
      
      // Convert canvas to image URL
      setMemeUrl(canvas.toDataURL('image/jpeg'));
      setIsGenerating(false);
    };
    
    img.onerror = () => {
      console.error('Error loading image');
      setIsGenerating(false);
    };
    
    img.src = currentTemplate.url;
  }, [selectedTemplate, texts, customImage]);

  // Download the meme
  const downloadMeme = () => {
    if (!memeUrl) return;
    
    const link = document.createElement('a');
    link.download = 'meme.jpg';
    link.href = memeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle template selection
  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    setCustomImage(null);
    // Reset texts when changing template
    const newTexts = {};
    template.textPositions.forEach((pos, index) => {
      newTexts[index] = pos.text;
    });
    setTexts(newTexts);
  };

  // Handle custom image selection
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.container}>
      <h2>Meme Generator</h2>
      
      <div className={styles.templateSelector}>
        <h3>Choose a template or upload your own:</h3>
        
        <div className={styles.uploadSection}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button 
            onClick={handleUploadClick}
            className={styles.uploadButton}
          >
            Upload Custom Image
          </button>
          {customImage && (
            <span className={styles.uploadedFileName}>
              Custom image loaded
            </span>
          )}
        </div>
        
        <h4>Or select a template:</h4>
        <div className={styles.templateGrid}>
          {memeTemplates.map(template => (
            <div 
              key={template.id}
              className={`${styles.templateItem} ${
                !customImage && selectedTemplate.id === template.id ? styles.selected : ''
              }`}
              onClick={() => selectTemplate(template)}
            >
              <img 
                src={template.url} 
                alt={template.name} 
                className={styles.templateImage}
                loading="lazy"
              />
              <span>{template.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {(selectedTemplate || customImage) && (
        <div className={styles.textInputs}>
          <h3>Add your text:</h3>
          {(customImage?.textPositions || selectedTemplate.textPositions).map((pos, index) => (
            <div key={index} className={styles.inputGroup}>
              <label>Text {index + 1}:</label>
              <input
                type="text"
                value={texts[index] !== undefined ? texts[index] : pos.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className={styles.textInput}
                placeholder={pos.text}
              />
            </div>
          ))}
          
          <div className={styles.buttons}>
            <button 
              onClick={generateMeme} 
              disabled={isGenerating}
              className={styles.generateButton}
            >
              {isGenerating ? 'Generating...' : 'Create Meme'}
            </button>
            
            {memeUrl && (
              <button 
                onClick={downloadMeme}
                className={styles.downloadButton}
              >
                Download Meme
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className={styles.preview}>
        <h3>Preview:</h3>
        <div className={styles.canvasContainer}>
          {isGenerating ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <>
              <canvas ref={canvasRef} className={styles.canvas} style={{ display: 'none' }} />
              {memeUrl && (
                <div className={styles.memeWrapper}>
                  <img src={memeUrl} alt="Your meme" className={styles.memeImage} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}