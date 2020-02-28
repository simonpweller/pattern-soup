import {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {Pattern} from '../pages/Home';
import {Plugins} from '@capacitor/core';

const { Storage } = Plugins;

const STORAGE_KEY = 'patterns';

export const usePatterns = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([]);

    useEffect(() => {
        loadPatterns()
    }, []);

    const getPattern = (id: string) => patterns.find(p => p.id === id);

    const addPattern = (name: string) => {
        const newPatterns = [{id: uuid(), name, notes: ''}, ...patterns];
        setPatterns(newPatterns);
        storePatterns(newPatterns);
    };

    const updatePattern = (id: string, pattern: Pattern) => {
        const newPatterns = [...patterns];
        newPatterns[newPatterns.findIndex(p => p.id === id)] = pattern;
        setPatterns(newPatterns);
        storePatterns(newPatterns);
    };

    const deletePattern = (id: string) => {
        const newPatterns = patterns.filter(p => p.id !== id);
        setPatterns(newPatterns);
        storePatterns(newPatterns);
    };

    async function storePatterns(patterns: Pattern[]) {
        await Storage.set({key: STORAGE_KEY, value: JSON.stringify(patterns)});
    }

    async function loadPatterns() {
        const storedPatterns = await Storage.get({key: STORAGE_KEY});
        if (storedPatterns?.value) {
            setPatterns(JSON.parse(storedPatterns.value));
        }
    }

    return {patterns, getPattern, addPattern, updatePattern, deletePattern}
};
