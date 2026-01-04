import React from 'react';
import { GENRES } from '../constants';

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const GenreSelector: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
        <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">2</span>
        ¿Qué tipo de historia quieres?
      </h3>
      <div className="flex flex-wrap gap-3">
        {GENRES.map((genre) => {
          const isSelected = selectedId === genre.id;
          return (
            <button
              key={genre.id}
              onClick={() => onSelect(genre.id)}
              className={`
                px-5 py-3 rounded-full border-2 transition-all duration-200 flex items-center space-x-2
                ${isSelected 
                  ? 'bg-red-600 border-red-700 text-white shadow-lg transform -translate-y-1' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50'
                }
              `}
            >
              <span className="text-xl">{genre.icon}</span>
              <span className="font-semibold">{genre.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};