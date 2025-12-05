// data/guidesData.ts

export type Build = {
  name: string;
  type: 'Melee' | 'Ranged' | 'Magic';
  tags: string[];
  equipment: {
    head: string;
    body: string;
    weapon: string;
    offhand: string;
    amulet: string;
    backpack: string;
    ammo?: string;
  };
  strategy: string;
  pros: string;
  cons: string;
  recommendedMarks?: string[];
  recommendedBoosts?: string[];
  image?: string;
};

export type Recipe = {
  name: string;
  buff: string;
  req: string;
  ingredients: string;
  icon: string;
};

export type FishingLoc = {
  zone: string;
  fish: string[];
  req: string;
  note: string;
};

export type NpcHub = {
  location: string;
  npcs: { name: string; function: string }[];
};

export type DataPackage = {
  builds: Build[];
  recipes: Recipe[];
  fishing: FishingLoc[];
  boosts: { name: string; effect: string }[];
  marks: { name: string; category: string; type: string; effect: string }[];
  npcs: NpcHub[];
};

const DATA_EN: DataPackage = {
  builds: [
    {
      name: "Burst Melee (The One-Shot)",
      type: 'Melee',
      tags: ['PvP', 'Burst', 'High Risk'],
      image: '/assets/guides/burst_melee.png',
      equipment: {
        head: "Dragonsteel Helm",
        body: "Dragonsteel Armor",
        weapon: "Stone Maul",
        offhand: "None",
        amulet: "Amulet of Agony",
        backpack: "Seasoned Adventurer's Backpack (+25)"
      },
      strategy: "Use 'Instant Attack' ability combined with Stone Maul's special 'Quick Attack'. Auto -> Spec -> Instant Attack gives 3 hits in 1 tick. 100-0 combo.",
      pros: "Most disgusting single target burst in the game.",
      cons: "Must combo perfectly. If you miss, you get outplayed.",
      recommendedMarks: ["Mark of the Maniac", "Mark of Rending Force", "Mark of Motion Flux"],
      recommendedBoosts: ["Relentless Fury", "Body Rune"]
    },
    {
      name: "CC Melee (The Perma-Root)",
      type: 'Melee',
      tags: ['PvP', 'Control', 'Bleed'],
      image: '/assets/guides/cc_melee.png',
      equipment: {
        head: "Dragonsteel Helm",
        body: "Dragonsteel Armor",
        weapon: "Adamantine Chainwhip (Masterwork)",
        offhand: "Dragonsteel Defender",
        amulet: "Amulet of Agony",
        backpack: "Seasoned Adventurer's Backpack (+25)"
      },
      strategy: "Chainwhip special 'Whiplash' roots for 4s and lowers def by 15-30%. Switch between 'Slash' for bleeds and 'Crush' for stuns. Combine with 'Taunt' to CC-lock enemies to death.",
      pros: "CC is king. If they can't run, they are dead.",
      cons: "Lower DPS than burst builds. Requires stance switching.",
      recommendedMarks: ["Mark of Binding Ward", "Mark of Frostroot", "Mark of Weighted Fury"],
      recommendedBoosts: ["Body Rune", "Strong Ale"]
    },
    {
      name: "Single Target DPS (Puncture)",
      type: 'Melee',
      tags: ['PvE', 'Bossing', 'Poison'],
      image: '/assets/guides/dps_melee.png',
      equipment: {
        head: "Dragonsteel Helm",
        body: "Dragonsteel Armor",
        weapon: "Dragonsteel Dagger (p++)",
        offhand: "Dragonsteel Defender",
        amulet: "Amulet of Agony",
        backpack: "Seasoned Adventurer's Backpack (+25)"
      },
      strategy: "Uses Dragonsteel Dagger special 'Puncture' dealing 2 hits with 15% increased accuracy. Combine with Poison (p++) for max DoT damage.",
      pros: "Best melee single target damage in the game.",
      cons: "Squishy due to low defensive bonuses.",
      recommendedMarks: ["Mark of Rapid Bleeding", "Mark of Venom Guard", "Mark of Slayer’s Rhythm"],
      recommendedBoosts: ["Relentless Fury", "Lucky Charm"]
    },
    {
      name: "AoE Farm Melee (The Grinder)",
      type: 'Melee',
      tags: ['PvE', 'Farming', 'Tank'],
      image: '/assets/guides/aoe_melee.png',
      equipment: {
        head: "Obsidian Helm",
        body: "Obsidian Armor",
        weapon: "Spiked Battering Ram",
        offhand: "None",
        amulet: "Amulet of Agony",
        backpack: "Seasoned Adventurer's Backpack (+25)"
      },
      strategy: "Spiked Battering Ram deals AoE damage around the target. Group up Zombies or mobs and smack them all at once.",
      pros: "Super tanky, best for clearing large groups of mobs.",
      cons: "Weak at PvP (No special attack).",
      recommendedMarks: ["Mark of Blood for Stone", "Mark of Encirclement", "Mark of Salvaged Fate"],
      recommendedBoosts: ["Body Rune", "Bounty Gather"]
    },
    {
      name: "High DPS Bow (The Kiter)",
      type: 'Ranged',
      tags: ['DPS', 'Kiting', 'Mobility'],
      image: '/assets/guides/ranger_bow.png',
      equipment: {
        head: "Robinhood Hat",
        body: "Dragonhide Leather Armor",
        weapon: "Mystbark Shortbow",
        offhand: "None",
        amulet: "Amulet of Wrath",
        backpack: "Alanamemti's Backpack (+15)",
        ammo: "Adamantine Arrows (p++)"
      },
      strategy: "Mystbark has fastest attack speed. Use 'Double Strafe' to shoot 2 arrows at once. Kite like in MOBA games (Orb walking).",
      pros: "Highest single target DPS. Strong AoE potential with bounces.",
      cons: "Very squishy. Requires good movement mechanics.",
      recommendedMarks: ["Mark of the Pathfinder", "Mark of Light Burden", "Mark of Motion Flux"],
      recommendedBoosts: ["Relentless Fury", "Unshackled Power"]
    },
    {
      name: "Burst Crossbow (The Sniper)",
      type: 'Ranged',
      tags: ['Burst', 'Tanky Ranged'],
      image: '/assets/guides/ranger_xbow.png',
      equipment: {
        head: "Robinhood Hat",
        body: "Dragonhide Leather Armor",
        weapon: "Cultist Repeater",
        offhand: "Adamantine Kiteshield",
        amulet: "Amulet of Wrath",
        backpack: "Alanamemti's Backpack (+15)",
        ammo: "Dragonsteel Bolt (Dragon's Breath)"
      },
      strategy: "Use 'Dark Sigil' special for 100% accuracy and guaranteed bolt effect proc. Dragon's Breath deals massive extra damage.",
      pros: "Can chunk 70%+ HP in one hit. Tankier due to shield.",
      cons: "Slow attack speed. Weak AoE.",
      recommendedMarks: ["Mark of the Maniac", "Mark of Rending Force", "Mark of Mirror Thorn"],
      recommendedBoosts: ["Unshackled Power", "Body Rune"]
    },
    {
      name: "Cultist Mage (Glass Cannon)",
      type: 'Magic',
      tags: ['PvP', 'PvE', 'High Skill'],
      image: '/assets/guides/mage_cultist.png',
      equipment: {
        head: "Cultist Hood",
        body: "Cultist Robes",
        weapon: "Occultist's Grand Staff",
        offhand: "Mages Book",
        amulet: "Amulet of Wrath",
        backpack: "Seasoned Adventurer's Backpack (+25)"
      },
      strategy: "Use Frost Barrage to freeze, then switch to Surge spells. Requires 'charges' to use spells. Utilize 'Tumble' and 'Frost Nova' to survive.",
      pros: "Highest utility: Damage + CC + Range. Many tools to min/max.",
      cons: "Extremely complex spell list. Very squishy.",
      recommendedMarks: ["Mark of Leeching Arcana", "Mark of Arcane Efficiency", "Mark of Frostroot"],
      recommendedBoosts: ["Unshackled Power", "Strong Ale"]
    }
  ],
  recipes: [
    { name: "Cod Chunks", buff: "Boosts Cooking Lvl +15 & XP +10% for 5 mins", req: "Cooking Lvl 10", ingredients: "5x Raw Trout", icon: "🍖" },
    { name: "Kings Lobster Delight", buff: "Boosts Agility Lvl +15 & XP +10% for 5 mins", req: "Cooking Lvl 50", ingredients: "3x Raw Lobster, 1x Raw Kelp", icon: "🦞" },
    { name: "Hearty Stew", buff: "Increases Mining, Woodcutting, Fishing XP by 20% for 3 mins", req: "Cooking Lvl 55", ingredients: "5x Raw Carps, 1x Raw Kelp", icon: "🍲" },
    { name: "Anchovy Soup", buff: "Boosts Fishing Lvl +15 & XP +10% for 5 mins", req: "Cooking Lvl 65", ingredients: "5x Raw Trout, 5x Raw Cod", icon: "🥣" },
    { name: "Rabbit Pie", buff: "Boosts Smithing Lvl +5 & XP +10% for 5 mins", req: "Cooking Lvl 65", ingredients: "5x Raw Trout, 1x Raw Carp", icon: "🥧" },
    { name: "Cambrian Pie", buff: "INCREASES ALL XP GAINED BY 10% for 1.5 mins", req: "Cooking Lvl 70", ingredients: "5x Raw Cod, 5x Oak Logs, 5x Cow Meat, 1x Raw Eel", icon: "🥧" },
    { name: "Honey Cake", buff: "Boosts Engineering Lvl +15 & XP +10% for 5 mins", req: "Cooking Lvl 80", ingredients: "5x Raw Kelp, 5x Boar Meat, 1x Raw Eel", icon: "🍰" },
    { name: "Enhanced Fishing Rod", buff: "Allows catching T3+ Fish (Lobster/Eel)", req: "Crafting Lvl 65", ingredients: "10x Oak Logs, 1x Thread, 1x Iron Bar", icon: "🎣" }
  ],
  fishing: [
    { zone: "Capital (Safe Zone)", fish: ["Trout", "Cod", "Kelp"], req: "None", note: "No bait needed." },
    { zone: "South of Capital", fish: ["Carp"], req: "Lvl 40+", note: "No bait needed." },
    { zone: "New Mortis / Swamp", fish: ["Lobster", "Eels"], req: "Lvl 60+", note: "Needs Bait + Enhanced Rod." },
    { zone: "Tunnels / Caves", fish: ["Rockfish"], req: "Endgame", note: "Needs Rock Dust + Kill Cave Golems." }
  ],
  boosts: [
    { name: "Strong Ale", effect: "Reduces stress by 10/30/50/200" },
    { name: "Lucky Charm", effect: "Increases current reward multiplier by 5%/15%/35%/100%" },
    { name: "Rabbit's Foot", effect: "Increases reward multiplier by 250/500/750/1500" },
    { name: "Body Rune", effect: "Reduces incoming damage by 4%/12%/25%/50%" },
    { name: "Relentless Fury", effect: "Increases attack speed by 5%/10%/30%/50%" },
    { name: "Unshackled Power", effect: "Increases special attack regeneration by 10%/25%/60%/100%" },
    { name: "Cosmetic Wealth", effect: "Increases artifact drops by 5%/10%/20%/50%" },
    { name: "Bounty Gather", effect: "Adds +X% chance to gain additional resources per action" },
    { name: "Overclock", effect: "Increases skilling speed by 3%/8%/16%/35%" }
  ],
  marks: [
    { name: "Mark of the Maniac", category: "PvM/PvP", type: "Passive", effect: "Increases max hit by 20% but lowers defence by 30%." },
    { name: "Mark of Purity", category: "PvP", type: "Active", effect: "Cleanses all crowd control effects on activation (2m CD)." },
    { name: "Mark of Frostroot", category: "PvP", type: "Passive", effect: "Auto-attacks have 5% chance to freeze enemy for 2s." },
    { name: "Mark of Binding Ward", category: "PvM", type: "Passive", effect: "Increased threat generation by 50%." },
    { name: "Mark of Leeching Arcana", category: "PvM/PvP", type: "Passive", effect: "Magic damage heals for 5% of damage dealt." },
    { name: "Mark of the Pathfinder", category: "PvM", type: "Passive", effect: "Run energy drains 30% slower." },
    { name: "Mark of the Delver", category: "Utility", type: "Passive", effect: "Light radius in caves increased by 50%." },
    { name: "Mark of Venom Guard", category: "PvM/PvP", type: "Passive", effect: "Immune to poison damage." },
    { name: "Mark of the Phoenix Seed", category: "PvM / PvP", type: "Passive", effect: "Revive with 30% HP upon death (1 hour CD)." },
    { name: "Mark of Salvaged Fate", category: "PvM", type: "Passive", effect: "10% chance to not consume a consumable on use." },
    { name: "Mark of Resilience", category: "PvM/PvP", type: "Passive", effect: "Regenerate 1 HP every 3 seconds." },
    { name: "Mark of Bonecaller", category: "Utility", type: "Passive", effect: "Summoned minions deal 10% more damage." },
    { name: "Mark of the Mirror Thorn", category: "PvM/PvP", type: "Passive", effect: "Reflect 10% of melee damage back to attacker." },
    { name: "Mark of Retribution", category: "PvM/PvP", type: "Active", effect: "Explode on death dealing 200 damage in area." },
    { name: "Mark of the Bloodbound", category: "PvM/PvP", type: "Passive", effect: "Share damage with nearby party members." },
    { name: "Mark of Rapid Bleeding", category: "PvM/PvP", type: "Passive", effect: "Bleed effects tick 20% faster." },
    { name: "Mark of Arcane Efficiency", category: "Utility", type: "Passive", effect: "Spells cost 10% fewer runes." },
    { name: "Mark of Weighted Fury", category: "PvP", type: "Passive", effect: "Slows target by 10% on hit." },
    { name: "Mark of the Slayer’s Rhythm", category: "PvM", type: "Passive", effect: "+15% Damage against Slayer Timer targets." },
    { name: "Mark of Reversal", category: "PvP", type: "Passive", effect: "When stunned, gain 50% defence for 3s." },
    { name: "Mark of Encirclement", category: "PvM/PvP", type: "Passive", effect: "+5% damage for each enemy targeting you." },
    { name: "Mark of the Opportunist", category: "PvP", type: "Passive", effect: "+10% damage against stunned/rooted targets." },
    { name: "Mark of the Skirmisher", category: "PvP", type: "Passive", effect: "+5% evasion chance while moving." },
    { name: "Mark of Light Burden", category: "PvM/PvP", type: "Passive", effect: "Weight reduction effects are 20% stronger." },
    { name: "Mark of Blood for Stone", category: "PvM", type: "Passive", effect: "Convert 10% of incoming damage to mana drain." },
    { name: "Mark of Motion Flux", category: "PvM/PvP", type: "Passive", effect: "Dash cooldown reduced by 20%." },
    { name: "Mark of Rending Force", category: "PvM/PvP", type: "Passive", effect: "Critical hits cause bleeding." },
    { name: "Mark of the Forager’s Surge", category: "PvM/Skilling", type: "Passive", effect: "+10% chance to double gather yield." },
    { name: "Mark of the Blademaster", category: "PvP", type: "Passive", effect: "Sword attacks bypass 5% armor." },
    { name: "Mark of Enduring Stride", category: "Utility", type: "Passive", effect: "Stamina regenerates while walking." }
  ],
  npcs: [
    {
      location: "Capital City (Main Hub)",
      npcs: [
        { name: "Adam (Banker)", function: "Located in Center. Stores items." },
        { name: "Sir Althus (Treasury)", function: "Exchanges Artifacts for Silver & Royal Favor." },
        { name: "Matilda (Grand Exchange)", function: "P2P Market. Buy/Sell items." },
        { name: "Maxon (Travel Planner)", function: "Fast Travel to other towns (Cost: 100 Silver)." },
        { name: "Cyro (General Store)", function: "Sells/Buys items at floor price (Instant sell)." },
        { name: "Susan (Basic Supplies)", function: "Sells Fishing Bait, Thread, Vials, Ring of Insight (10 Silver)." },
        { name: "Reynold (Slayer Master)", function: "Located South. Assigns tasks. Removes PK Skull." },
        { name: "Crafting Stations", function: "All stations (Anvil, Alchemy, etc.) are present here." }
      ]
    },
    {
      location: "Camp Glenwood",
      npcs: [
        { name: "Durac (Weaponsmith)", function: "Sells starting Weapons (Bronze/Iron)." },
        { name: "Father Trent (Priest)", function: "Restores Prayer Points." },
        { name: "Green Statue", function: "Restores HP/Prayer when standing near it." }
      ]
    },
    {
      location: "Camp Northill",
      npcs: [
        { name: "Amber (Armorsmith)", function: "Sells Melee Armor." }
      ]
    },
    {
      location: "Camp Far East",
      npcs: [
        { name: "Payton (Ranger)", function: "Sells Bows, Crossbows, and Ammo." }
      ]
    },
    {
      location: "New Mortis (Magic Hub)",
      npcs: [
        { name: "Alamaneti (Mage Merchant)", function: "Sells Magic Gear, Runes, Scrolls." },
        { name: "Indigo (Outfitter)", function: "North side. Sells Backpacks (Crucial for weight limit) and Axes." },
        { name: "Devon (Key Master)", function: "Exchanges 'PK Keys' (loot from players) for the actual loot inside." },
        { name: "Marcus", function: "Sells Threads/Potions (Similar to Susan)." }
      ]
    }
  ]
};

