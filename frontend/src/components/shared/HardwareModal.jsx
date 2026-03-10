export default function HardwareModal({ onClose }) {
    const items = [
        { icon: 'fa-temperature-half', color: 'text-red-400', title: 'IoT Temperature Sensors', desc: 'PT100 RTD • 0.1°C accuracy • LoRa mesh' },
        { icon: 'fa-gauge', color: 'text-amber-400', title: 'Flow Rate Meters', desc: 'Ultrasonic • 0-50 m³/h • Modbus RTU' },
        { icon: 'fa-solar-panel', color: 'text-eco-400', title: 'Energy Harvesting', desc: 'TEG modules • Peltier stacks • Solar backup' },
        { icon: 'fa-server', color: 'text-cyan-400', title: 'SCADA Gateway', desc: 'Edge computing • MQTT → React SPA' },
        { icon: 'fa-satellite-dish', color: 'text-purple-400', title: 'Communication', desc: 'LoRa WAN • 4G fallback • AES-256 encrypted' },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-lg w-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-800">
                        <i className="fa-solid fa-microchip text-purple-400 mr-2"></i>System Architecture
                    </h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><i className="fa-solid fa-xmark"></i></button>
                </div>
                <div className="space-y-3">
                    {items.map((item, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-3 flex items-center gap-3">
                            <i className={`fa-solid ${item.icon} ${item.color} w-6 text-center`}></i>
                            <div>
                                <p className="text-xs font-bold text-slate-800">{item.title}</p>
                                <p className="text-[10px] text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
