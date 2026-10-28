# Plan: Redesain Veloce Auto Berbasis Palet Warna & Tipografi Editorial Terpilih (BTNG Frontend 2026)

## Goal
Mengintegrasikan kombinasi palet warna *Midnight Slate & Warm Cognac* dengan tipografi hibrida *Playfair Display + Space Grotesk + Inter* ke dalam antarmuka Veloce Auto, serta menyusun Master Prompt Google Stitch / Flow 6-Block anti-slop yang menghasilkan desain showroom mobil mewah, interaktif, dan memenuhi 100% rubrik penilaian Tugas Akhir BTNG Frontend.

---

## Current Context & Assumptions

1. **Aset Referensi Visual yang Dipilih:**
   - **Palet Warna Utama (Image 1 - Card 3 & Card 2):**
     - *Slate & Midnight Navy* (`#111522`, `#1E263B`, `#303D59`, `#536684`, `#8B9ACA`, `#DCE3EF`) sebagai pondasi arsitektur kanvas digital, kartu kaca (glassmorphism), dan kontras teks utama.
     - *Earth & Warm Cognac Accent* (`#211B1A`, `#352A28`, `#60433D`, `#916B60`, `#C3A091`, `#E8D5CE`) sebagai aksen interior mewah (*Cognac Nappa Leather*), badge status VIP, dan highlight harga/simulasi kredit.
     - *Obsidian Purple Lighting* (`#17151C`, `#292531`, `#71687F`) untuk spotlight kerucut cahaya diagonal (*ambient spotlight cone*) di sudut atas kartu pameran.
   - **Kombinasi Tipografi (Image 2 - Pairing 01, 02, & 07):**
     - *Playfair Display Bold* (Serif - Pairing 01: Luxury/Editorial) untuk kata kunci judul editorial dan statement artistik (*"The Pure Art of Motion"*).
     - *Space Grotesk Bold* (Grotesque - Pairing 02: Tech/SaaS) untuk nama model mobil, brand marks, dan telemetri spesifikasi teknis.
     - *Inter Regular* (Sans - Pairing 01 & 07: High Legibility) untuk teks antarmuka, deskripsi, form filter, dan navigasi.
     - *JetBrains Mono / Space Grotesk* untuk angka harga mata uang Rupiah dan angka telemetri performa.

2. **Batasan Teknis Resmi BTNG (DNCC):**
   - Wajib HTML5 murni, CSS3 kustom, dan Vanilla JavaScript (ES6+).
   - Dilarang keras menggunakan runtime framework JS (React/Vue/Alpine/Tailwind JS).
   - Data mobil wajib diambil secara asinkron dari endpoint resmi: `https://api-web.dnccudinus.org/api/mobil`.
   - Kode lokal berada di direktori: `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin`.

---

## Architecture & Proposed Approach

Mengembangkan tema visual **"The Grand Tourer Exhibition — Midnight Studio & Warm Cognac"**:
1. Mengganti fondasi CSS tokens generik dengan sistem warna berbasis variabel CSS (`--slate-canvas: #111522`, `--slate-surface: #1E263B`, `--slate-border: #303D59`, `--cognac-accent: #C3A091`, `--text-ice: #DCE3EF`).
2. Menghadirkan efek pencahayaan studio diagonal (*specular top-left light cone*) menggunakan CSS gradient dinamis yang meniru kartu presentasi referensi, memberikan kedalaman atmosferik tanpa membebani GPU perangkat seluler.
3. Mengaplikasikan tipografi dual-layer: teks hero memadukan keanggunan serif *Playfair Display* dengan ketajaman teknik *Space Grotesk*, sementara seluruh kontrol interaktif dan data card menggunakan *Inter* dan *Space Grotesk*.

---

## Bagian 1: 6-Block Master Prompt untuk Google Stitch / Flow

Salin dan gunakan prompt 6-blok terstandarisasi berikut langsung ke dalam **Google Stitch**, **Flow**, atau generator AI UI lainnya:

