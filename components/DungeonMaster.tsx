import Image from 'next/image';
import { Skull, ShieldAlert, Swords, DoorOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DungeonMaster() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-cambria-gold/30 pb-2">
                <Skull className="text-cambria-red" size={24} />
                <h2 className="text-2xl font-bold text-cambria-red drop-shadow-[0_0_10px_rgba(255,68,68,0.6)]">DUNGEON MASTER GUIDE</h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* INVASIONS */}
                <motion.div variants={item} className="relative overflow-hidden bg-black/80 border border-red-900/30 p-6 rounded-xl hover:border-red-500/50 transition-all duration-300 group backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 border-b border-red-900/30 pb-3">
                            <div className="p-2 bg-red-900/20 rounded-lg border border-red-500/20 group-hover:border-red-500/50 transition-colors">
                                <Swords className="text-red-500 group-hover:text-red-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white tracking-wide">INVASIONS</h3>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-red-500 mt-1">›</span>
                                <span>Only <span className="text-red-400 font-bold font-mono">1 Invader</span> can enter.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-red-500 mt-1">›</span>
                                <span>Invaders get <span className="text-yellow-500 font-mono">Reduced Drops</span>.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-red-500 mt-1">›</span>
                                <span>Prepare for PvP if warned.</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* TRAPS */}
                <motion.div variants={item} className="relative overflow-hidden bg-black/80 border border-orange-900/30 p-6 rounded-xl hover:border-orange-500/50 transition-all duration-300 group backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 border-b border-orange-900/30 pb-3">
                            <div className="p-2 bg-orange-900/20 rounded-lg border border-orange-500/20 group-hover:border-orange-500/50 transition-colors">
                                <ShieldAlert className="text-orange-500 group-hover:text-orange-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white tracking-wide">TRAPS</h3>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-orange-500 mt-1">›</span>
                                <span><span className="text-orange-400 font-bold font-mono">Interval Fire</span>: Times movement.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-orange-500 mt-1">›</span>
                                <span><span className="text-orange-400 font-bold font-mono">Motion Fire</span>: Don't move.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-orange-500 mt-1">›</span>
                                <span><span className="text-orange-400 font-bold font-mono">Spikes</span>: Watch floor patterns.</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* VISUAL */}
                <motion.div variants={item} className="md:col-span-2 relative h-56 rounded-xl overflow-hidden border border-gray-800 group shadow-2xl">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                    <Image
                        src="/assets/animated_assets/goldrush_s3.gif"
                        alt="Dungeon Visual"
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        unoptimized // Required for local GIFs if not using an external loader
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20 flex items-end p-6">
                        <div className="border-l-2 border-neon-gold pl-4">
                            <p className="text-gray-200 text-lg font-serif italic tracking-wide">"The depths hold treasures for the bold, and death for the foolish."</p>
                        </div>
                    </div>
                </motion.div>

                {/* LOOT */}
                <motion.div variants={item} className="relative overflow-hidden bg-black/80 border border-yellow-900/30 p-6 rounded-xl hover:border-yellow-500/50 transition-all duration-300 group backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 border-b border-yellow-900/30 pb-3">
                            <div className="p-2 bg-yellow-900/20 rounded-lg border border-yellow-500/20 group-hover:border-yellow-500/50 transition-colors">
                                <Image
                                    src="/assets/chest_anim.gif"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                    alt="Chest"
                                    unoptimized
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white tracking-wide">LOOT & MARKS</h3>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-yellow-500 mt-1">›</span>
                                <span>Max <span className="text-yellow-400 font-bold font-mono">3 Marks</span> equipped.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-yellow-500 mt-1">›</span>
                                <span>Marks provide passive buffs.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-yellow-500 mt-1">›</span>
                                <span>Loot lost on death (unless insured).</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* EXIT */}
                <motion.div variants={item} className="relative overflow-hidden bg-black/80 border border-blue-900/30 p-6 rounded-xl hover:border-blue-500/50 transition-all duration-300 group backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 border-b border-blue-900/30 pb-3">
                            <div className="p-2 bg-blue-900/20 rounded-lg border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                                <DoorOpen className="text-blue-500 group-hover:text-blue-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-200 group-hover:text-white tracking-wide">EXTRACTION</h3>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-blue-500 mt-1">›</span>
                                <span>Kill <span className="text-blue-400 font-bold font-mono">Mini-boss</span> to spawn.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-blue-500 mt-1">›</span>
                                <span>Portal open for limited time.</span>
                            </li>
                            <li className="flex items-start gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                                <span className="text-blue-500 mt-1">›</span>
                                <span>Extract to secure loot!</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
