"use client";

import React, { useRef, useState, useEffect } from 'react';

interface GlowBorderProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
}

export default function GlowBorder({ children, className = "", color = "#ffd700" }: GlowBorderProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Glow Effect */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}40, transparent 40%)`
                }}
            />

            {/* Content wrapper to ensure border sits on top but content is clickable */}
            <div className="relative h-full w-full bg-black/90 rounded-[inherit] z-10 m-[1px]">
                {children}
            </div>

            {/* Actual border simulation via background showing through padding/margin? 
          Actually, easier approach: overlay a gradient border. 
          Let's try a mask approach or simple overlay. 
      */}
        </div>
    );
}

// Alternative: Just return the container and control border color via mouse position.
// But we want the "flashlight" effect on the border.
// Let's rewrite to use a simpler masking technique for the border only.

export function MagicBorder({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box = boxRef.current;
        if (!box) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            box.style.setProperty("--mouse-x", `${x}px`);
            box.style.setProperty("--mouse-y", `${y}px`);
        };

        box.addEventListener("mousemove", handleMouseMove);
        return () => box.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={boxRef} className={`group relative ${className} bg-gray-900 overflow-hidden`}>
            {/* The Border Glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 215, 0, 0.15), transparent 40%)",
                }}
            />
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                    background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(176, 38, 255, 0.3), transparent 40%)",
                }}
            />
            {children}
        </div>
    );
}
