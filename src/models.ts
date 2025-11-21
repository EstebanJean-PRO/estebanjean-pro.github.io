import { createContext, useContext } from "react";

interface ThemeContextType {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export interface SkillContent {
    name: string;
    type: 'hard' | 'soft';
    // Hard skills
    link?: string;
    category?: 'frontend' | 'backend' | 'data' | 'devops' | 'os' | 'conception';
    proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    // Soft skills
    icon?: string;
}

export interface Project {
    screenshots: string[];
    name: string;
    techs: string[];
    description: string;
    links: { label: string; url: string }[];
}

export type Icons8Type = 'pastel-glyph' | 'ios-filled' | 'metro' | undefined;
export type AllSkills = [string, SkillContent][];

export const ICONS_BASE_URL = "https://img.icons8.com/";
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export let CacheStorage: { [key: string]: any } = {};

export function useTheme() : ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function cleanupTimers() {
    Object.keys(CacheStorage).forEach(key => {
        if (key.endsWith('Timeout')) {
            clearTimeout(CacheStorage[key]);
        } else if (key.endsWith('Effect')) {
            clearInterval(CacheStorage[key]);
        }
    });
}