"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye, Download, Users, Skull, Trophy } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import { MagicBorder } from './ui/GlowBorder';
import { soundManager } from '../utils/sound';
import html2canvas from 'html2canvas';

// Define fate types
type FateType = 'common' | 'rare' | 'epic' | 'legendary' | 'cursed';

interface Fate {
    text: string;
    image?: string;
    type: FateType;
    subtext?: string;
}

const CAMBRIA_START_DATE = new Date('2025-12-07T00:00:00');

const getDayNumber = () => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - CAMBRIA_START_DATE.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const FATE_POOL: Fate[] = [
    // --- LEGENDARY (0.1% Vibes) ---
    { text: "The Gods of RNG bless you. A Tier 5 Artifact is destined for your inventory.", image: "/assets/artifacts/artifact_tier5.png", type: 'legendary', subtext: "Do not squander this gift." },
    { text: "You will roll a natural 100 on a Mythic drop. The server will witness.", type: 'legendary', subtext: "Screenshot it." },
    { text: "A developer is watching your session. Play perfectly.", type: 'legendary', subtext: "They are impressed." },
    { text: "Accidental brilliance: You will discover a new meta exploit.", type: 'legendary', subtext: "Hotfix incoming." },
    { text: "The Auction House underpriced a Tier 5. Snipe it instanly.", image: "/assets/artifacts/artifact_tier5.png", type: 'legendary', subtext: "Profit secured." },

    // --- EPIC (Great Outcomes) ---
    { text: "A Tier 4 Artifact will drop, but only if you rush the objective NOW.", image: "/assets/artifacts/artifact_tier4.png", type: 'epic', subtext: "Speed is of the essence." },
    { text: "You will craft a masterpiece. The forge spirits align.", type: 'epic', subtext: "Prepare your materials." },
    { text: "A random crit will save your life at 1 HP.", type: 'epic', subtext: "Not even close." },
    { text: "You successfully enchant your weapon to +10. Finally.", type: 'epic', subtext: "It glows now." },
    { text: "You bait a PKer into a trap. Their loot is yours.", type: 'epic', subtext: "Outplayed." },
    { text: "The lag gods smile upon you; you teleport behind the enemy.", type: 'epic', subtext: "Nothing personal kid." },
    { text: "You achieve perfect flow state. Your mechanics are flawless today.", type: 'epic', subtext: "Esports ready." },
    { text: "A guild invite arrives. It is the top guild on previous server.", type: 'epic', subtext: "Accept it." },

    // --- RARE (Good/Interesting) ---
    { text: "A stash of 20 Tier 1 Artifacts awaits... if you have the inventory space.", image: "/assets/artifacts/artifact_tier1.png", type: 'rare', subtext: "Quantity is quality." },
    { text: "The Genesis Architects are watching. Put on a show.", type: 'rare' },
    { text: "You find a lore book that hints at a secret room.", type: 'rare', subtext: "Read between the lines." },
    { text: "Someone recognizes your username from Reddit. You are famous.", type: 'rare', subtext: "Wave back." },
    { text: "You will find a fishing spot nobody knows about.", type: 'rare', subtext: "Peace and quiet." },
    { text: "The NPCs seem nicer to you today. Hidden reputation buff?", type: 'rare' },
    { text: "You befriend a lowbie. They will become a powerful tank.", type: 'rare', subtext: "Invest in them." },
    { text: "Your market listing sells instantly. You underpriced it, but cash is cash.", type: 'rare' },

    // --- COMMON (Standard/Funny) ---
    { text: "The market shifts. Hold your assets tight.", type: 'common' },
    { text: "Tier 2 Artifacts will rain upon you. Easy upgrades ahead.", image: "/assets/artifacts/artifact_tier2.png", type: 'common' },
    { text: "You will spend 2 hours organizing your stash tabs.", type: 'common', subtext: "It sparks joy." },
    { text: "You catch a boot while fishing. It is just a boot.", type: 'common' },
    { text: "You get lost in the settings menu optimizing keybinds.", type: 'common' },
    { text: "You realize you've been playing for 6 hours. Hydrate.", type: 'common' },
    { text: "The weather in-game matches the weather outside. Gloomy.", type: 'common' },
    { text: "Your DPS is average today. Just do the mechanics.", type: 'common' },
    { text: "You forget to buy potions before the raid.", type: 'common', subtext: "Beg the healer." },
    { text: "A guild member starts drama in chat. Popcorn time.", type: 'common' },

    // --- CURSED (Bad Luck/Trolls) ---
    { text: "You will find a Tier 5 Artifact...", image: "/assets/artifacts/artifact_tier5.png", type: 'cursed', subtext: "...but xX_Slayer_Xx loots it." },
    { text: "You will disconnect while holding a Tier 4. Tragedy awaits.", image: "/assets/artifacts/artifact_tier4.png", type: 'cursed', subtext: "Check your wifi." },
    { text: "You will trade a Tier 3 for a health potion by mistake.", image: "/assets/artifacts/artifact_tier3.png", type: 'cursed', subtext: "Read the trade window." },
    { text: "Beware of false friends in the Guild Hall today.", type: 'cursed' },
    { text: "You attempt to enchant. Your item vanishes into dust.", type: 'cursed', subtext: "Back to grinding." },
    { text: "A rogue named 'NoobSlayer' is camping your corpse.", type: 'cursed', subtext: "Switch channels." },
    { text: "You roll a 99. Someone else rolls a 100.", type: 'cursed', subtext: "Pain." },
    { text: "You find a shortcut. It leads to a cliff. You fall.", type: 'cursed', subtext: "Gravity wins." },
    { text: "Server maintenance starts when the boss is at 1%.", type: 'cursed', subtext: "Time management." },
    { text: "You act AFK to bait a PKer. You die immediately.", type: 'cursed', subtext: "They were geared." },
    { text: "A texture glitch makes your character look bald.", type: 'cursed', subtext: "wear a helmet." },
    { text: "Tank forgets to taunt. You are the tank now.", type: 'cursed', subtext: "Run." },
    { text: "A GM whispers you. It was a wrong number.", type: 'cursed', subtext: "Heart attack." },
    { text: "You accidentally consume your rare buff food while idle.", type: 'cursed', subtext: "Delicious waste." },
    { text: "Your party kicks you for 'low gear score'.", type: 'cursed', subtext: "Prove them wrong." },
    { text: "You find a glitched wall. You get stuck inside.", type: 'cursed', subtext: "/unstuck command." }
];

