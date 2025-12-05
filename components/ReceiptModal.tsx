import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, ScanLine } from 'lucide-react';
import html2canvas from 'html2canvas';
import { soundManager } from '../utils/sound';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: {
        silverLooted: string;
        timeT2: string;
        timeT3: string;
        timeT4: string;
        timeT5: string;
        totalXP: number;
        grossProfit: number;
        orbCostEth: number;
        guildTax: boolean;
        netProfit: number;
        profitUSD: number;
        ethPrice: string;
    };
}

export default function ReceiptModal({ isOpen, onClose, data }: ReceiptModalProps) {
    const receiptRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownload = async () => {
        if (!receiptRef.current) return;
        setIsGenerating(true);
        soundManager.playConfirm();

        try {
            const canvas = await html2canvas(receiptRef.current, {
                backgroundColor: '#000000',
                scale: 2, // High res
                logging: false,
            });

            const link = document.createElement('a');
            link.download = `Cambria_Receipt_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err: any) {
            console.error("Receipt generation failed", err);
            alert(`Failed to generate receipt: ${err?.message || 'Unknown error'}`);
            soundManager.playError();
        }

        setIsGenerating(false);
    };

    const formatDate = () => {
        return new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative z-10 flex flex-col items-center gap-6"
                    >
                        {/* RECEIPT CONTAINER */}
                        <div
                            ref={receiptRef}
                            style={{
                                width: '380px',
                                backgroundColor: '#000000',
                                border: '2px solid rgba(255, 230, 0, 0.5)',
                                padding: '24px',
                                borderRadius: '2px',
                                boxShadow: '0 0 50px rgba(255, 215, 0, 0.15)',
                                position: 'relative',
                                overflow: 'hidden',
                                fontFamily: 'var(--font-pixel), monospace',
                                fontSize: '12px',
                                color: 'rgba(255, 230, 0, 0.8)'
                            }}
                        >
                            {/* Paper Texture / Noise Overlay REPLACED with safe CSS Gradient */}
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    opacity: 0.2,
                                    pointerEvents: 'none',
                                    background: 'radial-gradient(circle at center, #1f2937, #000000, #000000)'
                                }}
                            />

                            {/* Top Tear */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '8px',
                                    background: 'linear-gradient(45deg, transparent 33.333%, #000 33.333%, #000 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #000 33.333%, #000 66.667%, transparent 66.667%)',
                                    backgroundSize: '12px 20px',
                                    backgroundPosition: '0 -10px'
                                }}
                            />

                            {/* Header */}
                            <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px dashed rgba(255, 230, 0, 0.3)', paddingBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                                    <img
                                        src="/assets/logo_glow.png"
                                        alt="CAMBRIA"
                                        style={{
                                            height: '48px',
                                            objectFit: 'contain',
                                            filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.6))'
                                        }}
                                    />
                                </div>
                                <p style={{ letterSpacing: '0.2em', fontSize: '10px', margin: '0', fontFamily: 'var(--font-germania), serif' }}>OFFICIAL LEDGER RECORD</p>
                                <p style={{ fontSize: '10px', opacity: 0.7, margin: '4px 0 0 0' }}>{formatDate()}</p>
                                <p style={{ fontSize: '10px', opacity: 0.7, margin: '0' }}>TERMINAL: NEXUS-01</p>
                            </div>

                            {/* Items */}
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', borderBottom: '1px solid rgba(255, 230, 0, 0.2)', paddingBottom: '4px', marginBottom: '12px' }}>
                                    <span>ITEM</span>
                                    <span>QTY/VAL</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span>SILVER LOOTED</span>
                                    <span>{parseFloat(data.silverLooted || '0').toLocaleString()}</span>
                                </div>

                                {(parseFloat(data.timeT2) > 0) && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, marginBottom: '4px' }}>
                                        <span>ZONE: T2 (YELLOW)</span>
                                        <span>{data.timeT2}m</span>
                                    </div>
                                )}
                                {(parseFloat(data.timeT3) > 0) && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, marginBottom: '4px' }}>
                                        <span>ZONE: T3 (RED)</span>
                                        <span>{data.timeT3}m</span>
                                    </div>
                                )}
                                {(parseFloat(data.timeT4) > 0) && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, marginBottom: '4px' }}>
                                        <span>ZONE: T4 (PURPLE)</span>
                                        <span>{data.timeT4}m</span>
                                    </div>
                                )}
                                {(parseFloat(data.timeT5) > 0) && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7, marginBottom: '4px' }}>
                                        <span>ZONE: T5 (BLACK)</span>
                                        <span>{data.timeT5}m</span>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c084fc', marginTop: '8px' }}>
                                    <span>XP GAINED</span>
                                    <span>+{data.totalXP.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Financials */}
                            <div style={{ marginBottom: '24px', borderTop: '2px dashed rgba(255, 230, 0, 0.3)', paddingTop: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span>GROSS PROFIT</span>
                                    <span>{data.grossProfit.toFixed(4)} ETH</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171', marginBottom: '4px' }}>
                                    <span>ORB COST</span>
                                    <span>-{data.orbCostEth.toFixed(4)} ETH</span>
                                </div>
                                {data.guildTax && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                                        <span>GUILD TAX (10%)</span>
                                        <span>-{(data.netProfit * 0.1).toFixed(4)} ETH</span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div style={{ backgroundColor: 'rgba(255, 230, 0, 0.1)', padding: '16px', border: '1px solid rgba(255, 230, 0, 0.3)', borderRadius: '4px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'var(--font-germania), serif' }}>NET PROFIT</span>
                                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffe600', fontFamily: 'var(--font-pixel), monospace' }}>{data.netProfit.toFixed(4)} ETH</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.7, fontSize: '10px' }}>
                                    <span>USD VALUE</span>
                                    <span>${data.profitUSD.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                    {/* Fake Barcode */}
                                    <div style={{ height: '32px', width: '192px', display: 'flex', alignItems: 'stretch', gap: '2px', opacity: 0.8 }}>
                                        {[...Array(40)].map((_, i) => (
                                            <div key={i} style={{ backgroundColor: '#ffe600', width: Math.random() > 0.5 ? '2px' : '4px', height: '100%', opacity: Math.random() > 0.5 ? 1 : 0.5 }} />
                                        ))}
                                    </div>
                                </div>
                                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, margin: '0 0 4px 0' }}>Thank you for your service</p>
                                <p style={{ fontSize: '8px', opacity: 0.3, margin: '0' }}>cambria-nexus.vercel.app</p>
                            </div>

                            {/* Bottom Tear */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: '8px',
                                    background: 'linear-gradient(45deg, transparent 33.333%, #000 33.333%, #000 66.667%, transparent 66.667%), linear-gradient(-45deg, transparent 33.333%, #000 33.333%, #000 66.667%, transparent 66.667%)',
                                    backgroundSize: '12px 20px',
                                    backgroundPosition: '0 10px',
                                    transform: 'rotate(180deg)'
                                }}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleDownload}
                                disabled={isGenerating}
                                className="flex items-center gap-2 bg-neon-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                            >
                                {isGenerating ? <ScanLine className="animate-spin" /> : <Download />}
                                {isGenerating ? 'PRINTING...' : 'SAVE'}
                            </button>
                            <button
                                onClick={async () => {
                                    if (!receiptRef.current) return;
                                    setIsGenerating(true);
                                    try {
                                        const canvas = await html2canvas(receiptRef.current, {
                                            backgroundColor: '#000000',
                                            scale: 2,
                                            logging: false,
                                        });
                                        canvas.toBlob(async (blob) => {
                                            if (!blob) return;
                                            await navigator.clipboard.write([
                                                new ClipboardItem({ 'image/png': blob })
                                            ]);
                                            alert('Receipt copied to clipboard!');
                                        });
                                    } catch (err) {
                                        console.error("Copy failed", err);
                                    }
                                    setIsGenerating(false);
                                }}
                                disabled={isGenerating}
                                className="flex items-center gap-2 bg-neon-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-colors shadow-[0_0_20px_rgba(176,38,255,0.3)]"
                            >
                                <Share2 /> COPY
                            </button>
                            <button
                                onClick={onClose}
                                className="flex items-center gap-2 bg-black/60 border border-gray-700 text-gray-400 px-6 py-3 rounded-lg font-bold hover:text-white hover:border-white transition-colors"
                            >
                                <X /> CLOSE
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
