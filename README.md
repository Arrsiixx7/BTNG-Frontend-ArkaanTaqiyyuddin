# 🏎️ VELOCE AUTO — Showroom & E-Commerce Mobil Premium
> **Tugas Akhir BTNG Kelas Frontend — DNCC UDINUS 2026**  
> Dibuat oleh: **Arkaan Taqiyyuddin Ilham Achmad Wijaya**  
> Repository: `BTNG-Frontend-ArkaanTaqiyyuddin`

---

## 🌟 Gambaran Umum Proyek

**VELOCE AUTO** adalah platform website E-Commerce & Showroom Mobil mewah yang dibangun menggunakan **HTML5, CSS3 murni, dan Vanilla JavaScript (Native)** tanpa ketergantungan pada library atau framework JavaScript eksternal (seperti React, Vue, jQuery, atau Bootstrap).

Fokus utama pengembangan adalah **kualitas tampilan visual (UI)**, **kenyamanan interaksi pengguna (UX)**, **animasi halus (*smooth transitions & micro-interactions*)**, **responsivitas penuh (*mobile-first*)**, serta **integrasi API dinamis** menggunakan DOM manipulation.

---

## ✨ Fitur-Fitur Unggulan

### 1. Integrasi API Resmi & DOM Manipulation Dinamis
- **Endpoint**: `https://api-web.dnccudinus.org/api/mobil`
- Pengambilan data asynchronous menggunakan fungsi native `fetch()` dengan penanganan error (*try-catch*) dan abort timeout.
- Render elemen kartu mobil secara dinamis melalui DOM manipulation (`createElement()`, `appendChild()`, `classList`).
- **Zero CLS Shimmer Loading**: Skeleton loading beranimasi saat proses fetch data berlangsung.
- **State Handling**: State Kosong (*Empty State*) dan State Gangguan (*Error State*) dilengkapi tombol *Muat Ulang / Reset Filter*.

### 2. Sistem Pencarian, Filter & Pengurutan Instan (Real-time)
- **Live Search**: Pencarian cepat berdasarkan nama mobil maupun brand pabrikan secara real-time disertai tombol *Clear*.
- **Pills Filter Bahan Bakar**: Filter kategori (*Bensin, Diesel, Hybrid, Listrik/EV*) lengkap dengan badge jumlah unit dinamis yang dihitung dari API.
- **Multi-Dropdown Filter**: Filter lanjutan berdasarkan Brand, Tipe Transmisi (*Matic, CVT, Manual*), dan Status Ketersediaan (*Tersedia / Terjual*).
- **Pengurutan Fleksibel (Sorting)**:
  - Rekomendasi (Unit tersedia & terpopuler di atas)
  - Harga Terendah → Tertinggi
  - Harga Tertinggi → Terendah
  - Tahun Rilis Terbaru
  - Nama Alfabetis (A - Z)

### 3. Kalkulator Simulasi Kredit Interaktif
- Perhitungan otomatis estimasi cicilan per bulan secara real-time.
- Slider interaktif uang muka (*Down Payment / DP*) dari 15% hingga 60%.
- Pilihan tenor fleksibel (12, 24, 36, 48, hingga 60 bulan) dengan suku bunga flat transparan.
- Rincian biaya: Total DP, Pokok Pembiayaan, Suku Bunga, dan Total Pengeluaran.

### 4. Detail Unit Mobil & Booking Test Drive
- Modal pop-up dengan efek *backdrop blur glassmorphism*.
- Foto resolusi tinggi, spesifikasi lengkap, garansi mesin, dan kalkulasi angsuran instan.
- Formulir pendaftaran jadwal *Test Drive* interaktif dengan validasi tanggal (otomatis mencegah tanggal masa lalu) dan umpan balik visual (*toast alert*).

### 5. Garasi Favorit (Wishlist) & LocalStorage
- Pengguna dapat menandai mobil impian mereka dengan tombol hati (*heart pop micro-animation*).
- Data favorit tersimpan otomatis dan persisten di `localStorage` peramban.
- Drawer khusus untuk meninjau dan menghapus mobil yang disimpan.

