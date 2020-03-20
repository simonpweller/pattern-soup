import {useEffect, useState} from 'react';
import {v4 as uuid} from 'uuid';
import {Plugins} from '@capacitor/core';

const { Storage } = Plugins;

const STORAGE_KEY = 'patterns';

export type Pattern = PatternData & { id: string }

export type PatternData = {
    name: string,
    hanger: number | undefined,
    notes: string,
}

export const usePatterns = () => {
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const [searchText, setSearchText] = useState('');
    const filteredPatterns = patterns.filter(pattern =>
        pattern.name.toLowerCase().includes(searchText.toLowerCase())
            || pattern.notes.toLowerCase().includes(searchText.toLowerCase())
            || (pattern.hanger?.toString() || '').includes(searchText)
    );

    useEffect(() => {
        async function loadPatterns() {
            const storedPatterns = await Storage.get({key: STORAGE_KEY});
            if (storedPatterns?.value) {
                setPatterns(JSON.parse(storedPatterns.value).map(cleanUpHangers));
            }
        }

        // TODO: Remove once hangers have been cleaned up
        function cleanUpHangers(p: Pattern) {
            return {...p, hanger: p.hanger ? (Number(p.hanger) || undefined) : undefined};
        }

        loadPatterns()
    }, []);

    const getPattern = (id: string) => patterns.find(p => p.id === id);

    const addPattern = (patternData: PatternData) => {
        const newPatterns = [{id: uuid(), ...patternData}, ...patterns];
        setAndStore(newPatterns);
    };

    const updatePattern = (id: string, patternData: PatternData) => {
        const newPatterns = [...patterns];
        const indexOfPatternToUpdate = patterns.findIndex(p => p.id === id);
        newPatterns[indexOfPatternToUpdate] = {...(newPatterns[indexOfPatternToUpdate]), ...patternData};
        setAndStore(newPatterns);
    };

    const deletePattern = (id: string) => {
        const newPatterns = patterns.filter(p => p.id !== id);
        setAndStore(newPatterns);
    };

    const movePattern = (from: number, to: number) => {
        const patternsWithoutMovedPattern = [...patterns.slice(0, from), ...patterns.slice(from + 1)];
        const newPatterns = [...patternsWithoutMovedPattern.slice(0, to), patterns[from], ...patternsWithoutMovedPattern.slice(to)];
        setAndStore(newPatterns);    };

    const sortPatterns = () => {
        const newPatterns = [...patterns].sort((a, b) => (a.hanger || Infinity) - (b.hanger || Infinity));
        setAndStore(newPatterns);
    };

    function setAndStore(newPatterns: Pattern[]) {
        setPatterns(newPatterns);
        storePatterns(newPatterns);
    }

    async function storePatterns(patterns: Pattern[]) {
        await Storage.set({key: STORAGE_KEY, value: JSON.stringify(patterns)});
    }

    return {patterns: filteredPatterns, getPattern, addPattern, updatePattern, deletePattern, movePattern, sortPatterns, searchText, setSearchText}
};
