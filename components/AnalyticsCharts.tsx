import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';

// --- BREAK EVEN CHART ---
interface BreakEvenProps {
    silverPerHour: number;
}

export function BreakEvenChart({ silverPerHour }: BreakEvenProps) {
    // Assumptions:
    // T3 Charter Cost = 0.05 ETH
    // 1M Silver = 1 ETH (Approximate for calculation, or we can use the user's input context)
    // Actually, let's use a fixed rate for the chart to show the concept.
    // Let's assume 1000 Silver = 0.001 ETH -> 1 Silver = 0.000001 ETH
    // So 1M Silver = 1 ETH.

    // S2 Exchange Rate: ~12.3 ETH for 240M Silver => ~0.05125 ETH per 1M Silver
    // 1 Silver = 0.00000005125 ETH
    const CHARTER_COST_ETH = 0.05;
    const ETH_PER_SILVER = 0.00000005125;
    const hourlyRevenueEth = silverPerHour * ETH_PER_SILVER;

    const data = [];
    for (let i = 0; i <= 50; i += 5) {
        data.push({
            name: `${i}h`,
            Cost: CHARTER_COST_ETH,
            Revenue: hourlyRevenueEth * i
        });
    }

    return (
        <div className="h-72 w-full bg-black/40 border border-gray-800 rounded-lg p-4 relative group hover:border-gray-700 transition-colors">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-gold rounded-full"></span>
                Break-Even Timeline
            </h3>
            {silverPerHour <= 0 && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-[1px] rounded-lg">
                    <span className="text-xs text-gray-500 font-mono bg-black/80 px-3 py-1 rounded border border-gray-800">
                        Enter Silver & Time to Calculate
                    </span>
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#666"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.toFixed(2)}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}
                        labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                        formatter={(value: number) => value.toFixed(4)}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconSize={8}
                        wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                    />
                    <Line type="monotone" dataKey="Cost" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Revenue" stroke="#22c55e" strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

// --- TAX PIE CHART ---
interface TaxPieProps {
    silverAmount: number;
    orbCostEth?: number; // Cost in ETH
}

export function TaxPieChart({ silverAmount, orbCostEth = 0 }: TaxPieProps) {
    const ETH_PER_SILVER = 0.00000005125;
    const grossValueEth = silverAmount * ETH_PER_SILVER;

    const paymasterTaxEth = grossValueEth * 0.13;
    const devTaxEth = grossValueEth * 0.02;

    let profitEth = grossValueEth - paymasterTaxEth - devTaxEth - orbCostEth;
    if (profitEth < 0) profitEth = 0;

    const data = [
        { name: 'Paymaster (13%)', value: paymasterTaxEth, color: '#ef4444' },
        { name: 'Dev Tax (2%)', value: devTaxEth, color: '#f97316' },
        { name: 'Orb Cost', value: orbCostEth, color: '#3b82f6' },
        { name: 'Net Profit', value: profitEth, color: '#22c55e' },
    ];

    const hasData = silverAmount > 0;
    const displayData = hasData ? data : [{ name: 'No Data', value: 1, color: '#222' }];

    return (
        <div className="h-72 w-full bg-black/40 border border-gray-800 rounded-lg p-4 group hover:border-gray-700 transition-colors">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-gold rounded-full"></span>
                The Tax Man
            </h3>
            <div className="flex items-center justify-center h-full pb-6 relative">
                {!hasData && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <span className="text-xs text-gray-600 font-mono">Enter Silver Looted</span>
                    </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={displayData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={hasData ? 4 : 0}
                            dataKey="value"
                            stroke="none"
                        >
                            {displayData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        {hasData && (
                            <>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}
                                    formatter={(value: number) => `${value.toFixed(4)} ETH`}
                                />
                                <Legend verticalAlign="bottom" height={36} iconSize={8} wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                            </>
                        )}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// --- ENERGY XP CHART ---
export function EnergyXPChart() {
    const data = [
        { name: '1M', multiplier: 1.1 },
        { name: '5M', multiplier: 1.2 },
        { name: '10M', multiplier: 1.35 },
        { name: '50M', multiplier: 1.5 },
    ];

    return (
        <div className="h-72 w-full bg-black/40 border border-gray-800 rounded-lg p-4 group hover:border-gray-700 transition-colors">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-neon-gold rounded-full"></span>
                XP Multiplier
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#666"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={10}
                        domain={[1, 1.6]}
                        hide
                    />
                    <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.95)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 500 }}
                        labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                        formatter={(value: number) => [`${value}x`, 'Multiplier']}
                    />
                    <Bar dataKey="multiplier" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? '#a855f7' : '#3b82f6'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
