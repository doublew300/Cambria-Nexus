import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, Scroll, Sword, Shield, Skull, X, ChevronRight, User, Zap, Coins, Keyboard, Footprints, Briefcase, Calculator, Clock } from 'lucide-react';
import { GUIDES, Guide, GuideType } from './data/wikiData';

interface GuidesProps {
    onSelectGuide: (guide: Guide) => void;
}

export type { Guide, GuideType };

export default function Guides({ onSelectGuide }: GuidesProps) {

    // Sort guides: Pinned basics first, then by ID
    const sortedGuides = [...GUIDES].sort((a, b) => a.id - b.id);

    return (
        <div className="space-y-6 relative min-h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="text-neon-gold" /> The Archives
                    </h2>
                    <p className="text-gray-400 text-sm">Curated strategies, builds, and mechanics from the Cambria Nexus.</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedGuides.map((guide, index) => (
                    <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelectGuide(guide)}
                        className="group relative p-6 border-2 border-cambria-purple/30 bg-black/60 rounded-xl overflow-hidden hover:border-neon-gold/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(176,38,255,0.2)] flex flex-col"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cambria-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10 flex flex-col grow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg border transition-colors ${guide.type === 'economy' ? 'bg-green-900/20 border-green-500/30 text-green-400' :
                                    guide.type === 'build' ? 'bg-red-900/20 border-red-500/30 text-red-400' :
                                        guide.type === 'strategy' ? 'bg-purple-900/20 border-purple-500/30 text-purple-400' :
                                            guide.type === 'mechanic' ? 'bg-blue-900/20 border-blue-500/30 text-blue-400' :
                                                'bg-cambria-purple/10 border-cambria-purple/20 text-cambria-purple'
                                    }`}>
                                    {guide.type === 'economy' ? <Coins size={20} /> :
                                        guide.type === 'build' ? <Sword size={20} /> :
                                            guide.type === 'strategy' ? <Shield size={20} /> :
                                                guide.type === 'mechanic' ? <Zap size={20} /> :
                                                    <BookOpen size={20} />}
                                </div>
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-wider border border-gray-800 px-2 py-1 rounded bg-black/50">
                                    {guide.type}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-gold transition-colors line-clamp-1">
                                {guide.title}
                            </h3>

                            <p className="text-gray-400 text-xs mb-4 line-clamp-2 h-8">
                                {guide.description}
                            </p>

                            <div className="mt-auto pt-3 border-t border-gray-800 flex items-center justify-between">
                                <span className="text-xs text-gray-600 flex items-center gap-1">
                                    {guide.author && <><User size={10} /> {guide.author}</>}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-neon-gold font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                                    Read <ChevronRight size={12} />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Credits */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-center flex flex-col gap-2 items-center justify-center">
                <p className="text-xs text-gray-400">
                    Content maintained by <span className="text-neon-gold">DoubleW300</span>
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>Contributors:</span>
                    <a href="https://x.com/1ogic_xyz" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">1ogic</a>
                    <span>&</span>
                    <a href="https://x.com/Arual3x" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Arual3x</a>
                </div>
            </div>
        </div>
    );
}
