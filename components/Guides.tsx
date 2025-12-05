import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ExternalLink, Scroll, Sword, Shield, Skull, X, ChevronRight, User, Zap } from 'lucide-react';
import { MARKS, BOOSTS } from '../data/guidesData';

type GuideType = 'guide' | 'strategy' | 'economy' | 'build';

export interface Guide {
    id: number;
    title: string;
    description: string;
    type: GuideType;
    content: React.ReactNode;
    image?: string;
    author?: string;
}

interface GuidesProps {
    onSelectGuide: (guide: Guide) => void;
}

export default function Guides({ onSelectGuide }: GuidesProps) {

    const guides: Guide[] = [
        {
            id: 1,
            title: "Ruined Dungeons: The Complete Guide",
            description: "Master the mechanics of Ruined Dungeons, invasions, marks, and boosts.",
            type: "guide",
            author: "@1ogic_xyz (inspired)",
            content: (
                <div className="space-y-6 text-gray-300">
                    <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><Skull size={18} /> WARNING</h4>
                        <p className="text-sm">If you don't understand how Ruined Dungeons work, you will die and lose your run. Read this carefully.</p>
                    </div>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">What are Ruined Dungeons?</h3>
                        <p>Collapsed access tunnels into the Ancient underground city-network. They are dynamic, corrupted, high-risk/high-reward instances that match the tier of the region they appear in.</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Spawn randomly across the overworld</li>
                            <li>Allow <strong>ONE invader</strong> to follow you inside</li>
                            <li>Contain traps, elites, surprises, and big loot</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">Core Rules & Invasions</h3>
                        <p>When you enter, the entrance visually changes. If another player follows you, it's an <strong>Invasion</strong>.</p>
                        <p className="mt-2">While invaded, NPC artifact drops are heavily <strong>REDUCED</strong> for both players until one remains. To kick an invader, you must destroy <strong>3 Soul Crystals</strong> scattered around the dungeon.</p>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">The Final Chamber</h3>
                        <p>Contains ONE mini-boss and ONE Boss Chest. To leave the dungeon, you <strong>MUST kill the mini-boss</strong> to spawn the return portal. There is no other way out.</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <h5 className="font-bold text-white mb-1">Boss Chest Loot</h5>
                                <ul className="text-xs space-y-1 text-gray-400">
                                    <li>Silver</li>
                                    <li>Rare Loot</li>
                                    <li>Marks (Attuneable Buffs)</li>
                                </ul>
                            </div>
                            <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <h5 className="font-bold text-white mb-1">Traps</h5>
                                <ul className="text-xs space-y-1 text-gray-400">
                                    <li>Interval Fire Traps</li>
                                    <li>Motion Fire Traps</li>
                                    <li>Spiked Ground Traps</li>
                                    <li>Trapdoor Levers</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">Marks & Boosts</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-white">Marks (Permanent/Tradeable)</h4>
                                <p className="text-sm">Found in dungeon chests. Tradeable until attuned in a Safe Zone. You can equip up to 3.</p>
                                <p className="text-xs text-gray-500 mt-1">Examples: Slayer's Rhythm, Resilience, Enduring Stride.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Boosts (One-Run Consumable)</h4>
                                <p className="text-sm">Powerups that drop during your expedition. They vanish on death or when you hit a Safe Zone. Chain them for a monster run.</p>
                            </div>
                        </div>
                    </section>
                </div >
            )
        },
        {
            id: 2,
            title: "Ultimate Starter Guide (Season 3)",
            description: "From tutorial island to your first dungeon run. The optimal path.",
            type: "guide",
            content: (
                <div className="space-y-6 text-gray-300">
                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">1. Skipping the Tutorial</h3>
                        <p>Kill cows for meat/hide. Sell to Cyril until you have <strong>100 Silver</strong>. Leave the island.</p>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">2. Getting Started (Ranger Path)</h3>
                        <p><strong>Craft a Longbow:</strong></p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>1x Gleamcloth (3x Gleaming Cotton from Fiber Plants)</li>
                            <li>15x Logs</li>
                            <li>1x Thread (Buy from Sousin)</li>
                        </ul>
                        <p className="mt-2"><strong>Get Arrows:</strong> Open every vessel/box on the map (~25 arrows each).</p>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">3. Early Game Grind</h3>
                        <p>Hunt chickens and low-level monsters south of the capital. Then move to <strong>Minothaurus</strong>.</p>
                        <p className="text-sm mt-1">They are easy to kite. Stay here until you have T3 armor, T3 weapon, and level 70-75 skills.</p>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">4. Endgame Transition</h3>
                        <p>Head to the <strong>Dungeon</strong>. Monsters are melee and easy to kite. Great mining potential for next-tier armor.</p>
                        <p className="text-sm text-yellow-500 mt-2">Tip: If too many PKers (skulls) are in a dungeon, find another entrance.</p>
                    </section>
                </div>
            )
        },
        {
            id: 3,
            title: "Endgame Ranger Build",
            description: "Dev-level build for high DPS and kiting. 0 Melee / 5 Ranged / 4 Magic.",
            type: "build",
            image: "/assets/guides/ranger_build.jpg",
            content: (
                <div className="space-y-6 text-gray-300">
                    <img src="/assets/guides/ranger_build.jpg" alt="Ranger Build" className="w-full rounded-lg border border-cambria-purple/30 mb-4" />

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">Mastery Setup</h3>
                        <ul className="space-y-2 text-sm">
                            <li><strong className="text-blue-400">Frost Nova (Magic):</strong> 5x5 AoE freeze (7.5s) + 150 dmg. Hard CC.</li>
                            <li><strong className="text-green-400">Trap Master (Ranged):</strong> Next shot throws a trap. Works with Bounce.</li>
                            <li><strong className="text-green-400">Tumble (Ranged):</strong> Dash that CLEANSES CC + 0.8s immunity.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">Build 1: High DPS Bow</h3>
                        <p className="text-sm mb-2"><strong>Weapon:</strong> Mystbark Shortbow (Fastest attack speed)</p>
                        <p className="text-sm mb-2"><strong>Playstyle:</strong> Perma-kiting + Auto-attacking (Like WoW Hunter).</p>
                        <p className="text-sm"><strong>Special:</strong> Double Strafe (Fires 2 arrows at once).</p>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-3">Build 2: Burst Xbow</h3>
                        <p className="text-sm mb-2"><strong>Weapon:</strong> Cultist Repeater + Dragonsteel Bolt</p>
                        <p className="text-sm mb-2"><strong>Combo:</strong> Dark Sigil (100% accuracy) + Dragon's Breath proc.</p>
                        <p className="text-sm"><strong>Result:</strong> Can delete 70%+ HP in a single burst.</p>
                    </section>
                </div>
            )
        },
        {
            id: 4,
            title: "Mage Builds (Cultist)",
            description: "High skill ceiling, high utility. Frost Barrage, Earth Surge, Fire Surge.",
            type: "build",
            image: "/assets/guides/mage_build.jpg",
            content: (
                <div className="space-y-6 text-gray-300">
                    <img src="/assets/guides/mage_build.jpg" alt="Mage Build" className="w-full rounded-lg border border-cambria-purple/30" />
                    <p className="text-sm italic text-center text-gray-500">Click image to view full details</p>
                </div>
            )
        },
        {
            id: 5,
            title: "Melee Builds (Single Target & AoE)",
            description: "Dragonsteel Dagger for burst, Spiked Battering Ram for farming.",
            type: "build",
            image: "/assets/guides/melee_build_1.jpg",
            content: (
                <div className="space-y-6 text-gray-300">
                    <img src="/assets/guides/melee_build_1.jpg" alt="Melee Build 1" className="w-full rounded-lg border border-cambria-purple/30 mb-4" />
                    <img src="/assets/guides/melee_build_2.jpg" alt="Melee Build 2" className="w-full rounded-lg border border-cambria-purple/30" />
                </div>
            )
        },
        {
            id: 6,
            title: "Marks & Boosts (S3 Mechanics)",
            description: "Complete list of all 30 Marks and 9 Boosts. Know your buffs.",
            type: "strategy",
            content: (
                <div className="space-y-8 text-gray-300">
                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-4 flex items-center gap-2">
                            <Zap size={20} /> Boosts System
                        </h3>
                        <p className="mb-4 text-sm">
                            Random consumables that drop during your run (Skilling, PvE, PvP, Mystery Objects).
                            They <strong>vanish</strong> on death or when entering a Safe Zone.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <h5 className="font-bold text-white mb-1">Drop Chances</h5>
                                <ul className="text-xs space-y-1 text-gray-400 font-mono">
                                    <li className="flex justify-between"><span>Tier 1</span> <span>50%</span></li>
                                    <li className="flex justify-between"><span>Tier 2</span> <span>35%</span></li>
                                    <li className="flex justify-between"><span>Tier 3</span> <span>13%</span></li>
                                    <li className="flex justify-between"><span className="text-purple-400">Tier 4</span> <span className="text-purple-400">2%</span></li>
                                </ul>
                            </div>
                            <div className="bg-black/40 p-3 rounded border border-gray-800">
                                <h5 className="font-bold text-white mb-1">Rules</h5>
                                <ul className="text-xs space-y-1 text-gray-400">
                                    <li>• Only work for current run</li>
                                    <li>• Stackable effects</li>
                                    <li>• T4s turn you into a monster</li>
                                </ul>
                            </div>
                        </div>

                        <div className="overflow-x-auto border border-gray-800 rounded-lg">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-black/60">
                                    <tr>
                                        <th className="px-4 py-2">Boost Name</th>
                                        <th className="px-4 py-2">Effect (T1 / T2 / T3 / T4)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800 bg-black/40">
                                    {BOOSTS.map((boost, i) => (
                                        <tr key={i} className="hover:bg-white/5">
                                            <td className="px-4 py-2 font-bold text-white">{boost.name}</td>
                                            <td className="px-4 py-2 text-gray-400 font-mono text-xs">{boost.effect}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl text-neon-gold font-bold mb-4 flex items-center gap-2">
                            <Shield size={20} /> Marks System
                        </h3>
                        <p className="mb-4 text-sm">
                            Permanent, tradeable engravings found in Ruined Dungeons. Attune them in Safe Zones to activate.
                            You can equip up to <strong>3 Marks</strong> at once.
                        </p>

                        <div className="overflow-x-auto border border-gray-800 rounded-lg max-h-[400px] overflow-y-auto custom-scrollbar">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-black/60 sticky top-0 backdrop-blur-md">
                                    <tr>
                                        <th className="px-4 py-2">Mark Name</th>
                                        <th className="px-4 py-2">Category</th>
                                        <th className="px-4 py-2">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800 bg-black/40">
                                    {MARKS.map((mark, i) => (
                                        <tr key={i} className="hover:bg-white/5">
                                            <td className="px-4 py-2 font-bold text-white">{mark.name}</td>
                                            <td className="px-4 py-2">
                                                <span className={`text-[10px] px-2 py-0.5 rounded border ${mark.category.includes('PvP') && mark.category.includes('PvM') ? 'border-purple-500/30 text-purple-400 bg-purple-900/10' :
                                                    mark.category.includes('PvP') ? 'border-red-500/30 text-red-400 bg-red-900/10' :
                                                        mark.category.includes('Utility') ? 'border-blue-500/30 text-blue-400 bg-blue-900/10' :
                                                            'border-green-500/30 text-green-400 bg-green-900/10'
                                                    }`}>
                                                    {mark.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 text-gray-400 text-xs">{mark.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )
        },
    ];

    return (
        <div className="space-y-6 relative min-h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="text-neon-gold" /> Community Guides
                    </h2>
                    <p className="text-gray-400 text-sm">Curated strategies and builds from top players.</p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {guides.map((guide, index) => (
                    <motion.div
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelectGuide(guide)}
                        className="group relative p-6 border-2 border-cambria-purple/30 bg-black/60 rounded-xl overflow-hidden hover:border-neon-gold/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(176,38,255,0.2)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cambria-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg border transition-colors ${guide.type === 'economy' ? 'bg-green-900/20 border-green-500/30 text-green-400' :
                                    guide.type === 'build' ? 'bg-red-900/20 border-red-500/30 text-red-400' :
                                        'bg-cambria-purple/10 border-cambria-purple/20 text-cambria-purple'
                                    }`}>
                                    {guide.type === 'economy' ? <Scroll size={20} /> :
                                        guide.type === 'build' ? <Sword size={20} /> :
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

                            <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-3">
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
            <div className="mt-12 pt-6 border-t border-gray-800 text-center">
                <p className="text-xs text-gray-500">
                    Special thanks to <span className="text-neon-gold">@1ogic_xyz</span> and the Cambria community for the guides and data.
                </p>
            </div>

            {/* Modal */}
        </div>
    );
}
