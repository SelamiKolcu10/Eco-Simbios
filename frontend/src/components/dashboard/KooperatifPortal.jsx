import React, { useState } from 'react';
import {
    X,
    MapPin,
    Users,
    Leaf,
    Thermometer,
    ShoppingCart,
    Sprout,
    Factory,
    Droplet,
    Wifi,
    TrendingUp,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

/* ───────────────── kooperatif verileri ───────────────── */
const COOPERATIVES = [
    // ── Marmara ──────────────────────────────────────────────
    {
        id: 1, name: 'Bursa Kadın Tarım Kooperatifi', city: 'Bursa', region: 'Marmara',
        lat: 40.18, lon: 29.06, source: 'Bursa Tekstil OSB', women: 25,
        carbon: 620, temp: 26, humidity: 68, soilMoisture: 58, iot: 'Aktif', efficiency: 91, selected: true,
    },
    {
        id: 2, name: 'Yalova Kadın Sera Kooperatifi', city: 'Yalova', region: 'Marmara',
        lat: 40.63, lon: 29.20, source: 'Yalova Kâğıt Fabrikası', women: 18,
        carbon: 380, temp: 24, humidity: 72, soilMoisture: 60, iot: 'Aktif', efficiency: 88, selected: false,
    },
    {
        id: 3, name: 'Sakarya Ekolojik Sera Kooperatifi', city: 'Sakarya', region: 'Marmara',
        lat: 40.72, lon: 30.35, source: 'Sakarya Demir-Çelik', women: 22,
        carbon: 490, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, selected: false,
    },
    {
        id: 4, name: 'Kocaeli Kadın Üretim Kooperatifi', city: 'Kocaeli', region: 'Marmara',
        lat: 40.82, lon: 29.62, source: 'Kocaeli Otomotiv OSB', women: 30,
        carbon: 710, temp: 27, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 93, selected: false,
    },
    {
        id: 5, name: 'Balıkesir Organik Kadın Kooperatifi', city: 'Balıkesir', region: 'Marmara',
        lat: 39.70, lon: 27.95, source: 'Balıkesir Gıda Sanayi', women: 16,
        carbon: 310, temp: 23, humidity: 74, soilMoisture: 64, iot: 'Aktif', efficiency: 86, selected: false,
    },
    // ── Ege ──────────────────────────────────────────────────
    {
        id: 6, name: 'Denizli Pamuk Kadın Kooperatifi', city: 'Denizli', region: 'Ege',
        lat: 37.72, lon: 29.15, source: 'Denizli Tekstil Fabrikası', women: 22,
        carbon: 480, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, selected: false,
    },
    {
        id: 7, name: 'Aydın Zeytin Kadın Kooperatifi', city: 'Aydın', region: 'Ege',
        lat: 37.80, lon: 27.70, source: 'Aydın Gıda İşleme', women: 30,
        carbon: 420, temp: 27, humidity: 66, soilMoisture: 58, iot: 'Aktif', efficiency: 92, selected: false,
    },
    {
        id: 8, name: 'İzmir Kadın Sebze Kooperatifi', city: 'İzmir', region: 'Ege',
        lat: 38.48, lon: 27.30, source: 'İzmir Tekstil Atölyesi', women: 28,
        carbon: 520, temp: 26, humidity: 68, soilMoisture: 60, iot: 'Aktif', efficiency: 90, selected: false,
    },
    {
        id: 9, name: 'Manisa Üzüm Kadın Kooperatifi', city: 'Manisa', region: 'Ege',
        lat: 38.58, lon: 27.50, source: 'Manisa Elektrik-Elektronik', women: 19,
        carbon: 350, temp: 24, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 87, selected: false,
    },
    {
        id: 10, name: 'Muğla Doğal Ürün Kooperatifi', city: 'Muğla', region: 'Ege',
        lat: 37.18, lon: 28.42, source: 'Muğla Mermer İşleme', women: 15,
        carbon: 270, temp: 28, humidity: 63, soilMoisture: 55, iot: 'Aktif', efficiency: 85, selected: false,
    },
    // ── İç Anadolu ───────────────────────────────────────────
    {
        id: 11, name: 'Eskişehir Kadın Sera Kooperatifi', city: 'Eskişehir', region: 'İç Anadolu',
        lat: 39.77, lon: 30.52, source: 'Eskişehir Çimento Fabrikası', women: 32,
        carbon: 840, temp: 28, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 94, selected: false,
    },
    {
        id: 12, name: 'Kayseri Yeşil Vadi Kooperatifi', city: 'Kayseri', region: 'İç Anadolu',
        lat: 38.73, lon: 35.48, source: 'Kayseri Demir-Çelik A.Ş.', women: 18,
        carbon: 510, temp: 24, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 88, selected: false,
    },
    {
        id: 13, name: 'Konya Kadın Toprak Kooperatifi', city: 'Konya', region: 'İç Anadolu',
        lat: 37.92, lon: 32.42, source: 'Konya Gıda Entegre', women: 24,
        carbon: 530, temp: 25, humidity: 67, soilMoisture: 59, iot: 'Aktif', efficiency: 90, selected: false,
    },
    {
        id: 14, name: 'Ankara Kadın Sebze Kooperatifi', city: 'Ankara', region: 'İç Anadolu',
        lat: 39.88, lon: 32.72, source: 'Ankara Demir-Çelik', women: 20,
        carbon: 410, temp: 23, humidity: 70, soilMoisture: 60, iot: 'Aktif', efficiency: 87, selected: false,
    },
    {
        id: 15, name: 'Aksaray Organik Kadın Kooperatifi', city: 'Aksaray', region: 'İç Anadolu',
        lat: 38.40, lon: 34.08, source: 'Aksaray Otomotiv', women: 14,
        carbon: 295, temp: 26, humidity: 63, soilMoisture: 54, iot: 'Aktif', efficiency: 86, selected: false,
    },
    // ── Akdeniz ──────────────────────────────────────────────
    {
        id: 16, name: 'Gaziantep Bereket Kooperatifi', city: 'Gaziantep', region: 'Akdeniz',
        lat: 37.06, lon: 37.38, source: 'Gaziantep Cam Sanayi', women: 40,
        carbon: 960, temp: 30, humidity: 60, soilMoisture: 70, iot: 'Aktif', efficiency: 96, selected: false,
    },
    {
        id: 17, name: 'Antalya Kadın Sera Kooperatifi', city: 'Antalya', region: 'Akdeniz',
        lat: 36.88, lon: 30.65, source: 'Antalya Gıda İşleme', women: 28,
        carbon: 610, temp: 29, humidity: 64, soilMoisture: 67, iot: 'Aktif', efficiency: 93, selected: false,
    },
    {
        id: 18, name: 'Mersin Kadın Üretim Kooperatifi', city: 'Mersin', region: 'Akdeniz',
        lat: 36.78, lon: 34.55, source: 'Mersin Petrokimya', women: 22,
        carbon: 490, temp: 27, humidity: 66, soilMoisture: 62, iot: 'Aktif', efficiency: 89, selected: false,
    },
    {
        id: 19, name: 'Adana Tarım Kadın Kooperatifi', city: 'Adana', region: 'Akdeniz',
        lat: 37.03, lon: 35.25, source: 'Adana Tekstil OSB', women: 26,
        carbon: 520, temp: 28, humidity: 65, soilMoisture: 60, iot: 'Aktif', efficiency: 91, selected: false,
    },
    {
        id: 20, name: 'Kahramanmaraş Organik Kooperatifi', city: 'Kahramanmaraş', region: 'Akdeniz',
        lat: 37.60, lon: 36.98, source: 'Kahramanmaraş Tekstil', women: 17,
        carbon: 345, temp: 26, humidity: 68, soilMoisture: 57, iot: 'Aktif', efficiency: 87, selected: false,
    },
    // ── Karadeniz ─────────────────────────────────────────────
    {
        id: 21, name: 'Samsun Kadın Tarım Kooperatifi', city: 'Samsun', region: 'Karadeniz',
        lat: 41.22, lon: 36.10, source: 'Samsun Demir-Çelik', women: 20,
        carbon: 470, temp: 22, humidity: 75, soilMoisture: 65, iot: 'Aktif', efficiency: 88, selected: false,
    },
    {
        id: 22, name: 'Trabzon Kadın Çay Kooperatifi', city: 'Trabzon', region: 'Karadeniz',
        lat: 40.98, lon: 39.80, source: 'Trabzon Fındık İşleme', women: 15,
        carbon: 310, temp: 20, humidity: 80, soilMoisture: 70, iot: 'Aktif', efficiency: 85, selected: false,
    },
    {
        id: 23, name: 'Kastamonu Orman Kooperatifi', city: 'Kastamonu', region: 'Karadeniz',
        lat: 41.42, lon: 33.85, source: 'Kastamonu Ahşap Sanayi', women: 18,
        carbon: 370, temp: 21, humidity: 76, soilMoisture: 66, iot: 'Aktif', efficiency: 87, selected: false,
    },
    {
        id: 24, name: 'Ordu Fındık Kadın Kooperatifi', city: 'Ordu', region: 'Karadeniz',
        lat: 41.02, lon: 37.75, source: 'Ordu Gıda İşleme', women: 23,
        carbon: 420, temp: 21, humidity: 78, soilMoisture: 68, iot: 'Aktif', efficiency: 89, selected: false,
    },
    {
        id: 25, name: 'Zonguldak Kadın Üretim Kooperatifi', city: 'Zonguldak', region: 'Karadeniz',
        lat: 41.48, lon: 31.85, source: 'Zonguldak Maden ve Enerji', women: 12,
        carbon: 265, temp: 20, humidity: 74, soilMoisture: 63, iot: 'Aktif', efficiency: 84, selected: false,
    },
];

/* ─────────── Gelişmiş Harita Bileşeni (Görsel + SVG Hybrid) ─────────── */
function TurkeyMap({ selectedId, onSelect }) {
    const selected = COOPERATIVES.find((c) => c.id === selectedId);

    // Coordinate mapping roughly to SVG scale 800x400
    const cityPos = {
        // Marmara
        Bursa:      { x: 220, y: 140 },
        Yalova:     { x: 245, y: 150 },
        Sakarya:    { x: 295, y: 135 },
        Kocaeli:    { x: 270, y: 120 },
        Balıkesir:  { x: 160, y: 175 },
        // Ege
        Denizli:    { x: 200, y: 240 },
        Aydın:      { x: 175, y: 235 },
        İzmir:      { x: 155, y: 200 },
        Manisa:     { x: 175, y: 195 },
        Muğla:      { x: 185, y: 265 },
        // İç Anadolu
        Eskişehir:  { x: 280, y: 170 },
        Kayseri:    { x: 420, y: 220 },
        Konya:      { x: 335, y: 245 },
        Ankara:     { x: 345, y: 175 },
        Aksaray:    { x: 370, y: 230 },
        // Akdeniz
        Gaziantep:  { x: 500, y: 280 },
        Antalya:    { x: 270, y: 285 },
        Mersin:     { x: 420, y: 280 },
        Adana:      { x: 450, y: 270 },
        Kahramanmaraş: { x: 490, y: 265 },
        // Karadeniz
        Samsun:     { x: 405, y: 110 },
        Trabzon:    { x: 500, y: 100 },
        Kastamonu:  { x: 360, y: 120 },
        Ordu:       { x: 460, y: 108 },
        Zonguldak:  { x: 290, y: 110 },
    };
    const factoryPos = {
        // Marmara
        Bursa:      { x: 190, y: 120 },
        Yalova:     { x: 230, y: 132 },
        Sakarya:    { x: 310, y: 118 },
        Kocaeli:    { x: 258, y: 105 },
        Balıkesir:  { x: 145, y: 158 },
        // Ege
        Denizli:    { x: 215, y: 225 },
        Aydın:      { x: 160, y: 220 },
        İzmir:      { x: 140, y: 185 },
        Manisa:     { x: 162, y: 180 },
        Muğla:      { x: 170, y: 250 },
        // İç Anadolu
        Eskişehir:  { x: 330, y: 150 },
        Kayseri:    { x: 450, y: 200 },
        Konya:      { x: 350, y: 228 },
        Ankara:     { x: 360, y: 158 },
        Aksaray:    { x: 385, y: 215 },
        // Akdeniz
        Gaziantep:  { x: 520, y: 262 },
        Antalya:    { x: 255, y: 268 },
        Mersin:     { x: 435, y: 262 },
        Adana:      { x: 465, y: 255 },
        Kahramanmaraş: { x: 505, y: 248 },
        // Karadeniz
        Samsun:     { x: 420, y: 95 },
        Trabzon:    { x: 515, y: 88 },
        Kastamonu:  { x: 375, y: 105 },
        Ordu:       { x: 475, y: 93 },
        Zonguldak:  { x: 305, y: 96 },
    };

    // Ambient nodes representing other systems
    const ambientNodes = [
        { x: 180, y: 100, t: 's' }, { x: 280, y: 90,  t: 'f' }, { x: 390, y: 100, t: 's' },
        { x: 500, y: 110, t: 'f' }, { x: 590, y: 140, t: 's' }, { x: 670, y: 180, t: 'f' },
        { x: 580, y: 240, t: 's' }, { x: 350, y: 290, t: 'f' }, { x: 270, y: 310, t: 's' },
        { x: 130, y: 270, t: 'f' }, { x: 350, y: 160, t: 's' }, { x: 520, y: 140, t: 'f' },
        { x: 250, y: 200, t: 'f' }, { x: 440, y: 260, t: 's' },
    ];

    const selC = selected ? cityPos[selected.city] : null;
    const selF = selected ? factoryPos[selected.city] : null;

    return (
        <div className="relative w-full h-[500px] bg-[#0a1f14] rounded-2xl overflow-hidden mt-6 mb-8 group">
            {/* Background Map Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                    src="/images/harita.png"
                    alt="Türkiye Haritası"
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                />
            </div>

            {/* SVG Overlay for Interactive Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 800 400" className="w-[85%] h-[85%] overflow-visible">
                    <defs>
                        <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="cyberLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                        </linearGradient>
                        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5" />
                        </filter>
                    </defs>

                    {/* Ambient light nodes */}
                    {ambientNodes.map((n, i) => (
                        <circle
                            key={`amb-${i}`}
                            cx={n.x}
                            cy={n.y}
                            r="3"
                            fill={n.t === 's' ? '#10b981' : '#f97316'}
                            opacity="0.3"
                            filter="url(#softGlow)"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}
                        />
                    ))}

                    {/* Simbiyoz Hatları (Pasif) */}
                    {COOPERATIVES.map((c) => {
                        if (c.id === selectedId) return null;
                        const cp = cityPos[c.city];
                        const fp = factoryPos[c.city];
                        if (!cp || !fp) return null;
                        return (
                            <line
                                key={`path-${c.id}`}
                                x1={cp.x}
                                y1={cp.y}
                                x2={fp.x}
                                y2={fp.y}
                                stroke="rgba(255,255,255,0.15)"
                                strokeWidth="1.5"
                                strokeDasharray="4,4"
                            />
                        );
                    })}

                    {/* Aktif Simbiyoz Hattı (Cyan) */}
                    {selC && selF && (
                        <g>
                            {/* Glow arka planı */}
                            <line
                                x1={selF.x}
                                y1={selF.y}
                                x2={selC.x}
                                y2={selC.y}
                                stroke="#06b6d4"
                                strokeWidth="6"
                                opacity="0.2"
                                filter="url(#cyanGlow)"
                            />
                            {/* Ana bağlantı çizgisi */}
                            <line
                                x1={selF.x}
                                y1={selF.y}
                                x2={selC.x}
                                y2={selC.y}
                                stroke="url(#cyberLine)"
                                strokeWidth="2.5"
                                strokeDasharray="10,6"
                                strokeLinecap="round"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-32"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                />
                            </line>
                            {/* Akan Enerji Partikülleri */}
                            <circle r="4" fill="#67e8f9" filter="url(#softGlow)">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path={`M${selF.x},${selF.y} L${selC.x},${selC.y}`}
                                />
                            </circle>
                            <circle r="2" fill="white">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    begin="1s"
                                    path={`M${selF.x},${selF.y} L${selC.x},${selC.y}`}
                                />
                            </circle>
                        </g>
                    )}

                    {/* Fabrikalar (Kaynak) */}
                    {COOPERATIVES.map((c) => {
                        const fp = factoryPos[c.city];
                        if (!fp) return null;
                        const isActive = c.id === selectedId;
                        return (
                            <g
                                key={`fac-${c.id}`}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(c.id);
                                }}
                            >
                                <rect
                                    x={fp.x - 10}
                                    y={fp.y - 10}
                                    width={20}
                                    height={20}
                                    rx={4}
                                    fill={isActive ? '#ea580c' : '#475569'}
                                    stroke={isActive ? '#fdba74' : '#94a3b8'}
                                    strokeWidth="1.5"
                                    filter={isActive ? 'url(#softGlow)' : undefined}
                                />
                                <text
                                    x={fp.x}
                                    y={fp.y + 4}
                                    textAnchor="middle"
                                    className="text-[10px]"
                                    fill="white"
                                >
                                    🏭
                                </text>
                            </g>
                        );
                    })}

                    {/* Seralar (Alıcı) */}
                    {COOPERATIVES.map((c) => {
                        const p = cityPos[c.city];
                        if (!p) return null;
                        const isSelected = c.id === selectedId;

                        return (
                            <g
                                key={`city-${c.id}`}
                                className="cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(c.id);
                                }}
                            >
                                {/* Active Pulse Rings */}
                                {isSelected && (
                                    <>
                                        <circle
                                            cx={p.x}
                                            cy={p.y}
                                            r="24"
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="2"
                                            opacity="0.4"
                                            className="animate-ping"
                                        />
                                        <circle
                                            cx={p.x}
                                            cy={p.y}
                                            r="18"
                                            fill="rgba(16, 185, 129, 0.2)"
                                            stroke="#34d399"
                                            strokeWidth="1"
                                        />
                                    </>
                                )}

                                {/* Main Node Background */}
                                <circle
                                    cx={p.x}
                                    cy={p.y}
                                    r={isSelected ? 12 : 8}
                                    fill={isSelected ? '#10b981' : '#059669'}
                                    stroke={isSelected ? '#fff' : '#a7f3d0'}
                                    strokeWidth={isSelected ? 2.5 : 1.5}
                                    filter={isSelected ? 'url(#cyanGlow)' : undefined}
                                />
                                
                                <text
                                    x={p.x}
                                    y={p.y + (isSelected ? 4 : 3)}
                                    textAnchor="middle"
                                    fill="white"
                                    className={isSelected ? 'text-[12px]' : 'text-[8px]'}
                                >
                                    🌱
                                </text>

                                {/* City Label */}
                                <text
                                    x={p.x}
                                    y={p.y + (isSelected ? 28 : 20)}
                                    textAnchor="middle"
                                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                                    className={isSelected ? 'text-[12px] font-bold' : 'text-[10px]'}
                                    filter="url(#dropShadow)"
                                >
                                    {c.city}
                                </text>
                            </g>
                        );
                    })}

                    {/* Tooltip for Active Connection */}
                    {selected && selC && selF && (
                        <g filter="url(#dropShadow)">
                            {/* Cooperative Tooltip */}
                            <foreignObject x={selC.x - 90} y={selC.y - 70} width="180" height="50">
                                <div className="bg-[#022c22]/90 backdrop-blur-md rounded-lg border border-cyan-500/50 p-2 text-center shadow-lg shadow-cyan-900/40">
                                    <p className="text-[10px] text-emerald-400 font-bold uppercase mb-0.5">
                                        {selected.name.toUpperCase()}
                                    </p>
                                    <p className="text-[9px] text-slate-300">
                                        Aktif Simbiyoz Bağlantısı: %{selected.efficiency} Verim
                                    </p>
                                    <p className="text-[8px] text-cyan-400 mt-0.5">
                                        Anadolu Kadın Kooperatifi
                                    </p>
                                </div>
                            </foreignObject>

                            {/* Source Tooltip */}
                            <foreignObject x={selF.x - 70} y={selF.y + 15} width="140" height="40">
                                <div className="bg-slate-900/90 backdrop-blur-md rounded-md border border-orange-500/40 p-1.5 text-center shadow-lg">
                                    <p className="text-[9px] text-orange-400 font-bold mb-0.5">
                                        Atık Isı Kaynağı:
                                    </p>
                                    <p className="text-[10px] text-white">
                                        {selected.source}
                                    </p>
                                </div>
                            </foreignObject>
                        </g>
                    )}
                </svg>
            </div>

            {/* In-Map Panels */}
            
            {/* Alt Sol: Ömer Yazıcı Profil Kartı & Basit Durum */}
            <div className="absolute bottom-4 left-4 flex gap-3 pointer-events-none">
                {/* Teknik Durum (Sol alt transparan panel) */}
                <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 text-white pointer-events-auto shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Wifi className="h-4 w-4 text-emerald-400" />
                        <span className="text-[10px] font-bold tracking-wider text-slate-300">TEKNİK DURUM</span>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center gap-6">
                            <span className="text-xs text-emerald-400">IoT Bağlantısı:</span>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-semibold">Optimal</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-6">
                            <span className="text-xs text-teal-400">Toprak:</span>
                            <span className="text-xs font-semibold">Optimal</span>
                        </div>
                        <div className="flex justify-between items-center gap-6">
                            <span className="text-xs text-cyan-400">Durumu:</span>
                            <span className="text-xs font-semibold">Aktif</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alt Sağ: Network Health */}
            <div className="absolute bottom-4 right-4 bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-xl p-3 text-white pointer-events-auto">
                <div className="text-[10px] font-bold text-slate-400 tracking-widest mb-1">NETWORK SAĞLIĞI</div>
                <div className="flex gap-1 items-end h-6 mt-2">
                    {[3, 5, 8, 4, 6, 9, 7].map((h, i) => (
                        <div key={i} className="w-1.5 bg-cyan-500 rounded-t-sm" style={{ height: `${h * 10}%` }} />
                    ))}
                </div>
                <div className="text-xs text-cyan-400 mt-1.5 font-bold">%94 Uptime</div>
            </div>
        </div>
    );
}

