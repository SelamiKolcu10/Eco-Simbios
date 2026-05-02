const Listing = require('../models/Listing');
const Facility = require('../models/Facility');
const Match = require('../models/Match');

// @route   GET /api/stats/summary
// @desc    Get dashboard KPIs for the logged-in user
// @access  Private
exports.getSummary = async (req, res) => {
    try {
        const facilityId = req.facilityId;
        const facility = facilityId ? await Facility.findById(facilityId) : null;

        // 1. Fetch ALL data needed for calculations
        const allListings = await Listing.find();
        const CO2_MULTIPLIER = 2.3;

        // 2. Calculate Global Impact (Always needed for Social Impact portal)
        let globalWasteProcessed = 0;
        let globalCarbonSaved = 0;
        allListings.forEach(l => {
            if (l.status === 'matched') {
                const tons = (l.amount || 0) / 1000;
                globalWasteProcessed += tons;
                globalCarbonSaved += tons * CO2_MULTIPLIER;
            }
        });

        // 3. Calculate Dashboard Stats (Personalized for logged-in users)
        let dashboardListingsCount = 0;
        let dashboardMatchedCount = 0;
        let dashboardWaste = 0;
        let dashboardCarbon = 0;

        if (facility) {
            if (facility.role === 'admin') {
                // Admins see EVERYTHING in their overview
                dashboardListingsCount = allListings.length;
                dashboardMatchedCount = allListings.filter(l => l.status === 'matched').length;
                dashboardWaste = globalWasteProcessed;
                dashboardCarbon = globalCarbonSaved;
            } else {
                // Regular facilities see their own listings + matches they participated in
                const myOwnedListings = allListings.filter(l => l.createdBy.toString() === facilityId.toString());
                dashboardListingsCount = myOwnedListings.length;
                
                // Impact from owned listings that are matched
                myOwnedListings.forEach(l => {
                    if (l.status === 'matched') {
                        dashboardMatchedCount++;
                        const tons = (l.amount || 0) / 1000;
                        dashboardWaste += tons;
                        dashboardCarbon += tons * CO2_MULTIPLIER;
                    }
                });

                // Impact from matches where the user was the buyer
                const buyerMatches = await Match.find({ fromFacility: facilityId }).populate('toListing');
                buyerMatches.forEach(m => {
                    if (m.toListing && m.toListing.status === 'matched') {
                        // Avoid double count if owner is somehow buyer
                        if (m.toListing.createdBy.toString() !== facilityId.toString()) {
                            dashboardMatchedCount++;
                            const tons = (m.toListing.amount || 0) / 1000;
                            dashboardWaste += tons;
                            dashboardCarbon += tons * CO2_MULTIPLIER;
                        }
                    }
                });
            }
        }

        // 4. Social Impact Portal Metrics (Dynamic)
        const baseBudget = 125000;
        const dynamicBudget = baseBudget + Math.floor(globalCarbonSaved * 2500); // Increased from 800 to 2500
        const dynamicScholarships = 120 + Math.floor(globalWasteProcessed / 2.5); // Increased from /10 to /2.5 (4 scholarships per 10 tons)
        const dynamicInterns = 49 + Math.floor(globalWasteProcessed / 20);
        const dynamicWomen = 29 + Math.floor(globalWasteProcessed / 50) * 3;
        const dynamicClubs = 15 + Math.floor(globalWasteProcessed / 100);
        const dynamicGreenhouses = 24 + Math.floor(globalWasteProcessed / 150);
        const dynamicFactories = 12 + Math.floor(allListings.length / 5);

        // 5. Calculate Sustainability Score (1-10)
        let sustainabilityScore = 0;
        if (facility) {
            // Formula: (Matches * 1.5) + (CO2 / 10) + (Listings * 0.1)
            sustainabilityScore = (dashboardMatchedCount * 1.5) + (dashboardCarbon / 10) + (dashboardListingsCount * 0.1);
            
            // Adjust base score if they have any activity
            if (dashboardListingsCount > 0 && sustainabilityScore < 4) sustainabilityScore = 4.2; 
            
            sustainabilityScore = Math.min(10, Math.max(1, sustainabilityScore)); 
            sustainabilityScore = Math.round(sustainabilityScore * 10) / 10;
        } else {
            // Default/Guest platform score
            sustainabilityScore = 8.4;
        }

        res.status(200).json({
            success: true,
            data: {
                // Dashboard metrics
                totalListingsCount: dashboardListingsCount,
                activeListingsCount: dashboardListingsCount,
                matchedListingsCount: dashboardMatchedCount,
                totalWasteProcessed: Math.round(dashboardWaste * 10) / 10,
                totalCarbonSaved: Math.round(dashboardCarbon * 10) / 10,
                sustainabilityScore: sustainabilityScore,
                
                // Global metrics
                globalWasteProcessed: Math.round(globalWasteProcessed * 10) / 10,
                globalCarbonSaved: Math.round(globalCarbonSaved * 10) / 10,
                
                // Social Impact data
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
