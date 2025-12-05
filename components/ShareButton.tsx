import React from 'react';
import { Twitter } from 'lucide-react';

interface ShareButtonProps {
    text: string;
    url?: string;
    hashtags?: string[];
    className?: string;
}

export default function ShareButton({ text, url = "https://goldrush.cambria.gg/", hashtags = ["CambriaS3", "CambriaMMO", "GoldRush"], className = "" }: ShareButtonProps) {
    const handleShare = () => {
        const twitterUrl = new URL('https://twitter.com/intent/tweet');
        // Add the tool link to the text
        const fullText = `${text}\n\nCalculated via Cambria Nexus: https://cambria-nexus.vercel.app`;

        twitterUrl.searchParams.append('text', fullText);
        if (url) twitterUrl.searchParams.append('url', url);
        if (hashtags) twitterUrl.searchParams.append('hashtags', hashtags.join(','));
        twitterUrl.searchParams.append('via', 'playcambria');

        window.open(twitterUrl.toString(), '_blank', 'noopener,noreferrer');
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center gap-2 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 border border-[#1DA1F2]/50 text-[#1DA1F2] px-4 py-2 rounded-lg font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(29,161,242,0.3)] ${className}`}
        >
            <Twitter size={18} fill="currentColor" />
            SHARE RESULT
        </button>
    );
}
