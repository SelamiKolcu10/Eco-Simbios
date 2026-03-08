import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function CarbonLedger() {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();
        const opts = {
            responsive: true,
            plugins: { legend: { display: true, labels: { color: '#6b7280', font: { size: 9 } } } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,.03)' }, ticks: { color: '#4b5563', font: { size: 9 } } },
                y: { grid: { color: 'rgba(255,255,255,.03)' }, ticks: { color: '#4b5563', font: { size: 9 } } },
            },
        };
        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                datasets: [
                    { label: 'CO₂ Saved (T)', data: [85, 102, 118, 135, 142, 150, 157], backgroundColor: 'rgba(0,220,130,.5)', borderRadius: 6 },
                    { label: 'Coal Avoided (T)', data: [170, 204, 236, 270, 284, 300, 313], backgroundColor: 'rgba(251,146,60,.5)', borderRadius: 6 },
                ],
            },
            options: opts,
        });
        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, []);

    const report = [
        { name: 'Energy Efficiency', score: 85, status: 'Passed', color: 'text-eco-400', bg: 'bg-eco-400' },
        { name: 'Carbon Emissions', score: 72, status: 'Passed', color: 'text-amber-400', bg: 'bg-amber-400' },
        { name: 'Water Management', score: 91, status: 'Excellent', color: 'text-cyan-400', bg: 'bg-cyan-400' },
        { name: 'Circular Economy', score: 68, status: 'Needs Improvement', color: 'text-red-400', bg: 'bg-red-400' },
        { name: 'Social Equity', score: 82, status: 'Passed', color: 'text-purple-400', bg: 'bg-purple-400' },
    ];

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                    <i className="fa-solid fa-shield-halved text-cyan-400 text-lg"></i>
                </div>
                <div>
                    <h3 className="text-base font-bold text-slate-800">Carbon Ledger & Climate Protection</h3>
                    <p className="text-[11px] text-slate-500">Yeşil Mutabakat Compliance Dashboard</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: 'CO₂ Eliminated', value: '156.8 T', color: 'text-eco-400' },
                    { label: 'Coal Avoided', value: '312.5 T', color: 'text-orange-400' },
                    { label: 'Thermal Prevented', value: '4.2°C', color: 'text-cyan-400' },
                    { label: 'Water Saved', value: '24.5K m³', color: 'text-blue-400' },
                ].map((item, i) => (
                    <div key={i} className="carbon-card rounded-xl p-4 text-center">
                        <p className="text-[10px] text-slate-500 uppercase mb-2">{item.label}</p>
                        <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
                    </div>
                ))}
            </div>

            <div className="carbon-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800">
                        <i className="fa-solid fa-file-contract text-eco-400 mr-2"></i>Yeşil Mutabakat Compliance Report
                    </h3>
                    <span className="text-[10px] bg-eco-500/10 text-eco-400 px-2.5 py-1 rounded-full font-bold">GDR-2026-003</span>
                </div>
                <div className="space-y-2">
                    {report.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                            <span className="text-xs text-slate-600">{item.name}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-slate-200 rounded-full">
                                    <div className={`h-full ${item.bg} rounded-full`} style={{ width: `${item.score}%` }}></div>
                                </div>
                                <span className={`text-[10px] font-bold ${item.color}`}>{item.score}% {item.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="carbon-card rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-3">
                    <i className="fa-solid fa-chart-area text-cyan-400 mr-2 text-xs"></i>Monthly Carbon Elimination
                </h3>
                <canvas ref={chartRef} height="180"></canvas>
            </div>
        </div>
    );
}
