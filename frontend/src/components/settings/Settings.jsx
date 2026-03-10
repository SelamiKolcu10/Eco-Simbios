import { useState } from 'react';

export default function Settings() {
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    return (
        <div className="space-y-5">
            <div className="carbon-card rounded-xl p-5">
                <h3 className="text-sm font-bold text-slate-800 mb-4">
                    <i className="fa-solid fa-sliders text-eco-400 mr-2"></i>System Configuration
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase">Max Connection Distance (km)</label>
                        <input type="number" defaultValue="5" className="input-cyber w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-slate-800 text-xs" />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase">Temperature Alert Threshold (°C)</label>
                        <input type="number" defaultValue="90" className="input-cyber w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-slate-800 text-xs" />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase">Carbon Goal (Tons/month)</label>
                        <input type="number" defaultValue="200" className="input-cyber w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-slate-800 text-xs" />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase">Social Impact Target (Jobs)</label>
                        <input type="number" defaultValue="100" className="input-cyber w-full mt-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-slate-800 text-xs" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button type="submit" className="btn-cyber px-6 py-2.5 text-white font-bold text-sm rounded-xl flex items-center gap-2">
                            <i className="fa-solid fa-floppy-disk"></i> Save
                        </button>
                    </div>
                </form>
                {showFeedback && (
                    <div className="mt-4">
                        <div className="bg-eco-500/5 border-l-2 border-eco-400 rounded-lg px-3 py-2.5">
                            <p className="text-[11px] text-eco-400 font-semibold">
                                <i className="fa-solid fa-circle-check mr-1"></i>Settings saved
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
