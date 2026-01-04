import { GoogleGenAI, Type } from "@google/genai";
import { Character, Genre, StoryLength, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateStory = async (
  selectedCharacters: Character[],
  selectedGenre: Genre,
  selectedLength: StoryLength,
  language: Language
): Promise<{ title: string; content: string }> => {
  
  const charNames = selectedCharacters.map(c => c.name).join(', ');
  const isLongStory = selectedLength.id === 'long';
  
  // Use Pro for long stories as it handles context and detail better
  const modelName = isLongStory ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

  const langInstruction = language === 'en' 
    ? "Write the story in English. Translate any Spanish context provided in the prompt to English before writing."
    : "Escribe la historia en Español neutro o de España.";

  const systemInstruction = `
    Eres un guionista profesional y novelista experto en la serie 'High School Musical: El Musical: La Serie' (HSMTMTS).
    Tu tarea es escribir fanfictions envolventes y apropiados para una audiencia juvenil (PG).
    
    Reglas:
    1. Mantén la personalidad de los personajes 100% fiel a la serie.
    2. IDIOMA DE SALIDA: ${langInstruction}
    3. La historia debe tener un título creativo en el idioma seleccionado.
    4. Usa formato Markdown (negritas, cursivas).
    5. INSTRUCCIÓN DE LONGITUD: ${selectedLength.promptInstruction}
    6. ¡Importante! Si el género es musical, DEBES incluir la letra completa de una canción original integrada en la trama.
  `;

  const prompt = `
    Escribe una nueva historia protagonizada por: ${charNames}.
    
    El género es: ${selectedGenre.label}.
    Detalles del género: ${selectedGenre.promptModifier}
    
    ${isLongStory ? 'IMPORTANTE: Quiero una historia LARGA y PROFUNDA. Divide la historia en al menos 3 o 4 escenas separadas. Profundiza en los sentimientos.' : ''}
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        // Definimos el esquema estricto para asegurar que el JSON nunca falle
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["title", "content"]
        },
        // Aumentamos los tokens de salida para evitar que la historia larga se corte a la mitad (lo que rompe el JSON)
        maxOutputTokens: 8192,
      }
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);

    return {
      title: parsed.title || "Una historia de los Wildcats",
      content: parsed.content || "Hubo un error generando la historia. ¡Inténtalo de nuevo!",
    };
  } catch (error) {
    console.error("Error generating story:", error);
    throw error;
  }
};