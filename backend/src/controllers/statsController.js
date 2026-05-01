const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const Match = require('../models/Match');

// @route   GET /api/stats/summary
// @desc    Get dashboard KPIs for the logged-in user
// @access  Private
exports.getSummary = async (req, res) => {
    try {
        const facilityId = req.facilityId;
        const facility = await Facility.findById(facilityId);

        let query = {};
        if (facility && facility.role !== 'admin') {
            query.createdBy = facilityId;
        }

        // Fetch listings for the specific user (or all if admin)
        const listings = await Listing.find(query);

        // Fetch matches where the user is the buyer (to include in their stats)
        let buyerMatches = [];
        if (facility && facility.role !== 'admin') {
            buyerMatches = await Match.find({ fromFacility: facilityId }).populate('toListing');
        }

        // ALWAYS fetch all listings for the global social impact calculations
        const allListings = await Listing.find();

        let activeListingsCount = 0;
        let matchedListingsCount = 0;
        let totalWasteProcessed = 0; // in tons
        let totalCarbonSaved = 0; // estimate

        const CO2_MULTIPLIER = 2.3;

        // Process listings owned by the user
        listings.forEach(listing => {
            if (listing.status === 'active') {
                activeListingsCount++;
            } else if (listing.status === 'matched') {
                matchedListingsCount++;
                const amountInTons = (listing.amount || 0) / 1000;
                totalWasteProcessed += amountInTons;
                totalCarbonSaved += amountInTons * CO2_MULTIPLIER;
            }
        });

        // Add impact from matches where the user was the buyer
        buyerMatches.forEach(match => {
            if (match.toListing && match.toListing.status === 'matched') {
                // Ensure we don't double count if somehow the user bought their own listing
                if (match.toListing.createdBy.toString() !== facilityId.toString()) {
                    matchedListingsCount++;
                    const amountInTons = (match.toListing.amount || 0) / 1000;
                    totalWasteProcessed += amountInTons;
                    totalCarbonSaved += amountInTons * CO2_MULTIPLIER;
                }
            }
        });

        // Global Stats Calculation for Social Impact
        let globalWasteProcessed = 0;
        let globalCarbonSaved = 0;
        allListings.forEach(listing => {
            if (listing.status === 'matched') {
                const amountInTons = (listing.amount || 0) / 1000;
                globalWasteProcessed += amountInTons;
                globalCarbonSaved += amountInTons * CO2_MULTIPLIER;
            }
        });

        // Dinamik Sosyal Etki Hesaplamaları (Base MVP değerlerinin üzerine eklenir)
        const baseBudget = 125000;
        const dynamicBudget = baseBudget + Math.floor(globalCarbonSaved * 800); // Her ton CO2 = 800 ₺ fon

        const baseScholarships = 120;
        const dynamicScholarships = baseScholarships + Math.floor(globalWasteProcessed / 10);

        const baseInterns = 49;
        const dynamicInterns = baseInterns + Math.floor(globalWasteProcessed / 20);

        const baseWomen = 29;
        const dynamicWomen = baseWomen + Math.floor(globalWasteProcessed / 50) * 3;

        const baseClubs = 15;
        const dynamicClubs = baseClubs + Math.floor(globalWasteProcessed / 100);

        const baseGreenhouses = 24;
        const dynamicGreenhouses = baseGreenhouses + Math.floor(globalWasteProcessed / 150);

        const baseFactories = 12;
        const dynamicFactories = baseFactories + Math.floor(allListings.length / 5);

        res.status(200).json({
            success: true,
            data: {
                totalListingsCount: listings.length,
                activeListingsCount,
                matchedListingsCount,
                totalWasteProcessed: Math.round(totalWasteProcessed * 10) / 10,
                totalCarbonSaved: Math.round(totalCarbonSaved * 10) / 10,
                globalWasteProcessed: Math.round(globalWasteProcessed * 10) / 10,
                globalCarbonSaved: Math.round(globalCarbonSaved * 10) / 10,
                socialImpact: {
                    budget: dynamicBudget,
                    scholarships: dynamicScholarships,
                    interns: dynamicInterns,
                    womenEmployed: dynamicWomen,
                    clubsSupported: dynamicClubs,
                    greenhouses: dynamicGreenhouses,
                    partnerFactories: dynamicFactories
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
