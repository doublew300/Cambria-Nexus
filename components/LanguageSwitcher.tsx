"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex bg-black/40 border border-cambria-purple/30 rounded-lg p-1 gap-1">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${language === 'en'
                        ? 'bg-cambria-purple text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                EN
            </button>
            <div className="w-px bg-white/10" />
            <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 text-xs font-bold rounded transition-colors ${language === 'ru'
                        ? 'bg-cambria-purple text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
            >
                RU
            </button>
        </div>
    );
}
