# Plan: Integrasi 7 Referensi Visual Menjadi Website Otomotif Modern & Zero AI Slop Master Prompt (BTNG Frontend 2026)

## Goal
Mengintegrasikan 7 referensi desain visual kelas dunia (Floating Pill Nav, Mustang/Porsche Collector Trading Cards, Tesla & AMG GT3 Cinematic Hero, dan Interactive Loan Analytics Calculator) ke dalam arsitektur website Veloce Auto, serta menyusun Zero AI Slop Master Prompt 6-Blok untuk Google Stitch/Flow yang siap diimplementasikan secara modular dengan Vanilla JS murni.

---

## Current Context & Assumptions

1. **Sintesis 7 Referensi Visual Pengguna:**
   - **Ref 1 (Floating Capsule HUD Nav):** Navbar kapsul putih monokrom melayang (*floating pill*) dengan kontras tinggi; item aktif dibungkus kapsul hitam pekat dengan teks putih presisi.
   - **Ref 2 & Ref 6 (Automotive Trading Cards — Ford Mustang S650 & Porsche 911 GT3 RS):**
     - Kartu pameran vertikal dengan sudut melengkung halus (`border-radius: 20px`), outline tipis presisi, dan latar studio dengan *central spotlight glow*.
     - Strip 3 pil telemetri persis di bawah foto mobil: `◆ [Warna/Bahan Bakar]`, `⏱ [Tahun / 0-100 km/h]`, `⚙ [Transmisi]`.
     - Tipografi berjenjang: Judul tebal (*Space Grotesk*), subjudul huruf kapital abu-abu (*S650 CHASSIS* / *GT3 RS*), dan narasi editorial 2 baris.
   - **Ref 3 (Tesla Model S Landing Architecture):**
     - Judul hero super-tebal berorientasi performa (*MODEL S / TEST DRIVE*), tombol aksi berbentuk kapsul solid (*ORDER NOW*).
     - *Bottom Technical Spec Bar* dengan metrik angka besar yang dipisahkan oleh garis vertikal ramping merah/cognac (*335mi Range | 2.5s 0-60 | 8.000+ Superchargers*).
   - **Ref 4 (Mercedes-AMG GT3 Race Stage):**
     - Garis potong diagonal dinamis (*sharp diagonal split band*) yang memadukan fotografi trek dengan panel telemetri gelap arang (*dark charcoal stats panel*).
     - Watermark tipografi raksasa transparan di latar belakang (*faint backdrop typography: "AMG GT3"*).
     - Sub-navigasi filter kategori horizontal dengan garis bawah aktif (*active underline*).
   - **Ref 5 (Audi R8 Spyder Split Layout):**
     - Tipografi hero raksasa yang memotong bodi kendaraan (*R8 SPYDER*).
     - Navigasi dot vertikal dan *split color overlay*.
   - **Ref 7 (Interactive SaaS Rate Calculator):**
     - Layout kalkulator pembiayaan 2 kolom modular:
       - Kolom kiri: Formulir input interaktif (DP, Tenor, Penghasilan/Budget) dengan banner info status bernuansa emas/cognac (*"Premium territory"*).
       - Kolom kanan: Kartu sorotan gelap pekat dengan angka angsuran per bulan bercahaya sian/emas, rincian model pembiayaan (harian/bulanan/tahunan), serta slider gradien komparasi pasar dengan pin penunjuk bergerak (**YOU**).
   - **Palet Warna & Tipografi Hibrida:**
     - Kanvas: *Midnight Navy* (`#111522`) & *Slate Container* (`#1E263B`).
     - Aksen Mewah: *Warm Cognac Leather* (`#C3A091`), *Deep Espresso* (`#352A28`), *Electric Cyan* (`#38BDF8`), *Racing Red* (`#E82127`).
     - Tipografi: *Playfair Display* (Editorial Hook) + *Space Grotesk* (Automotive Tech & Specs) + *Inter* (Antarmuka & Keterbacaan).

2. **Batasan Teknis Tugas Akhir BTNG Frontend (DNCC 2026):**
   - Wajib HTML5 semantik, CSS3 murni, dan Vanilla JavaScript (ES6+).
   - Dilarang keras memakai React, Vue, jQuery, atau runtime framework pihak ketiga.
   - Data mobil wajib ditarik dari endpoint resmi: `https://api-web.dnccudinus.org/api/mobil`.
   - Lokasi repositori lokal: `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin`.

