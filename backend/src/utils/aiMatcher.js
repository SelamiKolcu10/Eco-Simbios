/**
 * AI Matcher Engine - Analytical Implementation
 */

function haversineDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return -1;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

exports.calculateMatchScore = (listing, targetFacility, sourceFacility) => {
    // 1. Distance Score (Mesafe Skoru)
    let distance = haversineDistance(
        sourceFacility.location?.lat, sourceFacility.location?.lng,
        targetFacility.location?.lat, targetFacility.location?.lng
    );

    let distanceScore = 0;
    if (distance === -1) {
        // Fallback for missing coordinates
        distanceScore = 30; 
    } else if (distance <= 50) {
        distanceScore = 100;
    } else if (distance >= 500) {
        distanceScore = 10;
    } else {
        // Drop gradually between 50km and 500km
        distanceScore = 100 - ((distance - 50) / 450) * 90;
    }

    // 2. Synergy Score (Uyum Skoru)
    let synergyScore = 40; // baseline
    const listCat = (listing.category || '').toLowerCase();
    const targetType = (targetFacility.type || '').toLowerCase();
    const targetSector = (targetFacility.sector || '').toLowerCase();

    if ((listCat === 'organik' || listCat === 'biyokütle') && 
        (targetType === 'greenhouse' || targetType === 'cooperative')) {
        synergyScore = 100;
    } else if ((listCat === 'metal' || listCat === 'kimyasal') && targetType === 'factory') {
        synergyScore = 100;
    } else if (targetSector.includes('geri dönüşüm') || targetSector === 'recycling') {
        synergyScore = 95;
    } else if (listCat === 'plastik' && targetType === 'factory') {
        synergyScore = 80;
    } else if (listCat === 'ahşap' && targetType === 'factory') {
        synergyScore = 70;
    }

    // 3. Final Match Score: 60% Synergy, 40% Distance
    const finalScore = Math.round((synergyScore * 0.6) + (distanceScore * 0.4));
    
    return {
        score: finalScore,
        distance: distance === -1 ? null : Math.round(distance)
    };
};
