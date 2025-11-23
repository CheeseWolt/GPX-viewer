'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseGpx, ParsedGpx } from './utils/gpxParser';

interface GpxContextType {
    gpxData: ParsedGpx | null;
    loading: boolean;
    uploadGpx: (content: string) => void;
}

const GpxContext = createContext<GpxContextType | undefined>(undefined);

export function GpxProvider({ children }: { children: React.ReactNode }) {
    const [gpxData, setGpxData] = useState<ParsedGpx | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadDefaultGpx() {
            try {
                const response = await fetch('/demo.gpx');
                if (!response.ok) throw new Error('Failed to load demo GPX');
                const text = await response.text();
                const parsed = parseGpx(text);
                setGpxData(parsed);
            } catch (error) {
                console.error('Failed to load GPX', error);
            } finally {
                setLoading(false);
            }
        }
        loadDefaultGpx();
    }, []);

    const uploadGpx = (content: string) => {
        try {
            const parsed = parseGpx(content);
            setGpxData(parsed);
        } catch (error) {
            console.error('Failed to parse uploaded GPX', error);
        }
    };

    return (
        <GpxContext.Provider value={{ gpxData, loading, uploadGpx }}>
            {children}
        </GpxContext.Provider>
    );
}

export function useGpx() {
    const context = useContext(GpxContext);
    if (context === undefined) {
        throw new Error('useGpx must be used within a GpxProvider');
    }
    return context;
}
