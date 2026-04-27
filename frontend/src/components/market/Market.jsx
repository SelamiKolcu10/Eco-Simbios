import { useState, useMemo, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import MarketCard from './MarketCard';
import MarketModal from './MarketModal';
import AddListingModal from './AddListingModal';
import AIMatchModal from './AIMatchModal';
import { useAuth } from '../../context/AuthContext';
import { Trash2, PackageOpen } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/listings';

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
    ownerId: item.createdBy?._id || item.createdBy, // raw ObjectId string for ownership checks
    type: item.type || 'Satılık Atık',
    material: item.wasteType || item.description || 'Bilinmeyen Malzeme',
    amount: `${item.amount || 0} kg`,
    source: item.createdBy?.name || 'Anonim Tesis',
    location: item.createdBy?.region || 'Belirtilmemiş',
    category: item.category || 'Diğer',
    status: item.status || 'active',
    tag: item.status === 'active' ? 'Yeni İlan' : item.status === 'matched' ? 'Eşleşti' : 'Kapalı',
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
    { id: 'my-listings', icon: 'fa-building', label: 'İlanlarım' },
];

export default function Market({ onMatch, matchedIds, hasProfile, onNavigate, pendingMatch, setPendingMatch, favorites, onToggleFavorite }) {
    const [listings, setListings] = useState([]);
    const [myListings, setMyListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [myListingsLoading, setMyListingsLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [activeCat, setActiveCat] = useState('all');
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [aiTargetItem, setAiTargetItem] = useState(null);
    const [showAddListing, setShowAddListing] = useState(false);

    const { isLoggedIn, facility, token } = useAuth();

    // ── Fetch all public listings ─────────────────────────────────────────────
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get(API_URL);
                if (res.data.success) {
                    const transformed = res.data.data.map(transformListing);
                    setListings(transformed);
                }
            } catch (error) {
                console.error('Failed to load listings', error);
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, []);

    // ── Fetch MY listings when switching to that tab ──────────────────────────
    const fetchMyListings = useCallback(async () => {
        if (!token) return;
        setMyListingsLoading(true);
        try {
            const res = await axios.get(`${API_URL}/my`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.success) {
                setMyListings(res.data.data.map(transformListing));
            }
        } catch (error) {
            console.error('Failed to load my listings', error);
        } finally {
            setMyListingsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (activeCat === 'my-listings') {
            fetchMyListings();
        }
    }, [activeCat, fetchMyListings]);

    // ── Delete listing ────────────────────────────────────────────────────────
    const handleDeleteListing = async (listingId) => {
        if (!window.confirm('Bu ilanı silmek istediğinizden emin misiniz?')) return;
        const toastId = toast.loading('İlan siliniyor...');
        setDeletingId(listingId);
        try {
            await axios.delete(`${API_URL}/${listingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMyListings(prev => prev.filter(l => l.id !== listingId));
            setListings(prev => prev.filter(l => l.id !== listingId));
            toast.success('İlan başarıyla silindi.', { id: toastId });
        } catch (error) {
            const msg = error.response?.data?.message || 'İlan silinirken bir hata oluştu.';
            toast.error(msg, { id: toastId });
        } finally {
            setDeletingId(null);
        }
    };

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
            toast.error('İlan eklemek için lütfen önce giriş yapın.');
            onNavigate('login');
        } else {
            setShowAddListing(true);
        }
    };

    const isMyListingsTab = activeCat === 'my-listings';

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-4">

            {/* Header Section */}
            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 font-serif mb-2">
                        {activeCat === 'favorites' ? 'Favori İlanlarım'
                            : isMyListingsTab ? 'Benim İlanlarım'
                            : 'Endüstriyel Pazar Yeri'}
                    </h3>
                    <p className="text-sm text-slate-500 font-serif">
                        {activeCat === 'favorites'
                            ? 'Kaydettiğiniz ve takip etmek istediğiniz endüstriyel fırsatlar.'
                            : isMyListingsTab
                            ? `${facility?.name || 'Tesisinize'} ait tüm aktif ve geçmiş ilanlar.`
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
                    {/* ── My Listings Tab ─────────────────────────────────── */}
                    {isMyListingsTab ? (
                        myListingsLoading ? (
                            <div className="w-full text-center py-20 text-slate-400 font-serif">
                                <i className="fa-solid fa-circle-notch fa-spin text-3xl mb-3 block text-emerald-400"></i>
                                Yükleniyor...
                            </div>
                        ) : myListings.length === 0 ? (
                            <div className="w-full text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm text-slate-500 font-serif">
                                <PackageOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                <p className="text-lg mb-1">Henüz İlan Yok</p>
                                <p className="text-sm mb-4">İlk ilanınızı ekleyerek döngüsel ekonomiye katılın.</p>
                                <button
                                    onClick={handleAddListingClick}
                                    className="inline-flex items-center gap-2 bg-[#0c4e33] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#093b26] transition-colors"
                                >
                                    <i className="fa-solid fa-plus"></i> İlan Ekle
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myListings.map(item => (
                                    <div key={item.id} className="relative group">
                                        <MarketCard
                                            item={item}
                                            isMatched={matchedIds?.has(item.id) || false}
                                            isFavorited={favorites?.has(item.id)}
                                            onToggleFavorite={() => onToggleFavorite(item.id)}
                                            onClick={() => !matchedIds?.has(item.id) && setSelectedItem(item)}
                                            onAIMatchClick={() => setAiTargetItem(item)}
                                        />
                                        {/* Delete overlay — only visible on hover */}
                                        <button
                                            onClick={() => handleDeleteListing(item.id)}
                                            disabled={deletingId === item.id}
                                            title="İlanı Sil"
                                            className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                                        >
                                            {deletingId === item.id
                                                ? <i className="fa-solid fa-circle-notch fa-spin text-xs"></i>
                                                : <Trash2 className="w-3.5 h-3.5" />}
                                        </button>
                                        {/* Status badge */}
                                        <span className={`absolute bottom-[72px] left-5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            item.status === 'active' ? 'bg-emerald-100 text-emerald-700'
                                            : item.status === 'matched' ? 'bg-blue-100 text-blue-700'
                                            : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {item.status === 'active' ? '● Aktif' : item.status === 'matched' ? '✓ Eşleşti' : '✕ Kapalı'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                    /* ── Normal / Favorites tabs ────────────────────────── */
                    filteredItems.length === 0 ? (
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
                    )
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
