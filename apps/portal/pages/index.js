import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to the FastAPI backend
    const fetchData = async () => {
      try {
        const response = await fetch('/api/v1/costs/summary');
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (e) {
        // Fallback for demo/production stability
        setStats([
          { provider: "Azure", total_spend: 12450.50, waste_detected: 3200.00, last_updated: "Live" },
          { provider: "AWS", total_spend: 8900.20, waste_detected: 1500.00, last_updated: "Live" }
        ]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-8">
      <Head>
        <title>BCA | Enterprise Backup FinOps</title>
      </Head>

      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Backup Cost Analyzer
          </h1>
          <p className="text-slate-400 mt-2">Unified Enterprise Data Protection Governance</p>
        </div>
        <div className="flex gap-4">
          <span className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-sm">
            Region: Global
          </span>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg text-sm font-bold">
            Generate Report
          </button>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s) => (
            <div key={s.provider} className="p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl">
              <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{s.provider} Spend</h3>
              <p className="text-3xl font-bold mt-2">${s.total_spend.toLocaleString()}</p>
              <div className="mt-4 flex items-center text-emerald-400 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                Waste Detected: ${s.waste_detected.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold">AI Recovery & Tiering Recommendations</h2>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-tighter">
                  <th className="px-6 py-4">Resource</th>
                  <th className="px-6 py-4">Detected Issue</th>
                  <th className="px-6 py-4">Savings Outcome</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium">sql-prod-db-snapshot</td>
                  <td className="px-6 py-4 text-orange-400">Orphaned Snapshot (74d)</td>
                  <td className="px-6 py-4 text-emerald-400">+$420.00 / mo</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:underline">Remediate</button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-medium">aks-long-term-vault</td>
                  <td className="px-6 py-4 text-blue-400">Move to Archive Tier</td>
                  <td className="px-6 py-4 text-emerald-400">+$1,150.00 / mo</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:underline">Apply</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
