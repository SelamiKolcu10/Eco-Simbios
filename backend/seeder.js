/**
 * Eco-Simbios — Database Seeder
 * Run once:  node seeder.js
 * To clear:  node seeder.js --destroy
 */

const mongoose = require('mongoose');
const dns = require('dns');
const dotenv = require('dotenv');
const Facility = require('./src/models/Facility');

dotenv.config();
dns.setServers(['8.8.8.8', '8.8.4.4']);

const SEED_DATA = [
    /* ═══════════════════════ MARMARA ═══════════════════════ */
    // Factories
    { id: 'm1', name: 'Kocaeli Otomotiv OSB',      type: 'Factory',     region: 'Marmara',      lat: 40.78, lng: 29.53, sector: 'Otomotiv',   tons: 2400, wasteProduced: ['Metal Hurda', 'Atık Isı'], resourceNeeded: [] },
    { id: 'm2', name: 'Gebze Plastik OSB',          type: 'Factory',     region: 'Marmara',      lat: 40.80, lng: 29.44, sector: 'Kimya',      tons: 1800, wasteProduced: ['Plastik Granül', 'Çözücü'], resourceNeeded: [] },
    { id: 'm3', name: 'Bursa Otomotiv Fabrikası',   type: 'Factory',     region: 'Marmara',      lat: 40.22, lng: 28.96, sector: 'Otomotiv',   tons: 3200, wasteProduced: ['Atık Isı', 'Tekstil Kırpıntısı'], resourceNeeded: [] },
    { id: 'm4', name: 'Tekirdağ Kimya Tesisi',      type: 'Factory',     region: 'Marmara',      lat: 41.00, lng: 27.55, sector: 'Kimya',      tons: 1500, wasteProduced: ['Çözücü'], resourceNeeded: [] },
    { id: 'm5', name: 'Yalova Kâğıt Fabrikası',    type: 'Factory',     region: 'Marmara',      lat: 40.66, lng: 29.27, sector: 'Kâğıt',     tons: 900,  wasteProduced: ['Atık Isı', 'Biyokütle'], resourceNeeded: [] },
    { id: 'm6', name: 'Sakarya Demir-Çelik',        type: 'Factory',     region: 'Marmara',      lat: 40.69, lng: 30.40, sector: 'Metal',      tons: 2800, wasteProduced: ['Çelik Talaşı', 'Atık Isı'], resourceNeeded: [] },
    { id: 'm7', name: 'Balıkesir Gıda Sanayi',     type: 'Factory',     region: 'Marmara',      lat: 39.65, lng: 27.89, sector: 'Gıda',      tons: 750,  wasteProduced: ['Organik Atık'], resourceNeeded: [] },
    { id: 'm8', name: 'İstanbul Ambalaj Tesisi',   type: 'Factory',     region: 'Marmara',      lat: 41.02, lng: 28.95, sector: 'Plastik',    tons: 1100, wasteProduced: ['Plastik Granül'], resourceNeeded: [] },
    { id: 'm9', name: 'Çerkezköy Tekstil OSB',     type: 'Factory',     region: 'Marmara',      lat: 41.28, lng: 27.98, sector: 'Tekstil',    tons: 1650, wasteProduced: ['Tekstil Kırpıntısı'], resourceNeeded: [] },
    { id: 'm10', name: 'Düzce Ahşap Sanayi',        type: 'Factory',     region: 'Marmara',      lat: 40.84, lng: 31.16, sector: 'Ahşap',     tons: 620,  wasteProduced: ['Talaş', 'Biyokütle'], resourceNeeded: [] },
    // Greenhouses
    { id: 'mg1', name: 'Bursa Organik Sera',         type: 'Greenhouse',  region: 'Marmara',      lat: 40.14, lng: 28.80, sector: 'Tarım',     tons: 340,  wasteProduced: [], resourceNeeded: ['Atık Isı', 'Organik Kompost'] },
    { id: 'mg2', name: 'Yalova Jeotermal Sera',      type: 'Greenhouse',  region: 'Marmara',      lat: 40.60, lng: 29.10, sector: 'Tarım',     tons: 280,  wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'mg3', name: 'Bilecik Sera Bölgesi',       type: 'Greenhouse',  region: 'Marmara',      lat: 40.05, lng: 30.00, sector: 'Tarım',     tons: 190,  wasteProduced: [], resourceNeeded: ['Biyokütle', 'Organik Atık'] },
    // Cooperatives
    { id: 'mc1', name: 'Bursa Kadın Tarım Koop.',    type: 'Cooperative', region: 'Marmara',      lat: 40.18, lng: 29.06, sector: 'Kooperatif', tons: 180, women: 25, carbon: 620, temp: 26, humidity: 68, soilMoisture: 58, iot: 'Aktif', efficiency: 91, source: 'Bursa Tekstil OSB', wasteProduced: [], resourceNeeded: ['Atık Isı', 'Organik'] },
    { id: 'mc2', name: 'Yalova Kadın Sera Koop.',    type: 'Cooperative', region: 'Marmara',      lat: 40.63, lng: 29.20, sector: 'Kooperatif', tons: 120, women: 18, carbon: 380, temp: 24, humidity: 72, soilMoisture: 60, iot: 'Aktif', efficiency: 88, source: 'Yalova Kâğıt Fabrikası', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'mc3', name: 'Sakarya Ekolojik Sera Koop.',type: 'Cooperative', region: 'Marmara',      lat: 40.72, lng: 30.35, sector: 'Kooperatif', tons: 145, women: 22, carbon: 490, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Sakarya Demir-Çelik', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'mc4', name: 'Kocaeli Kadın Üretim Koop.',type: 'Cooperative', region: 'Marmara',       lat: 40.82, lng: 29.62, sector: 'Kooperatif', tons: 200, women: 30, carbon: 710, temp: 27, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 93, source: 'Kocaeli Otomotiv OSB', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'mc5', name: 'Balıkesir Organik Kadın Koop.', type: 'Cooperative', region: 'Marmara',  lat: 39.70, lng: 27.95, sector: 'Kooperatif', tons:  95, women: 16, carbon: 310, temp: 23, humidity: 74, soilMoisture: 64, iot: 'Aktif', efficiency: 86, source: 'Balıkesir Gıda Sanayi', wasteProduced: [], resourceNeeded: ['Organik Atık'] },

    /* ════════════════════════ EGE ════════════════════════════ */
    { id: 'e1', name: 'İzmir Tekstil Atölyesi', type: 'Factory', region: 'Ege', lat: 38.42, lng: 27.14, sector: 'Tekstil', tons: 2100, wasteProduced: ['Kumaş Atığı', 'Atık Su', 'Boya Çamuru'], resourceNeeded: ['Bakır Kablo'] },
    { id: 'e2', name: 'Manisa Elektrik-Elektronik', type: 'Factory', region: 'Ege', lat: 38.62, lng: 27.43, sector: 'Elektronik', tons: 980, wasteProduced: ['Elektronik Atık', 'Metal Hurda', 'Bakır Kablo'], resourceNeeded: [] },
    { id: 'e3', name: 'Denizli Tekstil Fabrikası', type: 'Factory', region: 'Ege', lat: 37.77, lng: 29.09, sector: 'Tekstil', tons: 1750, wasteProduced: ['Kumaş Atığı'], resourceNeeded: ['Boya Çamuru'] },
    { id: 'e4', name: 'Aydın Gıda İşleme', type: 'Factory', region: 'Ege', lat: 37.85, lng: 27.85, sector: 'Gıda', tons: 640, wasteProduced: ['Organik Atık', 'Atık Su'], resourceNeeded: [] },
    { id: 'e5', name: 'İzmir Petrokimya', type: 'Factory', region: 'Ege', lat: 38.50, lng: 26.90, sector: 'Kimya', tons: 1400, wasteProduced: ['Polimer', 'Atık Isı'], resourceNeeded: [] },
    { id: 'e6', name: 'Uşak Seramik Fabrikası', type: 'Factory', region: 'Ege', lat: 38.68, lng: 29.41, sector: 'İnşaat', tons: 870, wasteProduced: [], resourceNeeded: ['Demir Cürufu', 'Atık Isı'] },
    { id: 'e7', name: 'Muğla Mermer İşleme', type: 'Factory', region: 'Ege', lat: 37.22, lng: 28.36, sector: 'İnşaat', tons: 1100, wasteProduced: ['Mermer Tozu', 'Atık Isı'], resourceNeeded: [] },
    { id: 'e8', name: 'İzmir Demir-Çelik', type: 'Factory', region: 'Ege', lat: 38.35, lng: 27.25, sector: 'Metal', tons: 1950, wasteProduced: ['Demir Cürufu'], resourceNeeded: ['Bakır Kablo'] },
    { id: 'e9', name: 'Afyon Çimento', type: 'Factory', region: 'Ege', lat: 38.74, lng: 30.54, sector: 'İnşaat', tons: 2300, wasteProduced: ['Atık Isı'], resourceNeeded: ['Mermer Tozu'] },
    { id: 'e10', name: 'Manisa Plastik OSB', type: 'Factory', region: 'Ege', lat: 38.55, lng: 27.60, sector: 'Plastik', tons: 760, wasteProduced: [], resourceNeeded: ['Polimer'] },
    { id: 'eg1', name: 'Aydın Jeotermal Sera', type: 'Greenhouse', region: 'Ege', lat: 37.90, lng: 28.10, sector: 'Tarım', tons: 310, wasteProduced: [], resourceNeeded: ['Organik Atık', 'Atık Isı'] },
    { id: 'eg2', name: 'Denizli Organik Sera', type: 'Greenhouse', region: 'Ege', lat: 37.82, lng: 28.90, sector: 'Tarım', tons: 250, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'eg3', name: 'Muğla Bitkisel Sera', type: 'Greenhouse', region: 'Ege', lat: 37.30, lng: 28.60, sector: 'Tarım', tons: 180, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ec1', name: 'Denizli Pamuk Kadın Koop.', type: 'Cooperative', region: 'Ege', lat: 37.72, lng: 29.15, sector: 'Kooperatif', tons: 160, women: 22, carbon: 480, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Denizli Tekstil Fabrikası', wasteProduced: [], resourceNeeded: ['Atık Isı', 'Kumaş'] },
    { id: 'ec2', name: 'Aydın Zeytin Kadın Koop.', type: 'Cooperative', region: 'Ege', lat: 37.80, lng: 27.70, sector: 'Kooperatif', tons: 140, women: 30, carbon: 420, temp: 27, humidity: 66, soilMoisture: 58, iot: 'Aktif', efficiency: 92, source: 'Aydın Gıda İşleme', wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'ec3', name: 'İzmir Kadın Sebze Koop.', type: 'Cooperative', region: 'Ege', lat: 38.48, lng: 27.30, sector: 'Kooperatif', tons: 175, women: 28, carbon: 520, temp: 26, humidity: 68, soilMoisture: 60, iot: 'Aktif', efficiency: 90, source: 'İzmir Tekstil Atölyesi', wasteProduced: [], resourceNeeded: ['Atık Isı', 'Kumaş'] },
    { id: 'ec4', name: 'Manisa Üzüm Kadın Koop.', type: 'Cooperative', region: 'Ege', lat: 38.58, lng: 27.50, sector: 'Kooperatif', tons: 110, women: 19, carbon: 350, temp: 24, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 87, source: 'Manisa Elektrik-Elektronik', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ec5', name: 'Muğla Doğal Ürün Koop.', type: 'Cooperative', region: 'Ege', lat: 37.18, lng: 28.42, sector: 'Kooperatif', tons: 85, women: 15, carbon: 270, temp: 28, humidity: 63, soilMoisture: 55, iot: 'Aktif', efficiency: 85, source: 'Muğla Mermer İşleme', wasteProduced: [], resourceNeeded: ['Atık Isı'] },

    /* ══════════════════════ İÇ ANADOLU ════════════════════════ */
    { id: 'c1', name: 'Ankara Demir-Çelik', type: 'Factory', region: 'İç Anadolu', lat: 39.92, lng: 32.85, sector: 'Metal', tons: 2900, wasteProduced: ['Çelik Talaşı', 'Metal Hurda', 'Atık Isı'], resourceNeeded: [] },
    { id: 'c2', name: 'Eskişehir Çimento', type: 'Factory', region: 'İç Anadolu', lat: 39.78, lng: 30.52, sector: 'İnşaat', tons: 3100, wasteProduced: ['Atık Isı'], resourceNeeded: ['MDF Tozu'] },
    { id: 'c3', name: 'Kayseri Demir-Çelik', type: 'Factory', region: 'İç Anadolu', lat: 38.73, lng: 35.48, sector: 'Metal', tons: 2400, wasteProduced: ['Atık Isı'], resourceNeeded: [] },
    { id: 'c4', name: 'Konya Gıda Entegre', type: 'Factory', region: 'İç Anadolu', lat: 37.87, lng: 32.48, sector: 'Gıda', tons: 850, wasteProduced: ['Organik Atık'], resourceNeeded: ['Ambalaj'] },
    { id: 'c5', name: 'Ankara Savunma Sanayi', type: 'Factory', region: 'İç Anadolu', lat: 39.80, lng: 32.60, sector: 'Metal', tons: 1200, wasteProduced: ['Alüminyum'], resourceNeeded: ['Çelik Talaşı'] },
    { id: 'c6', name: 'Kırıkkale Silah Sanayi', type: 'Factory', region: 'İç Anadolu', lat: 39.85, lng: 33.52, sector: 'Metal', tons: 780, wasteProduced: [], resourceNeeded: ['Metal Hurda'] },
    { id: 'c7', name: 'Sivas Çimento Fabrikası', type: 'Factory', region: 'İç Anadolu', lat: 39.75, lng: 37.02, sector: 'İnşaat', tons: 1600, wasteProduced: [], resourceNeeded: ['MDF Tozu'] },
    { id: 'c8', name: 'Konya Plastik OSB', type: 'Factory', region: 'İç Anadolu', lat: 37.92, lng: 32.55, sector: 'Plastik', tons: 680, wasteProduced: ['Ambalaj'], resourceNeeded: [] },
    { id: 'c9', name: 'Kayseri Mobilya Sanayi', type: 'Factory', region: 'İç Anadolu', lat: 38.68, lng: 35.55, sector: 'Ahşap', tons: 520, wasteProduced: ['MDF Tozu'], resourceNeeded: [] },
    { id: 'c10', name: 'Aksaray Otomotiv', type: 'Factory', region: 'İç Anadolu', lat: 38.37, lng: 34.03, sector: 'Otomotiv', tons: 1350, wasteProduced: ['Atık Isı'], resourceNeeded: ['Alüminyum'] },
    { id: 'cg1', name: 'Konya Organik Sera', type: 'Greenhouse', region: 'İç Anadolu', lat: 37.80, lng: 32.35, sector: 'Tarım', tons: 290, wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'cg2', name: 'Kayseri Akıllı Sera', type: 'Greenhouse', region: 'İç Anadolu', lat: 38.80, lng: 35.40, sector: 'Tarım', tons: 210, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'cg3', name: 'Eskişehir Sera Bölgesi', type: 'Greenhouse', region: 'İç Anadolu', lat: 39.70, lng: 30.60, sector: 'Tarım', tons: 270, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'cc1', name: 'Eskişehir Kadın Sera Koop.', type: 'Cooperative', region: 'İç Anadolu', lat: 39.77, lng: 30.52, sector: 'Kooperatif', tons: 200, women: 32, carbon: 840, temp: 28, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 94, source: 'Eskişehir Çimento', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'cc2', name: 'Kayseri Yeşil Vadi Koop.', type: 'Cooperative', region: 'İç Anadolu', lat: 38.76, lng: 35.50, sector: 'Kooperatif', tons: 130, women: 18, carbon: 510, temp: 24, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 88, source: 'Kayseri Demir-Çelik', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'cc3', name: 'Konya Kadın Toprak Koop.', type: 'Cooperative', region: 'İç Anadolu', lat: 37.92, lng: 32.42, sector: 'Kooperatif', tons: 155, women: 24, carbon: 530, temp: 25, humidity: 67, soilMoisture: 59, iot: 'Aktif', efficiency: 90, source: 'Konya Gıda Entegre', wasteProduced: [], resourceNeeded: ['Organik Atık', 'Isı'] },
    { id: 'cc4', name: 'Ankara Kadın Sebze Koop.', type: 'Cooperative', region: 'İç Anadolu', lat: 39.88, lng: 32.72, sector: 'Kooperatif', tons: 120, women: 20, carbon: 410, temp: 23, humidity: 70, soilMoisture: 60, iot: 'Aktif', efficiency: 87, source: 'Ankara Demir-Çelik', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'cc5', name: 'Aksaray Organik Kadın Koop.', type: 'Cooperative', region: 'İç Anadolu', lat: 38.40, lng: 34.08, sector: 'Kooperatif', tons: 90, women: 14, carbon: 295, temp: 26, humidity: 63, soilMoisture: 54, iot: 'Aktif', efficiency: 86, source: 'Aksaray Otomotiv', wasteProduced: [], resourceNeeded: ['Atık Isı'] },

    /* ════════════════════════ AKDENİZ ════════════════════════ */
    { id: 'a1', name: 'Antalya Gıda İşleme', type: 'Factory', region: 'Akdeniz', lat: 36.90, lng: 30.70, sector: 'Gıda', tons: 920, wasteProduced: ['Organik Atık', 'Atık Isı'], resourceNeeded: [] },
    { id: 'a2', name: 'Mersin Petrokimya', type: 'Factory', region: 'Akdeniz', lat: 36.80, lng: 34.63, sector: 'Kimya', tons: 2100, wasteProduced: ['Atık Isı', 'Polimer'], resourceNeeded: [] },
    { id: 'a3', name: 'Adana Tekstil OSB', type: 'Factory', region: 'Akdeniz', lat: 37.00, lng: 35.33, sector: 'Tekstil', tons: 1400, wasteProduced: ['Atık Isı', 'Boya Çamuru'], resourceNeeded: [] },
    { id: 'a4', name: 'Gaziantep Cam Sanayi', type: 'Factory', region: 'Akdeniz', lat: 37.06, lng: 37.38, sector: 'İnşaat', tons: 1800, wasteProduced: ['Atık Isı'], resourceNeeded: ['Metal Hurda'] },
    { id: 'a5', name: 'Hatay Demir-Çelik', type: 'Factory', region: 'Akdeniz', lat: 36.20, lng: 36.16, sector: 'Metal', tons: 1650, wasteProduced: ['Atık Isı', 'Metal Hurda'], resourceNeeded: [] },
    { id: 'a6', name: 'Mersin Serbest Bölge', type: 'Factory', region: 'Akdeniz', lat: 36.75, lng: 34.50, sector: 'Lojistik', tons: 490, wasteProduced: [], resourceNeeded: ['İnşaat Atığı'] },
    { id: 'a7', name: 'Adana Çimento', type: 'Factory', region: 'Akdeniz', lat: 37.05, lng: 35.45, sector: 'İnşaat', tons: 1900, wasteProduced: ['İnşaat Atığı'], resourceNeeded: [] },
    { id: 'a8', name: 'Antalya Plastik Sanayi', type: 'Factory', region: 'Akdeniz', lat: 36.95, lng: 30.80, sector: 'Plastik', tons: 710, wasteProduced: [], resourceNeeded: ['Polimer'] },
    { id: 'a9', name: 'Kahramanmaraş Tekstil', type: 'Factory', region: 'Akdeniz', lat: 37.57, lng: 36.93, sector: 'Tekstil', tons: 1250, wasteProduced: ['Atık Isı'], resourceNeeded: ['Boya Çamuru'] },
    { id: 'a10', name: 'Gaziantep Fıstık İşleme', type: 'Factory', region: 'Akdeniz', lat: 37.10, lng: 37.30, sector: 'Gıda', tons: 580, wasteProduced: ['Organik Atık'], resourceNeeded: [] },
    { id: 'ag1', name: 'Antalya Akıllı Sera', type: 'Greenhouse', region: 'Akdeniz', lat: 36.85, lng: 30.55, sector: 'Tarım', tons: 420, wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'ag2', name: 'Mersin Sera Bölgesi', type: 'Greenhouse', region: 'Akdeniz', lat: 36.70, lng: 34.40, sector: 'Tarım', tons: 350, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ag3', name: 'Adana Sera Kompleksi', type: 'Greenhouse', region: 'Akdeniz', lat: 36.90, lng: 35.20, sector: 'Tarım', tons: 280, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ag4', name: 'Hatay Zeytin Sera', type: 'Greenhouse', region: 'Akdeniz', lat: 36.25, lng: 36.30, sector: 'Tarım', tons: 150, wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ac1', name: 'Gaziantep Bereket Koop.', type: 'Cooperative', region: 'Akdeniz', lat: 37.08, lng: 37.42, sector: 'Kooperatif', tons: 190, women: 40, carbon: 960, temp: 30, humidity: 60, soilMoisture: 70, iot: 'Aktif', efficiency: 96, source: 'Gaziantep Cam Sanayi', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ac2', name: 'Antalya Kadın Sera Koop.', type: 'Cooperative', region: 'Akdeniz', lat: 36.88, lng: 30.65, sector: 'Kooperatif', tons: 165, women: 28, carbon: 610, temp: 29, humidity: 64, soilMoisture: 67, iot: 'Aktif', efficiency: 93, source: 'Antalya Gıda İşleme', wasteProduced: [], resourceNeeded: ['Atık Isı', 'Organik'] },
    { id: 'ac3', name: 'Mersin Kadın Üretim Koop.', type: 'Cooperative', region: 'Akdeniz', lat: 36.78, lng: 34.55, sector: 'Kooperatif', tons: 135, women: 22, carbon: 490, temp: 27, humidity: 66, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Mersin Petrokimya', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'ac4', name: 'Adana Tarım Kadın Koop.', type: 'Cooperative', region: 'Akdeniz', lat: 37.03, lng: 35.25, sector: 'Kooperatif', tons: 150, women: 26, carbon: 520, temp: 28, humidity: 65, soilMoisture: 60, iot: 'Aktif', efficiency: 91, source: 'Adana Tekstil OSB', wasteProduced: [], resourceNeeded: ['Atık Isı', 'Kumaş'] },
    { id: 'ac5', name: 'Kahramanmaraş Organik Koop.', type: 'Cooperative', region: 'Akdeniz', lat: 37.60, lng: 36.98, sector: 'Kooperatif', tons: 100, women: 17, carbon: 345, temp: 26, humidity: 68, soilMoisture: 57, iot: 'Aktif', efficiency: 87, source: 'Kahramanmaraş Tekstil', wasteProduced: [], resourceNeeded: ['Atık Isı'] },

    /* ══════════════════════ KARADENİZ ══════════════════════════ */
    { id: 'k1', name: 'Samsun Demir-Çelik', type: 'Factory', region: 'Karadeniz', lat: 41.29, lng: 36.33, sector: 'Metal', tons: 2200, wasteProduced: ['Atık Isı', 'Metal Hurda'], resourceNeeded: [] },
    { id: 'k2', name: 'Trabzon Fındık İşleme', type: 'Factory', region: 'Karadeniz', lat: 41.00, lng: 39.72, sector: 'Gıda', tons: 680, wasteProduced: ['Organik Atık'], resourceNeeded: [] },
    { id: 'k3', name: 'Zonguldak Maden ve Enerji', type: 'Factory', region: 'Karadeniz', lat: 41.45, lng: 31.79, sector: 'Enerji', tons: 1500, wasteProduced: ['Kömür Cürufu', 'Atık Isı'], resourceNeeded: [] },
    { id: 'k4', name: 'Karabük Demir-Çelik', type: 'Factory', region: 'Karadeniz', lat: 41.20, lng: 32.63, sector: 'Metal', tons: 2800, wasteProduced: ['Demir Cürufu'], resourceNeeded: ['Kömür Cürufu'] },
    { id: 'k5', name: 'Kastamonu Ahşap Sanayi', type: 'Factory', region: 'Karadeniz', lat: 41.38, lng: 33.78, sector: 'Ahşap', tons: 950, wasteProduced: ['Talaş', 'Biyokütle'], resourceNeeded: [] },
    { id: 'k6', name: 'Ordu Gıda İşleme', type: 'Factory', region: 'Karadeniz', lat: 41.00, lng: 37.88, sector: 'Gıda', tons: 520, wasteProduced: ['Organik Atık'], resourceNeeded: [] },
    { id: 'k7', name: 'Samsun Gübre Fabrikası', type: 'Factory', region: 'Karadeniz', lat: 41.25, lng: 36.45, sector: 'Kimya', tons: 880, wasteProduced: ['Kimyasal Isı'], resourceNeeded: [] },
    { id: 'k8', name: 'Bartın Çimento', type: 'Factory', region: 'Karadeniz', lat: 41.63, lng: 32.33, sector: 'İnşaat', tons: 1200, wasteProduced: [], resourceNeeded: ['Demir Cürufu'] },
    { id: 'k9', name: 'Sinop Tersane Sanayi', type: 'Factory', region: 'Karadeniz', lat: 42.02, lng: 35.15, sector: 'Metal', tons: 640, wasteProduced: ['Metal Hurda'], resourceNeeded: [] },
    { id: 'kg1', name: 'Samsun Sera Bölgesi', type: 'Greenhouse', region: 'Karadeniz', lat: 41.20, lng: 36.20, sector: 'Tarım', tons: 320, wasteProduced: [], resourceNeeded: ['Atık Isı', 'Kimyasal Isı'] },
    { id: 'kg2', name: 'Trabzon Çay Sera', type: 'Greenhouse', region: 'Karadeniz', lat: 40.95, lng: 39.60, sector: 'Tarım', tons: 180, wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'kg3', name: 'Kastamonu Orman Sera', type: 'Greenhouse', region: 'Karadeniz', lat: 41.30, lng: 33.90, sector: 'Tarım', tons: 210, wasteProduced: [], resourceNeeded: ['Talaş', 'Biyokütle'] },
    { id: 'kc1', name: 'Samsun Kadın Tarım Koop.', type: 'Cooperative', region: 'Karadeniz', lat: 41.22, lng: 36.10, sector: 'Kooperatif', tons: 140, women: 20, carbon: 470, temp: 22, humidity: 75, soilMoisture: 65, iot: 'Aktif', efficiency: 88, source: 'Samsun Demir-Çelik', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
    { id: 'kc2', name: 'Trabzon Kadın Çay Koop.', type: 'Cooperative', region: 'Karadeniz', lat: 40.98, lng: 39.80, sector: 'Kooperatif', tons: 95, carbon: 310, temp: 20, humidity: 80, soilMoisture: 70, iot: 'Aktif', efficiency: 85, source: 'Trabzon Fındık İşleme', wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'kc3', name: 'Kastamonu Orman Koop.', type: 'Cooperative', region: 'Karadeniz', lat: 41.42, lng: 33.85, sector: 'Kooperatif', tons: 110, women: 18, carbon: 370, temp: 21, humidity: 76, soilMoisture: 66, iot: 'Aktif', efficiency: 87, source: 'Kastamonu Ahşap Sanayi', wasteProduced: [], resourceNeeded: ['Talaş', 'Biyokütle'] },
    { id: 'kc4', name: 'Ordu Fındık Kadın Koop.', type: 'Cooperative', region: 'Karadeniz', lat: 41.02, lng: 37.75, sector: 'Kooperatif', tons: 125, women: 23, carbon: 420, temp: 21, humidity: 78, soilMoisture: 68, iot: 'Aktif', efficiency: 89, source: 'Ordu Gıda İşleme', wasteProduced: [], resourceNeeded: ['Organik Atık'] },
    { id: 'kc5', name: 'Zonguldak Kadın Üretim Koop.', type: 'Cooperative', region: 'Karadeniz', lat: 41.48, lng: 31.85, sector: 'Kooperatif', tons: 80, women: 12, carbon: 265, temp: 20, humidity: 74, soilMoisture: 63, iot: 'Aktif', efficiency: 84, source: 'Zonguldak Maden ve Enerji', wasteProduced: [], resourceNeeded: ['Atık Isı'] },
];

// Flatten the extra fields into the schema-compliant shape
const buildDoc = (d) => ({
    name: d.name,
    id: d.id, // 'm1', 'mc1' e.g.
    type: d.type,
    region: d.region,
    wasteProduced: d.wasteProduced || [],
    resourceNeeded: d.resourceNeeded || [],
    location: { lat: d.lat, lng: d.lng },
    // Extra metadata
    sector: d.sector,
    tons: d.tons,
    women: d.women,
    carbon: d.carbon,
    temp: d.temp,
    humidity: d.humidity,
    soilMoisture: d.soilMoisture,
    iot: d.iot,
    efficiency: d.efficiency,
    source: d.source,
});

// ── Seed / Destroy ─────────────────────────────────────────
const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('\n🟢 MongoDB Connected\n');

    if (process.argv[2] === '--destroy') {
        await Facility.deleteMany({});
        console.log('🗑️  All facilities deleted.\n');
        process.exit(0);
    }

    await Facility.deleteMany({});
    console.log('🔄 Existing facilities cleared.');

    const docs = SEED_DATA.map(buildDoc);
    await Facility.insertMany(docs);
    console.log(`✅ ${docs.length} facilities seeded across 5 regions!\n`);

    const counts = await Facility.aggregate([
        { $group: { _id: { region: '$region', type: '$type' }, count: { $sum: 1 } } },
        { $sort: { '_id.region': 1 } },
    ]);
    console.log('📊 Summary:');
    counts.forEach(c => console.log(`   ${c._id.region} / ${c._id.type}: ${c.count}`));
    console.log();

    process.exit(0);
};

seed().catch(err => {
    console.error('🔴 Seeder Error:', err.message);
    process.exit(1);
});
