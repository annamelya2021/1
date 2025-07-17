import { HfInference } from '@huggingface/inference';

// Отримуємо API ключ з змінних оточення Vite
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
const hf = new HfInference(HF_API_KEY);

/**
 * Функція для перекладу тексту з англійської на українську
 * @param {string} text - Текст для перекладу
 * @returns {Promise<string>} - Перекладений текст
 */
export const translateText = async (text, targetLang = 'uk') => {
    const response = await hf.translation({
      model: 'facebook/nllb-200-distilled-600M',  // Модель для 200+ мов
      inputs: text,
      parameters: {
        src_lang: 'eng_Latn',  // Можна змінювати
        tgt_lang: targetLang
      }
    });
    return response.translation_text;
  };

// Інші API функції
export const analyzeSentiment = async (text) => {
  const response = await hf.textClassification({
    model: 'distilbert-base-uncased-finetuned-sst-2-english',
    inputs: text,
  });
  return response[0];
};

export const generateText = async (prompt) => {
  const response = await hf.textGeneration({
    model: 'gpt2',
    inputs: prompt,
  });
  return response.generated_text;
};