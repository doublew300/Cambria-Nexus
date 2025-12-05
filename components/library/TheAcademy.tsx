import React from 'react';
import { Crown, GraduationCap, Coins } from 'lucide-react';
import { LEVEL_CAPS, PRESTIGE_TIERS, CHARTER_TIERS } from '../../data/masteryData';
import { soundManager } from '../../utils/sound';

export default function TheAcademy() {
    return (
        <div className="space-y-8">
            {/* Level Caps */}
            <section>
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <Crown /> Level Caps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {LEVEL_CAPS.map((cap, i) => (
                        <div
                            key={i}
                            className="bg-black/60 border border-yellow-900/30 p-4 rounded-xl text-center hover:border-yellow-500/50 transition-all cursor-default"
                            onMouseEnter={() => soundManager.playHover()}
                        >
                            <h4 className="text-2xl font-bold text-white mb-1">{cap.level}</h4>
                            <div className="text-yellow-500 font-mono text-sm mb-2">{cap.cost}</div>
                            <p className="text-xs text-gray-500">{cap.note}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Prestige Tiers */}
            <section>
                <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    <GraduationCap /> Prestige Tiers
                </h3>
                <div className="grid grid-cols-1 gap-4">
                    {PRESTIGE_TIERS.map((tier, i) => (
                        <div
                            key={i}
                            className="bg-black/60 border border-purple-900/30 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 hover:border-purple-500/50 transition-all cursor-default"
                            onMouseEnter={() => soundManager.playHover()}
                        >
                            <div className="text-center md:text-left">
                                <h4 className="text-xl font-bold text-white">{tier.tier}</h4>
                                <div className="text-purple-400 text-sm">{tier.cost}</div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm w-full">
                                <div className="bg-black/40 p-2 rounded border border-gray-800">
                                    <span className="text-gray-500 block text-xs uppercase">Bonus</span>
                                    <span className="text-gray-300">{tier.bonus}</span>
                                </div>
                                <div className="bg-black/40 p-2 rounded border border-gray-800">
                                    <span className="text-gray-500 block text-xs uppercase">Mastery</span>
                                    <span className="text-gray-300">{tier.mastery}</span>
                                </div>
                                <div className="bg-black/40 p-2 rounded border border-gray-800">
                                    <span className="text-gray-500 block text-xs uppercase">Note</span>
                                    <span className="text-gray-300">{tier.note}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Charter Tiers */}
            <section>
                <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Coins /> Charter Tiers (Season Pass)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CHARTER_TIERS.map((tier, i) => (
                        <div
                            key={i}
                            className="bg-black/60 border border-cyan-900/30 p-4 rounded-xl hover:border-cyan-500/50 transition-all cursor-default"
                            onMouseEnter={() => soundManager.playHover()}
                        >
                            <h4 className="font-bold text-white mb-3 border-b border-gray-800 pb-2">{tier.tier}</h4>
                            <ul className="space-y-2">
                                {tier.perks.map((perk, j) => (
                                    <li key={j} className="text-xs text-gray-400 flex items-start gap-2">
                                        <span className="text-cyan-500">›</span> {perk}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
