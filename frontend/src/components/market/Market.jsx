import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { applySmartMatching } from '../../data/matchingEngine';
import MarketCard from './MarketCard';
import MarketModal from './MarketModal';
import AddListingModal from './AddListingModal';
import AIMatchModal from './AIMatchModal';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:5000/api/listings';

const getImageForMaterial = (material, category) => {
    const text = (material || '').toLowerCase();
    
    // Metal
    if (text.includes('alüminyum')) return '/images/aluminyum-hurda.jpg';
    if (text.includes('bakır')) return '/images/bakir-kablo.jpg';
    if (text.includes('pirinç')) return '/images/sari-pirinc.jpg';
    if (text.includes('çelik') || text.includes('metal')) return '/images/celik-talasi.jpg';
    if (category === 'Metal') return '/images/metal-atik.jpg';

    // Tekstil
    if (text.includes('pamuk')) return '/images/pamuklu-kirpinti.jpg';
    if (text.includes('polyester')) return '/images/polyester-kumas.jpg';
    if (text.includes('naylon')) return '/images/naylon-iplik.jpg';
    if (category === 'Tekstil') return '/images/polyester-kumas.jpg';

    // Plastik
    if (text.includes('pet')) return '/images/pet-sise.jpg';
    if (text.includes('hdpe') || text.includes('bidon')) return '/images/hdpe-bidon.jpg';
    if (text.includes('pvc')) return '/images/pvc-boru.jpg';
    if (category === 'Plastik') return '/images/pet-sise.jpg';

    // Kimyasal
    if (text.includes('yağ')) return '/images/atik-yag.jpg';
    if (text.includes('çözücü') || text.includes('solvent')) return '/images/cozucu.jpg';
    if (text.includes('boya')) return '/images/boya-camuru.jpg';
    if (category === 'Kimyasal') return '/images/cozucu.jpg';

    // Ahşap
    if (text.includes('palet')) return '/images/ahsap-palet.jpg';
    if (text.includes('mdf')) return '/images/mdf-tozu.jpg';
    if (text.includes('talaş')) return '/images/talas.jpg';
    if (category === 'Ahşap') return '/images/ahsap-palet.jpg';

    // Organik / Diğer
    if (text.includes('organik') || category === 'Organik') return '/images/organik-atik.jpg';

    return '/images/metal-atik.jpg'; // Universal fallback
};

// Helper to transform backend listing format to frontend MarketCard format
const transformListing = (item) => ({
    id: item._id,
    type: item.type || 'Satılık Atık',
    material: item.wasteType || item.description || 'Bilinmeyen Malzeme',
    amount: `${item.amount || 0} kg`,
    source: item.createdBy?.name || 'Anonim Tesis',
    location: item.createdBy?.region || 'Belirtilmemiş',
    category: item.category || 'Diğer',
    tag: item.status === 'active' ? 'Yeni İlan' : '',
    matchScore: Math.floor(Math.random() * 40) + 50, // Simulated match score for demo
    aiMatch: false,
    buyer: 'Sistem Önerisi Aranıyor',
    buyerUse: 'Geri Dönüşüm',
    income: `~${((item.amount || 0) * 1.5).toLocaleString()} TL`, 
    co2: `${((item.amount || 0) * 0.4 / 1000).toFixed(1)} Ton`,
    createdAt: item.createdAt,
    image: getImageForMaterial(item.wasteType, item.category)
});


const categories = [
    { id: 'all', icon: 'fa-layer-group', label: 'Tümü' },
    { id: 'Metal', icon: 'fa-gear', label: 'Metal' },
    { id: 'Tekstil', icon: 'fa-shirt', label: 'Tekstil' },
    { id: 'Plastik', icon: 'fa-cube', label: 'Plastik' },
    { id: 'Kimyasal', icon: 'fa-flask', label: 'Kimyasal' },
    { id: 'Ahşap', icon: 'fa-tree', label: 'Ahşap' },
    { id: 'favorites', icon: 'fa-heart', label: 'Favorilerim' },
];

export default function Market({ onMatch, matchedIds, hasProfile, onNavigate, pendingMatch, setPendingMatch, favorites, onToggleFavorite }) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCat, setActiveCat] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [aiTargetItem, setAiTargetItem] = useState(null);
    const [showAddListing, setShowAddListing] = useState(false);

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get(API_URL);
                if (res.data.success) {
                    const transformed = res.data.data.map(transformListing);
                    // Generate scores once using the smart matcher
                    const matched = applySmartMatching(transformed);
                    setListings(matched);
                }
            } catch (error) {
                console.error("Failed to load listings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    const filteredItems = useMemo(() => {
        let items = listings;
        
        if (activeCat === 'favorites') {
            items = items.filter(i => favorites.has(i.id));
        } else if (activeCat !== 'all') {
            items = items.filter(i => i.category === activeCat);
        }

        if (search) {
            const q = search.toLowerCase();
            items = items.filter(i => i.material.toLowerCase().includes(q) || i.source.toLowerCase().includes(q));
        }
        return items;
    }, [activeCat, search, listings, favorites]);

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

    const handleAddListingClick = () => {
        if (!isLoggedIn) {
            alert('İlan eklemek veya eşleşme talep etmek için lütfen önce sisteme giriş yapın.');
            onNavigate('login');
        } else {
            setShowAddListing(true);
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-4">

            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-serif mb-2">
                        {activeCat === 'favorites' ? 'Favori İlanlarım' : 'Endüstriyel Pazar Yeri'}
                    </h3>
                    <p className="text-sm text-slate-500 font-serif">
                        {activeCat === 'favorites' 
                            ? 'Kaydettiğiniz ve takip etmek istediğiniz endüstriyel fırsatlar.' 
                            : 'Endüstriyel fazlayı döngüsel çözümlerle buluşturun. Doğrulanmış malzemeleri güvenle keşfedin.'}
                    </p>
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
                        onClick={handleAddListingClick}
                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors text-sm font-bold px-6 py-3 rounded-lg flex items-center gap-2 shadow-sm font-serif group"
                    >
                        <span><i className="fa-solid fa-plus text-[#0c4e33] group-hover:scale-110 transition-transform"></i></span> İlan Ekle
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
                                    isFavorited={favorites?.has(item.id)}
                                    onToggleFavorite={() => onToggleFavorite(item.id)}
                                    onClick={() => !matchedIds?.has(item.id) && setSelectedItem(item)}
                                    onAIMatchClick={() => setAiTargetItem(item)}
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

            {aiTargetItem && (
                <AIMatchModal 
                    item={aiTargetItem} 
                    onClose={() => setAiTargetItem(null)} 
                    onNavigate={onNavigate} 
                />
            )}
        </div>
    );
}
