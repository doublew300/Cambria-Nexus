"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

type Translations = {
    [key in Language]: {
        [key: string]: string;
    };
};

const translations: Translations = {
    en: {
        // Nav
        "nav.ledger": "THE LEDGER",
        "nav.dungeon": "DUNGEON MASTER",
        "nav.airdrop": "AIRDROP SIM",
        "nav.economy": "ECONOMY",
        "nav.library": "THE LIBRARY",

        // Paymaster
        "paymaster.title": "PAYMASTER ROI",
        "paymaster.deposited": "Your Deposited Charters",
        "paymaster.pool": "Total Syndicate Pool",
        "paymaster.dailyNew": "Est. Daily New Charters",
        "paymaster.estIncome": "Est. Daily Passive Income",
        "paymaster.disclaimer": "Based on 20% Tax (0.002 ETH) per new charter minted.",

        // Airdrop Sim
        "airdrop.banner": "AIRDROP SIMULATOR",
        "airdrop.charter": "Charter Tier",
        "airdrop.tier1": "Tier 1 - Royal Charter",
        "airdrop.tier2": "Tier 2 - Gilded Charter (+1.0x Airdrop)",
        "airdrop.tier3": "Tier 3 - Ascendant Charter (XP Boost)",
        "airdrop.tier4": "Tier 4 - Cabal Charter",
        "airdrop.energy": "Energy Orbs",
        "airdrop.energyPlaceholder": "Enter orbs consumed",
        "airdrop.energyDesc": "1 Orb = 100k Energy. Unlocks XP Multiplier.",
        "airdrop.energyUnit": "ENERGY",
        "airdrop.founders": "Founder NFTs",
        "airdrop.islands": "Island NFTs",
        "airdrop.luck": "Luck Index (%)",
        "airdrop.totalMult": "Total Multiplier",
        "airdrop.airdropMult": "Airdrop Multiplier",
        "airdrop.xpMult": "XP Multiplier",
        "airdrop.stackDesc": "Multipliers stack additively based on Season 3 mechanics.",
        "airdrop.share": "SHARE STATUS",
        "airdrop.save": "SAVE CARD",
        "airdrop.copy": "COPY",
        "airdrop.close": "CLOSE",
        "airdrop.generating": "GENERATING...",

        // Share Card
        "airdrop.report": "Airdrop Status Report",
        "airdrop.charterLabel": "CHARTER",
        "airdrop.foundersLabel": "FOUNDERS",
        "airdrop.islandsLabel": "ISLANDS",
        "airdrop.luckXpLabel": "LUCK / XP",
        "airdrop.totalMultLabel": "TOTAL MULTIPLIER",
        "airdrop.seasonReady": "SEASON 3 READY",
        "airdrop.website": "CAMBRIA.GG",

        // Items
        "item.founders": "Founders",
        "item.islands": "Islands",
        "item.active": "Active",
        "item.none": "None",
        "item.noXpBoost": "No XP Boost",

        // Footer
        "footer.built": "Built for the Cambria Community. Not affiliated with Cambria MMO.",
    },
    ru: {
        // Nav
        "nav.ledger": "THE LEDGER", // Keep as Ledger
        "nav.dungeon": "DUNGEON MASTER", // Keep as Dungeon Master
        "nav.airdrop": "AIRDROP SIM", // Keep as Airdrop Sim
        "nav.economy": "ЭКОНОМИКА",
        "nav.library": "БИБЛИОТЕКА",

        // Paymaster
        "paymaster.title": "PAYMASTER ROI",
        "paymaster.deposited": "Твои Депозиты Чартеров", // Charters deposited
        "paymaster.pool": "Общий Пул Синдиката", // Total Syndicate Pool
        "paymaster.dailyNew": "Новых Чартеров в день (оценка)", // Est daily new
        "paymaster.estIncome": "Оценка Пассивного Дохода", // Est daily passive
        "paymaster.disclaimer": "Основано на 20% налоге (0.002 ETH) за каждый новый чартер.",

        // Airdrop Sim
        // Airdrop Sim
        "airdrop.banner": "AIRDROP SIMULATOR", // Keep title English
        "airdrop.charter": "Charter Tier", // Keep Charter Tier
        "airdrop.tier1": "Tier 1 - Royal Charter",
        "airdrop.tier2": "Tier 2 - Gilded Charter (+1.0x Airdrop)",
        "airdrop.tier3": "Tier 3 - Ascendant Charter (XP Boost)",
        "airdrop.tier4": "Tier 4 - Cabal Charter",
        "airdrop.energy": "Сферы Энергии",
        "airdrop.energyPlaceholder": "Введите кол-во сфер",
        "airdrop.energyDesc": "1 Orb = 100k Energy. Открывает XP буст.",
        "airdrop.energyUnit": "ENERGY",
        "airdrop.founders": "Founder NFT", // Keep Founder
        "airdrop.islands": "Island NFT", // Keep Island
        "airdrop.luck": "Индекс Удачи (%)",
        "airdrop.totalMult": "Общий Мультипликатор",
        "airdrop.airdropMult": "Мультипликатор Аирдропа",
        "airdrop.xpMult": "XP Мультипликатор",
        "airdrop.stackDesc": "Мультипликаторы суммируются на основе механики 3 сезона.",
        "airdrop.share": "ПОДЕЛИТЬСЯ",
        "airdrop.save": "СОХРАНИТЬ",
        "airdrop.copy": "КОПИРОВАТЬ",
        "airdrop.close": "ЗАКРЫТЬ",
        "airdrop.generating": "ГЕНЕРАЦИЯ...",

        // Share Card
        "airdrop.report": "Отчет Статуса Аирдропа",
        "airdrop.charterLabel": "ЧАРТЕР",
        "airdrop.foundersLabel": "ФАУНДЕРЫ",
        "airdrop.islandsLabel": "ОСТРОВА",
        "airdrop.luckXpLabel": "УДАЧА / XP",
        "airdrop.totalMultLabel": "ОБЩИЙ МУЛЬТИПЛИКАТОР",
        "airdrop.seasonReady": "ГОТОВ К 3 СЕЗОНУ",
        "airdrop.website": "CAMBRIA.GG",

        // Items
        "item.founders": "Фаундеры",
        "item.islands": "Острова",
        "item.active": "Активен",
        "item.none": "Нет",
        "item.noXpBoost": "Нет XP Буста",

        // Footer
        "footer.built": "Создано для сообщества Cambria. Не связано с Cambria MMO.",
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
