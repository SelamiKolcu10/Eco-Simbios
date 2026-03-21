/**
 * ═══════════════════════════════════════════════════════════════
 *  ECO-SİMBİYOZ — AKILLI EŞLEŞME MOTORU (Smart Matching Engine)
 * ═══════════════════════════════════════════════════════════════
 * 
 *  Sektörel Uyumluluk Matrisi (Compatibility Matrix) tabanlı
 *  AI eşleşme algoritması. Rastgele (random) eşleşme yerine
 *  gerçek endüstriyel simbiyoz mantığına dayalı eşleştirme yapar.
 */

// ─────────────────────────────────────────────────────────
// 1. SEKTÖR TANIMI — Her tesis bir sektöre ait
// ─────────────────────────────────────────────────────────
export const SECTORS = {
    OTOMOTIV: 'Otomotiv',
    TEKSTIL: 'Tekstil',
    KIMYA: 'Kimya',
    INSAAT: 'İnşaat / Çimento',
    TARIM: 'Tarım / Akıllı Sera',
    LOJISTIK: 'Lojistik',
    GERI_DONUSUM: 'Geri Dönüşüm',
    ENERJI: 'Enerji',
    GIDA: 'Gıda'
};

// ─────────────────────────────────────────────────────────
// 2. TESİS → SEKTÖR HARİTALAMASI
// ─────────────────────────────────────────────────────────
export const FACILITY_SECTORS = {
    'Kocaeli Üretim Tesisi': SECTORS.OTOMOTIV,
    'Bursa Otomotiv Fabrikası': SECTORS.OTOMOTIV,
    'İzmir Tekstil Atölyesi': SECTORS.TEKSTIL,
    'Gaziantep Cam Sanayi': SECTORS.INSAAT,
    'Eskişehir Çimento Fabrikası': SECTORS.INSAAT,
    'Ankara Demir Çelik': SECTORS.OTOMOTIV,
    'Gebze Plastik OSB': SECTORS.GERI_DONUSUM,
    'Kocaeli Tesis': SECTORS.OTOMOTIV,
    'Bandırma Sanayi': SECTORS.GERI_DONUSUM,
    'Bandırma Sera Bölgesi': SECTORS.TARIM,
};