export default function TheOracle() {
    const [revealed, setRevealed] = useState(false);
    const [fate, setFate] = useState<Fate | null>(null);
    const [isShuffling, setIsShuffling] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const savedDate = localStorage.getItem('oracle_date');
        const savedFateIndex = localStorage.getItem('oracle_fate_index');
        const today = new Date().toDateString();

        if (savedDate === today && savedFateIndex) {
            setFate(FATE_POOL[parseInt(savedFateIndex)]);
            setRevealed(true);
        }
    }, []);

    const consultOracle = () => {
        if (revealed) return;

        try { soundManager.playConfirm(); } catch (e) { }

        setIsShuffling(true);

        let shuffleCount = 0;
        const maxShuffles = 15;
        const interval = setInterval(() => {
            // Visual shuffle only (picking random text for effect)
            setFate(FATE_POOL[Math.floor(Math.random() * FATE_POOL.length)]);
            shuffleCount++;
            if (shuffleCount >= maxShuffles) {
                clearInterval(interval);
                finalizeProphecy();
            }
        }, 100);
    };

    const finalizeProphecy = () => {
        const today = new Date().toDateString();
        const randomIndex = Math.floor(Math.random() * FATE_POOL.length);
        const finalFate = FATE_POOL[randomIndex];

        setFate(finalFate);
        setRevealed(true);
        setIsShuffling(false);

        localStorage.setItem('oracle_date', today);
        localStorage.setItem('oracle_fate_index', randomIndex.toString());

        try { soundManager.playSuccess && soundManager.playSuccess(); } catch (e) { }
    };

    const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);
        return y;
    };

    const generateOracleImage = async (currentFate: Fate): Promise<string> => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 630;
            const ctx = canvas.getContext('2d');
            if (!ctx) { reject('No canvas context'); return; }

            // 1. Background (Rich Dark Purple)
            const grad = ctx.createRadialGradient(600, 315, 0, 600, 315, 800);
            grad.addColorStop(0, '#2e1065'); // Violet-900
            grad.addColorStop(0.6, '#130524'); // Deep Purple
            grad.addColorStop(1, '#000000'); // Black
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1200, 630);

            // 2. Cyber-Grid
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 1200; i += 60) {
                ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 630); ctx.stroke();
            }
            for (let i = 0; i <= 630; i += 60) {
                ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1200, i); ctx.stroke();
            }

            // 3. Vignette
            const vignette = ctx.createRadialGradient(600, 315, 300, 600, 315, 700);
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.8)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, 1200, 630);

            // 4. Ornamental Corners & Border
            ctx.fillStyle = '#fbbf24'; // Gold for dots
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 4;
            const drawCorner = (x: number, y: number, dx: number, dy: number) => {
                ctx.beginPath();
                ctx.moveTo(x, y + 40 * dy);
                ctx.lineTo(x, y);
                ctx.lineTo(x + 40 * dx, y);
                ctx.stroke();
                ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
            };
            drawCorner(40, 40, 1, 1);
            drawCorner(1160, 40, -1, 1);
            drawCorner(40, 590, 1, -1);
            drawCorner(1160, 590, -1, -1);

            ctx.strokeStyle = '#7c3aed';
            ctx.lineWidth = 2;
            ctx.strokeRect(40, 40, 1120, 550);

            // 3. Header: THE ORACLE
            ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
            ctx.shadowBlur = 20;
            ctx.font = '60px "Germania One", serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText('THE ORACLE', 600, 60);
            ctx.shadowBlur = 0;

            // 4. Subheader (Fate Type)
            const typeColor = currentFate.type === 'cursed' ? '#ef4444' : '#fbbf24';
            ctx.font = '40px "Germania One", serif';
            ctx.fillStyle = typeColor;
            ctx.fillText(`DAY ${getDayNumber()}: ${currentFate.type.toUpperCase()} FATE`, 600, 130);

            // Helper to draw text content
            const drawContent = () => {
                const hasImage = !!currentFate.image;

                // Alignment settings
                ctx.textAlign = hasImage ? 'left' : 'center';
                ctx.font = '40px "Pixelify Sans", monospace';
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 4;

                const textX = hasImage ? 450 : 600;
                let textY = hasImage ? 250 : 250;
                const maxWidth = hasImage ? 700 : 1000;
                const lineHeight = 55;

                // Wrap text manually
                const text = `"${currentFate.text}"`;
                const words = text.split(' ');
                let line = '';
                let y = textY;

                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth && n > 0) {
                        ctx.fillText(line, textX, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, textX, y);

                // Subtext
                if (currentFate.subtext) {
                    y += 70;
                    ctx.font = '30px "Pixelify Sans", monospace';
                    ctx.fillStyle = '#a78bfa'; // Light purple
                    ctx.fillText(currentFate.subtext, textX, y);
                }

                // Watermark
                ctx.textAlign = 'center';
                ctx.font = '24px "Pixelify Sans", monospace';
                ctx.fillStyle = '#4b5563';
                ctx.fillText('CAMBRIA.GG', 600, 590);

                // Scanlines (The Final Polish)
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                for (let i = 0; i < 630; i += 4) {
                    ctx.fillRect(0, i, 1200, 2);
                }

                resolve(canvas.toDataURL('image/png'));
            };

            // 5. Image (if exists) - Draw on Left
            if (currentFate.image) {
                const img = new Image();
                img.src = currentFate.image;

                img.onload = () => {
                    // Draw image Left side
                    const aspect = img.width / img.height;
                    const drawH = 220;
                    const drawW = 220 * aspect;
                    const imgX = 220; // Center of left zone
                    const imgY = 240;

                    ctx.save();
                    // Glow behind image
                    ctx.shadowBlur = 40;
                    ctx.shadowColor = typeColor;

                    // Draw image centered in its zone
                    ctx.drawImage(img, imgX - drawW / 2, imgY, drawW, drawH);
                    ctx.restore();
                    drawContent();
                };
                img.onerror = () => {
                    console.warn("Image capture skipped");
                    drawContent();
                };
            } else {
                drawContent();
            }
        });
    };

    const downloadCard = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!fate) return;

        try {
            const dataUrl = await generateOracleImage(fate);

            const link = document.createElement('a');
            link.download = `Cambria_Oracle_Fate_${new Date().toISOString().split('T')[0]}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Play success sound
            try { soundManager.playClick(); } catch (e) { }

        } catch (err) {
            console.error("Download failed:", err);
            alert("Fate capture failed. Please try again.");
        }
    };



    const getTypeColor = (type?: FateType) => {
        switch (type) {
            case 'legendary': return 'text-orange-500 border-orange-500/50 from-orange-900/20';
            case 'epic': return 'text-purple-400 border-purple-500/50 from-purple-900/20';
            case 'rare': return 'text-blue-400 border-blue-500/50 from-blue-900/20';
            case 'cursed': return 'text-red-500 border-red-500/50 from-red-900/20';
            default: return 'text-gray-300 border-gray-500/50 from-gray-900/20';
        }
    };

    return (
        <div className="col-span-1 md:col-span-3 h-72 relative z-0 group">
            <TiltCard
                className="w-full h-full cursor-pointer"
                onClick={consultOracle}
            >
                <MagicBorder className="h-full border border-cambria-purple/50 rounded-xl group relative overflow-hidden">
                    {/* Veteran Design Background */}
                    <div className="absolute inset-0 bg-veteran-gradient z-0" />
                    <div className="absolute inset-0 scanlines z-[1] opacity-50" />
                    <div className="absolute inset-0 vignette-radial z-[2]" />

                    {/* Ornamental Corners (SVG) */}
                    <div className="absolute top-0 left-0 w-full h-full z-[5] pointer-events-none">
                        <svg className="absolute top-2 left-2 w-8 h-8 text-neon-gold" viewBox="0 0 40 40">
                            <path d="M2 40 V2 H40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="2" cy="2" r="3" fill="currentColor" />
                        </svg>
                        <svg className="absolute top-2 right-2 w-8 h-8 text-neon-gold rotate-90" viewBox="0 0 40 40">
                            <path d="M2 40 V2 H40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="2" cy="2" r="3" fill="currentColor" />
                        </svg>
                        <svg className="absolute bottom-2 left-2 w-8 h-8 text-neon-gold -rotate-90" viewBox="0 0 40 40">
                            <path d="M2 40 V2 H40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="2" cy="2" r="3" fill="currentColor" />
                        </svg>
                        <svg className="absolute bottom-2 right-2 w-8 h-8 text-neon-gold rotate-180" viewBox="0 0 40 40">
                            <path d="M2 40 V2 H40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                            <circle cx="2" cy="2" r="3" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Content Container */}
                    <div
                        ref={cardRef}
                        className="relative z-10 w-full h-full p-6 bg-[#0a0a0a]/50"
                    >
                        <AnimatePresence mode="wait">
                            {!revealed && !isShuffling ? (
                                <motion.div
                                    key="initial"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                                    className="flex flex-col items-center justify-center h-full gap-4"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-neon-purple/30 blur-xl rounded-full animate-pulse" />
                                        <Eye className="text-neon-purple w-20 h-20 relative z-10 drop-shadow-[0_0_20px_rgba(167,139,250,0.8)]" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-3xl font-germania text-white tracking-widest drop-shadow-lg">THE ORACLE</h3>
                                        <p className="text-gray-400 text-xs uppercase tracking-[0.3em] mt-2 font-light">Day {getDayNumber()} Awaits Your Fate</p>
                                    </div>
                                    <div className="relative z-[100] pointer-events-none px-6 py-2 bg-transparent border-2 border-neon-purple text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-all rounded font-pixel text-sm mt-2 shadow-[0_0_15px_rgba(167,139,250,0.3)]">
                                        CONSULT FATE
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="revealed"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col md:flex-row items-center md:items-stretch gap-6 w-full h-full"
                                >
                                    {/* Left Column: Visuals & Header */}
                                    <div className="relative w-full md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4 gap-4">
                                        {/* Ticket Header Match */}
                                        {!isShuffling && <h3 className="absolute top-0 text-white/30 font-germania tracking-[0.2em] text-sm">THE ORACLE</h3>}

                                        <div className="flex flex-col items-center text-center mt-6">
                                            <div className={`text-neon-gold ${isShuffling ? 'animate-spin' : ''}`}>
                                                {fate?.type === 'cursed' ? <Skull size={32} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" /> : <Sparkles size={32} className="drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />}
                                            </div>
                                            <h4 className={`font-germania text-2xl uppercase tracking-wider mt-2 ${getTypeColor(fate?.type).split(' ')[0]} drop-shadow-md`}>
                                                {isShuffling ? "DIVINING..." : fate?.type + " FATE"}
                                            </h4>
                                        </div>

                                        {/* Image */}
                                        {fate?.image && !isShuffling && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="relative w-24 h-24"
                                            >
                                                <div className={`absolute inset-0 bg-gradient-to-t ${getTypeColor(fate?.type).split(' ')[2]} blur-2xl rounded-full opacity-60`} />
                                                <img src={fate.image} alt="Artifact" className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Right Column: Text Only */}
                                    <div className="w-full md:w-2/3 flex flex-col items-center md:items-start justify-center relative">
                                        <div className={`flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40 rounded-xl w-full h-full backdrop-blur-sm shadow-xl transition-all ${isShuffling ? 'blur-sm' : ''}`}>
                                            <p className="text-white font-pixel text-sm md:text-lg leading-relaxed drop-shadow-md text-center md:text-left">
                                                "{fate?.text}"
                                            </p>
                                            {fate?.subtext && (
                                                <p className={`text-xs uppercase tracking-widest mt-4 font-bold ${getTypeColor(fate?.type).split(' ')[0]} opacity-90`}>
                                                    {fate.subtext}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </MagicBorder>
            </TiltCard>

            {/* Button Moved Outside TiltCard */}
            <AnimatePresence>
                {revealed && !isShuffling && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            downloadCard(e);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute bottom-6 right-6 z-[99999] pointer-events-auto flex items-center gap-2 text-xs font-bold text-black bg-neon-gold border border-neon-gold hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(251,191,36,0.8)] transition-all cursor-pointer px-4 py-2 rounded shadow-[0_0_10px_rgba(251,191,36,0.4)]"
                    >
                        <Download size={14} />
                        SAVE TICKET
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
