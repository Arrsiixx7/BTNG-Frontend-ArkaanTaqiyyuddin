# Plan: Redesain UI/UX Veloce Auto & Pembuatan Master Prompt Google Stitch / Flow (BTNG Frontend 2026)

## Goal
Merancang arsitektur visual dan interaksi *bespoke* (anti-template pasaran) untuk website Showroom Mobil Veloce Auto serta menyusun Master Prompt Google Stitch / Flow guna mengeksekusi perombakan antarmuka yang modern, dinamis, dan memenuhi 100% rubrik penilaian Tugas Akhir BTNG Frontend 2026.

---

## Current Context & Assumptions

1. **Pedoman Resmi (`Panduan Tugas Akhir BTNG Kelas Frontend.pdf`):**
   - **Teknologi Wajib:** HTML5 semantik, CSS3 murni, dan Vanilla JavaScript (ES6+). Dilarang keras menggunakan framework/library JS eksternal (React, Vue, Alpine, Tailwind JS runtime, jQuery).
   - **Endpoint Wajib:** `https://api-web.dnccudinus.org/api/mobil` (diambil via `fetch()` dan dirender dinamis via DOM Manipulation `createElement()` / `innerHTML`).
   - **Bobot Penilaian:**
     - Tampilan dan UI/UX: **40%** (Desain modern, estetika tinggi, tata letak, hierarki visual).
     - Integrasi API & DOM Manipulation: **30%** (Data rendering, filter, dynamic updates).
     - Responsivitas Website: **20%** (Desktop, Tablet, Mobile 320px–1440px+).
     - Kerapian Kode: **10%** (Clean code, zero syntax error, modularitas file).
   - **Deadline Pengumpulan:** 28 Oktober 2026, 23:59 WIB ke website BTNG.

2. **Kondisi Eksisting Proyek (`BTNG-Frontend-ArkaanTaqiyyuddin`):**
   - Fungsionalitas dasar dan modularitas kode (`js/api.js`, `js/app.js`, `js/dom.js`, `js/filters.js`, `js/calculator.js`) sudah berjalan dengan baik.
   - **Kelemahan Desain Saat Ini:**
     - Layout visual masih berkesan seperti template SaaS / e-commerce generik (grid kartu standar dengan gambar di atas dan teks di bawah).
     - Hero section terkesan kaku (hanya teks dan 3 kartu metrik statistik sederhana).
     - Kurang memiliki sentuhan *luxury automotive emotional experience* (seperti platform Porsche Finder, Rimac Automobili, Polestar Space, atau Genesis Studio).
     - Animasi yang ada (`css/animations.css`) masih sebatas *linear fade-up* dasar, belum ada *kinetic depth*, *specular highlight*, *ambient glow*, atau *magnetic hover states*.

---

## Architecture & Proposed Approach

Proyek ini akan diubah dari katalog statis biasa menjadi **"Atelier Veloce — High-Performance Digital Exhibition"**:
1. **Aesthetic Direction:** *High-Contrast Obsidian & Cyber-Granite* (`#06080d`) dipadukan dengan aksen *Titanium Frost*, *Aero-Blue Specular Glow* (`#3b82f6` / `#60a5fa`), dan tipografi editorial presisi tinggi (paduan *Syne* / *Plus Jakarta Sans* dengan *JetBrains Mono* untuk telemetri spesifikasi teknis mobil).
2. **Interactive Motion System:** Memanfaatkan CSS hardware-accelerated transforms (`translate3d`, `scale`), spring cubic-bezier (`cubic-bezier(0.16, 1, 0.3, 1)`), dynamic card glassmorphism dengan *specular border sweep*, interactive stage lighting, dan tactile filter pill selector.
3. **Penyusunan Master Prompt Google Stitch / Flow:** Dibuat dengan format instruksi prompt engineering tingkat lanjut (Role, Philosophy, Anti-Pattern Constraints, Component Architecture, Motion Tokens, dan Output Schema) sehingga menghasilkan kode HTML5/CSS3/Vanilla JS yang siap disalin tanpa modifikasi library eksternal.

---

## Bagian 1: Master Prompt Google Stitch / Flow (Bespoke Automotive UI/UX)

Gunakan prompt komprehensif berikut langsung ke dalam **Google Stitch / Flow** (atau AI Design Generator seperti Claude Artifacts / v0 / Galileo AI):