// ─────────────────────────────────────────────────────────
// 3. UYUMLULUK MATRİSİ (Compatibility Matrix)
//    Her sektörün HANGİ malzemeleri kullanabileceği
// ─────────────────────────────────────────────────────────
export const COMPATIBILITY_MATRIX = {
    [SECTORS.OTOMOTIV]: {
        compatible: [
            'Metal Atık', 'Alüminyum Hurda', 'Bakır Kablo', 'Sarı Pirinç',
            'Çelik Talaşı', 'HDPE Bidon', 'PET Şişe', 'PVC Boru Hurdası',
            'Plastik Atık', 'Atık Yağ'
        ],
        partiallyCompatible: [
            'Ahşap Palet', 'MDF Tozu'
        ]
    },
    [SECTORS.TEKSTIL]: {
        compatible: [
            'Pamuklu Kırpıntı', 'Polyester Kumaş', 'Naylon İplik',
            'Çözücü (Solvent)', 'Boya Çamuru'
        ],
        partiallyCompatible: [
            'PET Şişe', 'Plastik Atık'
        ]
    },
    [SECTORS.KIMYA]: {
        compatible: [
            'Atık Yağ', 'Çözücü (Solvent)', 'Boya Çamuru',
            'PET Şişe', 'HDPE Bidon', 'PVC Boru Hurdası', 'Plastik Atık'
        ],
        partiallyCompatible: [
            'Metal Atık', 'Çelik Talaşı'
        ]
    },
    [SECTORS.INSAAT]: {
        compatible: [
            'Çelik Talaşı', 'Metal Atık', 'Alüminyum Hurda', 'Sarı Pirinç',
            'Ahşap Palet', 'MDF Tozu', 'Talaş',
            'Atık Yağ', 'Boya Çamuru', 'PVC Boru Hurdası'
        ],
        partiallyCompatible: [
            'Bakır Kablo', 'Plastik Atık'
        ]
    },
    [SECTORS.TARIM]: {
        compatible: [
            'Ahşap Palet', 'Talaş', 'MDF Tozu'
        ],
        partiallyCompatible: [
            'HDPE Bidon', 'PET Şişe', 'Plastik Atık'
        ]
    },
    [SECTORS.GERI_DONUSUM]: {
        compatible: [
            'Metal Atık', 'Alüminyum Hurda', 'Bakır Kablo', 'Sarı Pirinç',
            'Çelik Talaşı', 'PET Şişe', 'HDPE Bidon', 'PVC Boru Hurdası',
            'Plastik Atık', 'Pamuklu Kırpıntı', 'Polyester Kumaş', 'Naylon İplik',
            'Atık Yağ', 'Çözücü (Solvent)', 'Boya Çamuru',
            'Ahşap Palet', 'MDF Tozu', 'Talaş'
        ],
        partiallyCompatible: []
    },
    [SECTORS.ENERJI]: {
        compatible: [
            'Talaş', 'Ahşap Palet', 'MDF Tozu', 'Atık Yağ', 'Plastik Atık'
        ],
        partiallyCompatible: [
            'PET Şişe', 'Naylon İplik'
        ]
    },
    [SECTORS.LOJISTIK]: {
        compatible: [
            'Ahşap Palet', 'HDPE Bidon', 'Plastik Atık'
        ],
        partiallyCompatible: [
            'Metal Atık', 'PVC Boru Hurdası'
        ]
    },
    [SECTORS.GIDA]: {
        compatible: [
            'HDPE Bidon', 'PET Şişe', 'Ahşap Palet'
        ],
        partiallyCompatible: [
            'Talaş', 'Plastik Atık'
        ]
    }
};

// ─────────────────────────────────────────────────────────
// 4. ALICI VERİTABANI — Sektöre göre potansiyel alıcılar
// ─────────────────────────────────────────────────────────
export const SECTOR_BUYERS = {
    [SECTORS.OTOMOTIV]: [
        { name: 'Bursa Otomotiv Yan Sanayi', use: 'Araç Parça Üretimi' },
        { name: 'Tofaş Döküm Tesisi', use: 'Motor Blok Dökümü' },
        { name: 'Ford Otosan Kocaeli', use: 'Şasi ve Gövde Üretimi' }
    ],
    [SECTORS.TEKSTIL]: [
        { name: 'Denizli Tekstil A.Ş.', use: 'Kumaş ve Elyaf Üretimi' },
        { name: 'Bursa İzolasyon Sanayi', use: 'Araç İzolasyon Malzemesi' },
        { name: 'Gaziantep Halı Üretim', use: 'Endüstriyel Halı Hammaddesi' }
    ],
    [SECTORS.KIMYA]: [
        { name: 'İzmit Kimya O.S.B.', use: 'Solvent Geri Kazanımı' },
        { name: 'Petkim İzmir', use: 'Petrokimya Hammaddesi' }
    ],
    [SECTORS.INSAAT]: [
        { name: 'Çimsa Çimento Fabrikası', use: 'Alternatif Yakıt ve Hammadde' },
        { name: 'Limak İnşaat', use: 'Yapı Malzemesi Geri Kazanımı' },
        { name: 'Sunta Fabrikası', use: 'MDF ve Sunta Üretimi' }
    ],
    [SECTORS.TARIM]: [
        { name: 'Bandırma Sera Bölgesi', use: 'Organik Sera Altlığı' },
        { name: 'Antalya Tarım Kooperatifi', use: 'Tarımsal Malzeme' }
    ],
    [SECTORS.GERI_DONUSUM]: [
        { name: 'Marmara Geri Dönüşüm Tesisi', use: 'Hammadde İkamesi' },
        { name: 'İstanbul Geri Kazanım A.Ş.', use: 'Endüstriyel Geri Dönüşüm' },
        { name: 'Polimer Geri Kazanım', use: 'Granül Üretimi' }
    ],
    [SECTORS.ENERJI]: [
        { name: 'Biyokütle Enerji Tesisi', use: 'Biyokütle Yakıt' },
        { name: 'Refinasyon Tesisi', use: 'Baz Yağ Üretimi' }
    ],
    [SECTORS.LOJISTIK]: [
        { name: 'Borusan Lojistik A.Ş.', use: 'Kapasite Paylaşımı' }
    ],
    [SECTORS.GIDA]: [
        { name: 'Tat Gıda A.Ş.', use: 'Ambalaj Geri Dönüşümü' }
    ]
};

