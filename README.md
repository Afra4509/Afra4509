# SNBT Dashboard 2026 🎯

Dashboard profesional, modern, dan interaktif untuk memantau progress belajar & perkembangan skor Try Out SNBT hingga 21 April 2026.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## 🌟 Fitur Utama

### 📊 Dashboard Utama
- Ringkasan lengkap progress belajar
- Progress bar animatif untuk visualisasi kemajuan
- Motivational quotes dinamis untuk meningkatkan semangat
- Statistik real-time: Total minggu, progress keseluruhan, rata-rata skor, dan streak belajar

### 📅 Jadwal Belajar SNBT (Weekly Planner)
- Jadwal mingguan terstruktur sampai 21 April 2026
- Kategori pembelajaran: TPS, Literasi, dan Campuran
- Tracking 7 subtest SNBT:
  - Penalaran Umum
  - Pengetahuan & Pemahaman Umum
  - Pemahaman Bacaan & Menulis
  - Pengetahuan Kuantitatif
  - Literasi Bahasa Indonesia
  - Literasi Bahasa Inggris
  - Penalaran Matematika
- Status otomatis: Not Started, In Progress, Done

### 📝 Tracker Try Out SNBT
- Input data Try Out dari berbagai platform:
  - TOBK GO
  - Pahamfy
  - SainSin
  - Platform lainnya
- Auto-calculate total score
- Tracking skor per subtest
- Catatan evaluasi untuk setiap Try Out
- Visualisasi gap antara skor saat ini dan target

### 📈 Grafik & Visualisasi Data Interaktif
- **Line Chart**: Perkembangan skor Try Out dari waktu ke waktu
- **Bar Chart**: Perbandingan rata-rata skor per subtest
- **Radar Chart**: Analisis kekuatan & kelemahan per subtest
- Fitur filter per platform
- Hover tooltips informatif
- Animasi smooth dan responsif

### 🗓️ Kalender & Habit Tracker
- Kalender visual untuk tracking aktivitas belajar
- Daily habit tracker:
  - 📚 Belajar hari ini
  - ✍️ Latihan soal
  - 🔍 Review kesalahan
- Streak counter untuk memotivasi konsistensi
- Visual indicators untuk hari-hari produktif

## 🎨 Desain & UI/UX

- ✨ Modern, clean, dan profesional
- 🌓 Dark mode & Light mode support
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎭 Smooth animations dan transitions
- 🎯 Fokus pada kenyamanan mata dan user experience
- 🔵 Color scheme: Blue & Gray modern

## 🛠️ Teknologi

- **Framework**: Next.js 16.1 dengan App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Charts**: Recharts untuk visualisasi data
- **Icons**: Lucide React
- **State Management**: Local Storage + React Hooks
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Afra4509/Afra4509.git
cd Afra4509

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat dashboard.

### Build untuk Production

```bash
npm run build
```

Output akan berada di folder `out/`.

## 📦 Struktur Proyek

```
.
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout dengan metadata
│   ├── page.tsx           # Main page dengan semua fitur
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── DashboardOverview.tsx
│   ├── WeeklyPlanner.tsx
│   ├── TryOutTracker.tsx
│   ├── Charts.tsx
│   ├── CalendarTracker.tsx
│   ├── Header.tsx
│   └── TabNavigation.tsx
├── hooks/                 # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── lib/                   # Utilities dan helpers
│   ├── utils.ts
│   └── initialData.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
└── public/               # Static assets

```

## 💾 Data Persistence

Dashboard menggunakan **Local Storage** untuk menyimpan data:
- Try Out results
- Weekly schedules
- Habit tracking
- User preferences

Data tersimpan di browser dan tidak akan hilang saat refresh.

## 🎯 Roadmap & Future Features

- [ ] Export data ke PDF/Excel
- [ ] Backend integration (Firebase/Supabase)
- [ ] Multi-user support dengan authentication
- [ ] Advanced analytics dan predictions
- [ ] Mobile app (React Native)
- [ ] Notifikasi dan reminders
- [ ] Sharing progress ke social media

## 📝 License

MIT License - feel free to use this project for your SNBT preparation!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**Afra Fadhma Dinata**
- GitHub: [@Afra4509](https://github.com/Afra4509)
- LinkedIn: [Afra Fadhma Dinata](https://linkedin.com/in/afra-fadhma-dinata)

---

<div align="center">

**Dibuat dengan ❤️ untuk kesuksesan SNBT 2026**

*Konsisten adalah kunci kesuksesan! 💪*

</div>
