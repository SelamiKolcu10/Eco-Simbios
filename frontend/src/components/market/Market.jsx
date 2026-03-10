import { useState, useMemo } from 'react';
import { marketListings } from '../../data/marketListings';
import MarketCard from './MarketCard';
import MarketModal from './MarketModal';
import AddListingModal from './AddListingModal';

const categories = [
    { id: 'all', icon: 'fa-layer-group', label: 'Tümü' },
    { id: 'Metal', icon: 'fa-gear', label: 'Metal' },
    { id: 'Textile', icon: 'fa-shirt', label: 'Tekstil' },
    { id: 'Plastic', icon: 'fa-cube', label: 'Plastik' },
    { id: 'Chemical', icon: 'fa-flask', label: 'Kimyasal' },
    { id: 'Wood', icon: 'fa-tree', label: 'Ahşap' },
];

export default function Market({ onMatch, matchedIds }) {
    const [listings, setListings] = useState(marketListings);
    const [activeCat, setActiveCat] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAddListing, setShowAddListing] = useState(false);

    const filteredItems = useMemo(() => {
        let items = activeCat === 'all' ? listings : listings.filter(i => i.category === activeCat);
        if (search) {
            const q = search.toLowerCase();
            items = items.filter(i => i.material.toLowerCase().includes(q) || i.source.toLowerCase().includes(q));
        }
        return items;
    }, [activeCat, search]);

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
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <span><i className="fa-solid fa-recycle text-amber-400 text-lg"></i></span>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Endüstriyel Atık ve Hammadde Eşleştirme Platformu</h3>
                        <p className="text-[11px] text-slate-500">Simbiyoz Pazarı — Yapay Zeka Destekli Eşleşme</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 relative">
                    <div className="relative border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <input
                            type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Malzeme ara..."
                            className="input-cyber pl-9 pr-3 py-2 bg-transparent border-none text-slate-800 text-xs placeholder-gray-500 w-52 outline-none focus:ring-0"
                        />
                        <span><i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[10px]"></i></span>
                    </div>

                    <button
                        onClick={() => setShowAddListing(true)}
                        className="bg-slate-800 hover:bg-emerald-600 text-white transition-colors text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm"
                    >
                        <span><i className="fa-solid fa-plus text-[10px]"></i></span> İlan Ekle
                    </button>
                </div>
            </div>

            <div className="flex gap-5">
                <div className="w-44 shrink-0 space-y-1.5 hidden lg:block">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">Kategoriler</p>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCat(cat.id)}
                            className={`mk-cat-btn w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${activeCat === cat.id ? 'active' : 'text-slate-500'}`}
                        >
                            <span><i className={`fa-solid ${cat.icon} text-[10px] w-4`}></i></span>{cat.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredItems.length === 0 ? (
                        <div className="col-span-2 text-center py-12 text-slate-500 text-sm">
                            <span><i className="fa-solid fa-box-open text-3xl mb-3 block"></i></span>Sonuç bulunamadı
                        </div>
                    ) : (
                        filteredItems.map(item => (
                            <MarketCard
                                key={item.id}
                                item={item}
                                isMatched={matchedIds?.has(item.id) || false}
                                onClick={() => !matchedIds?.has(item.id) && setSelectedItem(item)}
                            />
                        ))
                    )}
                </div>
            </div>

            {selectedItem && (
                <MarketModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                    onMatchConfirmed={handleMatchConfirmed}
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
