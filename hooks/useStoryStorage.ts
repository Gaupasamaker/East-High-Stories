import { useState, useEffect } from 'react';
import { SavedStory } from '../types';

const STORAGE_KEY = 'east-high-stories-history';

export const useStoryStorage = () => {
    const [savedStories, setSavedStories] = useState<SavedStory[]>([]);

    useEffect(() => {
        const loaded = localStorage.getItem(STORAGE_KEY);
        if (loaded) {
            try {
                setSavedStories(JSON.parse(loaded));
            } catch (e) {
                console.error("Failed to parse saved stories", e);
            }
        }
    }, []);

    const saveStory = (story: Omit<SavedStory, 'id' | 'createdAt'>) => {
        const newStory: SavedStory = {
            ...story,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
        };

        const updated = [newStory, ...savedStories];
        setSavedStories(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return newStory;
    };

    const deleteStory = (id: string) => {
        const updated = savedStories.filter(s => s.id !== id);
        setSavedStories(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return {
        savedStories,
        saveStory,
        deleteStory
    };
};