```markdown
### SYSTEM ROLE & DESIGN MANIFESTO
You are a Principal Design Technologist and Lead Automotive UI/UX Architect who designs digital experiences for high-end automotive brands (Porsche, Polestar, Rimac, Bugatti).
Your task is to generate a complete, high-fidelity, production-grade single-page Showroom & Vehicle Catalogue website named "VELOCE AUTO".

CRITICAL RULE: DO NOT PRODUCE GENERIC TEMPLATES (ANTI-SLOP).
- NO boring Bootstrap-style card grids.
- NO bland corporate headers with generic drop shadows.
- NO low-contrast gray text on dark gray.
- NO external JavaScript frameworks (NO React, NO Vue, NO Tailwind CDN, NO jQuery).
- MUST use semantic HTML5, pure bespoke CSS3 (custom properties, CSS Grid, Flexbox, hardware-accelerated animations), and pure Vanilla JavaScript (DOM manipulation).

---

### VISUAL DESIGN SYSTEM & TOKENS

1. Color Palette (Obsidian Studio & Aero Specular):
   - Background Canvas: #07090e (Deep Void Carbon)
   - Card/Surface Glass: rgba(15, 22, 36, 0.72) with backdrop-filter: blur(16px) saturate(180%)
   - Border Subtle: rgba(255, 255, 255, 0.08)
   - Border Active/Hover: rgba(96, 165, 250, 0.5) with box-shadow: 0 0 20px rgba(59, 130, 246, 0.25)
   - Text Primary: #f8fafc (Crisp Titanium White)
   - Text Secondary: #94a3b8 (Aero Slate)
   - Accent Primary: #2563eb (Veloce Electric Cobalt)
   - Accent Glow: #60a5fa (Hyper Cyan Reflection)
   - Status Available: #10b981 (Emerald Mint glow)
   - Status Sold: #64748b (Muted Graphite pill)

2. Typography Pairings:
   - Display/Hero: 'Syne' or 'Outfit', 800 weight, tight tracking (-0.03em), uppercase editorial styling.
   - Interface/Body: 'Plus Jakarta Sans', 400/500/600 weight.
   - Telemetry/Technical Specs: 'JetBrains Mono', 500/700 weight for Prices, HP, Acceleration, and Year.

3. Motion & Animation Physics:
   - Primary Ease: cubic-bezier(0.16, 1, 0.3, 1) (Ultra-responsive Apple/Porsche spring).
   - Hover Card Effects: 3D subtle tilt feel, border shine sweep via linear-gradient angle animation, vehicle image zoom scale(1.04) with smooth ease-out.
   - Skeletons: Dynamic sweeping light beam (linear-gradient shimmer at 45deg) instead of dull gray pulsing.

---

### PAGE STRUCTURE & BESPOKE UX SECTIONS

1. Ultra-Slim Dynamic HUD Navigation Bar:
   - Floating glass pill (`backdrop-filter: blur(20px)`), sticky at top with 1rem margin.
   - Left: Veloce Auto logo with glowing kinetic SVG speedmark icon.
   - Center: Smooth magnetic pill links (Katalog, Inspeksi 175-Titik, Simulasi Kredit, Hubungi Konsultan).
   - Right: Quick Action Hub: Search trigger button, Floating Wishlist counter badge (with micro-bounce animation), Theme switcher (Dark Obsidian / Pure Alabaster).

2. Hero Exhibition Stage ("The Spotlight Showcase"):
   - Split-screen cinematic hero:
     - Left: Huge editorial typography ("KURASI ARTIFAK OTOMOTIF TERVERIFIKASI"), live availability ticker pill, and a secondary punchline.
     - Right: Interactive 3D Showcase Card featuring the current flagship unit (e.g. Porsche 911 GT3 RS / Civic Type R) with floating technical spec HUD tags (Horsepower, 0-100 km/h, Transmisi, Status Garansi 100%).
   - Bottom Hero Bar: 3 Minimalist telemetry cards showing Real-Time Stock Count, Average Inspection Score (99.4%), and Instant Delivery Guarantee.

3. Telemetry Control Station (Interactive Filtering Deck):
   - Horizontal sliding filter strip with tactile feedback:
     - Instant Search bar with keyboard shortcut badge (`/` or `Ctrl+K`) and animated clear button.
     - Brand Pill Selector: Horizontal scrollable chips (Semua, Toyota, Honda, Hyundai, BMW, Porsche, Mercedes) with active glowing underline indicators.
     - Multi-Dimensional Filter Row:
       - Transmisi (Semua, Matic, Manual, CVT).
       - Bahan Bakar (Bensin, Hybrid, Diesel, Listrik EV).
       - Status Unit (Semua, Tersedia, Terjual).
       - Sort Order (Harga Terendah, Harga Tertinggi, Tahun Terbaru).
     - Active Filter Summary Badge & 1-Click Reset Button.

4. Dynamic Vehicle Grid ("The Showroom Floor"):
   - Responsive CSS Grid (`repeat(auto-fill, minmax(320px, 1fr))`).
   - Card Architecture:
     - Image Window with dynamic aspect-ratio, lazy-loading gradient, vehicle status ribbon (TERSEDIA / TERJUAL), and floating Wishlist Heart button with SVG burst on toggle.
     - Spec Telemetry Bar: Icons + badges for Transmisi (CVT/Manual), Bahan Bakar (Hybrid/Bensin), and Tahun Rakit in JetBrains Mono.
     - Identity Block: Car Brand tag, Model Name in prominent semi-bold Outfit.
     - Financial Summary: Full OTR Price in Rupiah (`Rp 275.000.000`) + Sub-label estimated monthly installment (`Cicilan Rp 4,2 jt/bln`).
     - Interactive Card Actions: "Detail Spesifikasi" (opens full inspection drawer) and "Simulasi Kredit" (opens instant loan calculator).

5. Virtual Inspection & Spec Modal (Interactive Drawer):
   - Opens smoothly with spring backdrop blur.
   - High-res vehicle photo with zoom lens effect.
   - 175-Point Certification Badge (Mesin, Transmisi, Kaki-kaki, Bebas Banjir & Tabrakan).
   - Technical Spec Grid: Detailed attribute table formatted cleanly.
   - Action Footer: Direct WhatsApp Booking button with pre-filled vehicle details message, and direct Loan Calculation button.

6. Interactive Loan Calculator (Simulasi Cicilan):
   - Real-time interactive sliders for Down Payment (DP 10% - 50%) and Tenor (12, 24, 36, 48, 60 Bulan).
   - Live visual summary: Pinjaman Pokok, Bunga Efektif, and Estimasi Angsuran per Bulan dengan angka besar dinamis.

---

### VANILLA JAVASCRIPT & API CONTRACT

- API Endpoint: `https://api-web.dnccudinus.org/api/mobil`
- Fetch method: Native `fetch()` with error boundaries and 10s AbortController timeout.
- Response handling: Check for `.data` array envelope.
- DOM Manipulation: Construct elements cleanly using `document.createElement()` or sanitized template literals.
- State: Store in-memory cars list, filter parameters, wishlist (persisted to localStorage), and active comparison list.