/* ──────────────── Mini Bar Chart ──────────────── */
function MiniChart({ value, max = 100, color = '#10b981' }) {
    const bars = [65, 78, 55, 90, value, 82, 70];
    return (
        <div className="flex items-end gap-[3px] h-12">
            {bars.map((h, i) => (
                <div
                    key={i}
                    className="w-2 rounded-sm transition-all duration-500"
                    style={{
                        height: `${(h / max) * 100}%`,
                        backgroundColor: i === 4 ? color : `${color}30`,
                    }}
                />
            ))}
        </div>
    );
}

const mapPanelStyle = {
    background: 'linear-gradient(145deg, #0e2b1d 0%, #08140c 100%)'
};

/* ──────────────── Ana Portal Bileşeni ──────────────── */
export default function KooperatifPortal({ onClose, onNavigate }) {
    const [selectedId, setSelectedId] = useState(1);
    const [activeRegion, setActiveRegion] = useState('Tümü');
    const selected = COOPERATIVES.find((c) => c.id === selectedId);

    const REGIONS_LIST = ['Tümü', 'Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'];
    const filtered = activeRegion === 'Tümü'
        ? COOPERATIVES
        : COOPERATIVES.filter(c => c.region === activeRegion);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Portal Window */}
            <div className="relative w-full max-w-[1400px] max-h-[92vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 z-10 flex flex-col animate-in zoom-in-95 duration-300">
                {/* ─── Header ─── */}
                <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-slate-100 bg-white flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 text-slate-600" />
                        </button>
                        <h2 className="text-xl md:text-2xl font-extrabold text-[#0c4e33] font-serif tracking-tight">
                            KOOPERATİF KEŞİF PORTALI
                        </h2>
                    </div>
                    <button
                        onClick={() => onNavigate && onNavigate('market')}
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#0c4e33] rounded-xl font-bold text-sm transition-colors border border-emerald-200"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Simbiyoz Pazarı
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                    {/* LEFT: Map */}
                    <div className="lg:w-1/2 p-4 md:p-6 flex flex-col border-r border-slate-100 min-h-[300px]" style={mapPanelStyle}>
                        <div className="flex-1 relative rounded-2xl overflow-hidden">
                            <TurkeyMap
                                selectedId={selectedId}
                                onSelect={setSelectedId}
                            />
                        </div>
                        {/* Bottom CTA under map */}
                        <button className="mt-4 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 text-sm border border-emerald-500/30">
                            <Sprout className="h-4 w-4" />
                            🌱 Kooperatif Ürünlerini Satın Al
                        </button>
                    </div>

                    {/* RIGHT: Cards + Detail */}
                    <div className="lg:w-1/2 flex flex-col md:flex-row overflow-hidden">
                        {/* Card List */}
                        <div className="md:w-1/2 overflow-y-auto p-4 space-y-3 border-r border-slate-100">
                            {/* Region Filter Tabs */}
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {REGIONS_LIST.map(r => (
                                    <button
                                        key={r}
                                        onClick={() => { setActiveRegion(r); }}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                                            activeRegion === r
                                                ? 'bg-[#0c4e33] text-white'
                                                : 'bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                            {filtered.map((coop) => {
                                const isActive = coop.id === selectedId;
                                return (
                                    <button
                                        key={coop.id}
                                        onClick={() => setSelectedId(coop.id)}
                                        className={`w-full text-left rounded-2xl p-4 border transition-all duration-200 ${
                                            isActive
                                                ? 'bg-emerald-50 border-emerald-300 shadow-lg shadow-emerald-100/50 scale-[1.02]'
                                                : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4
                                                className={`font-bold text-sm font-serif leading-snug ${
                                                    isActive
                                                        ? 'text-[#0c4e33]'
                                                        : 'text-slate-800'
                                                }`}
                                            >
                                                {coop.name}
                                            </h4>
                                            <ChevronRight
                                                className={`h-4 w-4 flex-shrink-0 mt-0.5 transition-transform ${
                                                    isActive
                                                        ? 'text-emerald-600 rotate-90'
                                                        : 'text-slate-300'
                                                }`}
                                            />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                                            <MapPin className="h-3 w-3" />
                                            {coop.city}
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-[10px]">
                                            <div className="flex items-center gap-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                                                <Factory className="h-3 w-3" />
                                                <span className="truncate">
                                                    {coop.source.split(' ')[0]}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-pink-600 bg-pink-50 px-2 py-1 rounded-md">
                                                <Users className="h-3 w-3" />
                                                <span>{coop.women} Kadın</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                                <Leaf className="h-3 w-3" />
                                                <span>
                                                    {coop.carbon} T/Y
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Detail Panel */}
                        {selected && (
                            <div className="md:w-1/2 overflow-y-auto p-4 md:p-5 bg-[#fafafa] space-y-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Wifi className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                                        Sera Ajanı Verileri — Canlı
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-800 font-serif leading-snug">
                                    {selected.name}
                                </h3>

                                {/* Temperature Gauge */}
                                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-500 font-semibold">
                                            Anlık Sıcaklık
                                        </span>
                                        <span className="text-xs text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                                            Optimum
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <Thermometer className="h-8 w-8 text-orange-500" />
                                        <span className="text-4xl font-black text-slate-900 font-serif">
                                            {selected.temp}
                                        </span>
                                        <span className="text-lg text-slate-400 mb-1">
                                            °C
                                        </span>
                                    </div>
                                </div>

                                {/* Efficiency Chart */}
                                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-slate-500 font-semibold">
                                            Verimlilik
                                        </span>
                                        <span className="text-sm font-bold text-[#0c4e33]">
                                            %{selected.efficiency}
                                        </span>
                                    </div>
                                    <MiniChart
                                        value={selected.efficiency}
                                        color="#10b981"
                                    />
                                </div>

                                {/* Metrics Grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                                        <Droplet className="h-4 w-4 text-blue-500 mb-1" />
                                        <p className="text-[10px] text-slate-400 font-semibold uppercase">
                                            Toprak Nemi
                                        </p>
                                        <p className="text-xl font-black text-slate-800 font-serif">
                                            %{selected.soilMoisture}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                                        <Droplet className="h-4 w-4 text-cyan-500 mb-1" />
                                        <p className="text-[10px] text-slate-400 font-semibold uppercase">
                                            Nem Oranı
                                        </p>
                                        <p className="text-xl font-black text-slate-800 font-serif">
                                            %{selected.humidity}
                                        </p>
                                    </div>
                                </div>

                                {/* IoT Status */}
                                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Wifi className="h-4 w-4 text-emerald-500" />
                                        <span className="text-xs font-semibold text-slate-600">
                                            IoT Cihaz Durumu
                                        </span>
                                    </div>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        {selected.iot}
                                    </span>
                                </div>

                                {/* Source Info */}
                                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-3 border border-orange-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Factory className="h-4 w-4 text-orange-500" />
                                        <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                                            Atık Isı Kaynağı
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800 font-serif">
                                        {selected.source}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
