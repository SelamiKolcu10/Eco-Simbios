<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

# ♻️ Eco-Simbios — Döngüsel Ekonomi Platformu

**Eco-Simbios**, atık üreten tesislerle bu atıkları hammadde olarak kullanabilecek tesisleri bir araya getiren, **endüstriyel simbiyoz** ilkesine dayalı akıllı bir döngüsel ekonomi platformudur. Tıpkı doğadaki ekosistemler gibi, bir üretim sürecinin çıktısı başka bir üretim sürecinin girdisi haline gelir.

> 🌍 *"Doğada atık yoktur — bir canlının atığı, bir başkasının besin kaynağıdır."*

---

## 📋 İçindekiler

- [🎯 Proje Hakkında](#-proje-hakkında)
- [✨ Özellikler](#-özellikler)
- [🏗️ Mimari & Teknoloji Yığını](#️-mimari--teknoloji-yığını)
- [📂 Proje Yapısı](#-proje-yapısı)
- [🚀 Kurulum & Çalıştırma](#-kurulum--çalıştırma)
- [🔌 API Endpoint'leri](#-api-endpointleri)
- [📸 Ekran Görüntüleri](#-ekran-görüntüleri)
- [🤝 Katkıda Bulunma](#-katkıda-bulunma)
- [📄 Lisans](#-lisans)

---

## 🎯 Proje Hakkında

Türkiye'de her yıl milyonlarca ton endüstriyel atık üretilmektedir. Bu atıkların büyük çoğunluğu depolama sahalarına gönderilirken, aslında başka endüstriler için değerli hammadde niteliği taşımaktadır. **Eco-Simbios** bu sorunu çözmek için geliştirilmiştir:

- 🏭 **Atık üreticileri** ile **hammadde arayanları** akıllı eşleştirme algoritmasıyla buluşturur
- 📊 Gerçek zamanlı **KPI dashboard** ile karbon tasarrufu ve ekonomik kazancı takip eder
- 🗺️ **Stratejik harita** üzerinde tesisleri ve atık akışlarını görselleştirir
- 💹 **Pazar yeri** ile atık materyallerin alım-satımını kolaylaştırır
- 🌱 **Sosyal etki** analiziyle sürdürülebilirlik hedeflerinin izlenmesini sağlar

---

## ✨ Özellikler

| Modül | Açıklama |
|-------|----------|
| **📊 Dashboard** | KPI kartları, gelir/karbon grafikleri, keşif sayfası |
| **🗺️ Stratejik Harita** | Leaflet tabanlı interaktif harita, tesis lokasyonları, atık akış rotaları |
| **💹 Pazar Yeri** | Atık materyal ilanları, favori sistemi, alım-satım işlemleri |
| **🤖 Akıllı Eşleştirme** | Tesis profili oluşturma ve otomatik atık-hammadde eşleştirme motoru |
| **🌱 Sosyal Etki** | Çevresel & sosyal etki raporları, topluluk talepleri |
| **👤 Kimlik Doğrulama** | JWT tabanlı kayıt/giriş, admin paneli |
| **🔔 Bildirimler** | Gerçek zamanlı bildirim sistemi |
| **⚙️ Admin Paneli** | Kullanıcı yönetimi, tesis onaylama, platform istatistikleri |

---

## 🏗️ Mimari & Teknoloji Yığını

```
┌──────────────────────────────────────────────────────┐
│                     FRONTEND                          │
│  React 18 · Vite 6 · TailwindCSS 4 · Framer Motion  │
│  React Router · Recharts · Chart.js · Leaflet        │
│  Radix UI · Lucide Icons · React Hook Form · Zod     │
├──────────────────────────────────────────────────────┤
│                   REST API (Axios)                    │
├──────────────────────────────────────────────────────┤
│                     BACKEND                           │
│  Node.js · Express 4 · Mongoose · JWT · bcrypt       │
├──────────────────────────────────────────────────────┤
│                    DATABASE                           │
│              MongoDB Atlas (Cloud)                    │
└──────────────────────────────────────────────────────┘
```

### Frontend
| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| React | 18.3 | UI bileşenleri |
| Vite | 6.2 | Build & dev server |
| TailwindCSS | 4.1 | Stil sistemi |
| React Router | 7.x | Sayfa yönlendirme |
| Framer Motion | 12.x | Animasyonlar |
| Leaflet + React Leaflet | 1.9 / 4.2 | İnteraktif harita |
| Recharts + Chart.js | 3.x / 4.x | Grafikler & veri görselleştirme |
| Radix UI | — | Erişilebilir UI primitifleri |
| Axios | 1.x | HTTP istemcisi |
| Zod + React Hook Form | — | Form doğrulama |

### Backend
| Teknoloji | Versiyon | Kullanım |
|-----------|----------|----------|
| Node.js | 20+ | Çalışma ortamı |
| Express | 4.18 | Web framework |
| Mongoose | 8.x | MongoDB ODM |
| JWT | 9.x | Token bazlı kimlik doğrulama |
| bcryptjs | 3.x | Şifre hashleme |
| express-rate-limit | 8.x | İstek sınırlama |
| dotenv | 16.x | Ortam değişkenleri |

---

## 📂 Proje Yapısı

```
Eco-Simbios/
├── frontend/                   # React + Vite uygulaması
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Giriş & Kayıt ekranları
│   │   │   ├── dashboard/      # Ana panel & keşif sayfası
│   │   │   ├── map/            # Stratejik harita modülü
│   │   │   ├── market/         # Pazar yeri modülü
│   │   │   ├── matchmaking/    # Akıllı eşleştirme motoru
│   │   │   ├── social/         # Sosyal etki modülü
│   │   │   ├── layout/         # Navbar & layout bileşenleri
│   │   │   ├── settings/       # Ayarlar
│   │   │   ├── shared/         # Paylaşılan bileşenler
│   │   │   └── ui/             # Radix UI tabanlı temel bileşenler
│   │   ├── context/            # React Context (Auth vb.)
│   │   ├── data/               # Statik veri dosyaları
│   │   ├── lib/                # Yardımcı fonksiyonlar
│   │   ├── pages/              # Sayfa bileşenleri (Admin vb.)
│   │   ├── App.jsx             # Ana uygulama & route tanımları
│   │   ├── main.jsx            # Giriş noktası
│   │   └── index.css           # Global stiller
│   ├── public/                 # Statik dosyalar
│   ├── vite.config.js          # Vite yapılandırması
│   ├── tsconfig.json           # TypeScript yapılandırması
│   └── package.json
│
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/             # Veritabanı bağlantı ayarları
│   │   ├── controllers/        # İş mantığı katmanı
│   │   ├── middlewares/        # Auth, hata yakalama vb.
│   │   ├── models/             # Mongoose modelleri
│   │   │   ├── Facility.js     # Tesis modeli
│   │   │   ├── Listing.js      # İlan modeli
│   │   │   ├── MarketItem.js   # Pazar yeri öğesi
│   │   │   ├── Match.js        # Eşleşme modeli
│   │   │   ├── Notification.js # Bildirim modeli
│   │   │   ├── SocialRequest.js# Sosyal talep modeli
│   │   │   └── Transaction.js  # İşlem modeli
│   │   ├── routes/             # API route tanımları
│   │   └── utils/              # Yardımcı araçlar
│   ├── server.js               # Sunucu giriş noktası
│   ├── seeder.js               # Veritabanı seed scripti
│   ├── .env.example            # Ortam değişkenleri şablonu
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Kurulum & Çalıştırma

### Gereksinimler

- **Node.js** v20 veya üzeri
- **npm** v9 veya üzeri
- **MongoDB Atlas** hesabı (veya yerel MongoDB)

### 1. Repoyu Klonlayın

```bash
git clone https://github.com/SelamiKolcu10/Eco-Simbios.git
cd Eco-Simbios
```

### 2. Backend Kurulumu

```bash
cd backend
npm install
```

`.env.example` dosyasını kopyalayıp `.env` olarak yeniden adlandırın ve kendi bilgilerinizle doldurun:

```bash
cp .env.example .env
```

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<kullanici>:<sifre>@cluster0.mongodb.net/ecosymbiosis?retryWrites=true&w=majority
JWT_SECRET=guclu_bir_gizli_anahtar
```

Backend'i başlatın:

```bash
# Geliştirme modu (hot-reload)
npm run dev

# Üretim modu
npm start
```

> 🟢 Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışır.

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
```

Frontend `.env` dosyasını oluşturun:

```env
VITE_API_URL=http://localhost:5000
```

Frontend'i başlatın:

```bash
npm run dev
```

> 🟢 Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

### 4. Veritabanını Seed'leyin (İsteğe Bağlı)

Örnek verilerle veritabanını doldurmak için:

```bash
cd backend
node seeder.js
```

---

## 🔌 API Endpoint'leri

Base URL: `http://localhost:5000/api`

| Yöntem | Endpoint | Açıklama |
|--------|----------|----------|
| **Auth** | | |
| `POST` | `/api/auth/register` | Yeni kullanıcı kaydı |
| `POST` | `/api/auth/login` | Giriş yapma |
| **Tesisler** | | |
| `GET` | `/api/facilities` | Tüm tesisleri listele |
| `POST` | `/api/facilities` | Yeni tesis ekle |
| **İlanlar** | | |
| `GET` | `/api/listings` | Tüm ilanları listele |
| `POST` | `/api/listings` | Yeni ilan oluştur |
| **Pazar Yeri** | | |
| `GET` | `/api/market` | Pazar öğelerini listele |
| **Eşleşmeler** | | |
| `GET` | `/api/matches` | Eşleşmeleri getir |
| **Bildirimler** | | |
| `GET` | `/api/notifications` | Bildirimleri getir |
| **İstatistikler** | | |
| `GET` | `/api/stats` | Platform istatistikleri |
| **Sosyal** | | |
| `POST` | `/api/social/request` | Sosyal talep oluştur |
| **Abonelik** | | |
| `GET` | `/api/subscription` | Abonelik bilgileri |

> 🔒 Korumalı endpoint'ler için `Authorization: Bearer <token>` header'ı gereklidir.

---

## 📸 Ekran Görüntüleri

> *Ekran görüntüleri yakında eklenecektir.*

<!-- Ekran görüntülerinizi aşağıdaki formatta ekleyebilirsiniz:
![Dashboard](docs/screenshots/dashboard.png)
![Harita](docs/screenshots/map.png)
![Pazar Yeri](docs/screenshots/market.png)
-->

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Projeye katkıda bulunmak için:

1. Bu repoyu **fork** edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. **Pull Request** açın

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

---

<p align="center">
  <b>Selami Kolçu</b> tarafından 💚 ile geliştirilmiştir.
  <br/>
  <a href="https://github.com/SelamiKolcu10">GitHub Profili</a>
</p>
