/**
 * ==========================================================================
 * VELOCE AUTO — DOM MANIPULATION MODULE (Vanilla JS)
 * High-polish DOM elements rendering, modal dialogs, and toast alerts
 * ==========================================================================
 */

/**
 * Format number into Indonesian Rupiah format
 * @param {number} value
 * @returns {string} e.g. Rp 719.000.000
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
 * @returns {string} e.g. "Rp 14,8 jt/bln"
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
 * Render loading skeletons
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
        <div class="skeleton skeleton-text" style="width:40%;"></div>
        <div class="skeleton skeleton-text" style="width:85%; height:22px; margin-bottom:1rem;"></div>
        <div class="skeleton skeleton-text" style="width:65%;"></div>
        <div class="skeleton skeleton-text" style="width:50%; height:26px; margin-top:1.25rem;"></div>
      </div>
    `;
    container.appendChild(card);
  }
}

/**
 * Render dynamic car cards
 * @param {HTMLElement} container
 * @param {Array} cars
 * @param {Object} callbacks
 */
export function renderCars(container, cars, callbacks) {
  container.innerHTML = '';

  if (!cars || cars.length === 0) return;

  cars.forEach((car, index) => {
    const card = document.createElement('article');
    card.className = 'car-card-modern anim-fade-up';
    card.style.animationDelay = `${index * 0.04}s`;

    const isAvailable = car.status.toLowerCase() === 'tersedia';
    const isWishlisted = callbacks.isWishlisted(car.id);
    const isCompared = callbacks.isCompared(car.id);

    // Fuel icon selection
    let fuelIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3"/><line x1="3" y1="22" x2="15" y2="22"/></svg>`;
    if (car.bahan_bakar.toLowerCase() === 'listrik') {
      fuelIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    }

    // Direct WhatsApp message URL
    const waMessage = encodeURIComponent(
      `Halo Veloce Auto, saya ingin tanya ketersediaan unit *${car.brand} ${car.nama}* (Tahun ${car.tahun}, Harga ${formatRupiah(car.harga)}). Apakah unit ini masih tersedia untuk test drive?`
    );
    const waUrl = `https://wa.me/6281234567890?text=${waMessage}`;

    card.innerHTML = `
      <div class="car-card-media">
        <img 
          src="${car.foto || FALLBACK_IMG}" 
          alt="${car.nama}" 
          class="car-photo" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_IMG}'"
        />
        <div class="media-badges-overlay">
          <span class="clean-badge ${isAvailable ? 'available' : 'sold'}">
            <span class="clean-badge-dot"></span>
            ${isAvailable ? 'Tersedia' : 'Terjual'}
          </span>
          <button class="btn-card-fav ${isWishlisted ? 'active' : ''}" type="button" aria-label="Simpan mobil">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="car-card-body">
        <div class="car-header-meta">
          <span>${car.brand}</span>
          <span style="color:var(--text-dim);">${car.tahun}</span>
        </div>

        <h3 class="car-name-title" title="${car.nama}">${car.nama}</h3>

        <div class="specs-tag-row">
          <div class="spec-pill" title="Bahan Bakar">
            ${fuelIcon}
            <span>${car.bahan_bakar}</span>
          </div>
          <div class="spec-pill" title="Transmisi">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>${car.transmisi}</span>
          </div>
          <div class="spec-pill" title="Tahun Pembuatan">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${car.tahun}</span>
          </div>
        </div>

        <div class="car-price-block">
          <span class="price-main-tag">${formatRupiah(car.harga)}</span>
          <span class="installment-hint">${quickMonthlyEst(car.harga)}</span>
        </div>

        <div class="card-bottom-actions">
          <button class="btn-view-unit" type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Detail Unit
          </button>
          
          <div style="display:flex; gap:0.4rem;">
            <button class="btn-compare-toggle ${isCompared ? 'selected' : ''}" type="button" title="Bandingkan mobil ini">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
            </button>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-chat-wa" title="Tanya ketersediaan lewat WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              WA
            </a>
          </div>
        </div>
      </div>
    `;

    // Event Listeners
    card.querySelector('.btn-view-unit').addEventListener('click', () => callbacks.onDetail(car));
    
    const favBtn = card.querySelector('.btn-card-fav');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onToggleWishlist(car, favBtn);
    });

    const compareBtn = card.querySelector('.btn-compare-toggle');
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
    <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-default); border-radius: var(--r-md);">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" stroke-width="1.5" style="margin-bottom:1rem;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <h3 style="font-size:1.25rem; margin-bottom:0.5rem;">Tidak Ada Mobil yang Cocok</h3>
      <p style="color:var(--text-muted); font-size:0.92rem; max-width:440px; margin:0 auto 1.25rem;">Tidak ditemukan unit yang sesuai dengan kombinasi pencarian atau filter yang aktif.</p>
      <button class="btn-launch-compare" id="emptyResetBtn" type="button" style="margin:0 auto;">
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
    <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px solid #ef4444; border-radius: var(--r-md);">
      <h3 style="font-size:1.25rem; color:#ef4444; margin-bottom:0.5rem;">Gagal Memuat Data Mobil</h3>
      <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:1.25rem;">${errorMsg || 'Koneksi ke endpoint resmi panitia terputus. Silakan coba kembali.'}</p>
      <button class="btn-launch-compare" id="errorRetryBtn" type="button" style="margin:0 auto; background:#ef4444;">
        Coba Muat Ulang
      </button>
    </div>
  `;
  document.getElementById('errorRetryBtn')?.addEventListener('click', onRetry);
}

/**
 * Toast Notification (Minimal & unobtrusive)
 */
export function showToast(title, message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style = 'position:fixed; bottom:1.5rem; right:1.5rem; z-index:2000; display:flex; flex-direction:column; gap:0.5rem; pointer-events:none;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style = `
    pointer-events: auto;
    min-width: 280px;
    max-width: 380px;
    background: var(--bg-surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--r-sm);
    padding: 0.85rem 1rem;
    box-shadow: var(--shadow-floating);
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  `;

  let dotColor = '#2563eb';
  if (type === 'success') dotColor = '#10b981';
  if (type === 'warning' || type === 'error') dotColor = '#ef4444';

  toast.innerHTML = `
    <span style="width:8px; height:8px; border-radius:50%; background:${dotColor}; margin-top:6px; flex-shrink:0;"></span>
    <div style="flex:1;">
      <div style="font-size:0.88rem; font-weight:700; color:var(--text-main);">${title}</div>
      <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