---

## Architecture & Proposed Approach

Proyek ini merekayasa ulang arsitektur visual Veloce Auto menjadi **"The Grand Tourer Exhibition Studio"**:
1. **Floating Capsule Cockpit (Ref 1):** Mengganti header biasa menjadi kapsul melayang dengan indikator tab aktif dinamis (*pill pill-within-pill*).
2. **Exhibition Stage Hero (Ref 3, 4, 5):** Menghadirkan panggung hero dengan tipografi watermark raksasa, aksen garis potong diagonal ala AMG GT3, serta *Telemetry HUD Bar* 3 kolom dengan pembatas vertikal ala Tesla Model S.
3. **Collector Trading Card Grid (Ref 2, 6):** Setiap unit mobil dari API dirender sebagai kartu digital kolektor dengan 3 lencana spesifikasi (`◆ Bahan Bakar`, `⏱ Tahun`, `⚙ Transmisi`), tipografi bertingkat, dan harga OTR beraksen Cognac.
4. **Bespoke Credit Calculator (Ref 7):** Merombak simulasi kredit menjadi kalkulator finansial presisi dengan visualisasi kartu angsuran gelap, bar gradien komparasi suku bunga, dan indikator posisi cicilan (**YOU**).

---

## Bagian 1: Zero AI Slop Master Prompt untuk Google Stitch / Flow

Gunakan prompt 6-blok yang telah diaudit anti-slop ini ke dalam **Google Stitch**, **Flow**, atau AI UI generator lainnya:

```markdown
### BLOCK 1: SYSTEM PERSONA & ARCHITECTURAL DIRECTIVE
You are a World-Class Automotive Design Technologist and Principal UI/UX Architect who crafts bespoke digital interfaces for luxury marques (Porsche, Rimac, Tesla, Mercedes-AMG).
Your assignment is to build a high-performance, single-page Showroom & Digital Vehicle Exhibition website titled "VELOCE AUTO".
Design Paradigm: "The Grand Tourer Exhibition" — Merging brutalist engineering precision, tactile capsule controls, and haute-horlogerie typography.

---

### BLOCK 2: NEGATIVE CONSTRAINTS & ANTI-SLOP GUARDRAILS (ZERO SLOP ENFORCEMENT)
- STRICTLY NO GENERIC SAAS TEMPLATES: Reject centered generic heroes with 3 equal marketing cards, standard purple/indigo gradients, floating abstract blobs, and cliché icon toppers.
- STRICTLY NO JAVASCRIPT FRAMEWORKS OR RUNTIME LIBRARIES: ZERO React, ZERO Vue, ZERO Alpine.js, ZERO Tailwind CDN/scripts, ZERO jQuery, ZERO external icon fonts.
- MUST USE 100% semantic HTML5, pure bespoke CSS3 (custom properties, CSS Grid, Flexbox, hardware-accelerated transforms), and pure Vanilla JavaScript (DOM manipulation via createElement / template literals).
- DO NOT apply heavy backdrop-filter blur across repeating grid cards (causes severe GPU lag on mobile). Restrict backdrop blur strictly to the top sticky floating navigation bar and active modal overlays.

---

### BLOCK 3: HARD DESIGN TOKENS & TYPOGRAPHY SYSTEM

1. Color Palette Tokens:
   Canvas & Slate Surfaces (Engineering Foundation):
   - --bg-canvas: #111522 (Deep Midnight Navy)
   - --bg-card: #1E263B (Matte Slate Container)
   - --bg-card-elevated: #26314C (Hover & Modal Surface)
   - --border-subtle: #303D59 (Crisp 1px Outline)
   - --border-strong: #536684 (Active Highlight Border)
   - --text-primary: #DCE3EF (Pale Icy Titanium - 100% WCAG AAA Contrast)
   - --text-muted: #8B9ACA (Slate Telemetry & Meta Labels)
   - --text-dim: #536684 (Subtle Annotations)

   Warm Cognac & High-Performance Accents:
   - --accent-cognac: #C3A091 (Warm Sandstone Leather for Prices & Primary CTA)
   - --accent-cognac-hover: #E8D5CE (Champagne Highlight on Interactive States)
   - --accent-dark-cognac: #352A28 (Deep Warm Charcoal for Active Pill Backgrounds)
   - --accent-cyan: #38BDF8 (Electric Telemetry & Live Calculator Output)
   - --accent-racing-red: #E82127 (Status Pulse & High-Performance Ticker)
   - --status-avail-green: #10B981 (Emerald Mint for Available Units)

2. Exact Typography System (Google Fonts):
   - Editorial Luxury Hook: 'Playfair Display', serif, 700 weight, italic nuances (Hero statement: "Mahakarya Otomotif Terkurasi").
   - Automotive Technical Authority: 'Space Grotesk', sans-serif, 600 & 700 weight, tracking -0.02em (Brand Names, Model Codes, Vehicle Cards, and Telemetry Numbers).
   - Ergonomic Interface & Descriptions: 'Inter', sans-serif, 400 & 500 weight (Body text, filter inputs, calculator labels).
   - Spec & Financial Digits: 'Space Grotesk' or 'JetBrains Mono' for currency (Rp) and numerical metrics.

---

### BLOCK 4: BESPOKE COMPONENT ARCHITECTURE & VISUAL SPECIFICATION

1. Top Floating Capsule Navigation (Inspired by Reference 1):
   - Centered floating stadium/pill navbar (`max-width: 680px; margin: 1.25rem auto; border-radius: 9999px`).
   - Monochromatic high-contrast frame: `#1E263B` surface, `#303D59` border, 16px backdrop-blur.
   - Menu items: `HOME`, `KATALOG`, `INSPEKSI`, `SIMULASI`, `KONTAK`.
   - Active item styling: Contained inside a snug solid black/cognac capsule with crisp white uppercase text (`font-family: 'Space Grotesk'`).
   - Wishlist indicator badge with dynamic real-time counter pill.

