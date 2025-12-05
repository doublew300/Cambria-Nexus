import React from 'react';
import { Utensils, ChefHat, Clock } from 'lucide-react';
import { getGuideData } from '../../data/guidesData';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/sound';

export default function TheKitchen() {
    const { language } = useLanguage();
    const recipes = getGuideData(language).recipes;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe, index) => (
                <div
                    key={index}
                    className="group relative bg-black/60 border border-gray-800 rounded-xl p-5 hover:border-amber-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.1)] overflow-hidden cursor-default"
                    onMouseEnter={() => soundManager.playHover()}
                >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ChefHat size={64} />
                    </div>

                    <div className="flex items-start gap-4 relative z-10">
                        <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-4xl shadow-inner border border-gray-800 group-hover:scale-105 transition-transform">
                            {recipe.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-gray-100 group-hover:text-amber-400 transition-colors truncate">{recipe.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                                <span className="flex items-center gap-1 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
                                    <Utensils size={10} /> {recipe.req}
                                </span>
                            </div>

                            <p className="text-sm text-amber-200/90 leading-tight mb-3 font-medium">
                                {recipe.buff}
                            </p>

                            <div className="bg-black/40 rounded p-2 border border-white/5">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 font-semibold">Ingredients</p>
                                <p className="text-xs text-gray-300">{recipe.ingredients}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