const DATA_RU: DataPackage = {
  builds: [
    {
      name: "Burst Melee (Ваншот)",
      type: 'Melee',
      tags: ['PvP', 'Бурст', 'Хай-риск'],
      image: '/assets/guides/burst_melee.png',
      equipment: {
        head: "Dragonsteel Шлем",
        body: "Dragonsteel Броня",
        weapon: "Stone Maul (Молот)",
        offhand: "Нет",
        amulet: "Amulet of Agony",
        backpack: "Рюкзак Seasoned Adventurer (+25)"
      },
      strategy: "Юзай 'Instant Attack' вместе со спец-атакой Stone Maul 'Quick Attack'. Комбо: Авто -> Спец -> Instant Attack = 3 удара за 1 тик. 100-0 хп за секунду.",
      pros: "Самый жесткий бурст в соло цель.",
      cons: "Нужно идеально жать кнопки. Промахнулся = умер.",
      recommendedMarks: ["Mark of the Maniac", "Mark of Rending Force", "Mark of Motion Flux"],
      recommendedBoosts: ["Relentless Fury", "Body Rune"]
    },
    {
      name: "CC Melee (Перма-Рут)",
      type: 'Melee',
      tags: ['PvP', 'Контроль', 'Блид'],
      image: '/assets/guides/cc_melee.png',
      equipment: {
        head: "Dragonsteel Шлем",
        body: "Dragonsteel Броня",
        weapon: "Adamantine Chainwhip (Кнут)",
        offhand: "Dragonsteel Дефендер",
        amulet: "Amulet of Agony",
        backpack: "Рюкзак Seasoned Adventurer (+25)"
      },
      strategy: "Спец-атака Кнута 'Whiplash' рутит на 4с и снижает деф. Переключайся на 'Slash' для кровотечения и 'Crush' для станов. Комбинируй с таунтом для полного станлока.",
      pros: "Король контроля. Если враг не может бегать - он труп.",
      cons: "ДПС ниже чем у бурстовиков. Надо свитчить стойки.",
      recommendedMarks: ["Mark of Binding Ward", "Mark of Frostroot", "Mark of Weighted Fury"],
      recommendedBoosts: ["Body Rune", "Strong Ale"]
    },
    {
      name: "Single Target DPS (Puncture)",
      type: 'Melee',
      tags: ['PvE', 'Боссы', 'Яд'],
      image: '/assets/guides/dps_melee.png',
      equipment: {
        head: "Dragonsteel Шлем",
        body: "Dragonsteel Броня",
        weapon: "Dragonsteel Dagger (p++)",
        offhand: "Dragonsteel Дефендер",
        amulet: "Amulet of Agony",
        backpack: "Рюкзак Seasoned Adventurer (+25)"
      },
      strategy: "Спамь спец-атаку Даггера 'Puncture' (2 хита + точность). Обязательно юзай яд (p++) для максимального DoT урона.",
      pros: "Лучший дпс в одну цель в игре.",
      cons: "Тонкий, мало защиты.",
      recommendedMarks: ["Mark of Rapid Bleeding", "Mark of Venom Guard", "Mark of Slayer’s Rhythm"],
      recommendedBoosts: ["Relentless Fury", "Lucky Charm"]
    },
    {
      name: "AoE Farm Melee (Мясорубка)",
      type: 'Melee',
      tags: ['PvE', 'Фарм', 'Танк'],
      image: '/assets/guides/aoe_melee.png',
      equipment: {
        head: "Obsidian Шлем",
        body: "Obsidian Броня",
        weapon: "Spiked Battering Ram",
        offhand: "Нет",
        amulet: "Amulet of Agony",
        backpack: "Рюкзак Seasoned Adventurer (+25)"
      },
      strategy: "Spiked Battering Ram бьет по площади. Собирай пачки мобов и заливай всех сразу.",
      pros: "Очень жирный, топ для зачистки данжей.",
      cons: "Слаб в PvP (нет берст урона).",
      recommendedMarks: ["Mark of Blood for Stone", "Mark of Encirclement", "Mark of Salvaged Fate"],
      recommendedBoosts: ["Body Rune", "Bounty Gather"]
    },
    {
      name: "High DPS Bow (Кайтер)",
      type: 'Ranged',
      tags: ['ДПС', 'Кайт', 'Мобильность'],
      image: '/assets/guides/ranger_bow.png',
      equipment: {
        head: "Robinhood Шляпа",
        body: "Dragonhide Leather Кожа",
        weapon: "Mystbark Shortbow (Лук)",
        offhand: "Нет",
        amulet: "Amulet of Wrath",
        backpack: "Рюкзак Alanamemti (+15)",
        ammo: "Adamantine Стрелы (p++)"
      },
      strategy: "У лука самая быстрая атака. Юзай 'Double Strafe'. Кайть как в MOBA (Orb walking). Не стой на месте.",
      pros: "Топ рендж ДПС. Хороший потенциал для АоЕ.",
      cons: "Очень тонкий. Нужны прямые руки.",
      recommendedMarks: ["Mark of the Pathfinder", "Mark of Light Burden", "Mark of Motion Flux"],
      recommendedBoosts: ["Relentless Fury", "Unshackled Power"]
    },
    {
      name: "Burst Crossbow (Снайпер)",
      type: 'Ranged',
      tags: ['Бурст', 'Рендж Танк'],
      image: '/assets/guides/ranger_xbow.png',
      equipment: {
        head: "Robinhood Шляпа",
        body: "Dragonhide Leather Кожа",
        weapon: "Cultist Repeater (Арбалет)",
        offhand: "Adamantine Баклер",
        amulet: "Amulet of Wrath",
        backpack: "Рюкзак Alanamemti (+15)",
        ammo: "Dragonsteel Болты (Dragon's Breath)"
      },
      strategy: "Жми 'Dark Sigil' для 100% точности. Dragon's Breath болты наносят дикий доп. урон.",
      pros: "Сносит 70% лица за выстрел. Живучий из-за щита.",
      cons: "Медленная атака. Нет АоЕ.",
      recommendedMarks: ["Mark of the Maniac", "Mark of Rending Force", "Mark of Mirror Thorn"],
      recommendedBoosts: ["Unshackled Power", "Body Rune"]
    },
    {
      name: "Cultist Mage (Стеклянная Пушка)",
      type: 'Magic',
      tags: ['PvP', 'PvE', 'Скилл'],
      image: '/assets/guides/mage_cultist.png',
      equipment: {
        head: "Cultist Капюшон",
        body: "Cultist Роба",
        weapon: "Occultist's Grand Staff",
        offhand: "Книга Мага",
        amulet: "Amulet of Wrath",
        backpack: "Рюкзак Seasoned Adventurer (+25)"
      },
      strategy: "Фрост Барраж для заморозки, потом Сурж. Нужны 'чарджи' для каста. Юзай 'Tumble' и 'Frost Nova' для выживания.",
      pros: "Макс утилити: Урон + Контроль + Рендж. Куча кнопок.",
      cons: "Сложная ротация. Умирает с тычки.",
      recommendedMarks: ["Mark of Leeching Arcana", "Mark of Arcane Efficiency", "Mark of Frostroot"],
      recommendedBoosts: ["Unshackled Power", "Strong Ale"]
    }
  ],
  recipes: [
    { name: "Cod Chunks", buff: "Буст Кулинарии +15 & XP +10% на 5 мин", req: "Кулинария 10", ingredients: "5x Raw Trout", icon: "🍖" },
    { name: "Kings Lobster Delight", buff: "Буст Ловкости +15 & XP +10% на 5 мин", req: "Кулинария 50", ingredients: "3x Raw Lobster, 1x Raw Kelp", icon: "🦞" },
    { name: "Hearty Stew", buff: "Увелич. Майнинг, Вудк. и Рыбалку XP на 20% на 3 мин", req: "Кулинария 55", ingredients: "5x Raw Carps, 1x Raw Kelp", icon: "🍲" },
    { name: "Anchovy Soup", buff: "Буст Рыбалки +15 & XP +10% на 5 мин", req: "Кулинария 65", ingredients: "5x Raw Trout, 5x Raw Cod", icon: "🥣" },
    { name: "Rabbit Pie", buff: "Буст Смитинга +5 & XP +10% на 5 мин", req: "Кулинария 65", ingredients: "5x Raw Trout, 1x Raw Carp", icon: "🥧" },
    { name: "Cambrian Pie", buff: "УВЕЛИЧИВАЕТ ВЕСЬ ПОЛУЧАЕМЫЙ ОПЫТ НА 10% (1.5 мин)", req: "Кулинария 70", ingredients: "5x Raw Cod, 5x Oak Logs, 5x Cow Meat, 1x Raw Eel", icon: "🥧" },
    { name: "Honey Cake", buff: "Буст Инженерии +15 & XP +10% на 5 мин", req: "Кулинария 80", ingredients: "5x Raw Kelp, 5x Boar Meat, 1x Raw Eel", icon: "🍰" },
    { name: "Enhanced Fishing Rod", buff: "Позволяет ловить рыбу Т3+ (Лобстер/Угорь)", req: "Крафт 65", ingredients: "10x Oak Logs, 1x Thread, 1x Iron Bar", icon: "🎣" }
  ],
  fishing: [
    { zone: "Capital (Safe Zone)", fish: ["Trout", "Cod", "Kelp"], req: "Нет", note: "Наживка не нужна." },
    { zone: "South of Capital", fish: ["Carp"], req: "Ур. 40+", note: "Наживка не нужна." },
    { zone: "New Mortis / Swamp", fish: ["Lobster", "Eels"], req: "Ур. 60+", note: "Нужна Наживка + Enhanced Rod." },
    { zone: "Tunnels / Caves", fish: ["Rockfish"], req: "Ендгейм", note: "Rock Dust + Убить Големов." }
  ],
  boosts: [
    { name: "Strong Ale", effect: "Снижает стресс на 10/30/50/200" },
    { name: "Lucky Charm", effect: "Увеличивает множитель наград на 5%/15%/35%/100%" },
    { name: "Rabbit's Foot", effect: "Множитель наград + 250/500/750/1500" },
    { name: "Body Rune", effect: "Снижает входящий урон на 4%/12%/25%/50%" },
    { name: "Relentless Fury", effect: "Скорость атаки + 5%/10%/30%/50%" },
    { name: "Unshackled Power", effect: "Реген спец-атаки + 10%/25%/60%/100%" },
    { name: "Cosmetic Wealth", effect: "Шанс артефактов + 5%/10%/20%/50%" },
    { name: "Bounty Gather", effect: "+X% шанс добыть доп. ресурсы" },
    { name: "Overclock", effect: "Скорость скиллинга + 3%/8%/16%/35%" }
  ],
  marks: [
    { name: "Mark of the Maniac", category: "PvM/PvP", type: "Passive", effect: "Увеличивает макс. удар на 20%, но снижает защиту на 30%." },
    { name: "Mark of Purity", category: "PvP", type: "Active", effect: "Снимает все эффекты контроля при активации (КД 2 мин)." },
    { name: "Mark of Frostroot", category: "PvP", type: "Passive", effect: "Авто-атаки имеют 5% шанс заморозить врага на 2с." },
    { name: "Mark of Binding Ward", category: "PvM", type: "Passive", effect: "Увеличивает генерацию угрозы на 50%." },
    { name: "Mark of Leeching Arcana", category: "PvM/PvP", type: "Passive", effect: "Магический урон исцеляет на 5% от нанесенного урона." },
    { name: "Mark of the Pathfinder", category: "PvM", type: "Passive", effect: "Энергия бега тратится на 30% медленнее." },
    { name: "Mark of the Delver", category: "Utility", type: "Passive", effect: "Радиус света в пещерах увеличен на 50%." },
    { name: "Mark of Venom Guard", category: "PvM/PvP", type: "Passive", effect: "Иммунитет к яду." },
    { name: "Mark of the Phoenix Seed", category: "PvM / PvP", type: "Passive", effect: "Воскрешение с 30% ХП при смерти (КД 1 час)." },
    { name: "Mark of Salvaged Fate", category: "PvM", type: "Passive", effect: "10% шанс не потратить расходник при использовании." },
    { name: "Mark of Resilience", category: "PvM/PvP", type: "Passive", effect: "Регенерация 1 ХП каждые 3 секунды." },
    { name: "Mark of Bonecaller", category: "Utility", type: "Passive", effect: "Призванные миньоны наносят на 10% больше урона." },
    { name: "Mark of the Mirror Thorn", category: "PvM/PvP", type: "Passive", effect: "Отражает 10% урона ближнего боя обратно." },
    { name: "Mark of Retribution", category: "PvM/PvP", type: "Active", effect: "Взрыв при смерти: 200 урона по области." },
    { name: "Mark of the Bloodbound", category: "PvM/PvP", type: "Passive", effect: "Разделение урона с ближайшими сопартийцами." },
    { name: "Mark of Rapid Bleeding", category: "PvM/PvP", type: "Passive", effect: "Кровотечение тикает на 20% быстрее." },
    { name: "Mark of Arcane Efficiency", category: "Utility", type: "Passive", effect: "Заклинания требуют на 10% меньше рун." },
    { name: "Mark of Weighted Fury", category: "PvP", type: "Passive", effect: "Замедляет цель на 10% при ударе." },
    { name: "Mark of the Slayer’s Rhythm", category: "PvM", type: "Passive", effect: "+15% Урона по целям Слеер-задания." },
    { name: "Mark of Reversal", category: "PvP", type: "Passive", effect: "При оглушении +50% защиты на 3с." },
    { name: "Mark of Encirclement", category: "PvM/PvP", type: "Passive", effect: "+5% урона за каждого врага, атакующего вас." },
    { name: "Mark of the Opportunist", category: "PvP", type: "Passive", effect: "+10% урона по оглушенным целям." },
    { name: "Mark of the Skirmisher", category: "PvP", type: "Passive", effect: "+5% уклонения в движении." },
    { name: "Mark of Light Burden", category: "PvM/PvP", type: "Passive", effect: "Эффекты снижения веса на 20% сильнее." },
    { name: "Mark of Blood for Stone", category: "PvM", type: "Passive", effect: "10% входящего урона переходит в ману." },
    { name: "Mark of Motion Flux", category: "PvM/PvP", type: "Passive", effect: "КД рывка снижено на 20%." },
    { name: "Mark of Rending Force", category: "PvM/PvP", type: "Passive", effect: "Критические удары вызывают кровотечение." },
    { name: "Mark of the Forager’s Surge", category: "PvM/Skilling", type: "Passive", effect: "+10% шанс удвоить добычу ресурсов." },
    { name: "Mark of the Blademaster", category: "PvP", type: "Passive", effect: "Атаки мечом игнорируют 5% брони." },
    { name: "Mark of Enduring Stride", category: "Utility", type: "Passive", effect: "Стамина восстанавливается при ходьбе." }
  ],
  npcs: [
    {
      location: "Столица (Хаб)",
      npcs: [
        { name: "Adam (Банкир)", function: "В центре. Хранит вещи." },
        { name: "Sir Althus (Казна)", function: "Обмен Артефактов на Серебро и Славу." },
        { name: "Matilda (Аукцион)", function: "Торговля с игроками." },
        { name: "Maxon (Телепорт)", function: "Быстрое перемещение (100 Серебра)." },
        { name: "Cyro (Магазин)", function: "Скупка хлама по базе." },
        { name: "Susan (Припасы)", function: "Наживка, Нитки, Банки." },
        { name: "Reynold (Слеер Мастер)", function: "На Юге. Дает таски на мобов." },
        { name: "Крафтовые Станции", function: "Все станки тут." }
      ]
    },
    {
      location: "Лагерь Glenwood",
      npcs: [
        { name: "Durac (Оружейник)", function: "Продает начальное оружие." },
        { name: "Father Trent (Священник)", function: "Восстанавливает Prayer." },
        { name: "Зеленая Статуя", function: "Реген ХП/Маны если стоять рядом." }
      ]
    },
    {
      location: "Лагерь Northill",
      npcs: [
        { name: "Amber (Бронник)", function: "Продает Мили Броню." }
      ]
    },
    {
      location: "Лагерь Far East",
      npcs: [
        { name: "Payton (Рейнджер)", function: "Продает Луки и Стрелы." }
      ]
    },
    {
      location: "New Mortis (Маги)",
      npcs: [
        { name: "Alamaneti (Маг Торговец)", function: "Руны, Свитки, Роба." },
        { name: "Indigo (Снаряжение)", function: "Продает Рюкзаки (вес) и Топоры." },
        { name: "Devon (Ключник)", function: "Обмменивает PK Ключи на лут." },
        { name: "Marcus", function: "Нитки/Зелья." }
      ]
    }
  ]
};

// Export helper
export const getGuideData = (lang: 'en' | 'ru'): DataPackage => {
  return lang === 'ru' ? DATA_RU : DATA_EN;
};

// Backwards compatibility
export const COMBAT_BUILDS = DATA_EN.builds;
export const RECIPES = DATA_EN.recipes;
export const FISHING_LOCATIONS = DATA_EN.fishing;
export const BOOSTS = DATA_EN.boosts;
export const NPC_DIRECTORY = DATA_EN.npcs;
export const MARKS = DATA_EN.marks;
