export const marketListings = [
    { id: 1, type: 'Satılık Atık', material: 'Tekstil Kırpıntıları', amount: '5 Ton', source: 'Denizli Tekstil A.Ş.', category: 'Textile', tag: 'Geri Dönüştürülebilir', matchScore: 92, aiMatch: true, buyer: 'Bursa Otomotiv Yan Sanayi', buyerUse: 'Araç İzolasyon Malzemesi', income: '45.000 TL', co2: '2.1 Ton' },
    { id: 2, type: 'Aranan Hammadde', material: 'İzolasyon Dolgusu', amount: '3 Ton', source: 'Bursa Otomotiv Yan Sanayi', category: 'Textile', tag: 'Geri Dönüştürülebilir', matchScore: 88, aiMatch: true, buyer: 'Denizli Tekstil A.Ş.', buyerUse: 'Tekstil kırpıntılarından üretim', income: '38.000 TL', co2: '1.8 Ton' },
    { id: 3, type: 'Satılık Atık', material: 'Bakır Kablo Hurdası', amount: '500 kg', source: 'Kocaeli Kablo', category: 'Metal', tag: 'Geri Dönüştürülebilir', matchScore: 95, aiMatch: true, buyer: 'İstanbul Elektronik Geri Dönüşüm', buyerUse: 'PCB ve kablo üretimi', income: '62.000 TL', co2: '2.5 Ton' },
    { id: 4, type: 'Satılık Atık', material: 'Ahşap Palet (Hasarlı)', amount: '200 Adet', source: 'Lojistik Depo', category: 'Wood', tag: 'Enerji Kaynağı', matchScore: 65, aiMatch: false, buyer: 'Biyokütle Enerji Tesisi', buyerUse: 'Biyokütle yakıt / Mobilya', income: '12.000 TL', co2: '0.4 Ton' },
    { id: 5, type: 'Satılık Atık', material: 'Kullanılmış Motor Yağı', amount: '800 L', source: 'İzmir Oto Servis', category: 'Chemical', tag: 'Tehlikeli', matchScore: 58, aiMatch: false, buyer: 'İzmit Rafinerisi', buyerUse: 'Yeniden rafinasyon', income: '8.500 TL', co2: '1.2 Ton' },
    { id: 6, type: 'Satılık Atık', material: 'Alüminyum Talaş', amount: '300 kg', source: 'Bursa CNC Atölyesi', category: 'Metal', tag: 'Geri Dönüştürülebilir', matchScore: 91, aiMatch: true, buyer: 'Seydişehir Alüminyum', buyerUse: 'Ergitme ve yeniden üretim', income: '28.000 TL', co2: '3.1 Ton' },
    { id: 7, type: 'Aranan Hammadde', material: 'Geri Dönüşüm Plastik Granül', amount: '2 Ton', source: 'Bursa Oyuncak Üretimi', category: 'Plastic', tag: 'Geri Dönüştürülebilir', matchScore: 78, aiMatch: false, buyer: 'PET Geri Dönüşüm (Kocaeli)', buyerUse: 'Enjeksiyon kalıplama', income: '35.000 TL', co2: '1.5 Ton' },
    { id: 8, type: 'Satılık Atık', material: 'Cam Kırığı (Cullet)', amount: '1.5 Ton', source: 'Mersin Şişe Fabrikası', category: 'Chemical', tag: 'Geri Dönüştürülebilir', matchScore: 74, aiMatch: false, buyer: 'Şişecam Tesisi', buyerUse: 'Cam üretimi hammaddesi', income: '18.000 TL', co2: '0.7 Ton' },
];

export const tagStyles = {
    'Geri Dönüştürülebilir': 'bg-eco-500/15 text-eco-400 border-eco-500/20',
    'Tehlikeli': 'bg-red-500/15 text-red-400 border-red-500/20',
    'Enerji Kaynağı': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
};

export const typeStyles = {
    'Satılık Atık': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Aranan Hammadde': 'text-eco-400 bg-eco-500/10 border-eco-500/20',
};
