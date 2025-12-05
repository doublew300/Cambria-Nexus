import React, { useState } from 'react';
import { Sparkles, ArrowUpCircle } from 'lucide-react';

export default function XPCalculator() {
    const [currentLevel, setCurrentLevel] = useState<string>('1');
    const [targetLevel, setTargetLevel] = useState<string>('10');

    // Constants (Mock XP curve - usually exponential, using simple linear for demo if unknown, 
    // but typically OSRS style. Let's assume standard MMO curve or just show Lamp value)
    const getLampXP = (level: number) => Math.max(1000, level * 30);

    const level = parseInt(currentLevel) || 1;
    const lampValue = getLampXP(level);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-cambria-gold/30 pb-2">
                <Sparkles className="text-cambria-gold" size={24} />
                <h3 className="text-2xl font-bold text-cambria-gold">XP LAMP CALCULATOR</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 uppercase tracking-wider">Current Skill Level</label>
                        <input
                            type="number"
                            value={currentLevel}
                            onChange={(e) => setCurrentLevel(e.target.value)}
                            className="w-full bg-black/50 border-2 border-cambria-purple p-3 text-white focus:border-cambria-gold focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] focus:outline-none transition-all rounded"
                            placeholder="1"
                            min="1"
                            max="99"
                        />
                    </div>
                </div>

                <div className="bg-black/60 p-6 border-2 border-blue-900/50 rounded-lg flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-900/10 animate-pulse" />

                    <h4 className="text-gray-400 text-sm uppercase mb-2 relative z-10">XP Per Lamp</h4>
                    <div className="text-4xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)] relative z-10">
                        {lampValue.toLocaleString()} <span className="text-sm text-white">XP</span>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 text-center relative z-10">
                        Formula: Max(1000, Level * 30)
                    </div>
                </div>
            </div>
        </div>
    );
}
