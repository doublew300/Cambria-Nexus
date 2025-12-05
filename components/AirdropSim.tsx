"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Gem, Crown, Map, Sparkles, Scroll, X, Download, Share2, ScanLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';

const FOUNDER_BONUSES = {
    0: 0,
    1: 0.5,
    3: 1.5,
    7: 2.0,
    21: 3.0
};

const ISLAND_BONUSES = {
    0: 0,
    1: 0.1,
    3: 0.25,
    7: 0.35,
    21: 0.5
};

export default function AirdropSim() {
    const { t } = useLanguage();
    const [charterTier, setCharterTier] = useState<string>('1');
    const [founderCount, setFounderCount] = useState<keyof typeof FOUNDER_BONUSES>(0);
    const [islandCount, setIslandCount] = useState<keyof typeof ISLAND_BONUSES>(0);
    const [luckIndex, setLuckIndex] = useState<string>('15'); // Base 15%
    const [orbCount, setOrbCount] = useState<string>('');

    const [multiplier, setMultiplier] = useState<number>(1.0);
    const [xpMultiplier, setXpMultiplier] = useState<number>(1.0);

    // Trinket Calc State
    const [rewardValue, setRewardValue] = useState<string>('1200');
    const [snapshotMc, setSnapshotMc] = useState<string>('60');
    const [targetMc, setTargetMc] = useState<string>('120');
    const [showReceipt, setShowReceipt] = useState(false);
    const [showMultiplierCard, setShowMultiplierCard] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const receiptRef = useRef<HTMLDivElement>(null);
    const multiplierCardRef = useRef<HTMLDivElement>(null);

    const handleDownload = async (ref: React.RefObject<HTMLDivElement | null>, filename: string) => {
        if (!ref.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(ref.current, {
                backgroundColor: '#0d0a08',
                scale: 2, // Higher quality
            });

            const link = document.createElement('a');
            link.download = `${filename}_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error("Failed to generate image:", err);
        }
        setIsGenerating(false);
    };

    const handleCopy = async (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;
        setIsGenerating(true);
        try {
            const canvas = await html2canvas(ref.current, {
                backgroundColor: '#0d0a08',
                scale: 2,
            });
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                alert('Image copied to clipboard!');
            });
        } catch (err) {
            console.error("Copy failed", err);
        }
        setIsGenerating(false);
    };

    useEffect(() => {
        let base = 1.0;
        const tier = parseInt(charterTier);
        if (tier >= 2) base += 1.0; // Tier 2+ Charter (+1.0x)
        base += FOUNDER_BONUSES[founderCount];
        base += ISLAND_BONUSES[islandCount];

        const luckBonus = (parseFloat(luckIndex) || 0) / 100;
        setMultiplier(base + luckBonus);

        // XP Multiplier Logic
        if (tier >= 3) {
            const energy = (parseInt(orbCount) || 0) * 100000;
            const millions = energy / 1000000;
            let xpMult = 1.0;

            if (millions >= 5) {
                // Linear interpolation points
                const points = [
                    { x: 5, y: 1.0 },
                    { x: 7.5, y: 1.07 },
                    { x: 10, y: 1.28 },
                    { x: 20, y: 2.60 },
                    { x: 50, y: 6.70 },
                    { x: 75, y: 9.55 },
                    { x: 100, y: 12.0 }
                ];

                let found = false;
                for (let i = 0; i < points.length - 1; i++) {
                    if (millions >= points[i].x && millions <= points[i + 1].x) {
                        const p1 = points[i];
                        const p2 = points[i + 1];
                        const ratio = (millions - p1.x) / (p2.x - p1.x);
                        xpMult = p1.y + (ratio * (p2.y - p1.y));
                        found = true;
                        break;
                    }
                }
                if (!found && millions >= 100) xpMult = 12.0;
            }
            setXpMultiplier(Math.max(1.0, xpMult));
        } else {
            setXpMultiplier(1.0);
        }

    }, [charterTier, founderCount, islandCount, luckIndex, orbCount]);

    return (
        <div className="space-y-6">
            {/* BANNER */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative h-32 rounded-lg overflow-hidden border-2 border-cambria-purple shadow-[0_0_30px_rgba(176,38,255,0.3)]"
            >
                <img src="/assets/art_banner.jpeg" className="w-full h-full object-cover" alt="Airdrop Banner" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{t('airdrop.banner')}</h2>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CONTROLS */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* CHARTER */}
                    <div
                        className="space-y-2 group"
                        onMouseEnter={() => soundManager.playHover()}
                    >
                        <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-neon-gold transition-colors">
                            <Gem size={16} className="text-neon-gold" /> {t('airdrop.charter')}
                        </label>
                        <select
                            value={charterTier}
                            onChange={(e) => { soundManager.playType(); setCharterTier(e.target.value); }}
                            className="w-full bg-[#0a0a0a] border border-gray-800 p-4 text-white focus:border-neon-gold focus:bg-neon-gold/5 focus:shadow-[0_0_15px_rgba(255,215,0,0.1)] focus:outline-none transition-all rounded-xl font-serif appearance-none cursor-pointer hover:border-gray-600"
                        >
                            <option value="1">{t('airdrop.tier1')}</option>
                            <option value="2">{t('airdrop.tier2')}</option>
                            <option value="3">{t('airdrop.tier3')}</option>
                            <option value="4">{t('airdrop.tier4')}</option>
                        </select>
                    </div>

                    {/* ENERGY INPUT (Tier 3+) */}
                    <AnimatePresence>
                        {parseInt(charterTier) >= 3 && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="space-y-2 overflow-hidden group"
                                onMouseEnter={() => soundManager.playHover()}
                            >
                                <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                                    <Sparkles size={16} className="text-cyan-400" /> {t('airdrop.energy')}
                                </label>
                                <input
                                    type="number"
                                    value={orbCount}
                                    onChange={(e) => { soundManager.playType(); setOrbCount(e.target.value); }}
                                    placeholder={t('airdrop.energyPlaceholder')}
                                    className="w-full bg-[#0a0a0a] border border-gray-800 p-4 text-white focus:border-cyan-400 focus:bg-cyan-900/10 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] focus:outline-none transition-all rounded-xl"
                                />
                                <p className="text-xs text-gray-500">{t('airdrop.energyDesc')}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FOUNDER NFT */}
                    <div className="space-y-2 group" onMouseEnter={() => soundManager.playHover()}>
                        <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-neon-gold transition-colors">
                            <Crown size={16} className="text-neon-gold" /> {t('airdrop.founders')}
                        </label>
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <img src="/assets/founder_anim.gif" className="w-16 h-16 rounded-xl border border-gray-800 object-cover shadow-lg" alt="Founder" />
                                <div className="absolute inset-0 rounded-xl border border-neon-gold/20" />
                            </div>
                            <select
                                value={founderCount}
                                onChange={(e) => { soundManager.playType(); setFounderCount(Number(e.target.value) as keyof typeof FOUNDER_BONUSES); }}
                                className="flex-1 bg-[#0a0a0a] border border-gray-800 p-4 text-white focus:border-neon-gold focus:bg-neon-gold/5 focus:outline-none rounded-xl appearance-none cursor-pointer hover:border-gray-600 transition-all"
                            >
                                {Object.keys(FOUNDER_BONUSES).map((count) => (
                                    <option key={count} value={count}>{count} {t('item.founders')} (+{FOUNDER_BONUSES[Number(count) as keyof typeof FOUNDER_BONUSES]}x)</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ISLAND NFT */}
                    <div className="space-y-2 group" onMouseEnter={() => soundManager.playHover()}>
                        <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-green-400 transition-colors">
                            <Map size={16} className="text-green-400" /> {t('airdrop.islands')}
                        </label>
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <img src="/assets/island_new.png" className="w-16 h-16 rounded-xl border border-gray-800 object-cover shadow-lg" alt="Island" />
                                <div className="absolute inset-0 rounded-xl border border-green-500/20" />
                            </div>
                            <select
                                value={islandCount}
                                onChange={(e) => { soundManager.playType(); setIslandCount(Number(e.target.value) as keyof typeof ISLAND_BONUSES); }}
                                className="flex-1 bg-[#0a0a0a] border border-gray-800 p-4 text-white focus:border-green-500 focus:bg-green-500/5 focus:outline-none rounded-xl appearance-none cursor-pointer hover:border-gray-600 transition-all"
                            >
                                {Object.keys(ISLAND_BONUSES).map((count) => (
                                    <option key={count} value={count}>{count} {t('item.islands')} (+{ISLAND_BONUSES[Number(count) as keyof typeof ISLAND_BONUSES]}x)</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* LUCK INDEX */}
                    <div className="space-y-2 group" onMouseEnter={() => soundManager.playHover()}>
                        <label className="text-sm text-gray-400 uppercase tracking-wider flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                            <Sparkles size={16} className="text-blue-400" /> {t('airdrop.luck')}
                        </label>
                        <input
                            type="number"
                            value={luckIndex}
                            onChange={(e) => { soundManager.playType(); setLuckIndex(e.target.value); }}
                            className="w-full bg-[#0a0a0a] border border-gray-800 p-4 text-white focus:border-blue-400 focus:bg-blue-500/5 focus:shadow-[0_0_15px_rgba(59,130,246,0.1)] focus:outline-none transition-all rounded-xl"
                        />
                    </div>
                </motion.div>

                {/* RESULT */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col justify-center items-center bg-black/80 border border-gray-800 rounded-2xl p-8 relative overflow-hidden backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)] group hover:border-neon-purple/30 transition-colors"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.05),transparent_70%)] animate-pulse pointer-events-none" />

                    {/* Airdrop Mult */}
                    <div className="relative z-10 text-center">
                        <h3 className="text-gray-500 uppercase tracking-widest mb-2 text-xs font-bold">{t('airdrop.airdropMult')}</h3>
                        <motion.div
                            key={multiplier}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-6xl font-bold text-white drop-shadow-[0_0_30px_rgba(176,38,255,0.4)]"
                        >
                            {multiplier.toFixed(2)}x
                        </motion.div>
                    </div>

                    {/* XP Mult (Conditional) */}
                    {parseInt(charterTier) >= 3 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="relative z-10 text-center mt-8 pt-8 border-t border-gray-800 w-full"
                        >
                            <h3 className="text-neon-gold uppercase tracking-widest mb-2 text-xs font-bold">{t('airdrop.xpMult')}</h3>
                            <motion.div
                                key={xpMultiplier}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="text-4xl font-bold text-neon-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                            >
                                {xpMultiplier.toFixed(2)}x
                            </motion.div>
                            <p className="text-xs text-cyan-400 mt-2 font-mono bg-cyan-900/10 px-3 py-1 rounded-full border border-cyan-900/30 inline-block">
                                {((parseInt(orbCount) || 0) * 100000 / 1000000).toFixed(2)}M {t('airdrop.energyUnit')}
                            </p>
                        </motion.div>
                    )}

                    <p className="text-xs text-gray-600 mt-8 relative z-10 text-center max-w-xs leading-relaxed">
                        {t('airdrop.stackDesc')}
                    </p>

                    <button
                        onClick={() => { soundManager.playClick(); setShowMultiplierCard(true); }}
                        className="mt-8 relative z-10 flex items-center gap-2 bg-neon-purple/10 border border-neon-purple/50 text-neon-purple px-8 py-3 rounded-xl font-bold hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_20px_rgba(176,38,255,0.1)] hover:shadow-[0_0_30px_rgba(176,38,255,0.4)]"
                    >
                        <Share2 size={18} />
                        {t('airdrop.share')}
                    </button>
                </motion.div>
            </div>

            {/* TRINKET CALCULATOR (S1/S2 REWARDS) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 p-8 rounded-xl relative overflow-hidden border-2 border-[#8B7355] shadow-[0_0_40px_rgba(139,115,85,0.2)]"
                style={{
                    background: 'linear-gradient(135deg, #1a1510 0%, #0d0a08 100%)',
                }}
            >
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C0A080] rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#C0A080] rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#C0A080] rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C0A080] rounded-br-xl" />

                <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3 bg-[#2a2018] rounded-lg border border-[#8B7355] shadow-[0_0_15px_rgba(192,160,128,0.3)]">
                        <Crown className="text-[#C0A080]" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl text-[#C0A080]" style={{ fontFamily: 'var(--font-germania), serif', letterSpacing: '0.05em' }}>
                            ANCIENT TRINKET CALCULATOR
                        </h3>
                        <p className="text-sm text-[#8B7355] font-serif italic">
                            "Divining the value of lost treasures from the First & Second Eras..."
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs text-[#8B7355] uppercase tracking-widest font-serif">Reward Value ($)</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d5a43] font-serif text-lg">$</span>
                            <input
                                type="number"
                                value={rewardValue}
                                onChange={(e) => setRewardValue(e.target.value)}
                                className="w-full bg-[#0d0a08] border border-[#3d3228] rounded-lg p-4 pl-10 text-[#C0A080] font-serif text-lg focus:border-[#C0A080] focus:shadow-[0_0_15px_rgba(192,160,128,0.2)] focus:outline-none transition-all placeholder-[#3d3228]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-[#8B7355] uppercase tracking-widest font-serif">Snapshot MC ($M)</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d5a43] font-serif text-lg">$</span>
                            <input
                                type="number"
                                value={snapshotMc}
                                onChange={(e) => setSnapshotMc(e.target.value)}
                                className="w-full bg-[#0d0a08] border border-[#3d3228] rounded-lg p-4 pl-10 text-[#C0A080] font-serif text-lg focus:border-[#C0A080] focus:shadow-[0_0_15px_rgba(192,160,128,0.2)] focus:outline-none transition-all placeholder-[#3d3228]"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-[#8B7355] uppercase tracking-widest font-serif">Target MC ($M)</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d5a43] font-serif text-lg">$</span>
                            <input
                                type="number"
                                value={targetMc}
                                onChange={(e) => setTargetMc(e.target.value)}
                                className="w-full bg-[#0d0a08] border border-[#3d3228] rounded-lg p-4 pl-10 text-[#C0A080] font-serif text-lg focus:border-[#C0A080] focus:shadow-[0_0_15px_rgba(192,160,128,0.2)] focus:outline-none transition-all placeholder-[#3d3228]"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-[#120f0c] border border-[#3d3228] rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[#8B7355] font-serif italic text-sm">Projected Value</span>
                        <span className="text-[#C0A080] text-xs uppercase tracking-widest opacity-60">Based on Market Cap Ratio</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-4xl text-[#C0A080] drop-shadow-[0_0_15px_rgba(192,160,128,0.4)]" style={{ fontFamily: 'var(--font-germania), serif' }}>
                            ${((parseFloat(targetMc) || 0) / (parseFloat(snapshotMc) || 1) * (parseFloat(rewardValue) || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>

                        <button
                            onClick={() => setShowReceipt(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2a2018] border border-[#8B7355] rounded hover:bg-[#3d3228] hover:border-[#C0A080] transition-all text-[#C0A080] text-sm uppercase tracking-wider font-serif group"
                        >
                            <Scroll size={16} className="group-hover:text-neon-gold transition-colors" />
                            Archive
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* RECEIPT PREVIEW MODAL */}
            <AnimatePresence>
                {showReceipt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowReceipt(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative z-10 flex flex-col items-center gap-6"
                        >
                            <div
                                ref={receiptRef}
                                style={{
                                    width: '400px',
                                    padding: '40px',
                                    background: '#0d0a08',
                                    border: '4px double #8B7355',
                                    fontFamily: 'serif',
                                    color: '#C0A080',
                                    textAlign: 'center',
                                    position: 'relative'
                                }}
                            >
                                {/* Corner Decorations */}
                                <div style={{ position: 'absolute', top: '10px', left: '10px', width: '20px', height: '20px', borderTop: '2px solid #8B7355', borderLeft: '2px solid #8B7355' }} />
                                <div style={{ position: 'absolute', top: '10px', right: '10px', width: '20px', height: '20px', borderTop: '2px solid #8B7355', borderRight: '2px solid #8B7355' }} />
                                <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '20px', height: '20px', borderBottom: '2px solid #8B7355', borderLeft: '2px solid #8B7355' }} />
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '20px', height: '20px', borderBottom: '2px solid #8B7355', borderRight: '2px solid #8B7355' }} />

                                <h2 style={{ fontFamily: 'var(--font-germania), serif', fontSize: '32px', marginBottom: '8px', color: '#C0A080', textShadow: '0 0 10px rgba(192,160,128,0.3)' }}>ANCIENT ARCHIVE</h2>
                                <p style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#8B7355', marginBottom: '32px', borderBottom: '1px solid #3d3228', paddingBottom: '16px' }}>OFFICIAL VALUATION RECORD</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: '#8B7355' }}>SNAPSHOT MC</span>
                                    <span style={{ fontWeight: 'bold' }}>${snapshotMc}M</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                                    <span style={{ color: '#8B7355' }}>TARGET MC</span>
                                    <span style={{ fontWeight: 'bold' }}>${targetMc}M</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '14px', borderBottom: '1px dashed #3d3228', paddingBottom: '12px' }}>
                                    <span style={{ color: '#8B7355' }}>BASE REWARD</span>
                                    <span style={{ fontWeight: 'bold' }}>${parseFloat(rewardValue).toLocaleString()}</span>
                                </div>

                                <div style={{ background: '#1a1510', padding: '16px', border: '1px solid #3d3228', borderRadius: '8px', marginBottom: '24px' }}>
                                    <p style={{ fontSize: '12px', color: '#8B7355', marginBottom: '4px' }}>PROJECTED VALUE</p>
                                    <p style={{ fontFamily: 'var(--font-germania), serif', fontSize: '36px', color: '#C0A080', margin: 0 }}>
                                        ${((parseFloat(targetMc) || 0) / (parseFloat(snapshotMc) || 1) * (parseFloat(rewardValue) || 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </p>
                                </div>

                                <p style={{ fontSize: '10px', color: '#5c4d3c', fontStyle: 'italic' }}>
                                    "Preserved for eternity in the Nexus archives."
                                </p>
                                <p style={{ fontSize: '10px', color: '#3d3228', marginTop: '4px' }}>
                                    {new Date().toLocaleDateString()} • CAMBRIA
                                </p>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleDownload(receiptRef, 'cambria_artifact_receipt')}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 bg-[#C0A080] text-[#0d0a08] px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(192,160,128,0.3)] font-serif"
                                >
                                    {isGenerating ? <ScanLine className="animate-spin" /> : <Download />}
                                    {isGenerating ? 'SCRIBING...' : 'SAVE SCROLL'}
                                </button>
                                <button
                                    onClick={() => handleCopy(receiptRef)}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 bg-[#2a2018] border border-[#8B7355] text-[#C0A080] px-6 py-3 rounded-lg font-bold hover:text-white hover:border-[#C0A080] transition-colors font-serif"
                                >
                                    <Share2 /> COPY
                                </button>
                                <button
                                    onClick={() => setShowReceipt(false)}
                                    className="flex items-center gap-2 bg-black/60 border border-gray-700 text-gray-400 px-6 py-3 rounded-lg font-bold hover:text-white hover:border-white transition-colors"
                                >
                                    <X /> CLOSE
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MULTIPLIER CARD PREVIEW MODAL */}
            <AnimatePresence>
                {showMultiplierCard && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMultiplierCard(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative z-10 flex flex-col items-center gap-6"
                        >
                            <div
                                ref={multiplierCardRef}
                                style={{
                                    width: '400px',
                                    padding: '32px',
                                    background: 'linear-gradient(135deg, #000000 0%, #1a0b2e 100%)',
                                    border: '2px solid #b026ff',
                                    borderRadius: '16px',
                                    fontFamily: 'var(--font-pixel), monospace',
                                    color: '#fff',
                                    textAlign: 'center',
                                    position: 'relative',
                                    boxShadow: '0 0 50px rgba(176,38,255,0.2)'
                                }}
                            >
                                {/* Header */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                                    <img
                                        src="/assets/logo_glow.png"
                                        alt="CAMBRIA"
                                        style={{
                                            height: '40px',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 10px rgba(176,38,255,0.6))'
                                        }}
                                    />
                                </div>

                                <h2 style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#b026ff', marginBottom: '32px', textTransform: 'uppercase' }}>
                                    {t('airdrop.report')}
                                </h2>

                                {/* Stats Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>

                                    {/* CHARTER */}
                                    <div style={{ background: 'rgba(255, 215, 0, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                                            <p style={{ fontSize: '10px', color: '#ffd700' }}>{t('airdrop.charterLabel')}</p>
                                        </div>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>TIER {charterTier}</p>
                                        <p style={{ fontSize: '10px', color: '#4ade80' }}>+{parseInt(charterTier) >= 2 ? '1.0' : '0'}x Airdrop</p>
                                    </div>

                                    {/* FOUNDERS */}
                                    <div style={{ background: 'rgba(176,38,255,0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(176,38,255,0.3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                                            <img src="/assets/founder_anim.gif" style={{ width: '12px', height: '12px', borderRadius: '50%' }} />
                                            <p style={{ fontSize: '10px', color: '#a78bfa' }}>{t('airdrop.foundersLabel')}</p>
                                        </div>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{founderCount}</p>
                                        <p style={{ fontSize: '10px', color: '#4ade80' }}>+{FOUNDER_BONUSES[founderCount]}x</p>
                                    </div>

                                    {/* ISLANDS */}
                                    <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
                                            <img src="/assets/island_new.png" style={{ width: '12px', height: '12px', borderRadius: '2px' }} />
                                            <p style={{ fontSize: '10px', color: '#4ade80' }}>{t('airdrop.islandsLabel')}</p>
                                        </div>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{islandCount}</p>
                                        <p style={{ fontSize: '10px', color: '#4ade80' }}>+{ISLAND_BONUSES[islandCount]}x</p>
                                    </div>

                                    {/* LUCK / XP */}
                                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                                        <p style={{ fontSize: '10px', color: '#38bdf8', marginBottom: '4px' }}>{t('airdrop.luckXpLabel')}</p>
                                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{luckIndex}%</p>
                                        {parseInt(charterTier) >= 3 ? (
                                            <p style={{ fontSize: '10px', color: '#fbbf24' }}>{xpMultiplier.toFixed(2)}x XP</p>
                                        ) : (
                                            <p style={{ fontSize: '10px', color: '#6b7280' }}>{t('item.noXpBoost')}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Total Multiplier */}
                                <div style={{ background: 'linear-gradient(90deg, rgba(176,38,255,0.2) 0%, rgba(176,38,255,0) 100%)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #b026ff', textAlign: 'left' }}>
                                    <p style={{ fontSize: '12px', color: '#a78bfa', marginBottom: '4px', letterSpacing: '0.1em' }}>{t('airdrop.totalMultLabel')}</p>
                                    <p style={{ fontSize: '48px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 20px rgba(176,38,255,0.8)', margin: 0 }}>
                                        {multiplier.toFixed(2)}x
                                    </p>
                                </div>

                                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#6b7280' }}>
                                    <span>{t('airdrop.seasonReady')}</span>
                                    <span>{t('airdrop.website')}</span>
                                </div>
                            </div>

                            {/* ACTIONS */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleDownload(multiplierCardRef, 'cambria_airdrop_status')}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 bg-neon-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(176,38,255,0.3)]"
                                >
                                    {isGenerating ? <ScanLine className="animate-spin" /> : <Download />}
                                    {isGenerating ? t('airdrop.generating') : t('airdrop.save')}
                                </button>
                                <button
                                    onClick={() => handleCopy(multiplierCardRef)}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 bg-black/60 border border-neon-purple text-neon-purple px-6 py-3 rounded-lg font-bold hover:bg-neon-purple hover:text-white transition-colors"
                                >
                                    <Share2 /> {t('airdrop.copy')}
                                </button>
                                <button
                                    onClick={() => setShowMultiplierCard(false)}
                                    className="flex items-center gap-2 bg-black/60 border border-gray-700 text-gray-400 px-6 py-3 rounded-lg font-bold hover:text-white hover:border-white transition-colors"
                                >
                                    <X /> {t('airdrop.close')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
