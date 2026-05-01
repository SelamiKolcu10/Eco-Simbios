import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip,
    ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
    Legend
} from 'recharts';
import {
    Factory, Sprout, Users, Leaf, TrendingUp, Recycle,
    MapPin, Zap, ArrowUpRight, ChevronDown
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   1. BÖLGE VERİLERİ — 5 Stratejik Endüstriyel Bölge
   ══════════════════════════════════════════════════════════════ */

const REGIONS = {
    marmara: {
        id: 'marmara',
        name: 'Marmara',
        center: [40.5, 29.3],
        zoom: 9,
        bounds: [[39.8, 27.5], [41.2, 31.0]],
        kpi: { waste: 21800, co2: 5740, matches: 14, users: 51 },
        co2Trend: [
            { q: 'Q1 2025', value: 680 }, { q: 'Q2 2025', value: 920 },
            { q: 'Q3 2025', value: 1340 }, { q: 'Q4 2025', value: 1910 },
        ],
        sectorWaste: [
            { name: 'Otomotiv', value: 35, color: '#059669' },
            { name: 'Kimya', value: 25, color: '#0ea5e9' },
            { name: 'Tekstil', value: 20, color: '#8b5cf6' },
            { name: 'Gıda', value: 12, color: '#f59e0b' },
            { name: 'Diğer', value: 8, color: '#94a3b8' },
        ],
        nodes: [
            // Factories (10)
            { id: 'm1', name: 'Kocaeli Otomotiv OSB', type: 'factory', lat: 40.78, lng: 29.53, sector: 'Otomotiv', tons: 2400 },
            { id: 'm2', name: 'Gebze Plastik OSB', type: 'factory', lat: 40.80, lng: 29.44, sector: 'Kimya', tons: 1800 },
            { id: 'm3', name: 'Bursa Otomotiv Fabrikası', type: 'factory', lat: 40.22, lng: 28.96, sector: 'Otomotiv', tons: 3200 },
            { id: 'm4', name: 'Tekirdağ Kimya Tesisi', type: 'factory', lat: 41.00, lng: 27.55, sector: 'Kimya', tons: 1500 },
            { id: 'm5', name: 'Yalova Kâğıt Fabrikası', type: 'factory', lat: 40.66, lng: 29.27, sector: 'Kâğıt', tons: 900 },
            { id: 'm6', name: 'Sakarya Demir-Çelik', type: 'factory', lat: 40.69, lng: 30.40, sector: 'Metal', tons: 2800 },
            { id: 'm7', name: 'Balıkesir Gıda Sanayi', type: 'factory', lat: 39.65, lng: 27.89, sector: 'Gıda', tons: 750 },
            { id: 'm8', name: 'İstanbul Ambalaj Tesisi', type: 'factory', lat: 41.02, lng: 28.95, sector: 'Plastik', tons: 1100 },
            { id: 'm9', name: 'Çerkezköy Tekstil OSB', type: 'factory', lat: 41.28, lng: 27.98, sector: 'Tekstil', tons: 1650 },
            { id: 'm10', name: 'Düzce Ahşap Sanayi', type: 'factory', lat: 40.84, lng: 31.16, sector: 'Ahşap', tons: 620 },
            // Greenhouses (3)
            { id: 'mg1', name: 'Bursa Organik Sera', type: 'greenhouse', lat: 40.14, lng: 28.80, sector: 'Tarım', tons: 340 },
            { id: 'mg2', name: 'Yalova Jeotermal Sera', type: 'greenhouse', lat: 40.60, lng: 29.10, sector: 'Tarım', tons: 280 },
            { id: 'mg3', name: 'Bilecik Sera Bölgesi', type: 'greenhouse', lat: 40.05, lng: 30.00, sector: 'Tarım', tons: 190 },
            // Cooperatives (5)
            { id: 'mc1', name: 'Bursa Kadın Tarım Koop.', type: 'cooperative', lat: 40.18, lng: 29.06, city: 'Bursa', women: 25, sector: 'Kooperatif', tons: 180, carbon: 620, temp: 26, humidity: 68, soilMoisture: 58, iot: 'Aktif', efficiency: 91, source: 'Bursa Tekstil OSB' },
            { id: 'mc2', name: 'Yalova Kadın Sera Koop.', type: 'cooperative', lat: 40.63, lng: 29.20, city: 'Yalova', women: 18, sector: 'Kooperatif', tons: 120, carbon: 380, temp: 24, humidity: 72, soilMoisture: 60, iot: 'Aktif', efficiency: 88, source: 'Yalova Kâğıt Fabrikası' },
            { id: 'mc3', name: 'Sakarya Ekolojik Sera Koop.', type: 'cooperative', lat: 40.72, lng: 30.35, city: 'Sakarya', women: 22, sector: 'Kooperatif', tons: 145, carbon: 490, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Sakarya Demir-Çelik' },
            { id: 'mc4', name: 'Kocaeli Kadın Üretim Koop.', type: 'cooperative', lat: 40.82, lng: 29.62, city: 'Kocaeli', women: 30, sector: 'Kooperatif', tons: 200, carbon: 710, temp: 27, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 93, source: 'Kocaeli Otomotiv OSB' },
            { id: 'mc5', name: 'Balıkesir Organik Kadın Koop.', type: 'cooperative', lat: 39.70, lng: 27.95, city: 'Balıkesir', women: 16, sector: 'Kooperatif', tons: 95, carbon: 310, temp: 23, humidity: 74, soilMoisture: 64, iot: 'Aktif', efficiency: 86, source: 'Balıkesir Gıda Sanayi' },
        ],
        connections: [
            { from: 'm1', to: 'mg2', type: 'heat', label: 'Atık Isı' },
            { from: 'm3', to: 'mg1', type: 'heat', label: 'Atık Isı' },
            { from: 'm3', to: 'mc1', type: 'heat', label: 'Atık Isı + Organik' },
            { from: 'm5', to: 'mc2', type: 'heat', label: 'Atık Isı' },
            { from: 'm1', to: 'm6', type: 'industrial', label: 'Metal Hurda' },
            { from: 'm2', to: 'm8', type: 'industrial', label: 'Plastik Granül' },
            { from: 'm4', to: 'm2', type: 'industrial', label: 'Çözücü' },
            { from: 'm9', to: 'm3', type: 'industrial', label: 'Tekstil Kırpıntısı' },
            { from: 'm6', to: 'm1', type: 'industrial', label: 'Çelik Talaşı' },
            { from: 'm7', to: 'mg3', type: 'heat', label: 'Organik Atık' },
            { from: 'm10', to: 'mg1', type: 'heat', label: 'Talaş & Biyokütle' },
            { from: 'm6', to: 'mc3', type: 'heat', label: 'Atık Isı + Çelik Cürufu' },
            { from: 'm1', to: 'mc4', type: 'heat', label: 'Atık Isı' },
            { from: 'm7', to: 'mc5', type: 'heat', label: 'Organik Atık' },
        ],
    },

    ege: {
        id: 'ege',
        name: 'Ege',
        center: [38.4, 27.8],
        zoom: 9,
        bounds: [[37.2, 26.5], [39.5, 29.5]],
        kpi: { waste: 15200, co2: 4050, matches: 14, users: 44 },
        co2Trend: [
            { q: 'Q1 2025', value: 520 }, { q: 'Q2 2025', value: 780 },
            { q: 'Q3 2025', value: 1050 }, { q: 'Q4 2025', value: 1070 },
        ],
        sectorWaste: [
            { name: 'Tekstil', value: 38, color: '#8b5cf6' },
            { name: 'Gıda', value: 22, color: '#f59e0b' },
            { name: 'Kimya', value: 18, color: '#0ea5e9' },
            { name: 'Metal', value: 14, color: '#059669' },
            { name: 'Diğer', value: 8, color: '#94a3b8' },
        ],
        nodes: [
            { id: 'e1', name: 'İzmir Tekstil Atölyesi', type: 'factory', lat: 38.42, lng: 27.14, sector: 'Tekstil', tons: 2100 },
            { id: 'e2', name: 'Manisa Elektrik-Elektronik', type: 'factory', lat: 38.62, lng: 27.43, sector: 'Elektronik', tons: 980 },
            { id: 'e3', name: 'Denizli Tekstil Fabrikası', type: 'factory', lat: 37.77, lng: 29.09, sector: 'Tekstil', tons: 1750 },
            { id: 'e4', name: 'Aydın Gıda İşleme', type: 'factory', lat: 37.85, lng: 27.85, sector: 'Gıda', tons: 640 },
            { id: 'e5', name: 'İzmir Petrokimya', type: 'factory', lat: 38.50, lng: 26.90, sector: 'Kimya', tons: 1400 },
            { id: 'e6', name: 'Uşak Seramik Fabrikası', type: 'factory', lat: 38.68, lng: 29.41, sector: 'İnşaat', tons: 870 },
            { id: 'e7', name: 'Muğla Mermer İşleme', type: 'factory', lat: 37.22, lng: 28.36, sector: 'İnşaat', tons: 1100 },
            { id: 'e8', name: 'İzmir Demir-Çelik', type: 'factory', lat: 38.35, lng: 27.25, sector: 'Metal', tons: 1950 },
            { id: 'e9', name: 'Afyon Çimento', type: 'factory', lat: 38.74, lng: 30.54, sector: 'İnşaat', tons: 2300 },
            { id: 'e10', name: 'Manisa Plastik OSB', type: 'factory', lat: 38.55, lng: 27.60, sector: 'Plastik', tons: 760 },
            { id: 'eg1', name: 'Aydın Jeotermal Sera', type: 'greenhouse', lat: 37.90, lng: 28.10, sector: 'Tarım', tons: 310 },
            { id: 'eg2', name: 'Denizli Organik Sera', type: 'greenhouse', lat: 37.82, lng: 28.90, sector: 'Tarım', tons: 250 },
            { id: 'eg3', name: 'Muğla Bitkisel Sera', type: 'greenhouse', lat: 37.30, lng: 28.60, sector: 'Tarım', tons: 180 },
            { id: 'ec1', name: 'Denizli Pamuk Kadın Koop.', type: 'cooperative', lat: 37.72, lng: 29.15, city: 'Denizli', women: 22, sector: 'Kooperatif', tons: 160, carbon: 480, temp: 25, humidity: 70, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Denizli Tekstil Fabrikası' },
            { id: 'ec2', name: 'Aydın Zeytin Kadın Koop.', type: 'cooperative', lat: 37.80, lng: 27.70, city: 'Aydın', women: 30, sector: 'Kooperatif', tons: 140, carbon: 420, temp: 27, humidity: 66, soilMoisture: 58, iot: 'Aktif', efficiency: 92, source: 'Aydın Gıda İşleme' },
            { id: 'ec3', name: 'İzmir Kadın Sebze Koop.', type: 'cooperative', lat: 38.48, lng: 27.30, city: 'İzmir', women: 28, sector: 'Kooperatif', tons: 175, carbon: 520, temp: 26, humidity: 68, soilMoisture: 60, iot: 'Aktif', efficiency: 90, source: 'İzmir Tekstil Atölyesi' },
            { id: 'ec4', name: 'Manisa Üzüm Kadın Koop.', type: 'cooperative', lat: 38.58, lng: 27.50, city: 'Manisa', women: 19, sector: 'Kooperatif', tons: 110, carbon: 350, temp: 24, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 87, source: 'Manisa Elektrik-Elektronik' },
            { id: 'ec5', name: 'Muğla Doğal Ürün Koop.', type: 'cooperative', lat: 37.18, lng: 28.42, city: 'Muğla', women: 15, sector: 'Kooperatif', tons: 85, carbon: 270, temp: 28, humidity: 63, soilMoisture: 55, iot: 'Aktif', efficiency: 85, source: 'Muğla Mermer İşleme' },
        ],
        connections: [
            { from: 'e1', to: 'eg2', type: 'heat', label: 'Atık Isı' },
            { from: 'e3', to: 'ec1', type: 'heat', label: 'Atık Isı + Kumaş' },
            { from: 'e4', to: 'eg1', type: 'heat', label: 'Organik Atık' },
            { from: 'e4', to: 'ec2', type: 'heat', label: 'Organik Atık' },
            { from: 'e1', to: 'e3', type: 'industrial', label: 'Boya Çamuru' },
            { from: 'e5', to: 'e10', type: 'industrial', label: 'Polimer' },
            { from: 'e8', to: 'e6', type: 'industrial', label: 'Demir Cürufu' },
            { from: 'e2', to: 'e8', type: 'industrial', label: 'Bakır Kablo' },
            { from: 'e7', to: 'e9', type: 'industrial', label: 'Mermer Tozu' },
            { from: 'e9', to: 'eg3', type: 'heat', label: 'Atık Isı' },
            { from: 'e6', to: 'eg1', type: 'heat', label: 'Atık Isı' },
            { from: 'e1', to: 'ec3', type: 'heat', label: 'Atık Isı + Kumaş' },
            { from: 'e2', to: 'ec4', type: 'heat', label: 'Atık Isı' },
            { from: 'e7', to: 'ec5', type: 'heat', label: 'Atık Isı' },
        ],
    },

    icAnadolu: {
        id: 'icAnadolu',
        name: 'İç Anadolu',
        center: [39.0, 32.5],
        zoom: 8,
        bounds: [[37.5, 30.0], [40.5, 36.5]],
        kpi: { waste: 17400, co2: 4620, matches: 14, users: 39 },
        co2Trend: [
            { q: 'Q1 2025', value: 450 }, { q: 'Q2 2025', value: 710 },
            { q: 'Q3 2025', value: 950 }, { q: 'Q4 2025', value: 1670 },
        ],
        sectorWaste: [
            { name: 'Metal', value: 32, color: '#059669' },
            { name: 'İnşaat', value: 28, color: '#f59e0b' },
            { name: 'Kimya', value: 18, color: '#0ea5e9' },
            { name: 'Gıda', value: 14, color: '#8b5cf6' },
            { name: 'Diğer', value: 8, color: '#94a3b8' },
        ],
        nodes: [
            { id: 'c1', name: 'Ankara Demir-Çelik', type: 'factory', lat: 39.92, lng: 32.85, sector: 'Metal', tons: 2900 },
            { id: 'c2', name: 'Eskişehir Çimento', type: 'factory', lat: 39.78, lng: 30.52, sector: 'İnşaat', tons: 3100 },
            { id: 'c3', name: 'Kayseri Demir-Çelik', type: 'factory', lat: 38.73, lng: 35.48, sector: 'Metal', tons: 2400 },
            { id: 'c4', name: 'Konya Gıda Entegre', type: 'factory', lat: 37.87, lng: 32.48, sector: 'Gıda', tons: 850 },
            { id: 'c5', name: 'Ankara Savunma Sanayi', type: 'factory', lat: 39.80, lng: 32.60, sector: 'Metal', tons: 1200 },
            { id: 'c6', name: 'Kırıkkale Silah Sanayi', type: 'factory', lat: 39.85, lng: 33.52, sector: 'Metal', tons: 780 },
            { id: 'c7', name: 'Sivas Çimento Fabrikası', type: 'factory', lat: 39.75, lng: 37.02, sector: 'İnşaat', tons: 1600 },
            { id: 'c8', name: 'Konya Plastik OSB', type: 'factory', lat: 37.92, lng: 32.55, sector: 'Plastik', tons: 680 },
            { id: 'c9', name: 'Kayseri Mobilya Sanayi', type: 'factory', lat: 38.68, lng: 35.55, sector: 'Ahşap', tons: 520 },
            { id: 'c10', name: 'Aksaray Otomotiv', type: 'factory', lat: 38.37, lng: 34.03, sector: 'Otomotiv', tons: 1350 },
            { id: 'cg1', name: 'Konya Organik Sera', type: 'greenhouse', lat: 37.80, lng: 32.35, sector: 'Tarım', tons: 290 },
            { id: 'cg2', name: 'Kayseri Akıllı Sera', type: 'greenhouse', lat: 38.80, lng: 35.40, sector: 'Tarım', tons: 210 },
            { id: 'cg3', name: 'Eskişehir Sera Bölgesi', type: 'greenhouse', lat: 39.70, lng: 30.60, sector: 'Tarım', tons: 270 },
            { id: 'cc1', name: 'Eskişehir Kadın Sera Koop.', type: 'cooperative', lat: 39.77, lng: 30.52, city: 'Eskişehir', women: 32, sector: 'Kooperatif', tons: 200, carbon: 840, temp: 28, humidity: 72, soilMoisture: 64, iot: 'Aktif', efficiency: 94, source: 'Eskişehir Çimento' },
            { id: 'cc2', name: 'Kayseri Yeşil Vadi Koop.', type: 'cooperative', lat: 38.76, lng: 35.50, city: 'Kayseri', women: 18, sector: 'Kooperatif', tons: 130, carbon: 510, temp: 24, humidity: 65, soilMoisture: 55, iot: 'Aktif', efficiency: 88, source: 'Kayseri Demir-Çelik' },
            { id: 'cc3', name: 'Konya Kadın Toprak Koop.', type: 'cooperative', lat: 37.92, lng: 32.42, city: 'Konya', women: 24, sector: 'Kooperatif', tons: 155, carbon: 530, temp: 25, humidity: 67, soilMoisture: 59, iot: 'Aktif', efficiency: 90, source: 'Konya Gıda Entegre' },
            { id: 'cc4', name: 'Ankara Kadın Sebze Koop.', type: 'cooperative', lat: 39.88, lng: 32.72, city: 'Ankara', women: 20, sector: 'Kooperatif', tons: 120, carbon: 410, temp: 23, humidity: 70, soilMoisture: 60, iot: 'Aktif', efficiency: 87, source: 'Ankara Demir-Çelik' },
            { id: 'cc5', name: 'Aksaray Organik Kadın Koop.', type: 'cooperative', lat: 38.40, lng: 34.08, city: 'Aksaray', women: 14, sector: 'Kooperatif', tons: 90, carbon: 295, temp: 26, humidity: 63, soilMoisture: 54, iot: 'Aktif', efficiency: 86, source: 'Aksaray Otomotiv' },
        ],
        connections: [
            { from: 'c2', to: 'cc1', type: 'heat', label: 'Atık Isı' },
            { from: 'c2', to: 'cg3', type: 'heat', label: 'Atık Isı' },
            { from: 'c3', to: 'cc2', type: 'heat', label: 'Atık Isı' },
            { from: 'c3', to: 'cg2', type: 'heat', label: 'Atık Isı' },
            { from: 'c4', to: 'cg1', type: 'heat', label: 'Organik Atık' },
            { from: 'c1', to: 'c5', type: 'industrial', label: 'Çelik Talaşı' },
            { from: 'c1', to: 'c6', type: 'industrial', label: 'Metal Hurda' },
            { from: 'c5', to: 'c10', type: 'industrial', label: 'Alüminyum' },
            { from: 'c9', to: 'c7', type: 'industrial', label: 'MDF Tozu' },
            { from: 'c8', to: 'c4', type: 'industrial', label: 'Ambalaj' },
            { from: 'c4', to: 'cc3', type: 'heat', label: 'Organik Atık + Isı' },
            { from: 'c1', to: 'cc4', type: 'heat', label: 'Atık Isı' },
            { from: 'c10', to: 'cc5', type: 'heat', label: 'Atık Isı' },
        ],
    },

    akdeniz: {
        id: 'akdeniz',
        name: 'Akdeniz',
        center: [37.0, 33.0],
        zoom: 8,
        bounds: [[36.0, 30.0], [38.0, 37.0]],
        kpi: { waste: 13500, co2: 3680, matches: 14, users: 38 },
        co2Trend: [
            { q: 'Q1 2025', value: 380 }, { q: 'Q2 2025', value: 620 },
            { q: 'Q3 2025', value: 830 }, { q: 'Q4 2025', value: 1120 },
        ],
        sectorWaste: [
            { name: 'Gıda', value: 30, color: '#f59e0b' },
            { name: 'Kimya', value: 24, color: '#0ea5e9' },
            { name: 'İnşaat', value: 20, color: '#059669' },
            { name: 'Tekstil', value: 16, color: '#8b5cf6' },
            { name: 'Diğer', value: 10, color: '#94a3b8' },
        ],
        nodes: [
            { id: 'a1', name: 'Antalya Gıda İşleme', type: 'factory', lat: 36.90, lng: 30.70, sector: 'Gıda', tons: 920 },
            { id: 'a2', name: 'Mersin Petrokimya', type: 'factory', lat: 36.80, lng: 34.63, sector: 'Kimya', tons: 2100 },
            { id: 'a3', name: 'Adana Tekstil OSB', type: 'factory', lat: 37.00, lng: 35.33, sector: 'Tekstil', tons: 1400 },
            { id: 'a4', name: 'Gaziantep Cam Sanayi', type: 'factory', lat: 37.06, lng: 37.38, sector: 'İnşaat', tons: 1800 },
            { id: 'a5', name: 'Hatay Demir-Çelik', type: 'factory', lat: 36.20, lng: 36.16, sector: 'Metal', tons: 1650 },
            { id: 'a6', name: 'Mersin Serbest Bölge', type: 'factory', lat: 36.75, lng: 34.50, sector: 'Lojistik', tons: 490 },
            { id: 'a7', name: 'Adana Çimento', type: 'factory', lat: 37.05, lng: 35.45, sector: 'İnşaat', tons: 1900 },
            { id: 'a8', name: 'Antalya Plastik Sanayi', type: 'factory', lat: 36.95, lng: 30.80, sector: 'Plastik', tons: 710 },
            { id: 'a9', name: 'Kahramanmaraş Tekstil', type: 'factory', lat: 37.57, lng: 36.93, sector: 'Tekstil', tons: 1250 },
            { id: 'a10', name: 'Gaziantep Fıstık İşleme', type: 'factory', lat: 37.10, lng: 37.30, sector: 'Gıda', tons: 580 },
            { id: 'ag1', name: 'Antalya Akıllı Sera', type: 'greenhouse', lat: 36.85, lng: 30.55, sector: 'Tarım', tons: 420 },
            { id: 'ag2', name: 'Mersin Sera Bölgesi', type: 'greenhouse', lat: 36.70, lng: 34.40, sector: 'Tarım', tons: 350 },
            { id: 'ag3', name: 'Adana Sera Kompleksi', type: 'greenhouse', lat: 36.90, lng: 35.20, sector: 'Tarım', tons: 280 },
            { id: 'ag4', name: 'Hatay Zeytin Sera', type: 'greenhouse', lat: 36.25, lng: 36.30, sector: 'Tarım', tons: 150 },
            { id: 'ac1', name: 'Gaziantep Bereket Koop.', type: 'cooperative', lat: 37.08, lng: 37.42, city: 'Gaziantep', women: 40, sector: 'Kooperatif', tons: 190, carbon: 960, temp: 30, humidity: 60, soilMoisture: 70, iot: 'Aktif', efficiency: 96, source: 'Gaziantep Cam Sanayi' },
            { id: 'ac2', name: 'Antalya Kadın Sera Koop.', type: 'cooperative', lat: 36.88, lng: 30.65, city: 'Antalya', women: 28, sector: 'Kooperatif', tons: 165, carbon: 610, temp: 29, humidity: 64, soilMoisture: 67, iot: 'Aktif', efficiency: 93, source: 'Antalya Gıda İşleme' },
            { id: 'ac3', name: 'Mersin Kadın Üretim Koop.', type: 'cooperative', lat: 36.78, lng: 34.55, city: 'Mersin', women: 22, sector: 'Kooperatif', tons: 135, carbon: 490, temp: 27, humidity: 66, soilMoisture: 62, iot: 'Aktif', efficiency: 89, source: 'Mersin Petrokimya' },
            { id: 'ac4', name: 'Adana Tarım Kadın Koop.', type: 'cooperative', lat: 37.03, lng: 35.25, city: 'Adana', women: 26, sector: 'Kooperatif', tons: 150, carbon: 520, temp: 28, humidity: 65, soilMoisture: 60, iot: 'Aktif', efficiency: 91, source: 'Adana Tekstil OSB' },
            { id: 'ac5', name: 'Kahramanmaraş Organik Koop.', type: 'cooperative', lat: 37.60, lng: 36.98, city: 'Kahramanmaraş', women: 17, sector: 'Kooperatif', tons: 100, carbon: 345, temp: 26, humidity: 68, soilMoisture: 57, iot: 'Aktif', efficiency: 87, source: 'Kahramanmaraş Tekstil' },
        ],
        connections: [
            { from: 'a1', to: 'ag1', type: 'heat', label: 'Organik Atık' },
            { from: 'a1', to: 'ac2', type: 'heat', label: 'Atık Isı + Organik' },
            { from: 'a2', to: 'ag2', type: 'heat', label: 'Atık Isı' },
            { from: 'a3', to: 'ag3', type: 'heat', label: 'Atık Isı' },
            { from: 'a4', to: 'ac1', type: 'heat', label: 'Atık Isı' },
            { from: 'a5', to: 'ag4', type: 'heat', label: 'Atık Isı' },
            { from: 'a2', to: 'a8', type: 'industrial', label: 'Polimer' },
            { from: 'a5', to: 'a4', type: 'industrial', label: 'Metal Hurda' },
            { from: 'a3', to: 'a9', type: 'industrial', label: 'Boya Çamuru' },
            { from: 'a7', to: 'a6', type: 'industrial', label: 'İnşaat Atığı' },
            { from: 'a10', to: 'ag1', type: 'heat', label: 'Organik Atık' },
            { from: 'a2', to: 'ac3', type: 'heat', label: 'Atık Isı' },
            { from: 'a3', to: 'ac4', type: 'heat', label: 'Atık Isı + Kumaş' },
            { from: 'a9', to: 'ac5', type: 'heat', label: 'Atık Isı' },
        ],
    },

    karadeniz: {
        id: 'karadeniz',
        name: 'Karadeniz',
        center: [41.0, 36.0],
        zoom: 8,
        bounds: [[40.0, 33.0], [42.0, 41.0]],
        kpi: { waste: 10900, co2: 2840, matches: 13, users: 30 },
        co2Trend: [
            { q: 'Q1 2025', value: 280 }, { q: 'Q2 2025', value: 440 },
            { q: 'Q3 2025', value: 680 }, { q: 'Q4 2025', value: 780 },
        ],
        sectorWaste: [
            { name: 'Metal', value: 35, color: '#059669' },
            { name: 'Ahşap', value: 25, color: '#f59e0b' },
            { name: 'Gıda', value: 20, color: '#8b5cf6' },
            { name: 'Enerji', value: 12, color: '#0ea5e9' },
            { name: 'Diğer', value: 8, color: '#94a3b8' },
        ],
        nodes: [
            { id: 'k1', name: 'Samsun Demir-Çelik', type: 'factory', lat: 41.29, lng: 36.33, sector: 'Metal', tons: 2200 },
            { id: 'k2', name: 'Trabzon Fındık İşleme', type: 'factory', lat: 41.00, lng: 39.72, sector: 'Gıda', tons: 680 },
            { id: 'k3', name: 'Zonguldak Maden ve Enerji', type: 'factory', lat: 41.45, lng: 31.79, sector: 'Enerji', tons: 1500 },
            { id: 'k4', name: 'Karabük Demir-Çelik', type: 'factory', lat: 41.20, lng: 32.63, sector: 'Metal', tons: 2800 },
            { id: 'k5', name: 'Kastamonu Ahşap Sanayi', type: 'factory', lat: 41.38, lng: 33.78, sector: 'Ahşap', tons: 950 },
            { id: 'k6', name: 'Ordu Gıda İşleme', type: 'factory', lat: 41.00, lng: 37.88, sector: 'Gıda', tons: 520 },
            { id: 'k7', name: 'Samsun Gübre Fabrikası', type: 'factory', lat: 41.25, lng: 36.45, sector: 'Kimya', tons: 880 },
            { id: 'k8', name: 'Bartın Çimento', type: 'factory', lat: 41.63, lng: 32.33, sector: 'İnşaat', tons: 1200 },
            { id: 'k9', name: 'Sinop Tersane Sanayi', type: 'factory', lat: 42.02, lng: 35.15, sector: 'Metal', tons: 640 },
            { id: 'kg1', name: 'Samsun Sera Bölgesi', type: 'greenhouse', lat: 41.20, lng: 36.20, sector: 'Tarım', tons: 320 },
            { id: 'kg2', name: 'Trabzon Çay Sera', type: 'greenhouse', lat: 40.95, lng: 39.60, sector: 'Tarım', tons: 180 },
            { id: 'kg3', name: 'Kastamonu Orman Sera', type: 'greenhouse', lat: 41.30, lng: 33.90, sector: 'Tarım', tons: 210 },
            { id: 'kc1', name: 'Samsun Kadın Tarım Koop.', type: 'cooperative', lat: 41.22, lng: 36.10, city: 'Samsun', women: 20, sector: 'Kooperatif', tons: 140, carbon: 470, temp: 22, humidity: 75, soilMoisture: 65, iot: 'Aktif', efficiency: 88, source: 'Samsun Demir-Çelik' },
            { id: 'kc2', name: 'Trabzon Kadın Çay Koop.', type: 'cooperative', lat: 40.98, lng: 39.80, city: 'Trabzon', women: 15, sector: 'Kooperatif', tons: 95, carbon: 310, temp: 20, humidity: 80, soilMoisture: 70, iot: 'Aktif', efficiency: 85, source: 'Trabzon Fındık İşleme' },
            { id: 'kc3', name: 'Kastamonu Orman Koop.', type: 'cooperative', lat: 41.42, lng: 33.85, city: 'Kastamonu', women: 18, sector: 'Kooperatif', tons: 110, carbon: 370, temp: 21, humidity: 76, soilMoisture: 66, iot: 'Aktif', efficiency: 87, source: 'Kastamonu Ahşap Sanayi' },
            { id: 'kc4', name: 'Ordu Fındık Kadın Koop.', type: 'cooperative', lat: 41.02, lng: 37.75, city: 'Ordu', women: 23, sector: 'Kooperatif', tons: 125, carbon: 420, temp: 21, humidity: 78, soilMoisture: 68, iot: 'Aktif', efficiency: 89, source: 'Ordu Gıda İşleme' },
            { id: 'kc5', name: 'Zonguldak Kadın Üretim Koop.', type: 'cooperative', lat: 41.48, lng: 31.85, city: 'Zonguldak', women: 12, sector: 'Kooperatif', tons: 80, carbon: 265, temp: 20, humidity: 74, soilMoisture: 63, iot: 'Aktif', efficiency: 84, source: 'Zonguldak Maden ve Enerji' },
        ],
        connections: [
            { from: 'k1', to: 'kg1', type: 'heat', label: 'Atık Isı' },
            { from: 'k1', to: 'kc1', type: 'heat', label: 'Atık Isı' },
            { from: 'k2', to: 'kg2', type: 'heat', label: 'Organik Atık' },
            { from: 'k2', to: 'kc2', type: 'heat', label: 'Organik Atık' },
            { from: 'k3', to: 'k4', type: 'industrial', label: 'Kömür Cürufu' },
            { from: 'k4', to: 'k8', type: 'industrial', label: 'Demir Cürufu' },
            { from: 'k5', to: 'kg3', type: 'heat', label: 'Talaş & Biyokütle' },
            { from: 'k7', to: 'kg1', type: 'heat', label: 'Kimyasal Isı' },
            { from: 'k6', to: 'kg2', type: 'heat', label: 'Organik Atık' },
            { from: 'k9', to: 'k1', type: 'industrial', label: 'Metal Hurda' },
            { from: 'k5', to: 'kc3', type: 'heat', label: 'Talaş & Biyokütle' },
            { from: 'k6', to: 'kc4', type: 'heat', label: 'Organik Atık' },
            { from: 'k3', to: 'kc5', type: 'heat', label: 'Atık Isı' },
        ],
    },
};

const BASE_REGION_LIST = Object.values(REGIONS);

REGIONS['all'] = {
    id: 'all',
    name: 'Tümü',
    center: [39.0, 35.2],
    zoom: 6,
    bounds: [[36.0, 26.0], [42.0, 45.0]],
    kpi: {
        waste: BASE_REGION_LIST.reduce((sum, r) => sum + r.kpi.waste, 0),
        co2: BASE_REGION_LIST.reduce((sum, r) => sum + r.kpi.co2, 0),
        matches: BASE_REGION_LIST.reduce((sum, r) => sum + r.kpi.matches, 0),
        users: BASE_REGION_LIST.reduce((sum, r) => sum + r.kpi.users, 0),
    },
    co2Trend: [
        { q: 'Q1 2025', value: BASE_REGION_LIST.reduce((sum, r) => sum + r.co2Trend[0].value, 0) },
        { q: 'Q2 2025', value: BASE_REGION_LIST.reduce((sum, r) => sum + r.co2Trend[1].value, 0) },
        { q: 'Q3 2025', value: BASE_REGION_LIST.reduce((sum, r) => sum + r.co2Trend[2].value, 0) },
        { q: 'Q4 2025', value: BASE_REGION_LIST.reduce((sum, r) => sum + r.co2Trend[3].value, 0) },
    ],
    sectorWaste: [
        { name: 'Metal', value: 25, color: '#059669' },
        { name: 'Tekstil', value: 22, color: '#8b5cf6' },
        { name: 'Kimya', value: 20, color: '#0ea5e9' },
        { name: 'Gıda', value: 18, color: '#f59e0b' },
        { name: 'Diğer', value: 15, color: '#94a3b8' },
    ],
    nodes: BASE_REGION_LIST.flatMap(r => r.nodes),
    connections: BASE_REGION_LIST.flatMap(r => r.connections),
};

const REGION_LIST = [REGIONS['all'], ...BASE_REGION_LIST];

/* ══════════════════════════════════════════════════════════════
   2. BAR CHART VERİSİ — Bölgesel Karşılaştırma
   ══════════════════════════════════════════════════════════════ */
const barData = BASE_REGION_LIST.map(r => ({
    name: r.name,
    bağlantı: r.connections.length,
    tesis: r.nodes.filter(n => n.type === 'factory').length,
}));

/* ══════════════════════════════════════════════════════════════
   3. HARİTA İKONLARI
   ══════════════════════════════════════════════════════════════ */
function createIcon(type) {
    const config = {
        factory: { bg: '#ea580c', border: '#fed7aa', emoji: '🏭', size: 28 },
        greenhouse: { bg: '#059669', border: '#a7f3d0', emoji: '🌱', size: 26 },
        cooperative: { bg: '#db2777', border: '#fbcfe8', emoji: '👩‍🌾', size: 30 },
    };
    const c = config[type] || config.factory;
    return L.divIcon({
        className: '',
        html: `<div style="
            width:${c.size}px; height:${c.size}px; border-radius:50%;
            background:${c.bg}; border:2.5px solid ${c.border};
            display:flex; align-items:center; justify-content:center;
            box-shadow:0 2px 8px rgba(0,0,0,0.25); font-size:${c.size * 0.45}px;
            cursor:pointer; transition:transform 0.2s;
        ">${c.emoji}</div>`,
        iconSize: [c.size, c.size],
        iconAnchor: [c.size / 2, c.size / 2],
    });
}

/* ══════════════════════════════════════════════════════════════
   4. KPI KART BİLEŞENİ
   ══════════════════════════════════════════════════════════════ */
function KpiCard({ icon, iconBg, label, value, unit, change }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
                    {icon}
                </div>
                {change && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        <ArrowUpRight className="h-3 w-3" />
                        {change}
                    </span>
                )}
            </div>
            <p className="text-[11px] text-slate-500 font-medium mb-0.5">{label}</p>
            <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-800 tabular-nums">{value}</span>
                {unit && <span className="text-xs text-slate-400 font-medium">{unit}</span>}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   5. CUSTOM TOOLTIP
   ══════════════════════════════════════════════════════════════ */
function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-lg px-3 py-2">
            <p className="text-xs font-bold text-slate-700 mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="text-[11px] text-slate-500">
                    <span className="font-semibold" style={{ color: p.color }}>{p.name || p.dataKey}:</span> {p.value}
                </p>
            ))}
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   6. ANA BİLEŞEN
   ══════════════════════════════════════════════════════════════ */
