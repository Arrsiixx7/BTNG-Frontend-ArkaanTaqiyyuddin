# 🏎️ VELOCE AUTO — Showroom & E-Commerce Mobil Terverifikasi
> **Tugas Akhir BTNG Kelas Frontend — DNCC UDINUS 2026**  
> Dibuat oleh: **Arkaan Taqiyyuddin Ilham Achmad Wijaya**  
> Repository: `BTNG-Frontend-ArkaanTaqiyyuddin`  
> 🌐 **Live Demo Website**: [https://arrsiixx7.github.io/BTNG-Frontend-ArkaanTaqiyyuddin/](https://arrsiixx7.github.io/BTNG-Frontend-ArkaanTaqiyyuddin/)

---

## 🌟 Gambaran Umum Proyek

**VELOCE AUTO** adalah platform katalog & showroom mobil yang dirancang dengan pendekatan **Human-Centered UI/UX (Zero AI Slop)** dan dibangun menggunakan **HTML5 semantik, CSS3 murni, dan Vanilla JavaScript (Native ES6 Modules)** tanpa library atau framework tambahan.

Seluruh data 12 unit mobil diambil secara langsung (*live*) dari endpoint resmi panitia BTNG DNCC Udinus menggunakan fungsi `fetch()` dan diproses ke dalam tampilan visual interaktif menggunakan manipulasi DOM murni.

---

## ✨ Fitur-Fitur & Peningkatan Desain UI/UX

### 1. Desain Human-Crafted (Tanpa Elemen Generik AI)
- **Visual Bersih & Berkontras Tinggi**: Menggunakan palet *Deep Asphalt* (Dark Mode) dan *Crisp Platinum Studio* (Light Mode) dengan border 1px yang tegas dan bayangan halus alami.
- **Tipografi Proporsional**: Kombinasi Google Fonts *Outfit* (heading) dan *Plus Jakarta Sans* (body text) yang nyaman dibaca.
- **Dark / Light Mode**: Tersimpan secara persisten di `localStorage` peramban.

### 2. Integrasi API Resmi & DOM Manipulation Dinamis
- **Endpoint**: `https://api-web.dnccudinus.org/api/mobil`
- Pengambilan data asynchronous menggunakan fungsi `fetch()` dengan penanganan error (*try-catch*) dan abort timeout.
- Render elemen kartu mobil secara dinamis menggunakan manipulasi DOM murni (`createElement()`, `appendChild()`, `classList`).
- **Shimmer Skeleton Loading**: State transisi pemuatan data tanpa *Cumulative Layout Shift (CLS)*.
- **Empty State & Error State**: Tampilan informatif ketika filter tidak menemukan hasil atau terjadi kendala jaringan.

### 3. Komparasi Head-to-Head (Fitur Bandingkan 2 Mobil)
- Pengguna dapat memilih 2 unit mobil berbeda untuk dibandingkan langsung secara berdampingan.
- Floating bar interaktif muncul di bawah layar saat mobil dipilih (`1/2` & `2/2 Mobil Terpilih`).
- Modal komparasi menyajikan perbandingan detail: foto, harga, tahun, bahan bakar, transmisi, status, hingga estimasi cicilan bulanan.
- **Badge Diferensial Otomatis**: Secara otomatis menghitung dan menandai unit yang lebih hemat (*Hemat Rp...*) dan unit dengan tahun lebih baru (*+X thn lebih muda*).

### 4. Integrasi WhatsApp Langsung (Direct WhatsApp Inquiry)
- Tombol WhatsApp pada setiap unit mobil otomatis membuat pesan siap kirim dengan teks spesifik:
  > *"Halo Veloce Auto, saya ingin tanya ketersediaan unit [Brand] [Nama Mobil] (Tahun [Tahun], Harga [Harga]). Apakah unit ini masih tersedia untuk test drive?"*

### 5. Pencarian & Filter Cerdas Terpadu
- **Pencarian Real-Time**: Mencari berdasarkan nama model maupun brand pabrikan.
- **Pintasan Keyboard (Shortcut)**: Tekan tombol `/` di keyboard untuk langsung melompat ke kotak pencarian, dan `Esc` untuk menutup dialog/modal.
- **Chips Filter Aktif**: Label indikator filter aktif yang dapat dihapus secara individual atau sekaligus dengan tombol "Hapus Semua".
- **Chips Bahan Bakar**: Filter instan *Bensin, Diesel, Hybrid, Listrik (EV)* dengan penghitung jumlah unit otomatis.
- **Multi-Dropdown**: Filter berdasarkan Brand, Transmisi (*Matic, CVT, Manual*), dan Status (*Tersedia, Terjual*).
- **Pengurutan (Sort)**: Rekomendasi, Harga Termurah/Termahal, Tahun Terbaru, dan Nama Alfabetis.

### 6. Kalkulator Simulasi Kredit Interaktif
- Perhitungan estimasi angsuran per bulan secara real-time.
- Slider interaktif uang muka (DP) dari 15% hingga 60%.
- Pilihan tenor fleksibel (12, 24, 36, 48, 60 bulan) dengan suku bunga flat acuan.
- Format angka tabular monospace (*JetBrains Mono*) untuk presisi pembacaan finansial.

### 7. Garasi Favorit (Wishlist) & Test Drive Form
- Tandai mobil favorit dengan tombol hati (tersimpan di `localStorage`).
- Formulir booking test drive dengan validasi otomatis (mencegah pemilihan tanggal lampau).
- Notifikasi toast dinamis dengan animasi progress bar waktu tersisa.

---

## 📁 Struktur Direktori Proyek

```text
BTNG-Frontend-ArkaanTaqiyyuddin/
├── index.html              # Halaman utama berstruktur semantik
├── css/
│   ├── style.css           # Sistem desain human-crafted, tokens, dark/light theme
│   ├── animations.css      # Animasi halus (shimmer, fadeUp, modal, toast)
│   └── responsive.css      # Breakpoints responsif mobile, tablet, dan desktop
├── js/
│   ├── api.js              # Fetch data dari endpoint resmi DNCC
│   ├── dom.js              # DOM manipulation untuk card, skeleton, modal, & toast
│   ├── filters.js          # Logika pencarian, filter, & sorting
│   ├── calculator.js       # Logika perhitungan simulasi kredit
│   └── app.js              # Controller utama aplikasi, compare, & event listeners
└── README.md               # Dokumentasi lengkap proyek
```

---

## 🚀 Cara Menjalankan Website

Proyek ini berbasis **Pure Vanilla Web Technologies (ES6 Modules)** sehingga tidak membutuhkan langkah build/kompilasi.

### Metode 1: Python Web Server
```bash
cd /home/arr_sixx/Projects/BTNG-Frontend-ArkaanTaqiyyuddin
python3 -m http.server 8000
```
Buka peramban di: `http://localhost:8000`

### Metode 2: VS Code Live Server
Buka folder di VS Code, klik kanan `index.html`, lalu pilih **Open with Live Server**.

---

## 👨‍💻 Identitas Peserta

- **Nama Lengkap**: Arkaan Taqiyyuddin Ilham Achmad Wijaya
- **Username GitHub**: [Arrsiixx7](https://github.com/Arrsiixx7)
- **Kelas**: BTNG (Bina Talenta Next Gen) Kelas Frontend
- **Penyelenggara**: DNCC (Dian Nuswantoro Computer Club) Universitas Dian Nuswantoro
- **Tahun**: 2026
