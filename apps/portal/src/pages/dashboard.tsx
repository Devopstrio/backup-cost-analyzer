import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalSpend: 145820.00,
        wasteDetected: 32450.00,
        forecastSavings: 12800.00,
        compliantAssets: 94.2
    });

    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="min-h-screen bg-[#020617] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a]/50 border-r border-white/5 p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-xl">B</div>
                    <span className="font-bold text-lg">BCA Global</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {['Overview', 'Assets', 'Waste', 'Forecasts', 'Reports', 'Settings'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeTab === item ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">Current Org</p>
                    <p className="text-sm font-semibold">Fortune 100 Enterprise</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className={`${outfit.className} text-4xl font-extrabold mb-2 tracking-tight`}>Executive FinOps Command</h1>
                        <p className="text-slate-400 italic">"Consolidating 14 cloud backup regions into a single pane of glass."</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-5 py-2 bg-slate-800 rounded-lg text-sm font-bold border border-white/10 hover:bg-slate-700 transition-all">Download PDF Report</button>
                        <button className="px-5 py-2 bg-blue-600 rounded-lg text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all">Optimization Scan</button>
                    </div>
                </header>

                {/* Scorecards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard title="Total Backup Spend" value={`$${stats.totalSpend.toLocaleString()}`} change="+4.2%" trend="up" color="blue" />
                    <StatCard title="Detected Waste" value={`$${stats.wasteDetected.toLocaleString()}`} change="-12%" trend="down" color="red" />
                    <StatCard title="Monthly Forecast" value={`$${stats.forecastSavings.toLocaleString()}`} change="+2.1%" trend="up" color="emerald" />
                    <StatCard title="Policy Compliance" value={`${stats.compliantAssets}%`} change="+0.5%" trend="up" color="purple" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Multi-Cloud Spend Chart Area */}
                    <div className="lg:col-span-2 bg-[#0f172a]/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold">Consolidated Spend Trend</h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">AZURE</span>
                                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">AWS</span>
                                <span className="px-2 py-1 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">GCP</span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {[40, 65, 45, 90, 65, 75, 55, 80, 70, 85, 95, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t-md opacity-80 hover:opacity-100 transition-all" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>

                    {/* Actionable Insights */}
                    <div className="bg-[#0f172a]/50 border border-white/5 rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6">Critical Savings</h3>
                        <div className="space-y-4">
                            <ActionItem label="Orphaned Snapshots (East US)" savings="$4,200/mo" danger />
                            <ActionItem label="Long Term Retention Waste" savings="$1,250/mo" warning />
                            <ActionItem label="Duplicate Vault Protection" savings="$890/mo" warning />
                            <ActionItem label="Move SQL to Archive Tier" savings="$6,700/mo" success />
                        </div>
                        <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">View All 42 Opportunities</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ title, value, change, trend, color }: any) => (
    <div className="bg-[#0f172a]/50 border border-white/5 rounded-3xl p-6 hover:border-white/20 transition-all group">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{title}</p>
        <div className="text-3xl font-extrabold mb-4">{value}</div>
        <div className={`text-xs font-bold flex items-center gap-1 ${trend === 'up' ? 'text-blue-400' : 'text-emerald-400'}`}>
            <span>{trend === 'up' ? '↗' : '↘'}</span>
            {change} <span className="text-slate-500 font-normal ml-1">vs last month</span>
        </div>
    </div>
);

const ActionItem = ({ label, savings, danger, warning, success }: any) => (
    <div className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
        <div>
            <p className="text-sm font-bold">{label}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Est. Monthly Savings</p>
        </div>
        <div className={`font-mono text-sm font-bold ${danger ? 'text-red-400' : warning ? 'text-orange-400' : 'text-emerald-400'}`}>
            {savings}
        </div>
    </div>
);

export default Dashboard;