2. Cinematic Exhibition Stage Hero (Inspired by References 3, 4, 5):
   - Split layout with sharp diagonal background accent band (`linear-gradient(115deg, #111522 65%, #1E263B 65%)`).
   - Massive faint backdrop watermark typography (`font-size: 11vw; color: rgba(220, 227, 239, 0.03); letter-spacing: -0.04em`) reading "VELOCE AUTO".
   - Left: Dual-typography headline: Italic 'Playfair Display' ("The Standard of Motion") + Bold 'Space Grotesk' ("SHOWROOM & KURASI TERVERIFIKASI").
   - Center/Right: High-res showcase vehicle render with realistic contact floor shadow and ambient spotlight beam.
   - Bottom Horizontal Telemetry Bar (Tesla Model S & AMG GT3 style):
     - Three large metric blocks separated by thin vertical lines (`#303D59`):
       - Block 1: `175-Point` (Sertifikasi Inspeksi Total)
       - Block 2: `100% OTR` (Transparansi Dokumen Resmi)
       - Block 3: `3.2s / 550HP` (Standar Standar Performa Mesin)
     - Pill Action Button: Cognac Sandstone (`#C3A091`) with dark text reading "JELAJAHI KATALOG".

3. Automotive Collector Trading Cards (Inspired by References 2 & 6 - Mustang & Porsche 911):
   - Card Geometry: Vertical ratio, `border-radius: 20px`, 1px border (`#303D59`), background `#1E263B`.
   - Upper Stage: Studio gradient illumination from top-left, crisp vehicle photograph, floating heart wishlist button on top-right.
   - Spec Telemetry Pills (Directly beneath image):
     - Pill 1: `◆ [Bahan Bakar]` (e.g. `◆ Bensin` / `◆ Hybrid`)
     - Pill 2: `⏱ [Tahun / 0-100]` (e.g. `⏱ 2024` / `⏱ 3.1s`)
     - Pill 3: `⚙ [Transmisi]` (e.g. `⚙ CVT` / `⚙ Automatic`)
   - Card Typography Hierarchy:
     - Main Title: Bold 'Space Grotesk' (e.g. `Toyota Avanza`, `Civic Type R`, `Ford Mustang`).
     - Subtitle: Medium slate all-caps (e.g. `1.5 G CVT CHASSIS`, `FL5 SPEC`).
     - Description: 2-line concise editorial copy in 'Inter' (`#8B9ACA`).
   - Bottom Action & Price Deck:
     - OTR Price in bold `#C3A091` (`Rp 275.000.000`) + sub-label installment estimate (`Cicilan mulai Rp 4,2 jt/bln`).
     - Buttons: "Detail Inspeksi" and "Simulasi".

