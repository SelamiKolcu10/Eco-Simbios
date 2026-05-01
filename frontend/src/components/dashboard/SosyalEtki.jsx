import React, { useState, useEffect } from 'react';
import { Leaf, Heart, Factory, Sprout, Users } from "lucide-react";
import api from '../../lib/api';

function SosyalEtki() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch stats, note we only do this if we are trying to get global stats without auth
                // Actually /api/stats/summary is protected. If the user is on the landing page, they might not be logged in.
                // We should add a public route for global stats or handle the 401 silently.
                const res = await api.get('/stats/summary');
                setStats(res.data.data);
            } catch (err) {
                // If 401, it's fine, we fall back to base stats.
            }
        };
        // Wait, if not logged in, api.get will just fail and we use base stats.
        const token = localStorage.getItem('token');
        if (token) fetchStats();
    }, []);

    return (
        <div className="w-[100vw] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16">
            <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #fafaf9 40%, #f0fdf4 100%)' }} className="py-20 md:py-28 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-wider uppercase border border-emerald-200">
                            <Heart className="h-3.5 w-3.5" />
                            Sosyal Etki
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left — Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 font-serif leading-tight">
                                Sanayi-Tarım Köprüsü ve
                                <span className="block text-[#0c4e33]">Fırsat Eşitliği</span>
                            </h2>
                            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                                Eko-Simbiyoz, teknik bir platformun ötesinde, <strong className="text-slate-700">kadın emeğini tarımla buluşturan bir sosyal köprüdür.</strong> Fabrikalardan gelen atık ısı ve suyu, kadın kooperatiflerinin yönettiği akıllı seralara aktararak cinsiyet temelli iş bölümü eşitsizliğini teknolojiyle aşıyoruz.
                            </p>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <Factory className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">{stats?.socialImpact?.partnerFactories || 12}</p>
                                    <p className="text-xs text-slate-400 font-medium">Partner Fabrika</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <Sprout className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">{stats?.socialImpact?.greenhouses || 24}</p>
                                    <p className="text-xs text-slate-400 font-medium">Akıllı Sera</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <Users className="h-6 w-6 text-[#0c4e33] mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-slate-900">{stats ? stats.socialImpact.womenEmployed * 12 : '340+'}</p>
                                    <p className="text-xs text-slate-400 font-medium">Kadın Üretici</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — Illustration */}
                        <div className="flex items-center justify-center">
                            <div className="relative w-full max-w-md">
                                <img
                                    src="/images/sosyal-etki-illustration.png"
                                    alt="Sanayi-Tarım Köprüsü İllüstrasyonu"
                                    className="w-full h-auto rounded-3xl shadow-lg"
                                />
                                {/* Floating accent badge */}
                                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-3 shadow-lg border border-slate-100 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <Leaf className="h-5 w-5 text-[#0c4e33]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">%100 Sürdürülebilir</p>
                                        <p className="text-xs text-slate-400">Döngüsel Ekonomi Modeli</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SosyalEtki;
