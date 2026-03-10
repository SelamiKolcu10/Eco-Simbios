export default function SocialImpact() {
    return (
        <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <i className="fa-solid fa-hand-holding-heart text-purple-400 text-lg"></i>
                </div>
                <div>
                    <h3 className="text-base font-bold text-slate-800">Social Impact Dashboard</h3>
                    <p className="text-[11px] text-slate-500">Yeşil İstihdam Kotası & Community Development</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="carbon-card rounded-xl p-5 text-center">
                    <i className="fa-solid fa-user-graduate text-3xl text-purple-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">49</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Student Internships</p>
                    <p className="text-[9px] text-gray-600 mt-2">Per ₺50,000 savings → 1 position</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center">
                    <i className="fa-solid fa-person-dress text-3xl text-pink-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">29</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Women Employed</p>
                    <p className="text-[9px] text-gray-600 mt-2">60% women employment ratio</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center">
                    <i className="fa-solid fa-people-group text-3xl text-eco-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">8</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Communities Served</p>
                    <p className="text-[9px] text-gray-600 mt-2">Across Marmara & Aegean regions</p>
                </div>
            </div>

            <div className="carbon-card rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4">Green Employment Allocation</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Bandırma Greenhouse', pct: 85, jobs: 12 },
                        { name: 'Kocaeli Agri-Hub', pct: 72, jobs: 9 },
                        { name: 'Antalya Bio-Farm', pct: 65, jobs: 8 },
                        { name: 'İzmir Recycling', pct: 58, jobs: 7 },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span className="text-[11px] text-slate-500 w-40">{item.name}</span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-eco-400 rounded-full" style={{ width: `${item.pct}%` }}></div>
                            </div>
                            <span className="text-[10px] text-eco-400 font-bold">{item.jobs} jobs</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="carbon-card rounded-xl p-5 flex items-center gap-4 border-l-2 border-eco-500/40">
                <i className="fa-solid fa-ribbon text-eco-400 text-3xl"></i>
                <div>
                    <h4 className="text-sm font-bold text-eco-400">✅ 12 Goodwill Agreements Signed</h4>
                    <p className="text-[11px] text-slate-500">All participating greenhouses commit to local hiring and fair wages</p>
                </div>
            </div>
        </div>
    );
}