```markdown
### BLOCK 1: SYSTEM PERSONA & ARCHITECTURAL DIRECTIVE
You are a Principal Design Technologist and Lead Automotive UI/UX Architect designing a bespoke digital exhibition platform named "VELOCE AUTO" (Showroom & E-Commerce Mobil Premium).
Surface Archetype: DECIDE & EXPLORE (High-stakes luxury purchase decision, technical scrutiny, and vehicle aesthetic exhibition).
Aesthetic Philosophy: "Grand Tourer Haute-Horlogerie" — Fusion of ultra-deep midnight naval slate with warm cognac leather accents and razor-sharp editorial typography.

---

### BLOCK 2: NEGATIVE CONSTRAINTS & ANTI-SLOP GUARDRAILS (STRICT)
- ABSOLUTELY NO generic Bootstrap cards, no boring SaaS feature-grid layout, no default indigo/violet gradients, and no generic centered text hero.
- ABSOLUTELY NO JavaScript frameworks or runtime libraries: NO React, NO Vue, NO Tailwind CDN/scripts, NO jQuery, NO external icons bundle if inline SVG can be used.
- MUST use 100% semantic HTML5, pure bespoke CSS3 (custom properties, CSS Grid, Flexbox, hardware-accelerated animations), and pure Vanilla JavaScript (DOM manipulation via document.createElement / template literals).
- DO NOT use unearned, heavy backdrop-blur filters across multiple grid cards (degrades mobile GPU). Confine backdrop-filter to the sticky navigation bar and active modal overlay only.

---

### BLOCK 3: HARD DESIGN TOKENS & TYPOGRAPHY SYSTEM

1. Exact Hex Color System:
   Canvas & Deep Background:
   - Canvas Base: #111522 (Deep Midnight Navy)
   - Elevated Card Surface: #1E263B (Slate Navy Container)
   - Border Subdued: #303D59 (Precision Outline)
   - Text Muted/Slate: #536684 (Technical Meta & Labels)
   - Accent Periwinkle: #8B9ACA (Secondary Controls & Active Badges)
   - Primary Text (Contrast AAA): #DCE3EF (Pale Icy Titanium)

   Warm Cognac Luxury Accents (Prestige & Conversion):
   - Cognac Primary Accent: #C3A091 (Warm Sandstone Tan for CTAs, Prices & Key Highlights)
   - Cognac Deep Tint: #352A28 (Subtle Badge Backgrounds & Active Pill Glow)
   - Cognac Hover State: #E8D5CE (Champagne Highlight for Interactive Hover)
   - Warm Terra Shadow: #916B60 (Border Accent for Certified Inspection Badges)

   Status Semantics:
   - Available Unit: #10B981 (Subtle Emerald Aura)
   - Sold Unit: #536684 (Monochrome Brushed Steel)

2. Google Fonts Typography Pairings:
   - Editorial Luxury Headline: 'Playfair Display', serif, font-weight 700 (Used for emotional hero hooks e.g. "Koleksi Terkurasi", "Elegance Meets Power").
   - Automotive Technical Headline: 'Space Grotesk', sans-serif, font-weight 700, letter-spacing -0.02em (Used for Vehicle Model Names, Navigation, Brand Tickers, and Telemetry).
   - High-Legibility Interface & Body: 'Inter', sans-serif, font-weight 400, 500, 600 (Used for all card descriptions, input forms, and data tables).
   - Monospace Spec Numbers: 'Space Grotesk' or 'JetBrains Mono', font-weight 700 for currency (Rp) and horsepower/acceleration metrics.

---

### BLOCK 4: KINETIC MOTION & PHYSICS TOKENS
- Primary Motion Spring: cubic-bezier(0.16, 1, 0.3, 1) (Snappy Apple/Porsche tactile response).
- Studio Spotlight Cone: Diagonal linear-gradient(135deg, rgba(220, 227, 239, 0.08) 0%, rgba(30, 38, 59, 0) 60%) radiating from top-left of each car card.
- Interactive Hover States:
  - Cards lift 6px on Y-axis with shadow: 0 16px 32px -8px rgba(17, 21, 34, 0.8), 0 0 1px 1px #303D59.
  - Image scaling: transform: scale(1.035) with smooth 400ms transition.
  - Wishlist Heart Toggle: 200ms scale micro-bounce (transform: scale(1.25) -> scale(1.0)).
- Skeleton Loading: 45-degree sweeping light beam (linear-gradient shimmer from #1E263B to #303D59 to #1E263B).

---

### BLOCK 5: COMPONENT HIERARCHY & STATE MACHINES

1. Sticky Glass Cockpit Navigation:
   - Top-floating pill navigation bar with #111522 background (85% opacity) and 16px backdrop-blur.
   - Left: Veloce Auto typography with glowing dual-tone SVG mark.
   - Center: Seamless links (Katalog, Inspeksi 175-Titik, Simulasi Kredit, Kontak).
   - Right: Interactive quick actions (Wishlist Counter Badge with dynamic count, Theme Switcher, Quick Search trigger).

2. Hero Exhibition Stage ("The Spotlight Stage"):
   - Left: Dual-font headline combining italic 'Playfair Display' ("Mahakarya Otomotif") with bold 'Space Grotesk' ("TERVERIFIKASI & SIAP JALAN").
   - Live availability ticker with glowing pulse indicator.
   - Right: Featured Flagship Showcase Card with dynamic top-left lighting cone, floating spec chips (Transmisi, Tenaga, OTR Price in Cognac Tan).

3. Telemetry Control Station (Interactive Filtering Deck):
   - Search input with inline keyboard shortcut pill (`/`) and instant debounce filter.
   - Brand Pills: Horizontal scrollable strip featuring Toyota, Honda, Hyundai, BMW, Porsche, Mercedes with active glowing underline indicators.
   - Multi-Filter Selector: Transmisi (Semua/Matic/Manual/CVT), Bahan Bakar (Bensin/Diesel/Hybrid/Listrik), Status (Tersedia/Terjual).
   - Sort Order dropdown (Harga Terendah, Harga Tertinggi, Tahun Terbaru).

4. Vehicle Exhibition Grid:
   - CSS Grid layout: repeat(auto-fill, minmax(320px, 1fr)) with 1.75rem gap.
   - Card anatomy:
     - Top Image Window with 16:10 aspect ratio and diagonal studio lighting sheen.
     - Status ribbon (TERSEDIA / TERJUAL) in top-left; Wishlist Heart button in top-right.
     - Brand and Model Name in Space Grotesk Bold.
     - Technical Spec HUD: 3 pill chips (Transmisi, Bahan Bakar, Tahun) in muted slate #8B9ACA.
     - Pricing Block: Full OTR Price in bold #C3A091 + monthly installment estimate ("Cicilan mulai Rp X jt/bln").
     - Dual Action Buttons: "Detail & Inspeksi" and "Simulasi Kredit".

5. Virtual Inspection & Spec Modal (Drawer Sheet):
   - Smooth dialog scale-in.
   - High-res vehicle image with 175-Point Certified Inspection Badge.
   - Comprehensive technical breakdown table.
   - WhatsApp Consultant Booking button with pre-filled message syntax.

6. State Machine Coverage:
   - Skeleton Loading State: 6 animated placeholder cards.
   - Empty Filter State: "Unit tidak ditemukan" with "Reset Filter" button.
   - Network Error State: Card with retry trigger if API fails.

---

### BLOCK 6: RUNTIME & DATA CONTRACT (VANILLA JS ONLY)
- Endpoint: GET `https://api-web.dnccudinus.org/api/mobil`
- Fetch handling: Asynchronous `fetch()` wrapped with 10s AbortController and try/catch error boundaries.
- Response Envelope: Extract array from `.data`.
- DOM Rendering: Strictly Vanilla JavaScript DOM methods (`document.createElement()`, `appendChild()`, or sanitized template strings).
- Persistence: Store wishlist and user theme preferences in browser `localStorage`.
```

---

## Bagian 2: Step-by-Step Implementation Tasks

Berikut adalah rencana langkah demi langkah yang dapat dieksekusi oleh implementer tanpa perlu menebak file atau konfigurasi.

### Task 1: Update Font Google & Meta Headers (`index.html`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html`
- **Tindakan:**
  Tambahkan pemanggilan Google Fonts untuk `Playfair Display`, `Space Grotesk`, dan `Inter` pada tag `<head>`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,600;1,700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  ```
- **Verifikasi:**
  ```bash
  grep -E "Playfair\+Display|Space\+Grotesk|Inter" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/index.html
  ```
  *Expected Output:* Muncul baris `<link ...>` dengan ketiga keluarga font tersebut.

---

### Task 2: Implementasi CSS Tokens & Sistem Tipografi Hibrida (`css/style.css`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/style.css`
- **Tindakan:**
  Perbarui root CSS variables untuk menyematkan palet warna referensi:
  ```css
  :root {
    /* Canvas & Surface Tokens (Slate & Midnight Navy) */
    --bg-page: #111522;
    --bg-surface: #1e263b;
    --bg-surface-elevated: #26314c;
    --bg-surface-hover: #2f3d5e;
    --bg-subtle: #171d2e;
    --bg-input: #151b2b;

    /* Border & Divider Tokens */
    --border-default: #303d59;
    --border-strong: #536684;
    --border-focus: #8b9aca;

    /* Typography Tokens */
    --text-main: #dce3ef;
    --text-muted: #8b9aca;
    --text-dim: #536684;
    --text-inverse: #111522;

    /* Luxury Cognac & Leather Accents */
    --accent-cognac: #c3a091;
    --accent-cognac-hover: #e8d5ce;
    --accent-cognac-subtle: rgba(195, 160, 145, 0.12);
    --accent-cognac-border: rgba(195, 160, 145, 0.3);

    /* Automotive Tech Accents */
    --accent-blue: #3b82f6;
    --accent-blue-subtle: rgba(59, 130, 246, 0.12);
    --accent-periwinkle: #8b9aca;

    /* Status Tokens */
    --status-avail-bg: rgba(16, 185, 129, 0.12);
    --status-avail-text: #34d399;
    --status-avail-border: rgba(16, 185, 129, 0.28);
    --status-sold-bg: rgba(83, 102, 132, 0.15);
    --status-sold-text: #8b9aca;
    --status-sold-border: rgba(83, 102, 132, 0.28);

    /* Typography Families */
    --font-editorial: 'Playfair Display', Georgia, serif;
    --font-heading: 'Space Grotesk', system-ui, sans-serif;
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-mono: 'Space Grotesk', monospace;

    /* Studio Spotlight Gradient */
    --studio-cone: linear-gradient(135deg, rgba(220, 227, 239, 0.07) 0%, rgba(30, 38, 59, 0) 55%);
  }
  ```
