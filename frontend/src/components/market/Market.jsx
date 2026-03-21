import { useState, useMemo, useEffect } from 'react';
import { marketListings as rawListings } from '../../data/marketListings';
import { applySmartMatching } from '../../data/matchingEngine';
import MarketCard from './MarketCard';
import MarketModal from './MarketModal';
import AddListingModal from './AddListingModal';

// Apply smart matching to all default listings
const marketListings = applySmartMatching(rawListings);

const STORAGE_KEY = 'eco-simbios-listings-v5';

// Auto-cleanup: remove all old cache versions
['eco-simbios-listings', 'eco-simbios-listings-v1', 'eco-simbios-listings-v2', 'eco-simbios-listings-v3', 'eco-simbios-listings-v4'].forEach(k => {
    try { localStorage.removeItem(k); } catch {}
});

function loadListings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            // Filter: keep only custom listings that don't clash with defaults
            const defaultIds = new Set(marketListings.map(i => i.id));
            const defaultMaterials = new Set(marketListings.map(i => i.material));
            const customListings = parsed.filter(i => !defaultIds.has(i.id) && !defaultMaterials.has(i.material));
            return [...customListings, ...marketListings];
        }
    } catch { /* ignore parse errors */ }
    return marketListings;
}

const categories = [
    { id: 'all', icon: 'fa-layer-group', label: 'Tümü' },
    { id: 'Metal', icon: 'fa-gear', label: 'Metal' },
    { id: 'Tekstil', icon: 'fa-shirt', label: 'Tekstil' },
    { id: 'Plastik', icon: 'fa-cube', label: 'Plastik' },
    { id: 'Kimyasal', icon: 'fa-flask', label: 'Kimyasal' },
    { id: 'Ahşap', icon: 'fa-tree', label: 'Ahşap' },
];

export default function Market({ onMatch, matchedIds, hasProfile, onNavigate, pendingMatch, setPendingMatch }) {
    const [listings, setListings] = useState(loadListings);
    const [activeCat, setActiveCat] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddListing, setShowAddListing] = useState(false);

    useEffect(() => {
        const defaultIds = new Set(marketListings.map(i => i.id));
        const customListings = listings.filter(i => !defaultIds.has(i.id));
        if (customListings.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(customListings));
        }
    }, [listings]);

    const filteredItems = useMemo(() => {
        let items = activeCat === 'all' ? listings : listings.filter(i => i.category === activeCat);
        if (search) {
            const q = search.toLowerCase();
            items = items.filter(i => i.material.toLowerCase().includes(q) || i.source.toLowerCase().includes(q));
        }
        return items;
    }, [activeCat, search, listings]);

    const handleMatchConfirmed = ({ extraEarnings, extraCarbon, newListing }) => {
        if (newListing) {
            setListings(prev => [newListing, ...prev]);
        }
        if (selectedItem) {
            onMatch({ extraEarnings, extraCarbon, itemId: selectedItem.id });
            setSelectedItem(null);
        } else if (newListing) {
            // Eşleşmeyi direkt 'Yeni İlan' için kaydet
            onMatch({ extraEarnings, extraCarbon, itemId: newListing.id });
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-4">

            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-serif mb-2">Endüstriyel Pazar Yeri</h3>
                    <p className="text-sm text-slate-500 font-serif">Endüstriyel fazlayı döngüsel çözümlerle buluşturun. Doğrulanmış malzemeleri güvenle keşfedin.</p>
                </div>

                {/* Search & Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
                    <div className="relative flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center shadow-sm">
                        <i className="fa-solid fa-search text-slate-400 text-sm pl-4 pr-2"></i>
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Malzeme ara (örn: HDPE, hurda çelik)"
                            className="w-full py-3 bg-transparent border-none text-slate-800 text-sm placeholder-gray-400 outline-none focus:ring-0 font-serif"
                        />
                    </div>

                    <button className="bg-[#0c4e33] hover:bg-[#093b26] text-white transition-colors text-sm font-bold px-8 py-3 rounded-lg shadow-sm font-serif">
                        Ara
                    </button>

                    <button
                        onClick={() => setShowAddListing(true)}
                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm font-serif"
                    >
                        <span><i className="fa-solid fa-plus text-slate-400"></i></span> İlan Ekle
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar Filters */}
                <div className="w-full lg:w-56 shrink-0 space-y-2 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 tracking-wider mb-4 px-2 font-serif pt-2">
                        <i className="fa-solid fa-filter"></i>
                        FİLTRELER
                    </div>
                    {categories.map(cat => {
                        const isActive = activeCat === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCat(cat.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 font-serif ${isActive
                                        ? 'bg-emerald-50 text-[#0c4e33]'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <span className="flex-shrink-0 w-5 flex justify-center">
                                    <i className={`fa-solid ${cat.icon} ${isActive ? 'text-[#0c4e33]' : 'text-slate-400'}`}></i>
                                </span>
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* Grid Content */}
                <div className="flex-1 w-full">
                    {filteredItems.length === 0 ? (
                        <div className="w-full text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500 font-serif">
                            <span><i className="fa-solid fa-box-open text-4xl mb-4 block text-slate-300"></i></span>
                            <p className="text-lg mb-1">Kayıt Bulunamadı</p>
                            <p className="text-sm">Arama kriterlerinize uygun eşleşme bulunamamıştır.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredItems.map(item => (
                                <MarketCard
                                    key={item.id}
                                    item={item}
                                    isMatched={matchedIds?.has(item.id) || false}
                                    onClick={() => !matchedIds?.has(item.id) && setSelectedItem(item)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {(selectedItem || pendingMatch) && (
                <MarketModal
                    item={selectedItem || pendingMatch}
                    onClose={() => { setSelectedItem(null); if (setPendingMatch) setPendingMatch(null); }}
                    onMatchConfirmed={handleMatchConfirmed}
                    hasProfile={hasProfile}
                    onNavigate={onNavigate}
                    setPendingMatch={setPendingMatch}
                />
            )}

            {showAddListing && (
                <AddListingModal
                    onClose={() => setShowAddListing(false)}
                    onMatchConfirmed={handleMatchConfirmed}
                />
            )}
        </div>
    );
}
