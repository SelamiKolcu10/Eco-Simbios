import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { cities } from '../../data/cities';

const fIcon = () => L.divIcon({ className: '', html: '<div style="width:24px;height:24px;border-radius:50%;background:rgba(239,68,68,.9);border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 10px rgba(239,68,68,.5)"><i class="fa-solid fa-industry" style="color:#fff;font-size:9px"></i></div>', iconSize: [24, 24], iconAnchor: [12, 12] });
const gIcon = () => L.divIcon({ className: '', html: '<div style="width:24px;height:24px;border-radius:50%;background:rgba(16,185,129,.9);border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 10px rgba(16,185,129,.5)"><i class="fa-solid fa-leaf" style="color:#fff;font-size:9px"></i></div>', iconSize: [24, 24], iconAnchor: [12, 12] });
const nIcon = () => L.divIcon({ className: '', html: '<div style="width:24px;height:24px;border-radius:50%;background:rgba(107,114,128,.7);border:2px solid #6b7280;display:flex;align-items:center;justify-content:center"><i class="fa-solid fa-industry" style="color:#d1d5db;font-size:9px"></i></div>', iconSize: [24, 24], iconAnchor: [12, 12] });

export default function LiveMap() {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [stats, setStats] = useState({ links: 0, co2: 0 });

    useEffect(() => {
        if (mapInstanceRef.current) return;

        const map = L.map(mapRef.current, { zoomControl: false, attributionControl: false }).setView([39, 32], 6);
        mapInstanceRef.current = map;
        L.control.zoom({ position: 'topright' }).addTo(map);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 18 }).addTo(map);

        let gid = 100, totalLinks = 0, totalCO2 = 0;

        cities.forEach(c => {
            const fs = [], gs = [];
            const cx = c.lat + (c.offLat || 0);
            const cy = c.lng + (c.offLng || 0);
            for (let i = 0; i < 10; i++) fs.push({ id: gid++, lat: cx + (Math.random() - .5) * .1, lng: cy + (Math.random() - .5) * .1 });
            for (let i = 0; i < 15; i++) gs.push({ id: gid++, lat: cx + (Math.random() - .5) * .16, lng: cy + (Math.random() - .5) * .16 });

            L.marker([c.lat + .06, c.lng], {
                icon: L.divIcon({ className: '', html: `<div style="background:rgba(99,102,241,.85);color:#fff;font-size:8px;font-weight:700;padding:2px 7px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.4)">${c.name.toUpperCase()}</div>`, iconSize: [100, 18], iconAnchor: [50, 9] })
            }).addTo(map);

            gs.forEach(g => L.marker([g.lat, g.lng], { icon: gIcon() }).addTo(map)
                .bindPopup(`<div style='font-family:Inter;min-width:170px'><b>🌱 Greenhouse #${g.id}</b><br><span style='color:#94a3b8;font-size:11px'>Need: 24°C • ${c.name}</span></div>`));

            fs.forEach(f => {
                const fl = L.latLng(f.lat, f.lng);
                let best = null, bd = Infinity;
                gs.forEach(g => { const d = map.distance(fl, L.latLng(g.lat, g.lng)); if (d < bd) { bd = d; best = g; } });

                const dk = (bd / 1000).toFixed(1), ok = bd < 5000, co = ok ? 100 + Math.floor(Math.random() * 400) : 0;
                L.marker([f.lat, f.lng], { icon: ok ? fIcon() : nIcon() }).addTo(map)
                    .bindPopup(`<div style='font-family:Inter;min-width:190px'><b>🏭 Factory #${f.id}</b><br><span style='color:#94a3b8;font-size:11px'>Status: ${ok ? 'Connected' : 'No Match'} • ${dk}km</span>${ok ? `<br><span style='color:#34d399;font-size:11px'>Saving: ${co}T CO₂</span>` : ''}</div>`);

                if (ok && best) {
                    totalLinks++; totalCO2 += co;
                    const ml = (f.lat + best.lat) / 2, mg = (f.lng + best.lng) / 2;
                    L.polyline([[f.lat, f.lng], [best.lat, best.lng]], { color: '#facc15', weight: 2, opacity: .75 }).addTo(map);
                    L.marker([ml, mg], { icon: L.divIcon({ className: '', html: `<div style="background:rgba(250,204,21,.85);color:#080d19;font-size:7px;font-weight:700;padding:1px 4px;border-radius:5px">${dk}km</div>`, iconSize: [36, 12], iconAnchor: [18, 6] }), interactive: false }).addTo(map);
                }
            });
        });

        setStats({ links: totalLinks, co2: totalCO2 });
        map.fitBounds([[36, 26.5], [41.5, 37.5]]);

        return () => { map.remove(); mapInstanceRef.current = null; };
    }, []);

    return (
        <div className="space-y-5">
            <div className="carbon-card rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <i className="fa-solid fa-earth-americas text-blue-400 text-sm"></i>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800">Eco-Symbiosis Network Map — Turkey</h3>
                            <p className="text-[10px] text-slate-500">20 Strategic Cities • Nearest-Neighbor Optimization</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-eco-500/10 border border-eco-500/20 px-3 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-eco-400 pulse-dot inline-block"></span>
                        <span className="text-[11px] font-bold text-eco-400">Live</span>
                    </div>
                </div>
                <div ref={mapRef} style={{ height: 540 }} className="rounded-xl border border-gray-200 z-10"></div>
                <div className="flex flex-wrap items-center gap-5 mt-4 px-1">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span><span className="text-[10px] text-slate-500">Factory</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-eco-400 inline-block"></span><span className="text-[10px] text-slate-500">Greenhouse</span></div>
                    <div className="flex items-center gap-2"><span className="w-5 h-[3px] bg-yellow-400 inline-block rounded"></span><span className="text-[10px] text-slate-500">Lifeline (&lt;5km)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-600 inline-block"></span><span className="text-[10px] text-slate-500">No Match</span></div>
                </div>
                <div className="grid grid-cols-5 gap-3 mt-4">
                    <div className="text-center bg-slate-50 rounded-lg py-3"><p className="text-lg font-bold text-slate-800">20</p><p className="text-[9px] text-slate-500 uppercase">Cities</p></div>
                    <div className="text-center bg-slate-50 rounded-lg py-3"><p className="text-lg font-bold text-red-400">200</p><p className="text-[9px] text-slate-500 uppercase">Factories</p></div>
                    <div className="text-center bg-slate-50 rounded-lg py-3"><p className="text-lg font-bold text-eco-400">300</p><p className="text-[9px] text-slate-500 uppercase">Greenhouses</p></div>
                    <div className="text-center bg-slate-50 rounded-lg py-3"><p className="text-lg font-bold text-amber-400">{stats.links}</p><p className="text-[9px] text-slate-500 uppercase">Connections</p></div>
                    <div className="text-center bg-slate-50 rounded-lg py-3"><p className="text-lg font-bold text-cyan-400">{stats.co2.toLocaleString()}</p><p className="text-[9px] text-slate-500 uppercase">CO₂ (T)</p></div>
                </div>
            </div>
        </div>
    );
}