Deliver complete, working, production-ready HTML, CSS, and JavaScript. Zero stubs, zero placeholder comments.
```

---

## Bagian 2: Step-by-Step Implementation Tasks

Rencana eksekusi untuk mengimplementasikan hasil desain baru ke dalam repositori lokal `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin`.

### Task 1: Elevasi Design Tokens & Foundation (`css/style.css`)
- **Tujuan:** Mengganti palet warna generik menjadi *Obsidian Studio Glass* dengan contrast ratio tinggi dan tipografi modern.
- **File:** `css/style.css`
- **Tindakan:**
  - Tambahkan font *Syne* dan *JetBrains Mono* ke `:root`.
  - Atur CSS custom properties untuk surface glassmorphism (`backdrop-filter: blur(16px)`), specular glow border, dan typography hierarchy.
- **Verifikasi:**
  ```bash
  grep -E "Syne|backdrop-filter|--accent-blue" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/style.css
  ```

### Task 2: Peningkatan Animasi & Micro-Interactions (`css/animations.css`)
- **Tujuan:** Menghadirkan micro-interactions berkecepatan tinggi, spring physics, dan card specular sweep.
- **File:** `css/animations.css`
- **Tindakan:**
  - Implementasikan keyframe `specularSweep` pada hover kartu mobil.
  - Implementasikan spring easing `cubic-bezier(0.16, 1, 0.3, 1)` untuk modal dan drawer.
  - Tambahkan animasi detak (*heart burst*) pada tombol favorit SVG.
- **Verifikasi:**
  ```bash
  grep -E "cubic-bezier|specularSweep|heartBurst" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/animations.css
  ```

### Task 3: Restrukturisasi Hero & Telemetry Controls (`index.html`)
- **Tujuan:** Merombak layout HTML dari struktur statis menjadi layout *cinematic showroom* dengan interactive telemetry station.
- **File:** `index.html`
- **Tindakan:**
  - Ganti hero section standar menjadi *Cinematic Exhibition Stage* lengkap dengan showcase highlight card dan status ticker live.
  - Buat filter strip horizontal dengan chip brand dinamis dan quick search HUD.
  - Pertahankan seluruh ID elemen (`carsGrid`, `searchInput`, `sortSelect`, `brandSelect`, dsb.) agar kompatibel dengan logika JavaScript yang ada.
- **Verifikasi:**
  ```bash
  grep -E "hero-wrapper|carsGrid|brandSelect" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html
  ```

### Task 4: Upgrade DOM Rendering Card & Modal Drawer (`js/dom.js`)
- **Tujuan:** Mempercantik rendering kartu mobil agar menampilkan badge telemetri (HP/transmisi/tahun) yang elegan dan interaktif.
- **File:** `js/dom.js`
- **Tindakan:**
  - Perbarui fungsi `renderCars()` untuk merender struktur kartu baru dengan rasio gambar sinematik, status ribbon bercahaya, dan quick spec badge.
  - Perbarui `renderCarDetailModal()` menjadi format *175-Point Technical Inspection Sheet*.
- **Verifikasi:**
  ```bash
  grep -E "renderCars|175-Point|formatRupiah" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/js/dom.js
  ```

### Task 5: Optimasi Responsivitas Multi-Device (`css/responsive.css`)
- **Tujuan:** Memastikan antarmuka tampil sempurna tanpa horizontal overflow di layar 360px (mobile), 768px (tablet), hingga 1440px+ (desktop).
- **File:** `css/responsive.css`
- **Tindakan:**
  - Atur horizontal scrolling yang halus pada brand chips di mobile.
  - Pastikan grid mobil otomatis beralih dari 1 kolom di mobile menjadi 2 kolom di tablet dan 3–4 kolom di desktop.
  - Pastikan tombol aksi modal nyaman disentuh (*touch-target* minimal 44x44px).
- **Verifikasi:**
  ```bash
  grep -E "@media.*max-width: 768px|@media.*max-width: 480px" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/responsive.css
  ```

---

## Tests & Validation

1. **Uji Validasi Sintaks Kode:**
   - HTML & CSS syntax linter: Pastikan tidak ada tag unclosed atau CSS error.
   - JS Console Audit: Pastikan tidak ada `Uncaught TypeError` atau `ReferenceError` saat aplikasi dijalankan.

2. **Uji Integrasi API (`fetch` ke endpoint resmi):**
   ```bash
   curl -s -I "https://api-web.dnccudinus.org/api/mobil" | grep "HTTP"
   ```
   *Expected Output:* `HTTP/2 200` atau `HTTP/1.1 200 OK`.

3. **Uji Responsivitas Layar:**
   - Buka browser pada resolusi 375px (iPhone), 768px (iPad), dan 1280px+ (Desktop).
   - Pastikan navbar tidak tumpang tindih dan menu hamburger berfungsi lancar.

4. **Uji Checklist Rubrik Penilaian BTNG Frontend:**
   - [x] Vanilla JS 100% tanpa library eksternal (Bobot 30% & 10%).
   - [x] Desain modern, konsisten, anti-template pasaran (Bobot 40%).
   - [x] Responsif di semua device (Bobot 20%).
   - [x] Pengambilan data dinamis via `fetch()` dan manipulasi DOM (Bobot 30%).

---

## Risks, Tradeoffs, and Open Questions

- **Risiko API Downtime:** Jika endpoint resmi panitia (`https://api-web.dnccudinus.org/api/mobil`) sewaktu-waktu mengalami gangguan, fallback state berupa skeleton loading dan tombol *Retry* otomatis harus tersedia agar UI tidak rusak.
- **Tradeoff Kinerja:** Efek `backdrop-filter: blur()` berlebihan pada mobile dapat menurunkan FPS. Solusi: batasi efek blur hanya pada fixed navbar dan modal dialog, gunakan solid surface colors dengan opacity halus pada kartu grid.
- **Open Question:** Apakah Arkaan ingin langsung menerapkan Master Prompt ini ke Google Stitch / Flow terlebih dahulu untuk mendapatkan preview visual komponen, atau langsung mengeksekusi perombakan kode CSS/HTML di repositori lokal sekarang?
