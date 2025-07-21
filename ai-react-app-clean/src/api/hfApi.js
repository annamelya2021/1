import { HfInference } from '@huggingface/inference';

// Отримуємо API ключ з змінних оточення Vite
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

if (!HF_API_KEY) {
    console.error('Hugging Face API key is not set. Please set VITE_HF_API_KEY in your .env file');
    throw new Error('Hugging Face API key is missing');
}

const hf = new HfInference(HF_API_KEY);

/**
 * Функція для перекладу тексту з англійської на українську
 * @param {string} text - Текст для перекладу
 * @param {string} targetLang - Код мови перекладу (за замовчуванням: 'uk' для української)
 * @returns {Promise<string>} - Перекладений текст
 */
export const translateText = async (text, targetLang = 'uk') => {
    if (!text || typeof text !== 'string') {
        throw new Error('Invalid text input');
    }

    try {
        // Використовуємо більш стабільну модель перекладу
        const model = targetLang === 'uk' 
            ? 'Helsinki-NLP/opus-mt-en-uk'  // Англо-український переклад
            : `Helsinki-NLP/opus-mt-en-${targetLang}`;  // Інші мови
            
        const response = await hf.translation({
            model: model,
            inputs: text
        });
        
        if (!response || !response.translation_text) {
            throw new Error('Invalid response from translation service');
        }
        
        return response.translation_text;
    } catch (error) {
        console.error('Помилка при перекладі:', error);
        throw new Error('Не вдалося виконати переклад. Будь ласка, перевірте підключення та спробуйте ще раз.');
    }
};

// Інші API функції
export const analyzeSentiment = async (text) => {
    const response = await hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: text
    });
    return response[0];
};

export const generateText = async (prompt) => {
    const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: { max_length: 100 }
    });
    return response.generated_text;
};

export const generateImage = async (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        throw new Error('Prompt is required and must be a string');
    }

    try {
        // Використовуємо API напряму замість SDK
        const response = await fetch(
            'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HF_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: prompt,
                    options: {
                        wait_for_model: true
                    }
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Помилка при генерації зображення');
        }

        // Отримуємо зображення у форматі blob
        const imageBlob = await response.blob();
        // Створюємо URL для відображення зображення
        return URL.createObjectURL(imageBlob);
    } catch (error) {
        console.error('Помилка при генерації зображення:', error);
        throw new Error('Не вдалося згенерувати зображення. ' + (error.message || 'Будь ласка, спробуйте ще раз.'));
    }
};