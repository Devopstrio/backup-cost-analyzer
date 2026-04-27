import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const outfit = Outfit({ subsets: ['latin'] });

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`min-h-screen bg-[#0f172a] text-white ${inter.className}`}>
            <Head>
                <title>BCA | Enterprise Backup FinOps</title>
                <meta name="description" content="Unified Backup Cost Intelligence & Optimization" />
            </Head>

            {/* Premium Header */}
            <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-xl">B</span>
                        </div>
                        <span className={`${outfit.className} text-xl font-bold tracking-tight`}>Backup Cost Analyzer</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                        <a href="#architecture" className="hover:text-blue-400 transition-colors">Architecture</a>
                        <a href="#deployment" className="hover:text-blue-400 transition-colors">Deployment</a>
                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                            Enterprise Login
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl rounded-full" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6 translate-y-0 opacity-0 animate-fade-in-down">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            FinOps Certified Platform
                        </div>
                        <h1 className={`${outfit.className} text-6xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight`}>
                            Optimize Your <span className="bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent">Backup Economy</span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                            Eliminate orphaned snapshots, reduce retention waste, and automate multi-cloud backup spend governance for Fortune 100 enterprises.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-xl hover:shadow-white/10">
                                Book Enterprise Demo
                            </button>
                            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 text-white border border-white/10 rounded-2xl font-bold hover:bg-slate-800 transition-all">
                                View Sample Reports
                            </button>
                        </div>
                    </div>

                    {/* Feature Cards Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                        {[
                            {
                                title: 'Waste Detection',
                                desc: 'Instantly identify orphaned snapshots and over-retained backups across Azure, AWS, and Hybrid.',
                                icon: '♻️'
                            },
                            {
                                title: 'AI Forecasting',
                                desc: 'Predict growth trends and seasonal spikes using our proprietary storage forecasting engine.',
                                icon: '📈'
                            },
                            {
                                title: 'Auto-Remediation',
                                desc: 'Automate tiering from Hot to Archive based on workload-specific compliance rules.',
                                icon: '🤖'
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/50 transition-all group">
                                <div className="text-4xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
                    © 2026 Devopstrio Backup Cost Analyzer. Enterprise Grade Resilience & FinOps.
                </div>
            </footer>

            <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