- **Verifikasi:**
  ```bash
  grep -E "accent-cognac|font-editorial|studio-cone" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/style.css
  ```
  *Expected Output:* Variabel CSS baru terdaftar rapi.

---

### Task 3: Implementasi Studio Spotlight Cone & Micro-Interactions (`css/animations.css`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/animations.css`
- **Tindakan:**
  Tambahkan efek spotlight visual dan spring cubic-bezier:
  ```css
  /* Studio Spotlight Overlays */
  .car-card-modern::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 140px;
    background: var(--studio-cone);
    pointer-events: none;
    z-index: 1;
    border-radius: var(--r-md) var(--r-md) 0 0;
    transition: opacity 0.4s ease;
  }

  .car-card-modern:hover::before {
    opacity: 1;
    background: linear-gradient(135deg, rgba(195, 160, 145, 0.12) 0%, rgba(30, 38, 59, 0) 65%);
  }

  /* Tactile Heart Pop */
  @keyframes heartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.32); }
    100% { transform: scale(1); }
  }

  .heart-popping {
    animation: heartPop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  ```
- **Verifikasi:**
  ```bash
  grep -E "studio-cone|heartPop|heart-popping" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/animations.css
  ```
  *Expected Output:* Keyframe dan kelas animasi baru terdeteksi.

