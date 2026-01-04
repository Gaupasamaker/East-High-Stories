import React from 'react';
import { Language } from '../types';

interface Props {
  selectedLanguage: Language;
  onSelect: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">0</span>
        Idioma / Language
      </h3>
      <div className="flex space-x-4">
        <button
          onClick={() => onSelect('es')}
          className={`
            flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center space-x-2 transition-all
            ${selectedLanguage === 'es'
              ? 'bg-red-50 border-red-500 text-red-800 ring-1 ring-red-500 shadow-sm'
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }
          `}
        >
          <span className="text-2xl">🇪🇸</span>
          <span className="font-bold">Español</span>
        </button>
        <button
          onClick={() => onSelect('en')}
          className={`
            flex-1 py-3 px-4 rounded-xl border-2 flex items-center justify-center space-x-2 transition-all
            ${selectedLanguage === 'en'
              ? 'bg-blue-50 border-blue-500 text-blue-800 ring-1 ring-blue-500 shadow-sm'
              : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
            }
          `}
        >
          <span className="text-2xl">🇺🇸</span>
          <span className="font-bold">English</span>
        </button>
      </div>
    </div>
  );
};