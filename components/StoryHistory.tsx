import React from 'react';
import { SavedStory, Language } from '../types';
import { CHARACTERS } from '../constants';
import { getTranslation } from '../constants/translations';

interface StoryHistoryProps {
    stories: SavedStory[];
    onSelectStory: (story: SavedStory) => void;
    onDeleteStory: (id: string) => void;
    onBack: () => void;
    language: Language;
}

export const StoryHistory: React.FC<StoryHistoryProps> = ({
    stories,
    onSelectStory,
    onDeleteStory,
    onBack,
    language
}) => {
    const t = getTranslation(language);

    if (stories.length === 0) {
        return (
            <div className="text-center py-20 fade-in">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.history.emptyTitle}</h2>
                <p className="text-gray-500 mb-8">{t.history.emptyDesc}</p>
                <button
                    onClick={onBack}
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                    {t.history.createStory}
                </button>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">{t.history.myStories} ({stories.length})</h2>
                <button
                    onClick={onBack}
                    className="text-red-600 font-bold hover:underline"
                >
                    &larr; {t.history.back}
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {stories.map((story) => {
                    // Find first character to use avatar/color
                    const firstChar = CHARACTERS.find(c => c.id === story.characters[0]);
                    const date = new Date(story.createdAt).toLocaleDateString();

                    return (
                        <div
                            key={story.id}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all relative group"
                        >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm(t.history.deleteConfirm)) onDeleteStory(story.id);
                                    }}
                                    className="text-gray-400 hover:text-red-500 p-2"
                                    title={t.history.deleteTooltip}
                                >
                                    🗑️
                                </button>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={() => onSelectStory(story)}
                            >
                                <div className="flex items-center space-x-3 mb-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl border-2 border-white shadow-sm"
                                        style={{ backgroundColor: firstChar?.color || '#eee' }}
                                    >
                                        {firstChar?.avatarEmoji || '🎭'}
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 uppercase tracking-wide">{date}</span>
                                        <h3 className="font-bold text-lg text-gray-800 leading-tight line-clamp-1">{story.title}</h3>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                    {story.content.replace(/[#*]/g, '')}
                                </p>

                                <span className="text-red-600 text-sm font-bold group-hover:underline">
                                    {t.history.readFull} &rarr;
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