export default function StrategicDashboard() {
    const [activeRegion, setActiveRegion] = useState('all');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [apiNodes, setApiNodes] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const layerGroupRef = useRef(null);

    const region = REGIONS[activeRegion];

    // ── Fetch nodes from backend when region changes ──────────
    useEffect(() => {
        setApiLoading(true);
        // Map UI region id to DB region name
        const regionName = region.name; // e.g. 'Marmara', 'Ege' etc.
        const url = region.id === 'all'
            ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/facilities`
            : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/facilities?region=${encodeURIComponent(regionName)}`;

        fetch(url)
            .then(r => r.json())
            .then(json => {
                if (json.success && json.data.length > 0) {
                    // Normalize DB shape → component node shape
                    const normalized = json.data.map(f => ({
                        id: f.id || f._id,
                        name: f.name,
                        type: f.type.toLowerCase(),        // 'factory' | 'greenhouse' | 'cooperative'
                        lat: f.location?.lat,
                        lng: f.location?.lng,
                        sector: f.sector || '',
                        tons: f.tons || 0,
                        women: f.women,
                        carbon: f.carbon,
                        temp: f.temp,
                        humidity: f.humidity,
                        soilMoisture: f.soilMoisture,
                        iot: f.iot,
                        efficiency: f.efficiency,
                        source: f.source,
                    }));
                    setApiNodes(normalized);
                } else {
                    // Fallback: use hardcoded nodes if DB empty
                    setApiNodes(region.nodes);
                }
            })
            .catch(() => {
                // On error, use hardcoded fallback
                setApiNodes(region.nodes);
            })
            .finally(() => setApiLoading(false));
    }, [activeRegion]);

    // Total KPIs across all regions
    const totalKpi = useMemo(() => {
        return REGION_LIST.reduce((acc, r) => ({
            waste: acc.waste + r.kpi.waste,
            co2: acc.co2 + r.kpi.co2,
            matches: acc.matches + r.kpi.matches,
            users: acc.users + r.kpi.users,
        }), { waste: 0, co2: 0, matches: 0, users: 0 });
    }, []);

    // Initialize map
    useEffect(() => {
        if (mapInstanceRef.current || !mapRef.current) return;

        const map = L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: true,
        }).setView(region.center, region.zoom);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 18,
        }).addTo(map);

        mapInstanceRef.current = map;
        layerGroupRef.current = L.layerGroup().addTo(map);

        return () => {
            map.remove();
            mapInstanceRef.current = null;
            layerGroupRef.current = null;
        };
    }, []);

    // Update map on region change OR when apiNodes arrive
    useEffect(() => {
        const map = mapInstanceRef.current;
        const layerGroup = layerGroupRef.current;
        if (!map || !layerGroup) return;

        // Use API nodes if loaded, else fall back to hardcoded
        const nodes = apiNodes.length > 0 ? apiNodes : region.nodes;

        // Clear previous layers
        layerGroup.clearLayers();

        // Fly to new region
        map.flyToBounds(region.bounds, { duration: 1.2, padding: [30, 30] });

        // Build node lookup (for connections — still use hardcoded connections for now)
        const nodeMap = {};
        region.nodes.forEach(n => { nodeMap[n.id] = n; });

        // Draw connections first (below markers)
        region.connections.forEach(conn => {
            const fromNode = nodeMap[conn.from];
            const toNode = nodeMap[conn.to];
            if (!fromNode || !toNode) return;

            const color = conn.type === 'heat' ? '#059669' : '#0ea5e9';
            const polyline = L.polyline(
                [[fromNode.lat, fromNode.lng], [toNode.lat, toNode.lng]],
                {
                    color,
                    weight: 2.5,
                    opacity: 0.6,
                    dashArray: '8, 6',
                    className: 'symbiosis-line',
                }
            );
            polyline.bindTooltip(
                `<div style="font-family:system-ui; font-size:11px; font-weight:600; color:#334155;">
                    ${conn.label}
                    <br/><span style="color:${color}; font-size:10px;">${conn.type === 'heat' ? '♻️ Tarımsal Simbiyoz' : '🔧 Endüstriyel Simbiyoz'}</span>
                </div>`,
                { sticky: true, className: 'custom-tooltip' }
            );
            layerGroup.addLayer(polyline);
        });

        // Draw nodes (from API or fallback)
        nodes.forEach(node => {
            if (!node.lat || !node.lng) return;
            const marker = L.marker([node.lat, node.lng], {
                icon: createIcon(node.type),
            });

            const typeLabel = node.type === 'factory' ? '🏭 Fabrika'
                : node.type === 'greenhouse' ? '🌱 Sera'
                    : '👩\u200d🌾 Kadın Kooperatifi';

            const extraInfo = node.type === 'cooperative' && node.women
                ? `<br/><span style="color:#db2777;">👩 ${node.women} Kadın Üretici</span>`
                : '';

            marker.bindTooltip(
                `<div style="font-family:system-ui; min-width:180px; padding:4px 2px;">
                    <div style="font-weight:700; font-size:12px; color:#1e293b; margin-bottom:4px;">${node.name}</div>
                    <div style="font-size:10px; color:#64748b; margin-bottom:3px;">${typeLabel} · ${node.sector}</div>
                    <div style="font-size:11px; color:#0c4e33; font-weight:600;">
                        📦 ${node.tons} Ton/Yıl
                    </div>
                    ${extraInfo}
                </div>`,
                { direction: 'top', offset: [0, -10], className: 'custom-tooltip' }
            );

            layerGroup.addLayer(marker);
        });

    }, [activeRegion, apiNodes]);

    return (
        <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-7xl mx-auto py-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 mb-3">
                        <MapPin className="h-3.5 w-3.5" />
                        STRATEJİK ANALİZ PANELİ
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight font-serif">
                        Bölgesel Simbiyoz <span className="text-[#0c4e33]">Haritası</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 font-serif">
                        Türkiye'deki endüstriyel simbiyoz ağlarını bölgesel bazda analiz edin.
                    </p>
                </div>

                {/* Region Selector */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all text-sm font-semibold text-slate-700 min-w-[200px] justify-between"
                    >
                        <span className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#0c4e33]" />
                            {region.id === 'all' ? region.name : `${region.name} Bölgesi`}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden min-w-[200px]">
                            {REGION_LIST.map(r => (
                                <button
                                    key={r.id}
                                    onClick={() => { setActiveRegion(r.id); setDropdownOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${activeRegion === r.id
                                            ? 'bg-emerald-50 text-[#0c4e33] font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <MapPin className="h-3.5 w-3.5" />
                                    {r.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Loading Overlay */}
            {apiLoading && (
                <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[1000] flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 px-6 py-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                        <div className="h-5 w-5 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-bold text-slate-800 tracking-tight">Bölge Verileri Güncelleniyor...</span>
                    </div>
                </div>
            )}


            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    icon={<Recycle className="h-5 w-5 text-emerald-600" />}
                    iconBg="bg-emerald-50"
                    label="Toplam Atık Değişimi"
                    value={totalKpi.waste.toLocaleString('tr-TR')}
                    unit="Ton"
                    change="+12%"
                />
                <KpiCard
                    icon={<Leaf className="h-5 w-5 text-teal-600" />}
                    iconBg="bg-teal-50"
                    label="Toplam CO₂ Tasarrufu"
                    value={totalKpi.co2.toLocaleString('tr-TR')}
                    unit="Ton"
                    change="+18%"
                />
                <KpiCard
                    icon={<Zap className="h-5 w-5 text-amber-600" />}
                    iconBg="bg-amber-50"
                    label="Aktif Eşleşmeler"
                    value={totalKpi.matches}
                    change="+5"
                />
                <KpiCard
                    icon={<Users className="h-5 w-5 text-rose-600" />}
                    iconBg="bg-rose-50"
                    label="Aktif Kullanıcılar"
                    value={totalKpi.users}
                    change="+8"
                />
            </div>

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* LEFT — Analytics Panel (2/5) */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Region KPI */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                                {region.id === 'all' ? `${region.name} — Özet` : `${region.name} Bölgesi — Özet`}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/60">
                                <p className="text-[10px] text-emerald-600 font-bold uppercase mb-1">Atık Değişimi</p>
                                <p className="text-lg font-extrabold text-slate-800">{region.kpi.waste.toLocaleString('tr-TR')} <span className="text-xs font-medium text-slate-400">Ton</span></p>
                            </div>
                            <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100/60">
                                <p className="text-[10px] text-teal-600 font-bold uppercase mb-1">CO₂ Tasarrufu</p>
                                <p className="text-lg font-extrabold text-slate-800">{region.kpi.co2.toLocaleString('tr-TR')} <span className="text-xs font-medium text-slate-400">Ton</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Line Chart - CO₂ Trend */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                            Çeyreklik CO₂ Azaltım Trendi
                        </h3>
                        <ResponsiveContainer width="100%" height={180}>
                            <LineChart data={region.co2Trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="q" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <ReTooltip content={<ChartTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    name="CO₂ (Ton)"
                                    stroke="#059669"
                                    strokeWidth={2.5}
                                    dot={{ fill: '#059669', r: 4, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2, fill: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Donut Chart - Sector Waste */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                            Sektörel Atık Dağılımı
                        </h3>
                        <div className="flex items-center gap-4">
                            <ResponsiveContainer width="50%" height={160}>
                                <PieChart>
                                    <Pie
                                        data={region.sectorWaste}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={65}
                                        paddingAngle={3}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {region.sectorWaste.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ReTooltip content={<ChartTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex-1 space-y-2">
                                {region.sectorWaste.map((s, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2.5 w-2.5 rounded-full inline-block" style={{ background: s.color }} />
                                            <span className="text-slate-600 font-medium">{s.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-700">%{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart - Connections per Region */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                            Bölgesel Simbiyoz Bağlantıları
                        </h3>
                        <ResponsiveContainer width="100%" height={160}>
                            <BarChart data={barData} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                <ReTooltip content={<ChartTooltip />} />
                                <Bar dataKey="bağlantı" name="Bağlantı" fill="#059669" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="tesis" name="Tesis" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* RIGHT — Map (3/5) */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        {/* Map Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <MapPin className="h-4 w-4 text-[#0c4e33]" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 font-serif">
                                        {region.id === 'all' ? `${region.name}: Aktif Simbiyoz Ağı` : `${region.name} Pilot Bölgesi: Aktif Simbiyoz Ağı`}
                                    </h3>
                                    <p className="text-[10px] text-slate-500">
                                        {region.nodes.length} Tesis · {region.connections.length} Bağlantı
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[11px] font-bold text-emerald-700">Canlı</span>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div ref={mapRef} style={{ height: 480 }} className="z-10" />

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-5 px-5 py-3 border-t border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-orange-500 inline-flex items-center justify-center text-[8px]">🏭</span>
                                <span className="text-[11px] text-slate-600 font-medium">Fabrika</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-emerald-600 inline-flex items-center justify-center text-[8px]">🌱</span>
                                <span className="text-[11px] text-slate-600 font-medium">Sera</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-full bg-pink-600 inline-flex items-center justify-center text-[8px]">👩</span>
                                <span className="text-[11px] text-slate-600 font-medium">Kadın Kooperatifi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-[3px] rounded bg-emerald-600 inline-block" style={{ borderTop: '2px dashed #059669' }} />
                                <span className="text-[11px] text-slate-600 font-medium">Tarımsal Simbiyoz</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-[3px] rounded bg-sky-500 inline-block" style={{ borderTop: '2px dashed #0ea5e9' }} />
                                <span className="text-[11px] text-slate-600 font-medium">Endüstriyel Simbiyoz</span>
                            </div>
                        </div>
                    </div>

                    {/* Cooperative Summary Cards */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-lg">👩‍🌾</span>
                            <h3 className="text-sm font-bold text-slate-700 font-serif">
                                {region.name} Bölgesi — Kadın Kooperatifleri
                            </h3>
                            <span className="ml-auto text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                                {region.nodes.filter(n => n.type === 'cooperative').length} Kooperatif
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                            {region.nodes.filter(n => n.type === 'cooperative').map(coop => (
                                <div key={coop.id} className="bg-white rounded-2xl border border-rose-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="h-9 w-9 rounded-xl bg-rose-50 flex items-center justify-center text-base flex-shrink-0">
                                            👩‍🌾
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-slate-800 font-serif leading-snug">{coop.name}</h4>
                                            <p className="text-[9px] text-slate-400 mt-0.5 truncate">📍 {coop.city} · {coop.source}</p>
                                        </div>
                                        <span className="ml-auto flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 whitespace-nowrap flex-shrink-0">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            {coop.iot}
                                        </span>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-3 gap-1.5 mb-2">
                                        <div className="text-center bg-rose-50/70 rounded-lg py-1.5">
                                            <p className="text-sm font-extrabold text-slate-800">{coop.women}</p>
                                            <p className="text-[8px] text-rose-500 font-semibold">Kadın</p>
                                        </div>
                                        <div className="text-center bg-emerald-50/70 rounded-lg py-1.5">
                                            <p className="text-sm font-extrabold text-slate-800">{coop.carbon}</p>
                                            <p className="text-[8px] text-emerald-600 font-semibold">T CO₂/Yıl</p>
                                        </div>
                                        <div className="text-center bg-amber-50/70 rounded-lg py-1.5">
                                            <p className="text-sm font-extrabold text-slate-800">%{coop.efficiency}</p>
                                            <p className="text-[8px] text-amber-600 font-semibold">Verim</p>
                                        </div>
                                    </div>

                                    {/* IoT Gauges */}
                                    <div className="grid grid-cols-3 gap-1 text-[8px] text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <span className="text-orange-400">🌡</span>
                                            <span className="font-semibold text-slate-700">{coop.temp}°C</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-blue-400">💧</span>
                                            <span className="font-semibold text-slate-700">%{coop.humidity}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-green-500">🌱</span>
                                            <span className="font-semibold text-slate-700">%{coop.soilMoisture}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
