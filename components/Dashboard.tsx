"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TheLedger from './TheLedger';
import DungeonMaster from './DungeonMaster';
import AirdropSim from './AirdropSim';
import PaymasterCalculator from './PaymasterCalculator';
import GuildManager from './GuildManager';
import XPCalculator from './XPCalculator';
import ReferralCode from './ReferralCode';
import TheLibrary from './TheLibrary';
import TheOracle from './TheOracle';
import TiltCard from './ui/TiltCard';
import GlitchTransition from './ui/GlitchTransition';
import { MagicBorder } from './ui/GlowBorder';
import ParticleBackground from './ui/ParticleBackground';
import { Calculator, Skull, Gem, Coins, BookOpen, X, User } from 'lucide-react';
import { Guide } from './Guides';
import { soundManager } from '../utils/sound';

import { LanguageProvider, useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

type Tab = 'home' | 'ledger' | 'dungeon' | 'airdrop' | 'economy' | 'library';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function DashboardContent() {
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [raveMode, setRaveMode] = useState(false);
    const { t } = useLanguage();

    // Konami Code Easter Egg
    React.useEffect(() => {
        let cursor = 0;
        const handler = (e: KeyboardEvent) => {
            if (e.key === KONAMI_CODE[cursor]) {
                cursor++;
                if (cursor === KONAMI_CODE.length) {
                    setRaveMode(prev => !prev);
                    cursor = 0;
                    // Play sound if available
                    soundManager.playConfirm(); // Reuse click sound for feedback
                }
            } else {
                cursor = 0;
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const navItems = [
        { id: 'home', icon: Gem, label: 'HOME' }, // Using Gem as placeholder, will replace with proper icon in map
        { id: 'ledger', icon: Calculator, label: t('nav.ledger') },
        { id: 'dungeon', icon: Skull, label: t('nav.dungeon') },
        { id: 'airdrop', icon: Gem, label: t('nav.airdrop') },
        { id: 'economy', icon: Coins, label: t('nav.economy') },
        { id: 'library', icon: BookOpen, label: t('nav.library') },
    ];

    return (
        <div className={`min-h-screen p-4 md:p-8 relative overflow-hidden font-pixel text-white selection:bg-neon-purple selection:text-white ${raveMode ? 'rave-mode' : ''}`}>
            <ParticleBackground />
            {/* Background Effects */}
            <div className="absolute inset-0 -z-20">
                <img src="/assets/bg_main.png" alt="Background" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-black/70" /> {/* Overlay to darken */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.15),transparent_70%)] animate-pulse-glow" />
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] animate-scanline" />

            <div className="absolute top-4 left-4 z-50">
                <LanguageSwitcher />
            </div>

            <ReferralCode />

            <header className="mb-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => { setActiveTab('home'); soundManager.playClick(); }}
                    className="flex justify-center mb-4 cursor-pointer hover:scale-105 transition-transform"
                >
                    {/* Logo Asset */}
                    <img src="/assets/logo_glow.png" alt="Cambria Logo" className="h-32 md:h-48 object-contain drop-shadow-[0_0_35px_rgba(255,215,0,0.6)]" />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-cambria-red/90 text-sm md:text-base tracking-[0.2em] uppercase font-bold drop-shadow-[0_0_10px_rgba(255,68,68,0.8)] font-germania"
                >
                    Ultimate Utility Dashboard
                </motion.p>
            </header>

            <main className="max-w-6xl mx-auto relative z-10">
                {/* Navigation Tabs - Hidden on Home unless we want a persistent nav. Let's keep it persistent but highlight Home. */}
                <nav className="flex flex-wrap justify-center gap-4 mb-8">
                    {navItems.filter(i => i.id !== 'home').map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,215,0,0.4)" }}
                            whileTap={{ scale: 0.9, y: 2 }}
                            onClick={() => { setActiveTab(tab.id as Tab); soundManager.playTab(); }}
                            className={`flex items-center gap-2 px-6 py-3 border-2 transition-all duration-150 rounded-lg ${activeTab === tab.id
                                ? 'border-neon-gold bg-cambria-gold/20 text-neon-gold shadow-[0_0_25px_rgba(255,215,0,0.4)]'
                                : 'border-cambria-purple/50 bg-black/40 text-gray-400 hover:border-neon-gold/50 hover:text-neon-gold/80'
                                }`}
                        >
                            <tab.icon size={20} />
                            <span className="font-germania tracking-wider">{tab.label}</span>
                        </motion.button>
                    ))}
                </nav>



                <AnimatePresence mode="wait">
                    {activeTab === 'home' ? (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000"
                        >

                            {/* Ledger Card */}
                            <TiltCard
                                onClick={() => { setActiveTab('ledger'); soundManager.playClick(); }}
                            >
                                <MagicBorder className="h-64 border border-cambria-purple/50 rounded-xl hover:border-neon-gold hover:shadow-[0_0_30px_rgba(176,38,255,0.3)] transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-xl" />
                                    <img src="/assets/art_banner.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-50 hover:scale-110 transition-transform duration-700 rounded-xl" />
                                    <div className="absolute bottom-0 left-0 p-6 z-20 transform translate-z-20">
                                        <Calculator className="text-neon-gold mb-2" size={32} />
                                        <h3 className="text-2xl font-bold font-germania text-white">THE LEDGER</h3>
                                        <p className="text-sm text-gray-400 mt-1">Combat & Staking Calculator</p>
                                    </div>
                                </MagicBorder>
                            </TiltCard>

                            {/* Library Card */}
                            <TiltCard
                                onClick={() => { setActiveTab('library'); soundManager.playClick(); }}
                            >
                                <MagicBorder className="h-64 border border-cambria-purple/50 rounded-xl hover:border-neon-gold hover:shadow-[0_0_30px_rgba(176,38,255,0.3)] transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-xl" />
                                    <div className="absolute inset-0 bg-[url('/assets/bg_main.png')] bg-cover opacity-30 hover:scale-110 transition-transform duration-700 rounded-xl" />
                                    <div className="absolute bottom-0 left-0 p-6 z-20 transform translate-z-20">
                                        <BookOpen className="text-cyan-400 mb-2" size={32} />
                                        <h3 className="text-2xl font-bold font-germania text-white">THE LIBRARY</h3>
                                        <p className="text-sm text-gray-400 mt-1">Game Guides & Wiki</p>
                                    </div>
                                </MagicBorder>
                            </TiltCard>

                            {/* Economy Card */}
                            <TiltCard
                                onClick={() => { setActiveTab('economy'); soundManager.playClick(); }}
                            >
                                <MagicBorder className="h-64 border border-cambria-purple/50 rounded-xl hover:border-neon-gold hover:shadow-[0_0_30px_rgba(176,38,255,0.3)] transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 rounded-xl" />
                                    <div className="absolute inset-0 bg-green-900/20 hover:bg-green-900/30 transition-colors rounded-xl" />
                                    <img src="/assets/gold_anim.gif" className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-110 transition-transform duration-700 rounded-xl" />
                                    <div className="absolute bottom-0 left-0 p-6 z-20 transform translate-z-20">
                                        <Coins className="text-green-400 mb-2" size={32} />
                                        <h3 className="text-2xl font-bold font-germania text-white">ECONOMY</h3>
                                        <p className="text-sm text-gray-400 mt-1">Paymaster & Guild Tools</p>
                                    </div>
                                </MagicBorder>
                            </TiltCard>

                            {/* THE ORACLE - DAY 5 HYPE (Wide) */}
                            <TheOracle />

                            {/* Airdrop Card (Wide) */}
                            {/* Airdrop Card (Wide - Static) */}
                            <div
                                onClick={() => { setActiveTab('airdrop'); soundManager.playClick(); }}
                                className="md:col-span-2 lg:col-span-3 cursor-pointer group"
                            >
                                <MagicBorder className="h-40 border border-cambria-purple/50 rounded-xl hover:border-neon-gold hover:shadow-[0_0_30px_rgba(176,38,255,0.3)] transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 rounded-xl" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 hover:opacity-30 transition-opacity transform translate-z-10">
                                        <Gem size={120} />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-between p-8 z-20 transform translate-z-20">
                                        <div>
                                            <h3 className="text-2xl font-bold font-germania text-white">AIRDROP SIMULATOR</h3>
                                            <p className="text-sm text-gray-400">Calculate your Season Rewards</p>
                                        </div>
                                        <div className="px-4 py-2 bg-neon-purple/20 border border-neon-purple rounded text-neon-purple hover:bg-neon-purple hover:text-white transition-colors shadow-[0_0_15px_rgba(176,38,255,0.3)]">
                                            LAUNCH
                                        </div>
                                    </div>
                                </MagicBorder>
                            </div>

                        </motion.div>
                    ) : (
                        /* Content Area */
                        <GlitchTransition activeKey={activeTab}>
                            <motion.div
                                className="relative min-h-[400px] border-2 border-cambria-purple/60 bg-black/60 p-6 shadow-[0_0_60px_rgba(176,38,255,0.2)] backdrop-blur-md rounded-xl overflow-hidden"
                            >
                                {/* Decorative Corner Accents */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-gold z-20 shadow-[0_0_10px_rgba(255,215,0,0.8)] rounded-tl-xl" />
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-gold z-20 shadow-[0_0_10px_rgba(255,215,0,0.8)] rounded-tr-xl" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-gold z-20 shadow-[0_0_10px_rgba(255,215,0,0.8)] rounded-bl-xl" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-gold z-20 shadow-[0_0_10px_rgba(255,215,0,0.8)] rounded-br-xl" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.15, ease: "easeInOut" }}
                                    >
                                        {activeTab === 'ledger' && <TheLedger />}
                                        {activeTab === 'dungeon' && <DungeonMaster />}
                                        {activeTab === 'airdrop' && <AirdropSim />}
                                        {activeTab === 'economy' && (
                                            <div className="space-y-12">
                                                <PaymasterCalculator />
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-cambria-purple to-transparent" />
                                                <GuildManager />
                                                <div className="w-full h-px bg-gradient-to-r from-transparent via-cambria-purple to-transparent" />
                                                <XPCalculator />
                                            </div>
                                        )}
                                        {activeTab === 'library' && <TheLibrary onSelectGuide={setSelectedGuide} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </GlitchTransition>
                    )}
                </AnimatePresence>
            </main>

            <footer className="mt-12 text-center text-xs text-gray-400 relative z-10 flex flex-col items-center gap-2 pb-8">
                <p>{t('footer.built')}</p>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2">
                    <div className="flex items-center gap-2">
                        <span className="opacity-80">Created by</span>
                        <a href="https://x.com/doublew333" target="_blank" rel="noopener noreferrer" className="text-neon-gold hover:text-white transition-colors flex items-center gap-1 font-bold bg-neon-gold/10 px-2 py-1 rounded border border-neon-gold/20 hover:border-neon-gold/50">
                            DoubleW300
                        </a>
                    </div>
                </div>

                {/* Contributors */}
                <div className="flex items-center gap-3 mt-1">
                    <span className="opacity-70">with</span>
                    <a href="https://x.com/1ogic_xyz" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-1 font-medium bg-blue-900/10 px-2 py-0.5 rounded border border-blue-500/10 hover:border-blue-500/30">
                        1ogic
                    </a>
                    <span className="opacity-50">+</span>
                    <a href="https://x.com/Arual3x" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-purple-400 transition-colors flex items-center gap-1 font-medium bg-purple-900/10 px-2 py-0.5 rounded border border-purple-500/10 hover:border-purple-500/30">
                        Arual3x
                    </a>
                </div>

                <div className="flex items-center gap-1 mt-2 opacity-70 hover:opacity-100 transition-opacity">
                    <a href="https://t.me/doublew300" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                        <span className="text-blue-400/80">Telegram:</span> doublew300
                    </a>
                </div>
            </footer>

            {/* Modal */}
            <AnimatePresence>
                {selectedGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedGuide(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0a0a] border-2 border-neon-gold/30 w-full max-w-4xl max-h-[85vh] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-800 flex items-start justify-between bg-gradient-to-r from-cambria-purple/10 to-transparent shrink-0">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono text-neon-gold border border-neon-gold/30 px-2 py-0.5 rounded uppercase">
                                            {selectedGuide.type}
                                        </span>
                                        {selectedGuide.author && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <User size={12} /> {selectedGuide.author}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedGuide.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedGuide(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto custom-scrollbar grow">
                                {selectedGuide.content}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function Dashboard() {
    return (
        <LanguageProvider>
            <DashboardContent />
        </LanguageProvider>
    );
}
