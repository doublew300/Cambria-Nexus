"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    glareColor?: string;
}

export default function TiltCard({ children, className = "", onClick, glareColor = "rgba(255, 255, 255, 0.4)" }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Transform mouse position to rotation values
    // Range: -5deg to 5deg
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

    // Glare position
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        // Normalize to -0.5 to 0.5
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out will-change-transform ${className}`}
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="h-full w-full"
            >
                {children}
            </div>

            {/* Glare Overlay */}
            <motion.div
                style={{
                    background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor}, transparent 50%)`,
                    opacity: useTransform(mouseX, [-0.5, 0, 0.5], [0, 0, 0]), // Clean this up: opacity should be driven by mouse hover, or simpler logic
                    // Actually, let's just use CSS hover + transform for opacity or just keep it simple
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                }}
                className="absolute inset-0 z-50 rounded-xl"
            />

            {/* Gloss Effect - Simpler Approach */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none z-40"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${glareColor}, transparent 70%)`,
                    mixBlendMode: "soft-light"
                }}
            />
        </motion.div>
    );
}