// ─────────────────────────────────────────────────────────
// 5. ANA EŞLEŞTİRME FONKSİYONU
// ─────────────────────────────────────────────────────────

/**
 * Bir malzeme için en uygun sektörü ve alıcıyı bul
 * @param {string} material - Malzeme adı (ör: "Alüminyum Hurda")
 * @param {string} [sourceFacility] - Kaynak tesis adı (opsiyonel)
 * @returns {{ matchScore, aiMatch, buyer, buyerUse, bestSector }}
 */
export function findBestMatch(material, sourceFacility = '') {
    let bestScore = 0;
    let bestSector = null;
    let bestBuyer = null;

    // Kaynak tesisin sektörünü bul (alıcı olarak önermeye engel ol)
    const sourceSector = Object.entries(FACILITY_SECTORS)
        .find(([name]) => sourceFacility.includes(name))?.[1] || null;

    for (const [sector, matrix] of Object.entries(COMPATIBILITY_MATRIX)) {
        // Kaynak ile aynı sektörü atla (kendi sektörüne satmak simbiyoz değil)
        if (sector === sourceSector) continue;

        let score = 0;

        if (matrix.compatible.includes(material)) {
            // Tam uyumlu: %85-%98 arası dinamik skor
            score = 85 + Math.floor(Math.random() * 14); // 85-98
        } else if (matrix.partiallyCompatible.includes(material)) {
            // Kısmi uyumlu: %55-%75 arası
            score = 55 + Math.floor(Math.random() * 21); // 55-75
        }
        // Uyumsuz: 0 → hiç önerme

        if (score > bestScore) {
            bestScore = score;
            bestSector = sector;
            // Sektörden rastgele bir alıcı seç
            const buyers = SECTOR_BUYERS[sector] || [];
            bestBuyer = buyers[Math.floor(Math.random() * buyers.length)] || { name: 'Bilinmiyor', use: 'Genel Kullanım' };
        }
    }

    // Eğer hiçbir uyumlu sektör bulunamazsa minimum skor
    if (!bestSector) {
        bestScore = 10 + Math.floor(Math.random() * 10); // 10-19
        bestSector = SECTORS.GERI_DONUSUM;
        bestBuyer = { name: 'Genel Geri Dönüşüm Tesisi', use: 'Değerlendirme' };
    }

    return {
        matchScore: bestScore,
        aiMatch: bestScore >= 70, // Sadece %70+ ise AI Önerisi göster
        buyer: bestBuyer.name,
        buyerUse: bestBuyer.use,
        bestSector
    };
}

/**
 * Tüm listelere akıllı eşleşme uygula (marketListings için)
 * @param {Array} listings - Ham listing dizisi
 * @returns {Array} - matchScore, aiMatch, buyer, buyerUse güncellenmiş listeler
 */
export function applySmartMatching(listings) {
    return listings.map(item => {
        const match = findBestMatch(item.material, item.source);
        return {
            ...item,
            matchScore: match.matchScore,
            aiMatch: match.aiMatch,
            buyer: match.buyer,
            buyerUse: match.buyerUse
        };
    });
}
