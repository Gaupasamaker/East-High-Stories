import React from 'react';
import { CHARACTERS } from '../constants';
import { Language } from '../types';
import { getTranslation } from '../constants/translations';

interface Props {
  selectedIds: string[];
  onToggle: (id: string) => void;
  language: Language;
}

export const CharacterSelector: React.FC<Props> = ({ selectedIds, onToggle, language }) => {
  const t = getTranslation(language);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">1</span>
        {t.home.selectCharacters}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {CHARACTERS.map((char) => {
          const isSelected = selectedIds.includes(char.id);
          return (
            <button
              key={char.id}
              onClick={() => onToggle(char.id)}
              className={`
                relative p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-center h-32
                ${isSelected
                  ? `${char.color} shadow-md scale-105 ring-2 ring-offset-1 ring-red-400`
                  : 'bg-white border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50'
                }
              `}
            >
              <span className="text-4xl mb-2 filter drop-shadow-sm">{char.avatarEmoji}</span>
              <span className={`font-semibold text-sm leading-tight ${isSelected ? '' : 'text-gray-600'}`}>
                {char.name}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      {selectedIds.length === 0 && (
        <p className="text-sm text-red-400 mt-2 italic">{t.home.selectAtLeastOne}</p>
      )}
    </div>
  );
};