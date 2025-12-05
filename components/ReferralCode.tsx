import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ReferralCode() {
    const [copied, setCopied] = useState(false);
    const code = "WW300";

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-4 right-4 border border-cambria-gold/50 p-2 bg-black/80 text-xs text-cambria-gold hover:bg-cambria-gold/10 transition-all cursor-pointer flex items-center gap-2 group z-50"
        >
            <span className="font-bold">REFERRAL: {code}</span>
            {copied ? <Check size={14} /> : <Copy size={14} className="opacity-50 group-hover:opacity-100" />}

            {copied && (
                <span className="absolute -bottom-8 right-0 text-green-400 font-bold bg-black/90 px-2 py-1 rounded border border-green-500/30">
                    COPIED!
                </span>
            )}
        </button>
    );
}
