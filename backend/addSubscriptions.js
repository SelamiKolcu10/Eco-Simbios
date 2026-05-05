/**
 * Eco-Simbios — Add Subscriptions & Emails to 15 Facilities
 * Run once:  node addSubscriptions.js
 * 
 * This script picks 15 existing facilities from the database,
 * assigns realistic email addresses and mixed subscription plans
 * (free, pro, enterprise), then saves them.
 */

const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const Facility = require('./src/models/Facility');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ── 15 Facility updates: id → { email, subscription plan } ─────────────────
const FACILITY_UPDATES = [
    // ─── FREE Plan (5 facilities) ───────────────────────────────────────────
    {
        id: 'm1',
        email: 'kocaeliotomotiv@gmail.com',
        plan: 'free',
    },
    {
        id: 'e3',
        email: 'denizlitekstil@gmail.com',
        plan: 'pro',
    },
    {
        id: 'k2',
        email: 'trabzonfindik@gmail.com',
        plan: 'free',
    },
    {
        id: 'cg1',
        email: 'konyaorganiksera@gmail.com',
        plan: 'pro',
    },
    {
        id: 'ac5',
        email: 'kmarasorganik@gmail.com',
        plan: 'free',
    },

    // ─── PRO Plan (5 facilities) ────────────────────────────────────────────
    {
        id: 'm3',
        email: 'bursaotomotiv@gmail.com',
        plan: 'pro',
    },
    {
        id: 'e1',
        email: 'izmirtekstil@gmail.com',
        plan: 'pro',
    },
    {
        id: 'c1',
        email: 'ankaracelik@gmail.com',
        plan: 'pro',
    },
    {
        id: 'a2',
        email: 'mersinpetrokimya@gmail.com',
        plan: 'pro',
    },
    {
        id: 'mc1',
        email: 'bursakadintarim@gmail.com',
        plan: 'pro',
    },

    // ─── ENTERPRISE Plan (5 facilities) ─────────────────────────────────────
    {
        id: 'c2',
        email: 'eskisehircimento@gmail.com',
        plan: 'enterprise',
    },
    {
        id: 'a4',
        email: 'gaziantepcam@gmail.com',
        plan: 'enterprise',
    },
    {
        id: 'k1',
        email: 'samsuncelik@gmail.com',
        plan: 'enterprise',
    },
    {
        id: 'ac1',
        email: 'gaziantepbereket@gmail.com',
        plan: 'enterprise',
    },
    {
        id: 'e5',
        email: 'izmirpetrokimya@gmail.com',
        plan: 'enterprise',
    },
];

// ── Helper: random past date within last year ──────────────────────────────
function randomStartDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 300) + 30; // 30–330 days ago
    return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

// ── Main ───────────────────────────────────────────────────────────────────
const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n🟢 MongoDB Connected\n');

    let updated = 0;
    let skipped = 0;

    for (const item of FACILITY_UPDATES) {
        const facility = await Facility.findOne({ id: item.id });

        if (!facility) {
            console.log(`⚠️  Facility "${item.id}" not found — skipping.`);
            skipped++;
            continue;
        }

        // Set email
        facility.email = item.email;

        // Set subscription
        const startDate = randomStartDate();
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);

        facility.subscription = {
            plan: item.plan,
            startDate,
            endDate,
            isActive: true,
        };

        // Set some billing mock data for pro/enterprise
        if (item.plan === 'pro') {
            facility.billing = {
                totalCommissionPaid: Math.floor(Math.random() * 5000) + 1000,
                totalTransactionValue: Math.floor(Math.random() * 100000) + 20000,
                transactionCount: Math.floor(Math.random() * 15) + 3,
            };
        } else if (item.plan === 'enterprise') {
            facility.billing = {
                totalCommissionPaid: Math.floor(Math.random() * 15000) + 5000,
                totalTransactionValue: Math.floor(Math.random() * 300000) + 80000,
                transactionCount: Math.floor(Math.random() * 30) + 10,
            };
        } else {
            facility.billing = {
                totalCommissionPaid: Math.floor(Math.random() * 500),
                totalTransactionValue: Math.floor(Math.random() * 10000),
                transactionCount: Math.floor(Math.random() * 5),
            };
        }

        await facility.save();
        updated++;

        const planLabel = { free: '🆓 Free', pro: '⭐ Pro', enterprise: '🏢 Enterprise' };
        console.log(
            `✅ ${facility.name} → ${planLabel[item.plan]} | ${item.email}`
        );
    }

    console.log(`\n📊 Sonuç: ${updated} tesis güncellendi, ${skipped} atlandı.\n`);

    // Summary
    const allFacilities = await Facility.find({ email: { $exists: true, $ne: null } })
        .select('name email subscription.plan')
        .sort({ 'subscription.plan': 1 });

    console.log('📋 E-posta ve aboneliği olan tesisler:');
    allFacilities.forEach((f) => {
        console.log(`   ${f.subscription?.plan?.toUpperCase().padEnd(12)} | ${f.email?.padEnd(40)} | ${f.name}`);
    });
    console.log();

    process.exit(0);
};

run().catch((err) => {
    console.error('🔴 Error:', err.message);
    process.exit(1);
});
