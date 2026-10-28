/**
 * ==========================================================================
 * VELOCE AUTO — DOM MANIPULATION MODULE (Vanilla JS)
 * Collector Card Architecture (Ref 2 & 6 - Mustang S650 & Porsche 911),
 * 175-Point Certification Sheets, Modal Dialogs & Toast Alerts
 * ==========================================================================
 */

/**
 * Format number into Indonesian Rupiah format
 * @param {number} value
 * @returns {string} e.g. Rp 275.000.000
 */
export function formatRupiah(value) {
  if (isNaN(value)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Estimate monthly installment for quick card preview
 * @param {number} price 
 * @returns {string} e.g. "Cicilan mulai Rp 4,2 jt/bln"
 */
export function quickMonthlyEst(price) {
  if (!price) return '-';
  // 20% DP, 36 months, 5.5% annual rate
  const loanPrincipal = price * 0.8;
  const interest = loanPrincipal * 0.055 * 3;
  const monthly = Math.round((loanPrincipal + interest) / 36);
  const inJuta = (monthly / 1000000).toFixed(1).replace('.', ',');
  return `Cicilan mulai Rp ${inJuta} jt/bln`;
}

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80';

/**
 * Render loading skeletons with sweeping light beam
 * @param {HTMLElement} container
 * @param {number} count
 */
export function renderSkeletons(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
      <div class="skeleton skeleton-img"></div>
      <div style="padding:1.25rem;">
        <div class="skeleton skeleton-text" style="width:35%; height:14px; margin-bottom:0.75rem;"></div>
        <div class="skeleton skeleton-text" style="width:85%; height:22px; margin-bottom:1rem;"></div>
        <div style="display:flex; gap:0.5rem; margin-bottom:1.25rem;">
          <div class="skeleton skeleton-text" style="width:28%; height:20px;"></div>
          <div class="skeleton skeleton-text" style="width:28%; height:20px;"></div>
          <div class="skeleton skeleton-text" style="width:28%; height:20px;"></div>
        </div>
        <div class="skeleton skeleton-text" style="width:55%; height:24px; margin-top:0.75rem;"></div>
      </div>
    `;
    container.appendChild(card);
  }
}

/**
 * Render dynamic car cards in Collector Trading Card format (Ref 2 & 6 - Mustang & Porsche)
 * @param {HTMLElement} container
 * @param {Array} cars
 * @param {Object} callbacks
 */
export function renderCars(container, cars, callbacks) {
  container.innerHTML = '';

  if (!cars || cars.length === 0) return;

  cars.forEach((car, index) => {
    const card = document.createElement('article');
    card.className = 'car-collector-card anim-fade-up';
    card.style.animationDelay = `${index * 0.04}s`;

    const isAvailable = (car.status || '').toLowerCase() === 'tersedia';
    const isWishlisted = callbacks.isWishlisted(car.id);
    const isCompared = callbacks.isCompared(car.id);

    // Direct WhatsApp inquiry URL
    const waMessage = encodeURIComponent(
      `Halo Veloce Auto, saya ingin menanyakan ketersediaan unit *${car.brand} ${car.nama}* (Tahun ${car.tahun}, Harga ${formatRupiah(car.harga)}). Apakah unit ini masih tersedia untuk uji jalan (test drive)?`
    );
    const waUrl = `https://wa.me/6281234567890?text=${waMessage}`;

    card.innerHTML = `
      <div class="card-stage-media">
        <div class="card-studio-cone"></div>
        <button class="btn-card-wishlist ${isWishlisted ? 'active' : ''}" type="button" aria-label="Simpan ke favorit" title="Simpan ke favorit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <img 
          src="${car.foto || FALLBACK_IMG}" 
          alt="${car.nama}" 
          class="car-stage-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_IMG}'"
        />
      </div>

      <!-- 3-Pill Telemetry Row Directly Below Photo (Ref 2 & 6) -->
      <div class="card-telemetry-pills">
        <span class="spec-pill" title="Tipe Bahan Bakar">◆ ${car.bahan_bakar || 'Bensin'}</span>
        <span class="spec-pill" title="Tahun Pembuatan">⏱ ${car.tahun || '2024'}</span>
        <span class="spec-pill" title="Sistem Transmisi">⚙ ${car.transmisi || 'Otomatis'}</span>
      </div>

      <div class="card-body-content">
        <div class="car-brand-tag">${car.brand ? car.brand.toUpperCase() : 'VELOCE'}</div>
        <h3 class="car-model-name" title="${car.nama}">${car.nama}</h3>
        <p class="car-editorial-desc">Unit terverifikasi lulus inspeksi 175-titik showroom resmi Veloce Auto.</p>

        <div class="card-finance-bar">
          <span class="price-label">Harga OTR Resmi</span>
          <div class="price-value-cognac">${formatRupiah(car.harga)}</div>
          <div class="installment-est">${quickMonthlyEst(car.harga)}</div>
        </div>

        <div class="card-actions-grid">
          <button class="btn-action-spec" type="button">Detail & Uji</button>
          <button class="btn-action-compare ${isCompared ? 'selected' : ''}" type="button" title="Bandingkan spesifikasi">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
          </button>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-chat-wa" title="Konsultasi WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WA
          </a>
        </div>
      </div>
    `;

    // Event Listeners
    card.querySelector('.btn-action-spec').addEventListener('click', () => callbacks.onDetail(car));
    
    const favBtn = card.querySelector('.btn-card-wishlist');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onToggleWishlist(car, favBtn);
    });

    const compareBtn = card.querySelector('.btn-action-compare');
    compareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onToggleCompare(car);
    });

    container.appendChild(card);
  });
}

