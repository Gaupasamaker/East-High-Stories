import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  title: string;
  content: string;
  onReset: () => void;
}

export const StoryReader: React.FC<Props> = ({ title, content, onReset }) => {
  // Pre-process content to fix literal \n characters (escaped newlines) that might come from the API JSON
  // This ensures they are rendered as actual line breaks/paragraphs by the Markdown renderer
  const formattedContent = content.replace(/\\n/g, '\n');

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
                p: ({node, ...props}) => <p className="mb-4" {...props} />,
                strong: ({node, ...props}) => <strong className="text-red-800 font-bold" {...props} />,
                em: ({node, ...props}) => <em className="text-gray-500" {...props} />,
              }}
            >
              {formattedContent}
            </ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-center gap-4 no-print">
            <button
              onClick={handlePrint}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
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
        </div>
        
        {/* Decorative footer stripe - hidden in print */}
        <div className="h-4 bg-gray-100 border-t border-gray-200 no-print"></div>
      </div>
    </div>
  );
};