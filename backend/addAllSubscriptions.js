/**
 * Eco-Simbios — Add Subscriptions & Emails to ALL remaining facilities
 * Run once:  node addAllSubscriptions.js
 *
 * Finds every facility WITHOUT an email, generates a gmail address,
 * and assigns a subscription plan (mostly pro & enterprise).
 */

const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const Facility = require('./src/models/Facility');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ── Helper: turn Turkish facility name into a gmail-friendly slug ───────────
function nameToEmail(name) {
    return name
        .toLowerCase()
        .replace(/ş/g, 's')
        .replace(/ç/g, 'c')
        .replace(/ğ/g, 'g')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ü/g, 'u')
        .replace(/â/g, 'a')
        .replace(/î/g, 'i')
        .replace(/[^a-z0-9]/g, '')   // remove all non-alphanumeric
        .slice(0, 30)                 // keep it reasonable
        + '@gmail.com';
}

// ── Helper: random past date within last year ──────────────────────────────
function randomStartDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 300) + 30;
    return new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
}

// ── Plan distribution: ~20% free, ~45% pro, ~35% enterprise ────────────────
function pickPlan(index) {
    const cycle = index % 10;
    // 0,1        → free       (20%)
    // 2,3,4,5    → pro        (40%)
    // 6,7,8,9    → enterprise (40%)
    if (cycle <= 1) return 'free';
    if (cycle <= 5) return 'pro';
    return 'enterprise';
}

// ── Main ───────────────────────────────────────────────────────────────────
const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n🟢 MongoDB Connected\n');

    // Find facilities that have NO email
    const facilities = await Facility.find({
        $or: [
            { email: { $exists: false } },
            { email: null },
            { email: '' },
        ],
        role: { $ne: 'admin' },   // skip admin accounts
    });

    console.log(`📦 E-postası olmayan ${facilities.length} tesis bulundu.\n`);

    if (facilities.length === 0) {
        console.log('✅ Tüm tesislerin zaten e-postası var!');
        process.exit(0);
    }

    let updated = 0;
    const usedEmails = new Set();

    for (let i = 0; i < facilities.length; i++) {
        const facility = facilities[i];

        // Generate unique email
        let email = nameToEmail(facility.name);
        // If duplicate, append index
        if (usedEmails.has(email)) {
            email = email.replace('@gmail.com', `${i}@gmail.com`);
        }
        usedEmails.add(email);

        facility.email = email;

        // Pick plan (mostly pro & enterprise)
        const plan = pickPlan(i);

        const startDate = randomStartDate();
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 1);

        facility.subscription = {
            plan,
            startDate,
            endDate,
            isActive: true,
        };

        // Mock billing data scaled by plan
        if (plan === 'enterprise') {
            facility.billing = {
                totalCommissionPaid: Math.floor(Math.random() * 15000) + 5000,
                totalTransactionValue: Math.floor(Math.random() * 300000) + 80000,
                transactionCount: Math.floor(Math.random() * 30) + 10,
            };
        } else if (plan === 'pro') {
            facility.billing = {
                totalCommissionPaid: Math.floor(Math.random() * 5000) + 1000,
                totalTransactionValue: Math.floor(Math.random() * 100000) + 20000,
                transactionCount: Math.floor(Math.random() * 15) + 3,
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
            `✅ ${facility.name.padEnd(35)} → ${planLabel[plan].padEnd(16)} | ${email}`
        );
    }

    console.log(`\n📊 Sonuç: ${updated} tesis güncellendi.\n`);

    // Final summary — count by plan
    const allFacilities = await Facility.find({ role: { $ne: 'admin' } });
    const dist = { free: 0, pro: 0, enterprise: 0 };
    allFacilities.forEach((f) => {
        const p = f.subscription?.plan || 'free';
        dist[p]++;
    });

    console.log('📊 Abonelik Dağılımı:');
    console.log(`   🆓 Free:       ${dist.free}`);
    console.log(`   ⭐ Pro:        ${dist.pro}`);
    console.log(`   🏢 Enterprise: ${dist.enterprise}`);
    console.log(`   📦 Toplam:     ${allFacilities.length}\n`);

    process.exit(0);
};

run().catch((err) => {
    console.error('🔴 Error:', err.message);
    process.exit(1);
});