4. Telemetry Filter Deck (Ergonomic Search Station):
   - Horizontal sliding Brand Chip selectors (Semua, Toyota, Honda, Hyundai, BMW, Porsche) with active underline and glowing dot.
   - Instant search input with inline shortcut badge (`/`).
   - Dropdown selectors: Transmisi, Bahan Bakar, Status Unit, dan Urutan Harga.

5. Interactive Credit & Loan Calculator (Inspired by Reference 7 - Freelance Rate Calculator):
   - Two-column elevated dashboard:
     - Left Column (Input Setup Card):
       - Slider & input for Down Payment (DP: 10% - 50%).
       - Tenor selection dropdown (12, 24, 36, 48, 60 Bulan).
       - Info callout card in warm sand tone: *"Paket Pembiayaan Khusus: Bunga ringan 3.8% flat p.a. dengan proteksi asuransi All-Risk."*
     - Right Column (Suggested Installment Analytics Card):
       - Dark elevated container (`#111522`) with glowing cyan metric: `Rp 4.250.000 /bln`.
       - Rincian model pembiayaan: Total Pinjaman Pokok, Total Bunga, dan Uang Muka Efektif.
       - Interactive market comparison gradient bar (Orange -> Green -> Cyan) with moving pin indicator labeled "**YOU**".

---

