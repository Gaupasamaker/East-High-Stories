import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  title: string;
  content: string;
  choices?: string[];
  onChoice?: (choice: string) => void;
  onReset: () => void;
}

export const StoryReader: React.FC<Props> = ({
  title,
  content,
  choices,
  onChoice,
  onReset
}) => {
  // Pre-process content to ensure proper formatting
  // 1. Replace literal "\n" strings (escaped) with actual newlines
  // 2. Ensure all single newlines become double newlines to force Markdown paragraphs
  //    This fixes the issue where dialogues get stuck together in one block
  const formattedContent = content
    .replace(/\\n/g, '\n')
    .replace(/\n/g, '\n\n');

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    const textToCopy = `
${title.toUpperCase()}

${formattedContent}

✨ Generado por East High Stories 🐾
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fade-in max-w-3xl mx-auto">
      <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-200 relative printable-content">
        {/* Paper texture effect via CSS gradients - hidden in print via CSS */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 no-print"></div>

        <div className="p-8 md:p-12">
          <div className="text-center mb-8 pb-6 border-b-2 border-dashed border-gray-200">
            <span className="text-red-500 text-sm font-bold uppercase tracking-widest mb-2 block no-print">Nueva Historia Original</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
              {title}
            </h1>
          </div>

          <div className="prose prose-red prose-lg font-serif text-gray-700 mx-auto leading-relaxed">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                strong: ({ node, ...props }) => <strong className="text-red-800 font-bold" {...props} />,
                em: ({ node, ...props }) => <em className="text-gray-500" {...props} />,
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          </div>

          {/* Standard Footer (Copy / Print / Reset) - Always visible now */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4 no-print">
            <button
              onClick={handleCopy}
              className={`
                font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center
                ${isCopied ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              {isCopied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ¡Copiado!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copiar
                </>
              )}
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2-2v4h10z" />
              </svg>
              Imprimir / PDF
            </button>
            <button
              onClick={onReset}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center"
            >
              <span className="mr-2">✨</span> Crear otra historia
            </button>
          </div>

          {/* Interactive Choices (Optional) */}
          {choices && choices.length > 0 && onChoice && (
            <div className="mt-12 pt-8 border-t border-gray-100 no-print fade-in">
              <h3 className="text-center text-xl font-bold text-red-800 mb-6 font-serif">
                ¿Quieres saber cómo sigue la historia? ¡Tú decides!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {choices.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoice(choice)}
                    className="
                      bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400
                      text-gray-800 font-semibold py-4 px-6 rounded-xl shadow-sm hover:shadow-md
                      transform transition-all duration-200 hover:-translate-y-1 text-left
                      flex items-center group
                    "
                  >
                    <span className="bg-red-100 text-red-700 font-bold rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center mr-3 group-hover:bg-red-600 group-hover:text-white transition-colors">
                      {index + 1}
                    </span>
                    <span className="text-lg">{choice}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Decorative footer stripe - hidden in print */}
        <div className="h-4 bg-gray-100 border-t border-gray-200 no-print"></div>
      </div>
    </div>
  );
};