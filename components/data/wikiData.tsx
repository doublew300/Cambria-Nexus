import React from 'react';
import { Skull, Zap, Shield, BookOpen, User, Sword, Scroll, Coins, Keyboard, Footprints, Clock, Briefcase } from 'lucide-react';
import { MARKS, BOOSTS } from '../../data/guidesData';

export type GuideType = 'guide' | 'strategy' | 'economy' | 'build' | 'mechanic';

export interface Guide {
    id: number;
    title: string;
    description: string;
    type: GuideType;
    content: React.ReactNode;
    image?: string;
    author?: string;
}

export const GUIDES: Guide[] = [
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
        type: "mechanic",
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
    // NEW GUIDES
    {
        id: 7,
        title: "Methods of Money Making",
        description: "Detailed analysis of PvE, Skilling, and PvP income streams. Risk vs Reward.",
        type: "economy",
        content: (
            <div className="space-y-6 text-gray-300">
                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3 flex items-center gap-2">
                        <Coins size={20} /> The Economy of Cambria
                    </h3>
                    <p className="mb-4">Earning Silver is crucial for gear upgrades, repairs, and consumables. Choose your path wisely.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* PvE */}
                    <div className="bg-black/40 border border-red-500/30 p-4 rounded-lg">
                        <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2"><Sword size={16} /> PvE Farming</h4>
                        <p className="text-xs text-gray-400 mb-3">Slaying monsters for drops and raw silver.</p>
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Consistency</span> <span className="text-green-400">High</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Risk</span> <span className="text-yellow-400">Medium</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Profit/Hr</span> <span className="text-neon-gold">~15k - 40k</span>
                            </li>
                        </ul>
                    </div>

                    {/* Skilling */}
                    <div className="bg-black/40 border border-green-500/30 p-4 rounded-lg">
                        <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2"><Briefcase size={16} /> Skilling</h4>
                        <p className="text-xs text-gray-400 mb-3">Fishing, Mining, Woodcutting. Safe and steady.</p>
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Consistency</span> <span className="text-green-400">Very High</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Risk</span> <span className="text-green-400">Low</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Profit/Hr</span> <span className="text-neon-gold">~10k - 25k</span>
                            </li>
                        </ul>
                    </div>

                    {/* PvP */}
                    <div className="bg-black/40 border border-purple-500/30 p-4 rounded-lg">
                        <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><Skull size={16} /> PvP & PKing</h4>
                        <p className="text-xs text-gray-400 mb-3">Killing players for their gear and inventory.</p>
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Consistency</span> <span className="text-red-400">Low</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-800 pb-1">
                                <span>Risk</span> <span className="text-red-400">Extreme</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Profit/Hr</span> <span className="text-neon-gold">0 - 1M+</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <section className="mt-6">
                    <h4 className="text-white font-bold mb-2">Detailed Tips</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                        <li><strong>PvE:</strong> Farm <strong>Green Dragons</strong> for bones/hides. High demand, but located in Wilderness/Deep Wild.</li>
                        <li><strong>Skilling:</strong> <strong>Fishing</strong> Lobsters/Sharks is AFKable and always profitable. <strong>Runecrafting</strong> at higher levels prints money but is tedious.</li>
                        <li><strong>Merching:</strong> Flipping items on the Grand Exchange is the best money maker if you have capital. Look for high-volume items like arrows, runes, and food.</li>
                    </ul>
                </section>
            </div>
        )
    },
    {
        id: 8,
        title: "Survival 101: Escaping PKers",
        description: "Don't lose your bank. Essential strategies and items to survive a player hunt.",
        type: "strategy",
        content: (
            <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2"><Footprints size={18} /> THE GOLDEN RULE</h4>
                    <p className="text-sm">Never enter a danger zone with items you aren't willing to lose. But if you do, here is how to keep them.</p>
                </div>

                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3">Essential Survival Inventory</h3>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-white">
                        <li className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-800"><span className="text-blue-400">✓</span> 2x Stamina Potions</li>
                        <li className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-800"><span className="text-blue-400">✓</span> 1x Recall Crystal</li>
                        <li className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-800"><span className="text-blue-400">✓</span> Invisibility Potion</li>
                        <li className="flex items-center gap-2 bg-black/40 p-2 rounded border border-gray-800"><span className="text-blue-400">✓</span> Food (Sharks/Brews)</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3">Escape Tactics</h3>
                    <div className="space-y-4">
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                            <h5 className="font-bold text-white mb-1">1. The Juke</h5>
                            <p className="text-sm text-gray-400">Run through doors or around corners. As soon as you break line of sight, <strong>STOP</strong> or run the opposite way. If they predict your movement, you die. Be unpredictable.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                            <h5 className="font-bold text-white mb-1">2. The Recall Trick</h5>
                            <p className="text-sm text-gray-400">Recall Crystals have a 4-second channel time. Combats interrupts it. Use a <strong>Freeze</strong> spell or <strong>Stun</strong> item on your attacker, run around a corner, and IMMEDIATELY channel Recall.</p>
                        </div>
                        <div className="bg-black/40 p-4 rounded border border-gray-800">
                            <h5 className="font-bold text-white mb-1">3. Aggro Dragging</h5>
                            <p className="text-sm text-gray-400">Run through aggressive high-level mobs. They will attack whoever is closest. Try to get the mobs to aggro your pursuer, forcing them to fight off the PvE while you escape.</p>
                        </div>
                    </div>
                </section>
            </div>
        )
    },
    {
        id: 9,
        title: "Keyboard Shortcuts & Hotkeys",
        description: "Stop clicking. Start gaming. Essential binds for efficiency.",
        type: "guide",
        content: (
            <div className="space-y-6 text-gray-300">
                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3 flex items-center gap-2">
                        <Keyboard size={20} /> Default Keybinds
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/40 p-3 rounded border border-gray-800">
                            <h5 className="font-bold text-white mb-2 pb-1 border-b border-gray-700">Interface</h5>
                            <ul className="space-y-1 text-sm font-mono text-gray-400">
                                <li className="flex justify-between"><span>Inventory</span> <span className="text-white bg-gray-700 px-1 rounded">B</span></li>
                                <li className="flex justify-between"><span>Character</span> <span className="text-white bg-gray-700 px-1 rounded">C</span></li>
                                <li className="flex justify-between"><span>Prayers</span> <span className="text-white bg-gray-700 px-1 rounded">P</span></li>
                                <li className="flex justify-between"><span>Magic Book</span> <span className="text-white bg-gray-700 px-1 rounded">M</span></li>
                                <li className="flex justify-between"><span>World Map</span> <span className="text-white bg-gray-700 px-1 rounded">Tab</span></li>
                            </ul>
                        </div>
                        <div className="bg-black/40 p-3 rounded border border-gray-800">
                            <h5 className="font-bold text-white mb-2 pb-1 border-b border-gray-700">Combat</h5>
                            <ul className="space-y-1 text-sm font-mono text-gray-400">
                                <li className="flex justify-between"><span>Attack/Interact</span> <span className="text-white bg-gray-700 px-1 rounded">L-Click</span></li>
                                <li className="flex justify-between"><span>Context Menu</span> <span className="text-white bg-gray-700 px-1 rounded">R-Click</span></li>
                                <li className="flex justify-between"><span>Special Attack</span> <span className="text-white bg-gray-700 px-1 rounded">Space</span></li>
                                <li className="flex justify-between"><span>Eat Food</span> <span className="text-white bg-gray-700 px-1 rounded">1</span></li>
                                <li className="flex justify-between"><span>Drink Potion</span> <span className="text-white bg-gray-700 px-1 rounded">2</span></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded text-sm">
                    <strong className="text-blue-400">Pro Tip:</strong> Rebind your F-keys (F1, F2, F3) to Inventory, Prayers, and Magic for lightning-fast switching during PvP.
                </div>
            </div>
        )
    },
    {
        id: 10,
        title: "T5 Roadmap: Zero to Hero",
        description: "A day-by-day plan to reach Tier 5 gear and endgame status efficiently.",
        type: "guide",
        content: (
            <div className="space-y-6 text-gray-300">
                <div className="relative border-l-2 border-neon-gold ml-3 space-y-8 pb-4">
                    {/* Day 1 */}
                    <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-gold shadow-[0_0_10px_orange]" />
                        <h4 className="text-lg font-bold text-white mb-1">Day 1: The Foundation</h4>
                        <div className="text-sm text-gray-400 space-y-2">
                            <p><strong>Goal:</strong> Level 40 Stats + T2 Gear.</p>
                            <ul className="list-disc pl-4">
                                <li>Rush quests in Capital City for easy XP.</li>
                                <li>Farm Cows/Goblins until base 20 stats.</li>
                                <li>Buy Iron/Steel gear from NPC shops.</li>
                                <li>Unlock all teleports.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Day 2 */}
                    <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 border border-neon-gold" />
                        <h4 className="text-lg font-bold text-white mb-1">Day 2: The Dungeon Grind</h4>
                        <div className="text-sm text-gray-400 space-y-2">
                            <p><strong>Goal:</strong> Level 60 Stats + T3 Gear + 100k Cash.</p>
                            <ul className="list-disc pl-4">
                                <li>Group up! Do not solo.</li>
                                <li>Farm "Catacombs" for Rune drops.</li>
                                <li>Start leveling Slayer.</li>
                                <li>Get your first Prayer unlocks.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Day 3 */}
                    <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-600 border border-neon-gold" />
                        <h4 className="text-lg font-bold text-white mb-1">Day 3: Economy & Skills</h4>
                        <div className="text-sm text-gray-400 space-y-2">
                            <p><strong>Goal:</strong> Level 70 Stats + T4 Weapon.</p>
                            <ul className="list-disc pl-4">
                                <li>Dedicate 4 hours to Skilling (Fishing/Mining) for pure profit.</li>
                                <li>Buy a Dragon/Abyssal weapon.</li>
                                <li>Start PK trips in low-risk zones.</li>
                            </ul>
                        </div>
                    </div>
                    {/* Day 4 */}
                    <div className="relative pl-6">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-gold shadow-[0_0_10px_orange]" />
                        <h4 className="text-lg font-bold text-white mb-1">Day 4+: T5 Endgame</h4>
                        <div className="text-sm text-gray-400 space-y-2">
                            <p><strong>Goal:</strong> Max combat stats + Full T5.</p>
                            <ul className="list-disc pl-4">
                                <li>Farm "Ruined Dungeons" for Marks.</li>
                                <li>Boss Hunting: King Slime / Warlord.</li>
                                <li>Join a Guild for Territory Wars.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 11,
        title: "Inventory Checklist",
        description: "What to bring for every activity. Never forget your teleport again.",
        type: "strategy",
        content: (
            <div className="space-y-6 text-gray-300">
                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3">General Adventure</h3>
                    <div className="bg-black/40 p-4 rounded border border-gray-800 grid grid-cols-2 gap-2 text-sm">
                        <span>• 1x Teleport Tablet (Home)</span>
                        <span>• 10x Food (High Healing)</span>
                        <span>• 1x Stamina Potion</span>
                        <span>• 500x Coins (For unexpected travels)</span>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl text-neon-gold font-bold mb-3">Slayer / PvE Farm</h3>
                    <div className="bg-black/40 p-4 rounded border border-gray-800 grid grid-cols-2 gap-2 text-sm">
                        <span>• 2x Combat Potions (Atk/Str/Def)</span>
                        <span>• 3x Prayer Potions</span>
                        <span>• 1x Slayer Gem (Check kills)</span>
                        <span>• High Alchemy Runes (Convert loot to gold)</span>
                        <span>• Looting Bag (Double inventory space)</span>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl text-red-400 font-bold mb-3">PvP / Deep Wild</h3>
                    <div className="bg-black/40 p-4 rounded border border-red-500/30 grid grid-cols-2 gap-2 text-sm">
                        <span>• 1x Overload Potion</span>
                        <span>• 4x Saradomin Brews (Combo eat)</span>
                        <span>• 2x Super Restores</span>
                        <span>• 1x Anti-Venom</span>
                        <span>• <strong>Recall Crystal</strong> (Emergency Exit)</span>
                    </div>
                </section>
            </div>
        )
    }
];
