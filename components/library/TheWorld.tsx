import React from 'react';
import { Anchor, Users } from 'lucide-react';
import { getGuideData } from '../../data/guidesData';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/sound';

export default function TheWorld() {
    const { language } = useLanguage();
    const data = getGuideData(language);

    return (
        <div className="space-y-8">
            {/* Fishing Zones */}
            <section>
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <Anchor /> {language === 'ru' ? 'Рыболовные Зоны' : 'Fishing Zones'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.fishing.map((loc, i) => (
                        <div
                            key={i}
                            className="bg-black/60 border border-green-900/30 p-4 rounded-xl hover:border-green-500/50 transition-all cursor-default"
                            onMouseEnter={() => soundManager.playHover()}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-white">{loc.zone}</h4>
                                <span className="text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded border border-green-500/20">{loc.req}</span>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">
                                🐟 {loc.fish.join(", ")}
                            </div>
                            {loc.note && <div className="text-xs text-gray-500 italic">{loc.note}</div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* NPC Directory */}
            <section>
                <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <Users /> {language === 'ru' ? 'NPC Справочник' : 'NPC Directory'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.npcs.map((hub, i) => (
                        <div
                            key={i}
                            className="bg-black/60 border border-blue-900/30 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
                            onMouseEnter={() => soundManager.playHover()}
                        >
                            <div className="bg-blue-900/10 px-4 py-2 border-b border-blue-900/30">
                                <h4 className="font-bold text-blue-300">{hub.location}</h4>
                            </div>
                            <div className="p-4 space-y-3">
                                {hub.npcs.map((npc, j) => (
                                    <div key={j} className="text-sm">
                                        <strong className="text-white block">{npc.name}</strong>
                                        <span className="text-gray-500">{npc.function}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
