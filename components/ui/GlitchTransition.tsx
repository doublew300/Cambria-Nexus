"use client";

import React, { useState, useEffect } from 'react';

export default function GlitchTransition({ children, activeKey }: { children: React.ReactNode, activeKey: string }) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        setIsGlitching(true);
        const timer = setTimeout(() => setIsGlitching(false), 400); // 400ms duration (Cover loading)
        return () => clearTimeout(timer);
    }, [activeKey]);

    return (
        <div className="relative">
            {/* Main Content - Always visible for stability */}
            <div className="relative z-0">
                {children}
            </div>

            {/* Glitch Layer 1 (Red/Cyan) */}
            {isGlitching && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        animation: "glitch-anim 0.1s linear infinite",
                        background: "transparent",
                        textShadow: "2px 0 cyan",
                        clipPath: "inset(0 0 0 0)",
                        zIndex: 10,
                        opacity: 0.5,
                        mixBlendMode: 'hard-light'
                    }}
                >
                    {children}
                </div>
            )}

            {/* Glitch Layer 2 (Magenta/Yellow) */}
            {isGlitching && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        animation: "glitch-anim 0.1s linear infinite reverse",
                        background: "transparent",
                        textShadow: "-2px 0 magenta",
                        transform: "translate(-5px, 0)",
                        opacity: 0.5,
                        zIndex: 11,
                        mixBlendMode: 'hard-light'
                    }}
                >
                    {children}
                </div>
            )}

            {/* White Noise Flash */}
            {isGlitching && (
                <div className="absolute inset-0 bg-white/20 z-[12] mix-blend-overlay animate-pulse" />
            )}
        </div>
    );
}