/**
 * Render Empty State
 */
export function renderEmptyState(container, onReset) {
  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-default); border-radius: var(--r-lg);">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" stroke-width="1.5" style="margin-bottom:1rem;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <h3 style="font-size:1.25rem; margin-bottom:0.5rem; font-family:var(--font-heading);">Tidak Ada Mobil yang Cocok</h3>
      <p style="color:var(--text-muted); font-size:0.92rem; max-width:440px; margin:0 auto 1.25rem;">Tidak ditemukan unit yang sesuai dengan kombinasi pencarian atau filter yang sedang aktif.</p>
      <button class="btn-hero-primary" id="emptyResetBtn" type="button" style="margin:0 auto; padding:0.6rem 1.25rem; font-size:0.82rem;">
        Reset Semua Filter
      </button>
    </div>
  `;
  document.getElementById('emptyResetBtn')?.addEventListener('click', onReset);
}

/**
 * Render Error State
 */
export function renderErrorState(container, errorMsg, onRetry) {
  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--accent-racing-red); border-radius: var(--r-lg);">
      <h3 style="font-size:1.25rem; color:var(--accent-racing-red); margin-bottom:0.5rem; font-family:var(--font-heading);">Gagal Mengambil Data Mobil</h3>
      <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.25rem;">${errorMsg || 'Koneksi ke endpoint API resmi DNCC terputus. Silakan coba kembali.'}</p>
      <button class="btn-hero-primary" id="errorRetryBtn" type="button" style="margin:0 auto; background:var(--accent-racing-red); color:#fff; padding:0.6rem 1.25rem; font-size:0.82rem;">
        Coba Muat Ulang
      </button>
    </div>
  `;
  document.getElementById('errorRetryBtn')?.addEventListener('click', onRetry);
}

/**
 * Toast Notification (Minimal & Ergonomic)
 */
export function showToast(title, message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let dotColor = 'var(--accent-cognac)';
  if (type === 'success') dotColor = 'var(--status-available-text)';
  if (type === 'warning' || type === 'error') dotColor = 'var(--accent-racing-red)';

  toast.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.5rem;">
      <span style="width:7px; height:7px; border-radius:50%; background:${dotColor}; flex-shrink:0;"></span>
      <div class="toast-title">${title}</div>
    </div>
    <div class="toast-text">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3200);
}