---

### Task 4: Elevasi Tampilan Card Mobil & Tag Telemetri (`js/dom.js`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/js/dom.js`
- **Tindakan:**
  Perbarui template card di fungsi `renderCars()` agar mengusung hierarki visual Space Grotesk + Cognac Price:
  - Tampilkan brand dalam ukuran kecil dengan huruf kapital Space Grotesk.
  - Tampilkan nama model dengan ukuran menonjol (`font-family: var(--font-heading)`).
  - Tampilkan harga OTR dalam warna `--accent-cognac` (`#c3a091`).
  - Tambahkan chip telemetri ringkas: Transmisi, Bahan Bakar, Tahun.
- **Verifikasi:**
  ```bash
  grep -E "accent-cognac|font-heading|quickMonthlyEst" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/js/dom.js
  ```
  *Expected Output:* Kode JavaScript merender atribut gaya dan kelas baru.

---

### Task 5: Penyesuaian Responsivitas Layar (`css/responsive.css`)
- **File:** `/home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/responsive.css`
- **Tindakan:**
  Pastikan grid dan elemen telemetri merespons dengan mulus di layar sempit:
  - Mobile (≤640px): 1 kolom kartu, padding container 1rem, brand pill scroll horizontal dengan touch momentum.
  - Tablet (641px–1024px): 2 kolom kartu dengan jarak proporsional.
  - Desktop (>1024px): 3 hingga 4 kolom kartu.