### BLOCK 5: KINETIC MOTION & MICRO-INTERACTION SYSTEM
- Timing curve: cubic-bezier(0.16, 1, 0.3, 1) (Snappy mechanical spring response).
- Card Hover: TranslateY(-6px) with dynamic studio cone flare and glowing border (#536684).
- Wishlist Heart Pop: Scale 1.35x bounce with red fill transition on click.
- Skeleton Shimmer: 45-degree sweeping light beam traveling seamlessly across placeholders.

---

### BLOCK 6: DATA CONTRACT & INTEGRATION (VANILLA JAVASCRIPT)
- API Source: GET `https://api-web.dnccudinus.org/api/mobil`
- Fetch Strategy: Native `fetch()` with 10s AbortController and try/catch block.
- Envelope Parser: Read vehicle array from response JSON `.data`.
- State Management: Vanilla JS Object holding raw data, filtered view, active filters, wishlist in `localStorage`, and loan calculation state.
- Fallback Handling: Elegant error card with retry button if network fails.
```

---

## Bagian 2: Step-by-Step Implementation Tasks

Langkah implementasi terperinci untuk mengubah repositori lokal `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin`.

### Task 1: Pembaruan Google Fonts & Meta Header (`index.html`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html`
- **Tindakan:**
  Muat font `Playfair Display`, `Space Grotesk`, dan `Inter` secara optimal:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,600;1,700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  ```
- **Verifikasi:**
  ```bash
  grep -E "Playfair\+Display|Space\+Grotesk|Inter" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html
  ```
  *Expected Output:* Muncul tag link Google Fonts dengan ketiga font tersebut.

---

### Task 2: Implementasi Floating Capsule Navbar (Ref 1) (`index.html` & `css/style.css`)
- **Files:**
  - `index.html`
  - `css/style.css`
- **Tindakan:**
  1. Ganti struktur navbar di `index.html` menjadi floating pill:
     ```html
     <header class="floating-nav-container">
       <nav class="capsule-nav" aria-label="Navigasi Utama">
         <a href="#katalog" class="capsule-brand">
           <span class="brand-dot"></span>
           VELOCE
         </a>
         <ul class="capsule-menu" id="navMenu">
           <li><a href="#katalog" class="capsule-link active">KATALOG</a></li>
           <li><a href="#inspeksi" class="capsule-link">INSPEKSI</a></li>
           <li><a href="#simulasi" class="capsule-link">SIMULASI</a></li>
           <li><a href="#kontak" class="capsule-link">KONTAK</a></li>
         </ul>
         <div class="capsule-actions">
           <button class="capsule-btn-icon" id="wishlistBtn" aria-label="Favorit">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
             <span class="capsule-badge" id="wishlistBadge" style="display:none;">0</span>
           </button>
           <button class="capsule-btn-icon" id="themeToggleBtn" aria-label="Tema"></button>
         </div>
       </nav>
     </header>
     ```
  2. Tambahkan CSS styling di `css/style.css`:
     ```css
     .floating-nav-container {
       position: sticky;
       top: 1rem;
       z-index: 1000;
       display: flex;
       justify-content: center;
       padding: 0 1rem;
     }
     .capsule-nav {
       display: flex;
       align-items: center;
       gap: 1.5rem;
       background: rgba(30, 38, 59, 0.88);
       backdrop-filter: blur(18px);
       border: 1px solid var(--border-default);
       border-radius: var(--r-pill);
       padding: 0.45rem 1.25rem;
       box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
     }
     .capsule-menu {
       display: flex;
       gap: 0.35rem;
       list-style: none;
       padding: 0;
       margin: 0;
     }
     .capsule-link {
       font-family: var(--font-heading);
       font-size: 0.8rem;
       font-weight: 700;
       letter-spacing: 0.05em;
       color: var(--text-muted);
       text-decoration: none;
       padding: 0.4rem 0.9rem;
       border-radius: var(--r-pill);
       transition: all 0.25s var(--ease-spring);
     }
     .capsule-link.active,
     .capsule-link:hover {
       color: #ffffff;
       background: var(--bg-page);
     }
     ```
- **Verifikasi:**
  ```bash
  grep -E "capsule-nav|capsule-link" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/style.css
  ```

---

### Task 3: Restrukturisasi Hero Cinematic & Telemetry HUD Bar (Ref 3, 4, 5) (`index.html`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html`
- **Tindakan:**
  Perbarui bagian `<header class="hero-wrapper">` dengan struktur panggung sinematik:
  - Latar belakang watermark raksasa `"VELOCE"`.
  - Garis potong aksen diagonal ala Mercedes-AMG GT3.
  - Tiga metrik telemetri angka besar Tesla Model S dengan pembatas garis vertikal.
- **Verifikasi:**
  ```bash
  grep -E "watermark-text|telemetry-hud-row|telemetry-divider" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html
  ```

---

### Task 4: Upgrade Format Kartu Kolektor Otomotif (Ref 2, 6) (`js/dom.js`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/js/dom.js`
- **Tindakan:**
  Perbarui fungsi `renderCars()` untuk merender kartu kolektor lengkap dengan strip 3 pil telemetri:
  ```javascript
  // Di dalam loop renderCars:
  card.className = 'car-collector-card anim-fade-up';
  card.innerHTML = `
    <div class="card-stage-media">
      <div class="card-studio-cone"></div>
      <span class="status-ribbon ${isAvailable ? 'ribbon-avail' : 'ribbon-sold'}">
        ${isAvailable ? 'TERSEDIA' : 'TERJUAL'}
      </span>
      <button class="btn-card-wishlist ${isWishlisted ? 'active' : ''}" data-id="${car.id}" aria-label="Favorit">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="${isWishlisted ? '#ef4444' : 'currentColor'}" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <img src="${car.foto || FALLBACK_IMG}" alt="${car.nama}" loading="lazy" class="car-stage-img" onerror="this.src='${FALLBACK_IMG}'" />
    </div>

    <div class="card-telemetry-pills">
      <span class="spec-pill">◆ ${car.bahan_bakar || 'Bensin'}</span>
      <span class="spec-pill">⏱ ${car.tahun || '2024'}</span>
      <span class="spec-pill">⚙ ${car.transmisi || 'Otomatis'}</span>
    </div>

    <div class="card-body-content">
      <div class="car-brand-tag">${car.brand ? car.brand.toUpperCase() : 'VELOCE'}</div>
      <h3 class="car-model-name">${car.nama}</h3>
      <p class="car-editorial-desc">Edisi terverifikasi lulus 175 titik uji teknis showroom resmi Veloce.</p>

      <div class="card-finance-bar">
        <div>
          <span class="price-label">Harga OTR</span>
          <div class="price-value-cognac">${formatRupiah(car.harga)}</div>
          <span class="installment-est">${quickMonthlyEst(car.harga)}</span>
        </div>
      </div>

      <div class="card-actions-grid">
        <button class="btn-action-spec" data-id="${car.id}">Detail & Inspeksi</button>
        <button class="btn-action-loan" data-price="${car.harga}" data-name="${car.nama}">Simulasi</button>
      </div>
    </div>
  `;
  ```
- **Verifikasi:**
  ```bash
  grep -E "car-collector-card|card-telemetry-pills|price-value-cognac" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/js/dom.js
  ```

---

### Task 5: Perombakan Kalkulator Simulasi Kredit (Ref 7) (`js/calculator.js` & `index.html`)
- **Files:**
  - `index.html`
  - `js/calculator.js`
- **Tindakan:**
  1. Buat layout 2 kolom di `index.html`:
     - Kolom Kiri: Input nominal harga, slider DP (%), pilihan tenor (12-60 bulan), dan info banner bernuansa emas/cognac.
     - Kolom Kanan: Kartu sorotan gelap pekat dengan angka angsuran per bulan bercahaya biru-sian, serta perbandingan suku bunga (*Market Comparison bar* dengan pin "**YOU**").
  2. Perbarui kalkulasi matematis angsuran di `js/calculator.js` agar memperbarui nilai pin penunjuk secara real-time.
- **Verifikasi:**
  ```bash
  grep -E "market-comparison-bar|you-pin-indicator|suggested-monthly-rate" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html
  ```

---

### Task 6: Audit Responsivitas & Media Queries (`css/responsive.css`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/responsive.css`
- **Tindakan:**
  - Pastikan floating capsule navbar berubah menjadi drawer yang rapi pada layar mobile (≤640px).
  - Pastikan kartu kalkulator 2-kolom bertumpuk secara vertikal yang nyaman di smartphone tanpa horizontal scrollbar.
- **Verifikasi:**
  ```bash
  grep -E "floating-nav-container|car-collector-card" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/responsive.css
  ```

---

## Tests & Validation

1. **Uji Validasi Sumber Data:**
   ```bash
   curl -s "https://api-web.dnccudinus.org/api/mobil" | jq -r '.data[0] | {nama, brand, harga, status}'
   ```
   *Expected Output:* Objek JSON valid berisi nama, brand, harga, dan status kendaraan.

2. **Uji Kerapian Kode & Bebas Error Sintaks (Rubrik 10%):**
   - Jalankan pemeriksaan file JavaScript di konsol browser: pastikan 0 error/warning.
   - Pastikan tidak ada script library eksternal yang diimpor.

3. **Uji Kesesuaian Desain 7 Referensi (Rubrik UI/UX 40% & Responsivitas 20%):**
   - Floating pill navbar melayang dan berganti status aktif saat di-scroll.
   - Kartu mobil menampilkan 3 lencana spesifikasi (`◆`, `⏱`, `⚙`) persis seperti kartu Mustang & Porsche 911.
   - Latar panggung hero memuat tipografi watermark raksasa dan bar metrik telemetri 3-kolom bergaris pemisah vertikal.
   - Kalkulator simulasi kredit memiliki kartu gelap angka angsuran dan slider gradien penunjuk **YOU**.

---

## Risks, Tradeoffs, and Open Questions

- **Tradeoff Kinerja Animasi pada Mobile:** Pemakaian *spotlight gradient* di setiap kartu berpotensi menurunkan frame rate jika diproses terus-menerus. *Solusi:* Gunakan `will-change: transform` hanya saat hover, dan nonaktifkan animasi berat pada layar di bawah 640px via `prefers-reduced-motion` atau media query.
- **Konsistensi Rasio Gambar Mobil:** Foto mobil dari API mungkin memiliki aspect-ratio yang berbeda-beda. *Solusi:* Terapkan `aspect-ratio: 16/10` dengan `object-fit: cover` dan fallback visual jika gambar rusak.
- **Open Question:** Apakah Anda ingin saya segera mulai mengeksekusi pembaruan kode ini langsung ke repositori `BTNG-Frontend-ArkaanTaqiyyuddin` lokal sekarang?
