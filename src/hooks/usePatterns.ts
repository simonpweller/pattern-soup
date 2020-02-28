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

    const addPattern = (name: string) => {
        let newPatterns = [{id: uuid(), name}, ...patterns];
        setPatterns(newPatterns);
        return storePatterns(newPatterns);
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

    return {addPattern, patterns}
};
