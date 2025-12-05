import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Scroll, GraduationCap, Globe, Hammer } from 'lucide-react';
import Guides from './Guides';
import TheArmory from './library/TheArmory';
import TheKitchen from './library/TheKitchen';
import TheWorld from './library/TheWorld';
import TheAcademy from './library/TheAcademy';

import { Guide } from './Guides';

type Tab = 'armory' | 'kitchen' | 'world' | 'academy' | 'archives';

interface TheLibraryProps {
    onSelectGuide: (guide: Guide) => void;
}

export default function TheLibrary({ onSelectGuide }: TheLibraryProps) {
    const [activeTab, setActiveTab] = useState<Tab>('armory');

    return (
        <div className="space-y-6">
            {/* Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
                <button
                    onClick={() => setActiveTab('armory')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'armory' ? 'bg-red-900/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Sword size={18} /> The Armory
                </button>
                <button
                    onClick={() => setActiveTab('kitchen')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'kitchen' ? 'bg-orange-900/20 text-orange-400 border border-orange-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Hammer size={18} /> The Kitchen
                </button>
                <button
                    onClick={() => setActiveTab('world')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'world' ? 'bg-green-900/20 text-green-400 border border-green-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Globe size={18} /> The World
                </button>
                <button
                    onClick={() => setActiveTab('academy')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'academy' ? 'bg-blue-900/20 text-blue-400 border border-blue-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <GraduationCap size={18} /> The Academy
                </button>
                <button
                    onClick={() => setActiveTab('archives')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === 'archives' ? 'bg-purple-900/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Scroll size={18} /> The Archives
                </button>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px]">
                <AnimatePresence mode="wait">
                    {activeTab === 'armory' && (
                        <motion.div
                            key="armory"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <TheArmory />
                        </motion.div>
                    )}
                    {activeTab === 'kitchen' && (
                        <motion.div
                            key="kitchen"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <TheKitchen />
                        </motion.div>
                    )}
                    {activeTab === 'world' && (
                        <motion.div
                            key="world"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <TheWorld />
                        </motion.div>
                    )}
                    {activeTab === 'academy' && (
                        <motion.div
                            key="academy"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <TheAcademy />
                        </motion.div>
                    )}
                    {activeTab === 'archives' && (
                        <motion.div
                            key="archives"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Guides onSelectGuide={onSelectGuide} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
