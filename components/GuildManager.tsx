import React, { useState } from 'react';
import { Users, Crown, Percent } from 'lucide-react';

export default function GuildManager() {
    const [guildRank, setGuildRank] = useState<number>(30);
    const [viceroySplit, setViceroySplit] = useState<number>(50); // % taken by guild
    const [myContribution, setMyContribution] = useState<number>(0); // Points
    const [totalGuildContribution, setTotalGuildContribution] = useState<number>(100); // Points

    // Constants
    const getTaxRate = (rank: number) => {
        if (rank <= 5) return 4; // 4-8%
        if (rank <= 10) return 10.6;
        if (rank <= 20) return 12.5;
        return 13;
    };

    const taxRate = getTaxRate(guildRank);
    const patronShare = (myContribution / totalGuildContribution) * 100 || 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-cambria-gold/30 pb-2">
                <Users className="text-cambria-gold" size={24} />
                <h3 className="text-2xl font-bold text-cambria-gold">GUILD MANAGER</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* TAX OPTIMIZER */}
                <div className="space-y-4 bg-black/40 p-4 border border-cambria-purple/30 rounded">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Percent size={16} className="text-red-400" /> Tax Optimizer
                    </h4>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Guild Rank (24h Leaderboard)</label>
                        <input
                            type="number"
                            value={guildRank}
                            onChange={(e) => setGuildRank(Number(e.target.value))}
                            className="w-full bg-black/50 border border-cambria-purple p-2 text-white rounded"
                        />
                    </div>

                    <div className="flex justify-between items-center p-3 bg-red-900/20 border border-red-900/50 rounded">
                        <span className="text-gray-300">Effective Tax Rate</span>
                        <span className="text-2xl font-bold text-red-400">{taxRate}%</span>
                    </div>
                    <p className="text-xs text-gray-500">
                        Ranks 1-5 pay ~4-8%. Rank 30+ pays full 13%.
                    </p>
                </div>

                {/* PATRON REWARDS */}
                <div className="space-y-4 bg-black/40 p-4 border border-cambria-purple/30 rounded">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Crown size={16} className="text-yellow-400" /> Patron Rewards
                    </h4>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Viceroy Split (%)</label>
                        <input
                            type="range"
                            min="5"
                            max="95"
                            value={viceroySplit}
                            onChange={(e) => setViceroySplit(Number(e.target.value))}
                            className="w-full accent-cambria-gold"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Player: {100 - viceroySplit}%</span>
                            <span className="text-cambria-gold">Guild: {viceroySplit}%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-400">My Contribution</label>
                            <input
                                type="number"
                                value={myContribution}
                                onChange={(e) => setMyContribution(Number(e.target.value))}
                                className="w-full bg-black/50 border border-cambria-purple p-2 text-white rounded text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Total Guild Score</label>
                            <input
                                type="number"
                                value={totalGuildContribution}
                                onChange={(e) => setTotalGuildContribution(Number(e.target.value))}
                                className="w-full bg-black/50 border border-cambria-purple p-2 text-white rounded text-sm"
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-yellow-900/20 border border-yellow-900/50 rounded text-center">
                        <span className="text-gray-300 text-sm block">Your Share of Guild Rewards</span>
                        <span className="text-xl font-bold text-yellow-400">{patronShare.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
