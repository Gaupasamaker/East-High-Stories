import { Character, Genre, StoryLength } from './types';

export const CHARACTERS: Character[] = [
  { id: 'ricky', name: 'Ricky Bowen', avatarEmoji: '🎸', color: 'bg-red-100 border-red-500 text-red-800' },
  { id: 'nini', name: 'Nini Salazar-Roberts', avatarEmoji: '🎤', color: 'bg-rose-100 border-rose-500 text-rose-800' },
  { id: 'ej', name: 'E.J. Caswell', avatarEmoji: '🏅', color: 'bg-blue-100 border-blue-500 text-blue-800' },
  { id: 'gina', name: 'Gina Porter', avatarEmoji: '👟', color: 'bg-purple-100 border-purple-500 text-purple-800' },
  { id: 'ashlyn', name: 'Ashlyn Caswell', avatarEmoji: '🎹', color: 'bg-yellow-100 border-yellow-500 text-yellow-800' },
  { id: 'kourtney', name: 'Kourtney Greene', avatarEmoji: '👗', color: 'bg-pink-100 border-pink-500 text-pink-800' },
  { id: 'carlos', name: 'Carlos Rodriguez', avatarEmoji: '🕺', color: 'bg-green-100 border-green-500 text-green-800' },
  { id: 'bigred', name: 'Big Red', avatarEmoji: '🛹', color: 'bg-orange-100 border-orange-500 text-orange-800' },
  { id: 'missjenn', name: 'Miss Jenn', avatarEmoji: '🎭', color: 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-800' },
  { id: 'mrmazzara', name: 'Mr. Mazzara', avatarEmoji: '🤖', color: 'bg-gray-100 border-gray-500 text-gray-800' },
];

export const GENRES: Genre[] = [
  { 
    id: 'musical', 
    label: 'Musical / Ensayo', 
    icon: '🎵', 
    promptModifier: 'céntrate en la música, los ensayos, componer canciones y el drama detrás de bambalinas. Incluye letras de canciones inventadas.' 
  },
  { 
    id: 'romance', 
    label: 'Romance y Crushes', 
    icon: '💖', 
    promptModifier: 'céntrate en los sentimientos románticos, las citas, los malentendidos amorosos y momentos tiernos.' 
  },
  { 
    id: 'adventure', 
    label: 'Aventura Fuera de East High', 
    icon: '🚌', 
    promptModifier: 'saca a los personajes de la escuela. Un viaje de campo, un campamento o una aventura en la ciudad.' 
  },
  { 
    id: 'mystery', 
    label: 'Misterio en los Pasillos', 
    icon: '🕵️‍♀️', 
    promptModifier: 'crea un misterio divertido que tengan que resolver. Alguien perdió un objeto importante o hay un secreto en la escuela.' 
  },
  { 
    id: 'comedy', 
    label: 'Comedia de Enredos', 
    icon: '😂', 
    promptModifier: 'haz una historia muy divertida, llena de errores cómicos, situaciones absurdas y risas.' 
  },
];

export const STORY_LENGTHS: StoryLength[] = [
  {
    id: 'short',
    label: 'Historia Corta',
    description: 'Lectura rápida (aprox. 5 min)',
    icon: '⚡',
    promptInstruction: 'La longitud debe ser breve (aprox 500 palabras). Ve directo a la acción y resuelve la trama rápidamente.'
  },
  {
    id: 'long',
    label: 'Capítulo de Libro',
    description: 'Historia muy detallada (aprox. 15-20 min)',
    icon: '📖',
    promptInstruction: 'ESTO ES CRUCIAL: Escribe un CAPÍTULO DE NOVELA EXTENSO (Mínimo 1500-2000 palabras). Estructura la historia en múltiples escenas. Detalla minuciosamente cada ambiente, describe la ropa, los gestos y los pensamientos internos. Usa diálogos muy largos y realistas. NO resumas la acción; nárala paso a paso. Tómate tu tiempo para desarrollar la trama lentamente.'
  }
];

export const LOADING_MESSAGES = [
  "Afinando las guitarras...",
  "Miss Jenn está buscando el vestuario...",
  "Escribiendo la próxima canción exitosa...",
  "Los Wildcats se están reuniendo...",
  "Ensayando la coreografía...",
  "Calentando la voz...",
  "Escribiendo el guion del próximo episodio...",
  "Buscando inspiración en los pasillos de East High...",
];