"use client";

import React, { useState, useEffect } from 'react';
import { Coins, Flame, Clock, AlertTriangle, DollarSign, BarChart3, Shield, Zap, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import ShareButton from './ShareButton';
import { BreakEvenChart, TaxPieChart, EnergyXPChart } from './AnalyticsCharts';
import { soundManager } from '../utils/sound';

const ZONE_BURN_RATES = {
    T2: 3.5,
    T3: 35,
    T4: 50.0, // Estimated
    T5: 65.6
};

// XP Rates (Estimated per minute)
const ZONE_XP_RATES = {
    T2: 20,   // ~1.2k / hr
    T3: 200,  // ~12k / hr
    T4: 600,  // ~36k / hr (Estimated)
    T5: 1000  // ~60k / hr
};

// S2 Economy Constants
const ETH_PER_1M_SILVER = 0.05125;
const ORB_COST_ETH = 0.0012;
const ENERGY_PER_ORB = 100000;
const ETH_PRICE = 3000;
const GUILD_TAX_RATE = 0.10; // Default fallback

import ReceiptModal from './ReceiptModal';

export default function TheLedger() {
    const [silverLooted, setSilverLooted] = useState('');

    // Zone Mixer State (Minutes)
    const [timeT2, setTimeT2] = useState('');
    const [timeT3, setTimeT3] = useState('');
    const [timeT4, setTimeT4] = useState('');
    const [timeT5, setTimeT5] = useState('');

    // Settings
    const [guildTax, setGuildTax] = useState(false);
    const [guildTaxPercent, setGuildTaxPercent] = useState('10');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [ethPrice, setEthPrice] = useState('3000');
    const [globalSilver, setGlobalSilver] = useState('4000000000'); // Default 4B
    const [prizePool, setPrizePool] = useState('200'); // Default 200 ETH
    const [showSettings, setShowSettings] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    const [grossProfit, setGrossProfit] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [profitUSD, setProfitUSD] = useState(0);
    const [orbCostEth, setOrbCostEth] = useState(0);
    const [totalEnergyBurn, setTotalEnergyBurn] = useState(0);
    const [totalXP, setTotalXP] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('cambria_ledger_data');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setSilverLooted(data.silverLooted || '');
                setTimeT2(data.timeT2 || '');
                setTimeT3(data.timeT3 || '');
                setTimeT4(data.timeT4 || '');
                setTimeT5(data.timeT5 || '');
                setGuildTax(data.guildTax || false);
                setGuildTaxPercent(data.guildTaxPercent || '10');
                setEthPrice(data.ethPrice || '3000');
                setGlobalSilver(data.globalSilver || '4000000000');
                setPrizePool(data.prizePool || '200');
            } catch (e) {
                console.error("Failed to load session", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (!isLoaded) return;
        const data = {
            silverLooted,
            timeT2,
            timeT3,
            timeT4,
            timeT5,
            guildTax,
            guildTaxPercent,
            ethPrice,
            globalSilver,
            prizePool
        };
        localStorage.setItem('cambria_ledger_data', JSON.stringify(data));
    }, [silverLooted, timeT2, timeT3, timeT4, timeT5, guildTax, guildTaxPercent, ethPrice, globalSilver, prizePool, isLoaded]);

    useEffect(() => {
        soundManager.toggle(soundEnabled);
    }, [soundEnabled]);

    useEffect(() => {
        const silver = parseFloat(silverLooted) || 0;
        const t2Mins = parseFloat(timeT2) || 0;
        const t3Mins = parseFloat(timeT3) || 0;
        const t4Mins = parseFloat(timeT4) || 0;
        const t5Mins = parseFloat(timeT5) || 0;
        const currentEthPrice = parseFloat(ethPrice) || 3000;
        const currentGlobalSilver = parseFloat(globalSilver) || 4000000000;
        const currentPrizePool = parseFloat(prizePool) || 200;

        // 1. Calculate Energy Burn & XP
        const burnT2 = t2Mins * 60 * ZONE_BURN_RATES.T2;
        const burnT3 = t3Mins * 60 * ZONE_BURN_RATES.T3;
        const burnT4 = t4Mins * 60 * ZONE_BURN_RATES.T4;
        const burnT5 = t5Mins * 60 * ZONE_BURN_RATES.T5;
        const totalBurn = burnT2 + burnT3 + burnT4 + burnT5;
        setTotalEnergyBurn(totalBurn);

        const xpT2 = t2Mins * ZONE_XP_RATES.T2;
        const xpT3 = t3Mins * ZONE_XP_RATES.T3;
        const xpT4 = t4Mins * ZONE_XP_RATES.T4;
        const xpT5 = t5Mins * ZONE_XP_RATES.T5;
        setTotalXP(xpT2 + xpT3 + xpT4 + xpT5);

        // 2. Calculate Orb Cost
        const orbsNeeded = totalBurn / ENERGY_PER_ORB;
        const costEth = orbsNeeded * ORB_COST_ETH;
        setOrbCostEth(costEth);

        // 3. Calculate Gross Profit
        // Dynamic ETH per 1M Silver = (Prize Pool / Global Silver) * 1,000,000
        const ethPer1MSilver = (currentPrizePool / currentGlobalSilver) * 1000000;
        const grossEth = (silver / 1000000) * ethPer1MSilver;
        setGrossProfit(grossEth);

        // 4. Calculate Net Profit
        const taxesEth = grossEth * 0.15; // System Tax
        let netEth = grossEth - taxesEth - costEth;

        if (guildTax) {
            const val = parseFloat(guildTaxPercent);
            const taxRate = isNaN(val) ? 0.10 : val / 100;
            const gTax = netEth * taxRate;
            netEth -= gTax;
        }

        setNetProfit(netEth);
        setProfitUSD(netEth * currentEthPrice);

    }, [silverLooted, timeT2, timeT3, timeT4, timeT5, guildTax, guildTaxPercent, ethPrice, globalSilver, prizePool]);

    const totalMinutes = (parseFloat(timeT2) || 0) + (parseFloat(timeT3) || 0) + (parseFloat(timeT4) || 0) + (parseFloat(timeT5) || 0);

    const handleInputChange = (setter: (val: string) => void, val: string) => {
        soundManager.playType();
        setter(val);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-cambria-gold/30 pb-2">
                <div className="flex items-center gap-3">
                    <img src="/assets/chest_anim.gif" className="w-8 h-8" alt="Chest" />
                    <h2 className="text-3xl font-bold text-neon-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] font-germania tracking-wider">THE LEDGER</h2>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative group">
                        <button
                            onClick={() => setShowSettings(!showSettings)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${showSettings ? 'bg-neon-gold/10 border-neon-gold text-neon-gold' : 'bg-black/40 border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'}`}
                        >
                            <DollarSign size={16} />
                            <span className="text-xs font-bold uppercase">Economy Settings</span>
                        </button>
                        {/* Tooltip */}
                        <div className="absolute right-0 top-full mt-2 w-48 p-2 bg-black/90 border border-gray-800 rounded text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            Adjust Global Silver & Prize Pool
                        </div>
                    </div>
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="p-2 text-gray-500 hover:text-neon-gold transition-colors"
                    >
                        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                </div>
            </div>

            {showSettings && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="bg-black/40 border border-gray-800 rounded-xl p-4 overflow-hidden space-y-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Custom ETH Price ($)</label>
                            <input
                                type="number"
                                value={ethPrice}
                                onChange={(e) => setEthPrice(e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-neon-gold/50 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Global Silver Pool</label>
                            <input
                                type="number"
                                value={globalSilver}
                                onChange={(e) => setGlobalSilver(e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-neon-gold/50 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Total Prize Pool (ETH)</label>
                            <input
                                type="number"
                                value={prizePool}
                                onChange={(e) => setPrizePool(e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded px-4 py-2 text-white font-mono focus:border-neon-gold/50 outline-none"
                            />
                        </div>
                    </div>
                    <div className="text-xs text-gray-600 font-mono text-center pt-2 border-t border-gray-800">
                        Current Rate: {((parseFloat(prizePool) / parseFloat(globalSilver)) * 1000000).toFixed(5)} ETH / 1M Silver
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* INPUTS GRID */}
                <div className="space-y-6">
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <Coins size={14} className="text-neon-gold" /> Silver Looted
                        </label>
                        <div className="relative group">
                            <input
                                type="number"
                                value={silverLooted}
                                onChange={(e) => handleInputChange(setSilverLooted, e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded-lg py-4 pl-4 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-neon-gold/50 focus:bg-neon-gold/5 transition-all font-mono text-2xl tracking-tight"
                                placeholder="0"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 font-mono text-sm">SILVER</div>
                        </div>
                    </div>

                    <div className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                <Flame size={14} className="text-orange-500" /> Orb Cost
                            </span>
                            <span className="text-xs text-blue-400 font-mono bg-blue-900/20 px-2 py-1 rounded border border-blue-500/20">
                                {(totalEnergyBurn / ENERGY_PER_ORB).toFixed(2)} Orbs
                            </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-white font-mono tracking-tight">{orbCostEth.toFixed(4)}</span>
                            <span className="text-sm text-gray-500 font-bold">ETH</span>
                        </div>
                        <div className="w-full bg-gray-900 h-1.5 rounded-full mt-4 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-600 to-orange-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min((totalEnergyBurn / 1000000) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-600 mt-2 text-right font-mono uppercase">
                            {totalEnergyBurn.toLocaleString()} Energy Burned
                        </p>
                    </div>

                    {/* GUILD TAX TOGGLE */}
                    <div
                        onClick={() => { soundManager.playClick(); setGuildTax(!guildTax); }}
                        className={`cursor-pointer border rounded-xl p-4 flex items-center justify-between transition-all ${guildTax ? 'bg-red-900/10 border-red-500/50' : 'bg-black/40 border-gray-800 hover:border-gray-700'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${guildTax ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 text-gray-500'}`}>
                                <Shield size={18} />
                            </div>
                            <div>
                                <h4 className={`text-sm font-bold ${guildTax ? 'text-red-400' : 'text-gray-400'}`}>
                                    Guild Tax
                                    {guildTax && (
                                        <span className="ml-2 text-xs bg-red-500/10 text-red-400 px-1 py-0.5 rounded border border-red-500/20">
                                            {guildTaxPercent}%
                                        </span>
                                    )}
                                </h4>
                                <p className="text-xs text-gray-600">Deduct guild fees</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {guildTax && (
                                <div className="relative w-16" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="number"
                                        value={guildTaxPercent}
                                        onChange={(e) => handleInputChange(setGuildTaxPercent, e.target.value)}
                                        className="w-full bg-black/60 border border-red-500/30 rounded px-2 py-1 text-right text-red-400 text-sm font-mono focus:border-red-500 focus:outline-none"
                                    />
                                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-red-500/50 text-[10px] pointer-events-none">%</span>
                                </div>
                            )}
                            <div className={`w-10 h-6 rounded-full p-1 transition-colors ${guildTax ? 'bg-red-500' : 'bg-gray-700'}`}>
                                <motion.div
                                    className="w-4 h-4 bg-white rounded-full shadow-sm"
                                    animate={{ x: guildTax ? 16 : 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ZONE MIXER & XP */}
                <div className="space-y-6">
                    <div className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors flex flex-col justify-between h-auto">
                        <div>
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                                <Clock className="text-neon-gold" size={18} />
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Zone Mixer (Minutes)</h3>
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-12 gap-4 items-center group">
                                    <label className="col-span-4 text-xs font-bold text-yellow-500 uppercase tracking-wider group-hover:text-yellow-400 transition-colors">T2 (Yellow)</label>
                                    <input
                                        type="number"
                                        value={timeT2}
                                        onChange={(e) => handleInputChange(setTimeT2, e.target.value)}
                                        className="col-span-8 bg-black/60 border border-gray-800 rounded px-4 py-3 text-white text-right font-mono focus:border-yellow-500/50 focus:bg-yellow-500/5 outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center group">
                                    <label className="col-span-4 text-xs font-bold text-red-500 uppercase tracking-wider group-hover:text-red-400 transition-colors">T3 (Red)</label>
                                    <input
                                        type="number"
                                        value={timeT3}
                                        onChange={(e) => handleInputChange(setTimeT3, e.target.value)}
                                        className="col-span-8 bg-black/60 border border-gray-800 rounded px-4 py-3 text-white text-right font-mono focus:border-red-500/50 focus:bg-red-500/5 outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center group">
                                    <label className="col-span-4 text-xs font-bold text-purple-500 uppercase tracking-wider group-hover:text-purple-400 transition-colors">T4 (Purple)</label>
                                    <input
                                        type="number"
                                        value={timeT4}
                                        onChange={(e) => handleInputChange(setTimeT4, e.target.value)}
                                        className="col-span-8 bg-black/60 border border-gray-800 rounded px-4 py-3 text-white text-right font-mono focus:border-purple-500/50 focus:bg-purple-500/5 outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="grid grid-cols-12 gap-4 items-center group">
                                    <label className="col-span-4 text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-gray-300 transition-colors">T5 (Black)</label>
                                    <input
                                        type="number"
                                        value={timeT5}
                                        onChange={(e) => handleInputChange(setTimeT5, e.target.value)}
                                        className="col-span-8 bg-black/60 border border-gray-800 rounded px-4 py-3 text-white text-right font-mono focus:border-gray-500/50 focus:bg-gray-500/5 outline-none transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-bold uppercase">Total Session</span>
                            <span className="text-lg font-mono text-white font-bold">{(totalMinutes / 60).toFixed(1)} <span className="text-sm text-gray-500 font-normal">Hours</span></span>
                        </div>
                    </div>

                    {/* XP OPTIMIZER */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <h3 className="text-sm font-bold text-purple-400 uppercase flex items-center gap-2">
                                <Zap size={16} /> XP Gained
                            </h3>
                            <span className="text-xs text-purple-500/50 font-mono">ESTIMATED</span>
                        </div>
                        <div className="relative z-10">
                            <span className="text-3xl font-bold text-white font-mono">{totalXP.toLocaleString()}</span>
                            <span className="text-sm text-purple-400 ml-2">XP</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 relative z-10">
                            ~{((totalXP / 1000000) * 100).toFixed(1)}% of a Level (50+)
                        </div>
                        <Zap className="absolute -right-4 -bottom-4 text-purple-500/10 rotate-12" size={96} />
                    </div>
                </div>
            </div>

            {/* RESULTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 p-6 rounded-xl flex items-center justify-between group hover:border-green-500/50 transition-all shadow-[0_0_20px_rgba(34,197,94,0.05)]">
                    <div>
                        <span className="text-xs font-bold text-green-500 uppercase block mb-2 tracking-wider">Net Profit (ETH)</span>
                        <span className="text-4xl font-bold text-white font-mono tracking-tight drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">{netProfit.toFixed(4)}</span>
                        <span className="text-sm text-green-500/50 font-bold ml-1">ETH</span>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:scale-110 transition-transform">
                        <DollarSign className="text-green-500" size={24} />
                    </div>
                </div>

                <div className="bg-black/40 border border-gray-800 p-6 rounded-xl flex items-center justify-between group hover:border-gray-700 transition-colors">
                    <div>
                        <span className="text-xs font-bold text-gray-500 uppercase block mb-2 tracking-wider">Est. USD Value</span>
                        <span className="text-4xl font-bold text-white font-mono tracking-tight">${profitUSD.toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-gray-600 self-end mb-1 font-mono bg-gray-900 px-2 py-1 rounded">@ ${parseFloat(ethPrice).toLocaleString()}/ETH</span>
                </div>
            </div>

            <div className="flex gap-4">
                <ShareButton
                    text={`I just calculated a net profit of ${netProfit.toFixed(4)} ETH ($${profitUSD.toFixed(0)}) on the Cambria Ledger! 📉📈 Check your stats.`}
                    className="flex-1"
                />
                <button
                    onClick={() => { setShowReceipt(true); soundManager.playClick(); }}
                    className="flex items-center gap-2 bg-neon-gold/20 hover:bg-neon-gold/30 border border-neon-gold/50 text-neon-gold px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                >
                    <div className="flex items-center gap-2">
                        <span>🧾</span>
                        <span>RECEIPT</span>
                    </div>
                </button>
            </div>

            <ReceiptModal
                isOpen={showReceipt}
                onClose={() => setShowReceipt(false)}
                data={{
                    silverLooted,
                    timeT2,
                    timeT3,
                    timeT4,
                    timeT5,
                    totalXP,
                    grossProfit,
                    orbCostEth,
                    guildTax,
                    netProfit,
                    profitUSD,
                    ethPrice,
                    guildTaxPercent,
                    guildTaxAmount: guildTax ? (netProfit / (1 - (isNaN(parseFloat(guildTaxPercent)) ? 0.10 : parseFloat(guildTaxPercent) / 100)) * (isNaN(parseFloat(guildTaxPercent)) ? 0.10 : parseFloat(guildTaxPercent) / 100)) : 0
                }}
            />

            {/* ANALYTICS CHARTS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-800"
            >
                <div className="col-span-1 md:col-span-3 flex items-center gap-2 mb-2">
                    <BarChart3 className="text-neon-gold" size={20} />
                    <h3 className="text-xl font-bold text-white">Economic Intelligence</h3>
                </div>

                <BreakEvenChart silverPerHour={parseFloat(silverLooted) / (totalMinutes / 60) || 0} />
                <TaxPieChart
                    silverAmount={parseFloat(silverLooted) || 0}
                    orbCostEth={orbCostEth}
                    guildTaxAmount={guildTax ? ((grossProfit * 0.85 - orbCostEth) * (isNaN(parseFloat(guildTaxPercent)) ? 0.10 : parseFloat(guildTaxPercent) / 100)) : 0}
                />
                <EnergyXPChart />
            </motion.div>
        </div >
    );
}