### 6. Desain UI/UX & Animasi Halus (*Smooth Animations*)
- **Dark & Light Mode Switcher**: Mendukung mode Gelap (Obsidian Luxury) dan mode Terang (Platinum Minimalist) dengan penyimpanan state di `localStorage`.
- **Glassmorphism Design System**: Efek kaca modern dengan backdrop blur halus pada navbar, kartu, dan modal.
- **Micro-Interactions**: Hover 3D tilt pada kartu mobil, ripple pada tombol, badge pulse pada status "Tersedia", dan rotasi akordeon FAQ.
- **Toast Notifications**: Notifikasi pop-up cerdas di sudut layar dengan animasi slide-in & auto-dismiss.
- **Scroll Spy Navbar**: Indikator link menu otomatis aktif sesuai posisi section halaman yang sedang dibaca.

---

## 📁 Struktur Direktori Proyek

```text
BTNG-Frontend-ArkaanTaqiyyuddin/
├── index.html              # Halaman utama semantik (HTML5)
├── css/
│   ├── style.css           # Styling dasar, layout, tema (dark/light), typography
│   ├── animations.css      # Keyframes animasi (shimmer, fadeInUp, toast, modal)
│   └── responsive.css      # Media queries khusus (mobile, tablet, desktop)
├── js/
│   ├── api.js              # Modul fetch API resmi DNCC
│   ├── dom.js              # DOM manipulation (render card, skeleton, toast, modal)
│   ├── filters.js          # Logika filter, keyword search, & sorting
│   ├── calculator.js       # Logika perhitungan simulasi kredit
│   └── app.js              # Controller utama & inisialisasi aplikasi
└── README.md               # Dokumentasi lengkap proyek
```

---

## 🚀 Cara Menjalankan Website

Proyek ini tidak memerlukan kompilasi atau dependensi npm/node khusus karena berbasis **Pure Vanilla Web Technologies (ES6 Modules)**.

### Metode 1: Menggunakan Live Server (VS Code)
1. Buka folder proyek ini di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (Ritwick Dey).
3. Klik kanan pada file `index.html` dan pilih **Open with Live Server**.
4. Website akan terbuka otomatis di peramban Anda (biasanya `http://127.0.0.1:5500/`).

### Metode 2: Menggunakan Python Web Server (Terminal / Bash)
Buka terminal di dalam folder proyek, lalu jalankan:
```bash
python3 -m http.server 8000
```
Buka peramban dan akses alamat `http://localhost:8000`.

### Metode 3: Menggunakan PHP Built-in Server
```bash
php -S localhost:8000
```
Buka peramban dan akses alamat `http://localhost:8000`.

---

## 📊 Pemenuhan Rubrik Penilaian Tugas Akhir

| No | Aspek Penilaian | Bobot | Implementasi di Proyek Veloce Auto |
|:--:|:---|:---:|:---|
| 1 | **Tampilan dan UI/UX** | **40%** | Desain bertema *Automotive Luxury Glassmorphism*, hierarki tipografi *Outfit & Plus Jakarta Sans*, sistem warna konsisten, Dark/Light Mode, layout teratur, micro-animations, dan toast notifications. |
| 2 | **Integrasi API & DOM Manipulation** | **30%** | Pengambilan data langsung dari endpoint `https://api-web.dnccudinus.org/api/mobil` menggunakan `fetch()`. DOM manipulation murni (`createElement`, `innerHTML`, `appendChild`), penanganan state loading skeleton, filter dinamis, dan kalkulator interaktif. |
| 3 | **Responsivitas Website** | **20%** | Tampilan fleksibel dan proporsional di seluruh resolusi: Mobile Smartphone (< 640px) dengan menu drawer, Tablet (768px - 1024px), hingga Desktop layar lebar. |
| 4 | **Kerapian Kode** | **10%** | Struktur modular terpisah (`api.js`, `dom.js`, `filters.js`, `calculator.js`, `app.js`), semantic tags HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), CSS Variables terpusat, clean code tanpa error sintaks pada console. |

---

## 👨‍💻 Identitas Peserta

- **Nama Lengkap**: Arkaan Taqiyyuddin Ilham Achmad Wijaya
- **Username GitHub**: [Arrsiixx7](https://github.com/Arrsiixx7)
- **Pelatihan**: BTNG (Bina Talenta Next Gen) Kelas Frontend
- **Penyelenggara**: DNCC (Dian Nuswantoro Computer Club) Universitas Dian Nuswantoro
- **Tahun**: 2026
