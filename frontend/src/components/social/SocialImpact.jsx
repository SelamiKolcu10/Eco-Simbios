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

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="carbon-card rounded-xl p-5 text-center flex flex-col justify-center">
                    <i className="fa-solid fa-user-graduate text-3xl text-purple-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">49</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Student Internships</p>
                    <p className="text-[9px] text-gray-600 mt-2">Per ₺50,000 savings → 1 position</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center flex flex-col justify-center">
                    <i className="fa-solid fa-person-dress text-3xl text-pink-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">29</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Women Employed</p>
                    <p className="text-[9px] text-gray-600 mt-2">60% women employment ratio</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center flex flex-col justify-center">
                    <i className="fa-solid fa-people-group text-3xl text-eco-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">8</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Communities Served</p>
                    <p className="text-[9px] text-gray-600 mt-2">Across Marmara & Aegean regions</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center flex flex-col justify-center border-t-2 border-eco-400/30">
                    <i className="fa-solid fa-book-open text-3xl text-eco-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">120</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">Funded Scholarships</p>
                    <p className="text-[9px] text-gray-600 mt-2">Financed by Carbon Savings</p>
                </div>
                <div className="carbon-card rounded-xl p-5 text-center flex flex-col justify-center border-t-2 border-purple-400/30">
                    <i className="fa-solid fa-university text-3xl text-purple-400 mb-3"></i>
                    <p className="text-3xl font-black text-slate-800">15</p>
                    <p className="text-[10px] text-slate-500 uppercase mt-1">University Clubs Supported</p>
                    <p className="text-[9px] text-gray-600 mt-2">R&D and Event Grants</p>
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

            {/* Carbon Credit to Education Fund Funnel Panel */}
            <div className="carbon-card rounded-xl p-6 bg-white shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-wider text-center md:text-left">Carbon Credit to Education Fund</h3>
                
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-6 md:gap-2 lg:gap-6">
                    {/* Left Step */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center mb-3 shadow-sm bg-white">
                            <i className="fa-solid fa-cloud text-3xl bg-clip-text text-transparent bg-gradient-to-r from-eco-500 to-eco-300"></i>
                        </div>
                        <p className="text-sm font-extrabold text-slate-800">5,000 Tons</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">CO₂ Saved</p>
                    </div>

                    {/* Arrow 1 */}
                    <div className="hidden md:flex items-center justify-center w-12 lg:w-20">
                        <div className="w-full h-0.5 bg-gradient-to-r from-eco-300 to-purple-300 relative">
                            <i className="fa-solid fa-chevron-right absolute right-0 top-1/2 -translate-y-1/2 text-purple-400 text-[10px] translate-x-1"></i>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <i className="fa-solid fa-arrow-down text-purple-300"></i>
                    </div>

                    {/* Middle Step */}
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center mb-3 shadow-sm bg-white">
                            <i className="fa-solid fa-wallet text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-eco-400"></i>
                        </div>
                        <p className="text-sm font-extrabold text-slate-800">₺500,000</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Carbon Credit Revenue</p>
                    </div>

                    {/* Splitting Arrows */}
                    <div className="hidden md:flex items-center justify-center w-16 lg:w-24 relative h-24">
                        <svg width="100%" height="100%" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0 45 L20 45 Q30 45 30 30 L30 20 Q30 15 40 15 L55 15" stroke="url(#flowGrad2)" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
                            <path d="M0 45 L20 45 Q30 45 30 60 L30 70 Q30 75 40 75 L55 75" stroke="url(#flowGrad2)" strokeWidth="2" fill="none" strokeDasharray="4 2"/>
                            <polygon points="53,11 60,15 53,19" fill="#4ade80" />
                            <polygon points="53,71 60,75 53,79" fill="#4ade80" />
                            <defs>
                                <linearGradient id="flowGrad2" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#4ade80" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="md:hidden">
                        <i className="fa-solid fa-code-branch rotate-180 text-purple-300"></i>
                    </div>

                    {/* Right Step (Split) */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-graduation-cap text-lg bg-clip-text text-transparent bg-gradient-to-r from-eco-400 to-eco-500"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-[13px] font-extrabold text-slate-800">60% Scholarship Fund</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                                <i className="fa-solid fa-users text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-500"></i>
                            </div>
                            <div className="text-left">
                                <p className="text-[13px] font-extrabold text-slate-800">40% Campus Community Grants</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carbon-card rounded-xl p-5 flex items-center gap-4 border-l-2 border-eco-500/40 mt-5">
                <i className="fa-solid fa-ribbon text-eco-400 text-3xl"></i>
                <div>
                    <h4 className="text-sm font-bold text-eco-400">✅ 12 Goodwill Agreements Signed</h4>
                    <p className="text-[11px] text-slate-500">All participating greenhouses commit to local hiring and fair wages</p>
                </div>
            </div>
        </div>
    );
}
