import React, { useState } from 'react';
import { Coins, TrendingUp, Building2, Calculator, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/sound';

export default function PaymasterCalculator() {
    const { t } = useLanguage();
    const [chartersDeposited, setChartersDeposited] = useState<string>('');
    const [totalSyndicateCharters, setTotalSyndicateCharters] = useState<string>('1000'); // Default estimate
    const [dailyNewCharters, setDailyNewCharters] = useState<string>('100'); // Est. daily volume

    // Constants
    const CHARTER_PRICE = 0.01; // ETH
    const TAX_PER_CHARTER = 0.002; // ETH (20% of 0.01)

    // Calculations
    const userShare = parseFloat(chartersDeposited) / (parseFloat(totalSyndicateCharters) || 1);
    const dailyTaxPool = (parseFloat(dailyNewCharters) || 0) * TAX_PER_CHARTER;
    const estimatedDailyEarnings = dailyTaxPool * (userShare || 0);

    const handleInputChange = (setter: (val: string) => void, val: string) => {
        soundManager.playType();
        setter(val);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center gap-3 border-b border-cambria-gold/30 pb-4">
                <div className="p-2 bg-gradient-to-br from-cambria-gold/20 to-transparent rounded-lg border border-cambria-gold/30">
                    <Building2 className="text-cambria-gold" size={32} />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-neon-gold font-germania tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                        {t('paymaster.title')}
                    </h3>
                    <p className="text-xs text-cambria-gold/60 font-mono uppercase tracking-widest">Syndicate ROI Estimator</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div
                        className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group"
                        onMouseEnter={() => soundManager.playHover()}
                    >
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <ScrollIcon className="text-neon-gold" size={14} />
                            {t('paymaster.deposited')}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={chartersDeposited}
                                onChange={(e) => handleInputChange(setChartersDeposited, e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded-lg py-4 pl-4 pr-12 text-white placeholder-gray-700 focus:outline-none focus:border-neon-gold/50 focus:bg-neon-gold/5 transition-all font-mono text-2xl tracking-tight"
                                placeholder="0"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 font-mono text-sm">NPTS</div>
                        </div>
                    </div>

                    <div
                        className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group"
                        onMouseEnter={() => soundManager.playHover()}
                    >
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <Building2 className="text-purple-400" size={14} />
                            {t('paymaster.pool')}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={totalSyndicateCharters}
                                onChange={(e) => handleInputChange(setTotalSyndicateCharters, e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded-lg py-4 pl-4 pr-12 text-white placeholder-gray-700 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all font-mono text-xl tracking-tight"
                                placeholder="1000"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 font-mono text-sm">TOTAL</div>
                        </div>
                    </div>

                    <div
                        className="bg-black/40 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group"
                        onMouseEnter={() => soundManager.playHover()}
                    >
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                            <TrendingUp className="text-green-400" size={14} />
                            {t('paymaster.dailyNew')}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={dailyNewCharters}
                                onChange={(e) => handleInputChange(setDailyNewCharters, e.target.value)}
                                className="w-full bg-black/60 border border-gray-800 rounded-lg py-4 pl-4 pr-12 text-white placeholder-gray-700 focus:outline-none focus:border-green-500/50 focus:bg-green-500/5 transition-all font-mono text-xl tracking-tight"
                                placeholder="100"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600 font-mono text-sm">DAILY</div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <motion.div
                        className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 rounded-xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.1)]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Coins size={120} />
                        </div>

                        <h4 className="text-green-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Coins size={16} /> {t('paymaster.estIncome')}
                        </h4>

                        <div className="flex items-baseline gap-3 mb-6 relative z-10">
                            <span className="text-5xl font-bold text-white font-mono tracking-tighter drop-shadow-md">
                                {estimatedDailyEarnings.toFixed(5)}
                            </span>
                            <span className="text-xl text-green-500 font-bold">ETH</span>
                        </div>

                        <div className="space-y-2 relative z-10">
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-gray-500">Your Pool Share</span>
                                <span className="text-white font-mono">{(userShare * 100).toFixed(2)}%</span>
                            </div>
                            <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                <span className="text-gray-500">Daily Tax Pool</span>
                                <span className="text-white font-mono">{dailyTaxPool.toFixed(4)} ETH</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-[10px] text-green-500/60 bg-green-900/20 p-3 rounded border border-green-500/20">
                            <Info size={14} className="shrink-0 mt-0.5" />
                            <p>{t('paymaster.disclaimer')}</p>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">Weekly Est.</div>
                            <div className="text-white font-mono font-bold text-lg">{(estimatedDailyEarnings * 7).toFixed(4)} ETH</div>
                        </div>
                        <div className="bg-black/40 border border-gray-800 p-4 rounded-xl">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-1">Monthly Est.</div>
                            <div className="text-white font-mono font-bold text-lg">{(estimatedDailyEarnings * 30).toFixed(4)} ETH</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Helper Icon for Scroll
function ScrollIcon({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <path d="M2 12h2" />
            <path d="M22 11h-2.4c-.3 0-.5.2-.5.5v3.1c0 .3.2.5.5.5h2.4c.2 0 .5-.2.5-.5v-3.1c0-.3-.3-.5-.6-.5" />
            <path d="M7 17v-3a2 2 0 0 1 2-2h0" />
            <path d="M12 17v-3.5a2.5 2.5 0 0 1 5 0V17" />
        </svg>
    );
}


