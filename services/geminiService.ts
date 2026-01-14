import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Character, Genre, StoryLength, Language } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateStory = async (
  selectedCharacters: Character[],
  selectedGenre: Genre,
  selectedLength: StoryLength,
  language: Language
): Promise<{ title: string; content: string }> => {

  const charNames = selectedCharacters.map(c => c.name).join(', ');
  const isLongStory = selectedLength.id === 'long';

  // Use compatible models for Google Generative AI SDK (User has access to 3.0 preview)
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
    4. FORMATO: Usa Markdown. IMPORTANTE: Separa cada párrafo y cada diálogo de personaje con DOS saltos de línea (\\n\\n). No escribas bloques de texto densos. Cada vez que un personaje hable, debe ser en una línea nueva.
    5. INSTRUCCIÓN DE LONGITUD: ${selectedLength.promptInstruction}
    6. ¡Importante! Si el género es musical, DEBES incluir la letra completa de una canción original integrada en la trama.
  `;

  const prompt = `
    Escribe una nueva historia protagonizada por: ${charNames}.
    
    El género es: ${selectedGenre.label}.
    Detalles del género: ${selectedGenre.promptModifier}
    
    ${isLongStory ? 'IMPORTANTE: Quiero una historia LARGA y PROFUNDA. Divide la historia en al menos 3 o 4 escenas separadas. Profundiza en los sentimientos.' : ''}
    
    Recuerda: ¡Formato de diálogo limpio! Cada intervención en un nuevo párrafo.
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING },
            content: { type: SchemaType.STRING }
          },
          required: ["title", "content"]
        },
        maxOutputTokens: 8192,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
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

export const generateStoryStream = async (
  selectedCharacters: Character[],
  genre: Genre,
  length: StoryLength,
  language: Language,
  onChunk: (chunk: string) => void
): Promise<{ title: string; fullContent: string; choices?: string[] }> => {
  // We need to re-instantiate or reuse genAI. It's defined at module level.

  const charNames = selectedCharacters.map(c => c.name).join(', ');
  const isLongStory = length.id === 'long';

  // Use compatible models for Google Generative AI SDK (User has access to 3.0 preview)
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
    4. FORMATO: Usa Markdown simple.
    5. INSTRUCCIÓN DE LONGITUD: ${length.promptInstruction}
    6. Streaming: Tu respuesta se mostrará en vivo. Sé directo y creativo.
  `;

  const prompt = `
    Escribe una nueva historia protagonizada por: ${charNames}.
    Género: ${genre.label} (${genre.promptModifier}).
    
    INSTRUCCIÓN IMPORTANTE PARA EL FORMATO DE RESPUESTA:
    La primera línea DEBE ser el título comenzando con "TITULO: ".
    Escribe la historia.
    AL FINAL, DEBES ofrecer 2 opciones para continuar la historia en una nueva línea con el formato: "OPCIONES: [Opción A] | [Opción B]"
    IMPORTANTE: Las opciones deben ser DIVERGENTES (ej. una de acción vs. una emocional, o un éxito vs. un error). Haz que el usuario dude.
    
    Ejemplo:
    TITULO: El gran ensayo
    Era una tarde lluviosa... y entonces Ricky preguntó.
    OPCIONES: Ricky confiesa su secreto | Ricky sale corriendo
  `;

  try {
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContentStream(prompt);

    let fullText = '';
    let title = '';
    let isTitleCaptured = false;

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;

      if (!isTitleCaptured) {
        // Try to identify the title line
        const lines = fullText.split('\n');
        if (lines.length > 0 && lines[0].startsWith('TITULO:')) {
          title = lines[0].replace('TITULO:', '').trim();

          // If we have more than just the title line, that's content
          if (lines.length > 1) {
            const contentPart = fullText.substring(lines[0].length).trim();
            if (contentPart) onChunk(contentPart);
            isTitleCaptured = true;
          }
        } else if (fullText.length > 50 && !fullText.includes('TITULO:')) {
          // Fallback: if no title found after 50 chars, assume no title line
          isTitleCaptured = true;
          onChunk(chunkText);
        }
      } else {
        // Post-processing only if we entered the content phase
        onChunk(chunkText);
      }
    }

    // Final cleanup for return
    let finalContent = fullText.replace(/^TITULO:.*$/m, '').trim();

    // Extract choices if present (Format: OPTIONS: [Option 1] | [Option 2])
    const choices: string[] = [];
    const optionsMatch = finalContent.match(/OPCIONES: (.+)$/);
    if (optionsMatch) {
      // Remove options line from content
      finalContent = finalContent.replace(optionsMatch[0], '').trim();
      // Parse options
      const optionsStr = optionsMatch[1];
      optionsStr.split('|').forEach(opt => choices.push(opt.trim()));
    }

    if (!title) title = "Historia de East High";

    return { title, fullContent: finalContent, choices };

  } catch (error) {
    console.error("Error generating story stream:", error);
    throw error;
  }
};

export const continueStoryStream = async (
  previousContent: string,
  selectedChoice: string,
  language: Language,
  onChunk: (chunk: string) => void
): Promise<string> => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

  const langInstruction = language === 'en'
    ? "Write in English."
    : "Escribe en Español.";

  const prompt = `
    ${langInstruction}
    CONTEXTO ANTERIOR DE LA HISTORIA:
    "${previousContent.slice(-1000)}"
    ...
    
    EL USUARIO ELIGIÓ: "${selectedChoice}"
    
    TAREA:
    Continúa la historia basándote en la elección del usuario. Escribe un final emocionante para este episodio.
    No repitas el título. Escribe directamente el contenido.
    Usa Markdown.
  `;

  try {
    const result = await model.generateContentStream(prompt);
    let fullNewContent = '';

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullNewContent += chunkText;
      onChunk(chunkText);
    }

    return fullNewContent;
  } catch (error) {
    console.error("Error continuing story:", error);
    throw error;
  }
};