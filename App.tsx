import React, { useState, useEffect } from 'react';
import { CharacterSelector } from './components/CharacterSelector';
import { GenreSelector } from './components/GenreSelector';
import { LengthSelector } from './components/LengthSelector';
import { LanguageSelector } from './components/LanguageSelector';
import { StoryReader } from './components/StoryReader';
import { StoryHistory } from './components/StoryHistory';
import { CHARACTERS, GENRES, STORY_LENGTHS, LOADING_MESSAGES } from './constants';
import { generateStory, generateStoryStream } from './services/geminiService';
import { Language, SavedStory } from './types';
import { useStoryStorage } from './hooks/useStoryStorage';

const App: React.FC = () => {
  const [selectedCharIds, setSelectedCharIds] = useState<string[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [selectedLengthId, setSelectedLengthId] = useState<'short' | 'long' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('es');

  const [generatedStory, setGeneratedStory] = useState<{ title: string, content: string } | null>(null);
  const [currentChoices, setCurrentChoices] = useState<string[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  const [view, setView] = useState<'create' | 'history'>('create');

  const { savedStories, saveStory, deleteStory } = useStoryStorage();

  // Rotate loading messages
  useEffect(() => {
    let interval: number;
    if (isLoading) {
      interval = window.setInterval(() => {
        setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleCharacterToggle = (id: string) => {
    setSelectedCharIds(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleGenerateClick = async () => {
    if (selectedCharIds.length === 0 || !selectedGenreId || !selectedLengthId) return;

    setIsLoading(true);
    setGeneratedStory(null);
    setCurrentChoices(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const chars = CHARACTERS.filter(c => selectedCharIds.includes(c.id));
      const genre = GENRES.find(g => g.id === selectedGenreId);
      const length = STORY_LENGTHS.find(l => l.id === selectedLengthId);

      if (chars && genre && length) {
        // Use streaming for typewriter effect
        const story = await generateStoryStream(
          chars,
          genre,
          length,
          selectedLanguage,
          (chunk: string) => {
            setGeneratedStory(prev => {
              if (!prev) return { title: "Escribiendo...", content: chunk };
              return { ...prev, content: prev.content + chunk };
            });
          }
        );

        // Final update to ensure title is correct
        setGeneratedStory({ title: story.title, content: story.fullContent });
        setCurrentChoices(story.choices);

        // Auto-save the story (without choices for now, user can assume interaction happened)
        saveStory({
          title: story.title,
          content: story.fullContent,
          characters: selectedCharIds,
          genreId: selectedGenreId,
          lengthId: selectedLengthId,
          language: selectedLanguage,
        });
      }
    } catch (error: any) {
      console.error("Story generation error:", error);
      const errorMsg = error.message || "Error desconocido";
      alert(`Hubo un problema contactando con los escritores de East High. ¡Inténtalo de nuevo!\n\nDetalle del error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoice = async (choice: string) => {
    if (!generatedStory) return;

    // Clear choices to prevent double click
    setCurrentChoices(undefined);
    setIsLoading(true);

    try {
      // Import dynamically to avoid circle dep if any (not needed here but good practice)
      const { continueStoryStream } = await import('./services/geminiService');

      // Append choice to story content visually
      setGeneratedStory(prev => prev ? ({
        ...prev,
        content: prev.content + "\n\n**TÚ ELEGISTE:** _" + choice + "_\n\n"
      }) : null);

      await continueStoryStream(
        generatedStory.content,
        choice,
        selectedLanguage,
        (chunk: string) => {
          (chunk: string) => {
            setGeneratedStory(prev => {
              if (!prev) return { title: "Interactuando...", content: chunk };
              return { ...prev, content: prev.content + chunk };
            });
          }
        }
      );

    } catch (error: any) {
      console.error("Error continuing story:", error);
      alert("Error continuando la historia.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetStory = () => {
    setGeneratedStory(null);
    setCurrentChoices(undefined);
    // Keep selections for convenience, user can change if they want
  };

  const loadStory = (story: SavedStory) => {
    setGeneratedStory({ title: story.title, content: story.content });
    setCurrentChoices(undefined); // Saved stories are finished
    setView('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canGenerate = selectedCharIds.length > 0 && selectedGenreId && selectedLengthId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 pb-20">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg sticky top-0 z-50 no-print">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('create')}>
            <div className="bg-white text-red-700 font-bold rounded-full w-10 h-10 flex items-center justify-center text-xl border-2 border-yellow-400">
              W
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">East High Stories</h1>
              <p className="text-xs text-red-200 uppercase tracking-widest">Fan Fiction Generator</p>
            </div>
          </div>

          <button
            onClick={() => {
              setView(view === 'create' ? 'history' : 'create');
              setGeneratedStory(null);
            }}
            className="flex items-center space-x-2 bg-red-800 hover:bg-red-900 px-4 py-2 rounded-full transition-colors font-semibold text-sm"
          >
            <span>{view === 'create' ? '📚 Mis Historias' : '✍️ Crear Nueva'}</span>
            {view === 'create' && savedStories.length > 0 && (
              <span className="bg-yellow-400 text-red-900 text-xs px-2 py-0.5 rounded-full">
                {savedStories.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-8">

        {view === 'history' ? (
          <StoryHistory
            stories={savedStories}
            onSelectStory={loadStory}
            onDeleteStory={deleteStory}
            onBack={() => setView('create')}
          />
        ) : (
          <>
            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20 fade-in">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-red-800 animate-pulse">{loadingMsg}</h2>
                <p className="text-gray-500 mt-2">Creando magia...</p>
                {selectedLengthId === 'long' && (
                  <p className="text-red-400 text-sm mt-4 italic max-w-xs text-center">
                    Escribir un capítulo largo lleva un poco más de tiempo. ¡Paciencia!
                  </p>
                )}
              </div>
            )}

            {/* Story Reader */}
            {!isLoading && generatedStory && (
              <StoryReader
                title={generatedStory.title}
                content={generatedStory.content}
                choices={currentChoices}
                onChoice={handleChoice}
                onReset={resetStory}
              />
            )}

            {/* Configuration Form */}
            {!isLoading && !generatedStory && (
              <div className="fade-in">
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-red-100">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Crea tu propio episodio!</h2>
                    <p className="text-gray-600">Elige a tus personajes favoritos y dinos qué debería pasar hoy en Salt Lake City.</p>
                  </div>

                  <LanguageSelector
                    selectedLanguage={selectedLanguage}
                    onSelect={setSelectedLanguage}
                  />

                  <div className="border-t border-gray-100 my-8"></div>

                  <CharacterSelector
                    selectedIds={selectedCharIds}
                    onToggle={handleCharacterToggle}
                  />

                  <div className="border-t border-gray-100 my-8"></div>

                  <GenreSelector
                    selectedId={selectedGenreId}
                    onSelect={setSelectedGenreId}
                  />

                  <div className="border-t border-gray-100 my-8"></div>

                  <LengthSelector
                    selectedId={selectedLengthId}
                    onSelect={setSelectedLengthId}
                  />

                  <div className="mt-10 flex justify-center">
                    <button
                      onClick={handleGenerateClick}
                      disabled={!canGenerate}
                      className={`
                        w-full md:w-auto px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all transform
                        ${canGenerate
                          ? 'bg-red-600 hover:bg-red-700 hover:scale-105 text-white cursor-pointer ring-4 ring-red-200'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }
                      `}
                    >
                      {canGenerate
                        ? (selectedLanguage === 'en' ? '🎬 Action! Generate Story' : '🎬 ¡Acción! Generar Historia')
                        : (selectedLanguage === 'en' ? 'Select options to start' : 'Completa las opciones para empezar')
                      }
                    </button>
                  </div>
                </div>

                <p className="text-center text-gray-400 text-xs mt-8">
                  Esta app usa IA para generar historias. Todo es ficción y hecho por fans para fans.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;