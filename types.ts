export interface Character {
  id: string;
  name: string;
  avatarEmoji: string;
  color: string;
}

export interface Genre {
  id: string;
  label: string;
  icon: string;
  promptModifier: string;
}

export interface StoryLength {
  id: 'short' | 'long';
  label: string;
  description: string;
  icon: string;
  promptInstruction: string;
}

export type Language = 'es' | 'en';

export interface StoryState {
  characters: string[];
  genre: string | null;
  length: 'short' | 'long' | null;
  language: Language;
  generatedStory: string | null;
  title: string | null;
  isLoading: boolean;
}

export interface SavedStory {
  id: string;
  title: string;
  content: string;
  characters: string[]; // IDs
  genreId: string;
  lengthId: 'short' | 'long';
  language: Language;
  createdAt: number; // timestamp
}