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

const distanceScore = (distance) => {
    if (distance === -1) return 50;
    if (distance <= 50) return 100;
    if (distance >= 500) return 10;
    return 100 - ((distance - 50) / 450) * 90;
};

const evaluateMatch = (listing, buyerFacility, requestedAmount) => {
    // 1. Layer 1: Kategori/Mantık Eşleşmesi (Hard Filter)
    const needed = buyerFacility.resourceNeeded || [];
    if (!needed.includes(listing.category)) {
        return { matchScore: 0, isMatch: false, reason: "Category mismatch" };
    }

    // 2. Layer 2: Lojistik ve Karbon Skoru (Spatial/Carbon Score - 60% Etki)
    const sourceLoc = listing.createdBy?.location || {};
    const buyerLoc = buyerFacility.location || {};

    let distance = haversineDistance(
        sourceLoc.lat, sourceLoc.lng,
        buyerLoc.lat, buyerLoc.lng
    );

    const dScore = distanceScore(distance);

    // 3. Layer 3: Miktar Eşleşmesi (Volume Score - 40% Etki)
    let vScore = 100;
    if (requestedAmount && requestedAmount > 0) {
        const ratio = (listing.amount || 0) / requestedAmount;
        if (ratio >= 1) {
            vScore = 100;
        } else if (ratio >= 0.5) {
            vScore = 80;
        } else {
            vScore = Math.floor(ratio * 100);
        }
    }

    // Final Output: 60% Distance, 40% Volume
    const matchScore = Math.floor((dScore * 0.6) + (vScore * 0.4));

    return {
        matchScore,
        isMatch: true,
        distanceKm: distance === -1 ? null : Math.round(distance),
        breakdown: {
            distanceScore: Math.floor(dScore),
            volumeScore: vScore
        },
        reason: "Match successful based on category, volume, and distance."
    };
};

module.exports = { evaluateMatch, haversineDistance };
