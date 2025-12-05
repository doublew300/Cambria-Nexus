export const LEVEL_CAPS = [
    { level: "Level 40", cost: "Free", note: "Initial hard cap for all stats." },
    { level: "Level 60", cost: "500 Silver", note: "Unlocks mid-game content." },
    { level: "Level 70", cost: "8,000 Silver", note: "Unlocks end-game content." }
];

export const PRESTIGE_TIERS = [
    {
        tier: "Prestige 1",
        bonus: "+20% Combat XP",
        mastery: "+1 Mastery Point (Total 10)",
        cost: "150,000 Silver",
        note: "Resets combat stats to 1."
    },
    {
        tier: "Prestige 2",
        bonus: "+40% Combat XP, +5% Attack Speed",
        mastery: "+2 Mastery Points (Total 12)",
        cost: "Reduced Silver Cost",
        note: "Resets combat stats to 1."
    },
    {
        tier: "Prestige 3 (Max)",
        bonus: "+60% Combat XP, +8.5% Attack Speed",
        mastery: "+3 Mastery Points (Total 15)",
        cost: "FREE (Instant Switches)",
        note: "Allows maxing 3 mastery trees."
    }
];

export const CHARTER_TIERS = [
    { tier: "Tier 1 ($35)", perks: ["Basic Access"] },
    { tier: "Tier 2 ($70)", perks: ["2x Airdrop Multiplier", "Premium World Access"] },
    { tier: "Tier 3 ($150)", perks: ["Guild Creation", "XP Multiplier from Energy"] },
    { tier: "Tier 4 ($450)", perks: ["Arcane Research", "Shout Command", "Cosmetic Glow"] }
];