- **Verifikasi:**
  ```bash
  grep -E "@media.*max-width: 640px" /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin/css/responsive.css
  ```
  *Expected Output:* Breakpoint mobile terkonfigurasi dengan benar.

---

## Tests & Validation

1. **Uji Fungsionalitas Pengambilan Data Asinkron:**
   ```bash
   curl -s "https://api-web.dnccudinus.org/api/mobil" | jq -r '.message'
   ```
   *Expected Output:* Teks pesan keberhasilan dari server (misal: `"Data mobil berhasil diambil"`).

2. **Uji Validasi Sintaks CSS & HTML:**
   - Jalankan pemeriksaan keutuhan tag HTML pada `index.html`.
   - Pastikan seluruh variabel CSS terdefinisi dan tidak ada sintaks rusak pada `style.css` dan `animations.css`.

3. **Uji Interaksi UI (Manual / Browser):**
   - Buka `index.html` via live server lokal:
     ```bash
     cd /home/arr_sixx/Kuliah/Organisasi-DNCC/BTNG-FE/BTNG-Frontend-ArkaanTaqiyyuddin && python3 -m http.server 8080
     ```
   - Verifikasi rendering font: Header menggunakan *Playfair Display* dan *Space Grotesk*.
   - Verifikasi warna: Latar belakang kanvas berwarna Deep Midnight Navy (`#111522`), kartu pameran memiliki kerucut cahaya diagonal, dan harga berwarna Warm Cognac (`#C3A091`).
   - Uji filter: Ketik di kolom search dan pilih brand, verifikasi kartu mobil terfilter tanpa jeda (debounce).
   - Uji wishlist: Klik ikon hati, verifikasi efek pop animasi dan angka counter di navbar bertambah.

---

## Risks, Tradeoffs, and Open Questions

- **Risiko Loading Web Fonts Eksternal:** Memuat tiga Google Fonts sekaligus dapat memicu FOIT (Flash of Invisible Text) pada koneksi lambat. *Mitigasi:* Gunakan parameter `&display=swap` pada URL Google Fonts dan tentukan font fallback yang proporsional (`Georgia, serif` untuk editorial dan `system-ui, sans-serif` untuk interface).
- **Tradeoff Kontras Warna:** Palet Earth & Cognac pada teks berukuran kecil bisa kurang terbaca jika dipadukan dengan latar belakang slate. *Mitigasi:* Gunakan warna Cognac (`#C3A091`) hanya untuk teks besar (harga, judul badge, CTA), sedangkan teks paragraf kecil tetap menggunakan Icy Titanium White (`#DCE3EF`) untuk memenuhi standar kontras WCAG AAA.
- **Open Question:** Apakah Anda ingin saya segera mengeksekusi penerapan kode CSS, HTML, dan DOM baru ini langsung ke dalam folder proyek lokal Anda?
