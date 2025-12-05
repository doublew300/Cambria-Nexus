import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { getGuideData } from '../../data/guidesData';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/sound';

// Helper to colorize text
const ColorizedText = ({ text }: { text: string }) => {
    // Specific Item Classes
    if (text.includes("Adamantine")) return <span className="text-cyan-400 font-bold shadow-cyan-400/20">{text}</span>; // Diamond blue
    if (text.includes("Stone Maul") || text.includes("Hammer") || text.includes("Iron")) return <span className="text-stone-400 font-bold">{text}</span>; // Stone/Gray
    if (text.includes("Robinhood")) return <span className="text-lime-500 font-bold">{text}</span>; // Bright Green
    if (text.includes("Dragonhide")) return <span className="text-emerald-600 font-bold">{text}</span>; // Green-Grayish
    if (text.includes("Cultist")) return <span className="text-purple-500 font-bold">{text}</span>; // Purple
    if (text.includes("Staff") || text.includes("Mystbark") || text.includes("Backpack") || text.includes("Book")) return <span className="text-amber-700 font-bold">{text}</span>; // Brown/Wood

    // General Classes (Fallback)
    if (text.includes("Dragon") || text.includes("Wrath")) return <span className="text-red-500 font-bold">{text}</span>; // Red
    if (text.includes("Obsidian")) return <span className="text-slate-600 font-bold">{text}</span>; // Dark Slate

    // Effects
    if (text.includes("p++") || text.includes("Poison")) {
        const parts = text.split('(p++)');
        if (parts.length > 1) {
            return <span><ColorizedText text={parts[0]} /><span className="text-green-500 font-bold">(p++)</span>{parts[1]}</span>
        }
        return <span className="text-green-500 font-bold">{text}</span>;
    }

    // Accessories
    if (text.includes("Amulet") || text.includes("Ring") || text.includes("Necklace")) {
        return <span className="text-yellow-400 font-bold">{text}</span>;
    }

    return <span className="text-gray-400">{text}</span>;
};

export default function TheArmory() {
    const { language } = useLanguage();
    const data = getGuideData(language);
    const builds = data.builds;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {builds.map((build, index) => (
                <div
                    key={index}
                    className="group relative bg-black/80 border border-gray-800 rounded-xl overflow-hidden hover:border-neon-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(176,38,255,0.15)]"
                    onMouseEnter={() => soundManager.playHover()}
                >
                    {/* Image Banner */}
                    <div className="h-48 w-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                        {build.image ? (
                            <img
                                src={build.image}
                                alt={build.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                <span className="text-gray-700">No Image</span>
                            </div>
                        )}

                        <div className="absolute bottom-4 left-4 z-20">
                            <h3 className="text-xl font-bold text-white drop-shadow-md">{build.name}</h3>
                            <div className="flex gap-2 mt-1">
                                <span className={`text-[10px] px-2 py-0.5 rounded border ${build.type === 'Melee' ? 'bg-red-900/40 border-red-500/30 text-red-300' :
                                    build.type === 'Ranged' ? 'bg-green-900/40 border-green-500/30 text-green-300' :
                                        'bg-purple-900/40 border-purple-500/30 text-purple-300'
                                    }`}>
                                    {build.type}
                                </span>
                                {build.tags.map(tag => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-black/60 border border-gray-700 text-gray-400 backdrop-blur-sm">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4 text-sm text-gray-400">
                        <div>
                            <strong className="text-gray-300 block mb-2 text-xs uppercase tracking-wider border-b border-gray-800 pb-1">Equipment</strong>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                                <li><span className="text-gray-500">Head:</span> <ColorizedText text={build.equipment.head} /></li>
                                <li><span className="text-gray-500">Body:</span> <ColorizedText text={build.equipment.body} /></li>
                                <li><span className="text-gray-500">Main:</span> <ColorizedText text={build.equipment.weapon} /></li>
                                <li><span className="text-gray-500">Off:</span> <ColorizedText text={build.equipment.offhand} /></li>
                                <li><span className="text-gray-500">Neck:</span> <ColorizedText text={build.equipment.amulet} /></li>
                                <li><span className="text-gray-500">Back:</span> <ColorizedText text={build.equipment.backpack} /></li>
                            </ul>
                        </div>

                        <div className="bg-white/5 p-3 rounded border border-white/10">
                            <strong className="text-neon-gold block mb-1 text-xs uppercase">Strategy</strong>
                            <p className="italic text-gray-300 leading-relaxed">{build.strategy}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <strong className="text-green-400 block mb-1 text-xs uppercase">Pros</strong>
                                <p className="text-xs">{build.pros}</p>
                            </div>
                            <div>
                                <strong className="text-red-400 block mb-1 text-xs uppercase">Cons</strong>
                                <p className="text-xs">{build.cons}</p>
                            </div>
                        </div>

                        {(build.recommendedMarks || build.recommendedBoosts) && (
                            <div className="pt-4 border-t border-gray-800">
                                <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3 tracking-widest">Recommended Setup</h4>
                                <div className="space-y-3">
                                    {/* Marks */}
                                    {build.recommendedMarks && (
                                        <div className="flex items-start gap-2">
                                            <Shield size={14} className="text-purple-400 mt-0.5 shrink-0" />
                                            <div className="flex flex-wrap gap-1">
                                                {build.recommendedMarks.map((markName, i) => {
                                                    const markData = data.marks.find(m => m.name === markName);
                                                    return (
                                                        <div key={i} className="group/tooltip relative">
                                                            <span className="text-[10px] bg-purple-900/20 border border-purple-500/30 text-purple-300 px-1.5 py-0.5 rounded hover:bg-purple-900/40 transition-colors cursor-help">
                                                                {markName}
                                                            </span>
                                                            {/* Tooltip */}
                                                            {markData && (
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/95 border border-purple-500/50 rounded-lg text-xs shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none">
                                                                    <div className="font-bold text-purple-300 mb-0.5">{markData.name}</div>
                                                                    <div className="text-gray-300 leading-tight">{markData.effect}</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    {/* Boosts */}
                                    {build.recommendedBoosts && (
                                        <div className="flex items-start gap-2">
                                            <Zap size={14} className="text-yellow-400 mt-0.5 shrink-0" />
                                            <div className="flex flex-wrap gap-1">
                                                {build.recommendedBoosts.map((boostName, i) => {
                                                    const boostData = data.boosts.find(b => b.name === boostName);
                                                    return (
                                                        <div key={i} className="group/tooltip relative">
                                                            <span className="text-[10px] bg-yellow-900/20 border border-yellow-500/30 text-yellow-300 px-1.5 py-0.5 rounded hover:bg-yellow-900/40 transition-colors cursor-help">
                                                                {boostName}
                                                            </span>
                                                            {/* Tooltip */}
                                                            {boostData && (
                                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/95 border border-yellow-500/50 rounded-lg text-xs shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none">
                                                                    <div className="font-bold text-yellow-300 mb-0.5">{boostData.name}</div>
                                                                    <div className="text-gray-300 leading-tight">{boostData.effect}</div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
