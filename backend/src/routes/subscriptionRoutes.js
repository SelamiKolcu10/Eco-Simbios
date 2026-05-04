const express = require('express');
const Facility = require('../models/Facility');
const Transaction = require('../models/Transaction');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// ─── Plan Definitions (Shared constant) ──────────────────────────────────────
const PLANS = {
    free: {
        id: 'free',
        name: 'Başlangıç',
        price: 0,
        commissionRate: 3,
        listingLimit: 5,
        features: [
            'Aylık 5 ilan hakkı',
            'Temel AI eşleştirme',
            'Topluluk desteği',
        ],
        color: 'slate',
    },
    pro: {
        id: 'pro',
        name: 'Profesyonel',
        price: 2499,
        commissionRate: 2,
        listingLimit: -1, // unlimited
        features: [
            'Sınırsız ilan',
            'Gelişmiş AI eşleştirme',
            'Sürdürülebilirlik sertifikası',
            'Öncelikli destek',
            'Detaylı raporlama',
        ],
        color: 'emerald',
        popular: true,
    },
    enterprise: {
        id: 'enterprise',
        name: 'Kurumsal',
        price: 7999,
        commissionRate: 1,
        listingLimit: -1,
        features: [
            'Pro planın tüm özellikleri',
            'API erişimi',
            'Özel entegrasyon desteği',
            'Beyaz etiket raporlama',
            'Karbon kredi danışmanlığı',
            'Dedike hesap yöneticisi',
        ],
        color: 'violet',
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/subscription/plans
// @desc    Get all available subscription plans
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
router.get('/plans', (req, res) => {
    res.status(200).json({
        success: true,
        data: Object.values(PLANS),
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/subscription/my
// @desc    Get the current facility's subscription info
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
router.get('/my', protect, async (req, res) => {
    try {
        const facility = await Facility.findById(req.facilityId);
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Tesis bulunamadı.' });
        }

        const currentPlan = facility.subscription?.plan || 'free';
        const planDetails = PLANS[currentPlan];

        // Get transaction history for this facility
        const transactions = await Transaction.find({
            $or: [{ seller: facility._id }, { buyer: facility._id }],
        })
            .populate('seller', 'name')
            .populate('buyer', 'name')
            .populate('listing', 'wasteType amount')
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            data: {
                plan: planDetails,
                subscription: facility.subscription || { plan: 'free', isActive: true },
                billing: facility.billing || { totalCommissionPaid: 0, totalTransactionValue: 0, transactionCount: 0 },
                transactions,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   PUT /api/subscription/upgrade
// @desc    Upgrade the subscription plan (Mock — no real payment)
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
router.put('/upgrade', protect, async (req, res) => {
    try {
        const { plan } = req.body;

        if (!PLANS[plan]) {
            return res.status(400).json({ success: false, message: 'Geçersiz plan.' });
        }

        const facility = await Facility.findById(req.facilityId);
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Tesis bulunamadı.' });
        }

        const now = new Date();
        const endDate = new Date(now);
        endDate.setFullYear(endDate.getFullYear() + 1); // 1-year subscription

        facility.subscription = {
            plan,
            startDate: now,
            endDate,
            isActive: true,
        };
        await facility.save();

        res.status(200).json({
            success: true,
            message: `Planınız "${PLANS[plan].name}" olarak güncellendi.`,
            data: {
                plan: PLANS[plan],
                subscription: facility.subscription,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/subscription/revenue
// @desc    Get platform revenue overview (Admin only)
// @access  Private (Admin)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/revenue', protect, async (req, res) => {
    try {
        const facility = await Facility.findById(req.facilityId);
        if (!facility || facility.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok.' });
        }

        // 1. Get all transactions
        const allTransactions = await Transaction.find()
            .populate('seller', 'name type subscription')
            .populate('buyer', 'name type')
            .populate('listing', 'wasteType amount category')
            .sort({ createdAt: -1 });

        // 2. Calculate totals
        const totalRevenue = allTransactions.reduce((sum, t) => sum + (t.commissionAmount || 0), 0);
        const totalVolume = allTransactions.reduce((sum, t) => sum + (t.estimatedValue || 0), 0);

        // 3. Subscription distribution
        const allFacilities = await Facility.find({ role: { $ne: 'admin' } });
        const subscriptionDistribution = {
            free: 0,
            pro: 0,
            enterprise: 0,
        };
        allFacilities.forEach((f) => {
            const plan = f.subscription?.plan || 'free';
            subscriptionDistribution[plan]++;
        });

        // 4. Monthly revenue breakdown (last 6 months)
        const monthlyRevenue = [];
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const monthTransactions = allTransactions.filter((t) => {
                const d = new Date(t.createdAt);
                return d >= monthStart && d <= monthEnd;
            });

            const revenue = monthTransactions.reduce((s, t) => s + (t.commissionAmount || 0), 0);
            monthlyRevenue.push({
                month: monthStart.toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' }),
                revenue: Math.round(revenue),
                count: monthTransactions.length,
            });
        }

        // 5. Projected annual subscription revenue
        const subscriptionRevenue =
            subscriptionDistribution.pro * PLANS.pro.price * 12 +
            subscriptionDistribution.enterprise * PLANS.enterprise.price * 12;

        res.status(200).json({
            success: true,
            data: {
                totalRevenue: Math.round(totalRevenue),
                totalVolume: Math.round(totalVolume),
                totalTransactions: allTransactions.length,
                subscriptionDistribution,
                subscriptionRevenue,
                monthlyRevenue,
                recentTransactions: allTransactions.slice(0, 10),
                plans: PLANS,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
