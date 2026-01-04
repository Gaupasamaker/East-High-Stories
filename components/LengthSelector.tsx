import React from 'react';
import { STORY_LENGTHS } from '../constants';

interface Props {
  selectedId: string | null;
  onSelect: (id: 'short' | 'long') => void;
}

export const LengthSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">3</span>
        ¿Cuánto quieres leer?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STORY_LENGTHS.map((length) => {
          const isSelected = selectedId === length.id;
          return (
            <button
              key={length.id}
              onClick={() => onSelect(length.id)}
              className={`
                p-5 rounded-xl border-2 transition-all duration-200 flex items-center text-left
                ${isSelected 
                  ? 'bg-red-600 border-red-700 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50'
                }
              `}
            >
              <span className="text-3xl mr-4">{length.icon}</span>
              <div>
                <span className="block font-bold text-lg">{length.label}</span>
                <span className={`text-sm ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>
                  {length.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};