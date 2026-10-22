/**
 * ==========================================================================
 * VELOCE AUTO - DOM MANIPULATION MODULE
 * Pure Vanilla JS DOM rendering for cards, skeletons, modals, and toasts
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
 * Fallback car placeholder in case external Unsplash image has issues
 */
const FALLBACK_CAR_IMAGE = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80';

/**
 * Render loading skeletons in car grid
 * @param {HTMLElement} container
 * @param {number} count
 */
export function renderSkeletons(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton-card';
    card.innerHTML = `
      <div class="skeleton skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton skeleton-line short"></div>
        <div class="skeleton skeleton-line title"></div>
        <div class="skeleton skeleton-line medium"></div>
        <div style="display:flex; justify-content:space-between; margin-top:1rem;">
          <div class="skeleton skeleton-line short"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  }
}

/**
 * Render car cards dynamically
 * @param {HTMLElement} container
 * @param {Array} cars
 * @param {Object} callbacks - { onDetailClick, onTestDriveClick, onWishlistToggle, isWishlisted }
 */
export function renderCars(container, cars, callbacks) {
  container.innerHTML = '';

  if (!cars || cars.length === 0) {
    return;
  }

  cars.forEach((car, index) => {
    const card = document.createElement('article');
    card.className = 'car-card animate-fade-in-up';
    card.style.animationDelay = `${index * 0.06}s`;

    const isAvailable = car.status.toLowerCase() === 'tersedia';
    const isWishlisted = callbacks.isWishlisted(car.id);

    // Fuel icon selection
    let fuelIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18"/><path d="M15 10h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V8l-3-3"/><line x1="3" y1="22" x2="15" y2="22"/></svg>`;
    if (car.bahan_bakar.toLowerCase() === 'listrik') {
      fuelIcon = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
    }

    card.innerHTML = `
      <div class="car-image-container">
        <img 
          src="${car.foto || FALLBACK_CAR_IMAGE}" 
          alt="${car.nama}" 
          class="car-image" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_CAR_IMAGE}'"
        />
        <div class="card-top-badges">
          <span class="status-badge ${isAvailable ? 'tersedia badge-pulse' : 'sold'}">
            <span class="status-dot"></span>
            ${isAvailable ? 'Tersedia' : 'Terjual'}
          </span>
          <button class="btn-wishlist ${isWishlisted ? 'active' : ''}" aria-label="Simpan ke favorit" title="Simpan ke favorit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div class="car-content">
        <div class="car-brand-row">
          <span class="brand-tag">${car.brand}</span>
          <span class="year-tag">${car.tahun}</span>
        </div>

        <h3 class="car-title" title="${car.nama}">${car.nama}</h3>

        <div class="car-specs-row">
          <div class="spec-chip" title="Bahan Bakar">
            ${fuelIcon}
            <span>${car.bahan_bakar}</span>
          </div>
          <div class="spec-chip" title="Transmisi">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>${car.transmisi}</span>
          </div>
          <div class="spec-chip" title="Tahun">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>${car.tahun}</span>
          </div>
        </div>

        <div class="car-price-row">
          <span class="price-label">Harga OTR</span>
          <span class="price-value">${formatRupiah(car.harga)}</span>
        </div>

        <div class="card-actions-row">
          <button class="btn-card-detail" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Detail Unit
          </button>
          <button class="btn-card-action ${!isAvailable ? 'disabled' : ''}" type="button" ${!isAvailable ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            ${isAvailable ? 'Test Drive' : 'Terjual'}
          </button>
        </div>
      </div>
    `;

    // Event Bindings
    const detailBtn = card.querySelector('.btn-card-detail');
    detailBtn.addEventListener('click', () => callbacks.onDetailClick(car));

    const testDriveBtn = card.querySelector('.btn-card-action');
    if (isAvailable) {
      testDriveBtn.addEventListener('click', () => callbacks.onTestDriveClick(car));
    }

    const wishlistBtn = card.querySelector('.btn-wishlist');
    wishlistBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      callbacks.onWishlistToggle(car, wishlistBtn);
    });

    container.appendChild(card);
  });
}

/**
 * Render Empty State when no cars match criteria
 * @param {HTMLElement} container
 * @param {Function} onReset
 */
export function renderEmptyState(container, onReset) {
  container.innerHTML = '';
  const stateCard = document.createElement('div');
  stateCard.className = 'state-container animate-fade-in-up';
  stateCard.innerHTML = `
    <div class="state-icon">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </div>
    <h3 class="state-title">Tidak Ada Kendaraan Ditemukan</h3>
    <p class="state-desc">Kriteria pencarian atau filter yang Anda terapkan tidak cocok dengan armada yang ada saat ini. Coba sesuaikan kata kunci atau bersihkan filter.</p>
    <button class="btn-main-cta btn-reset-filter" type="button" style="margin-top:0.5rem;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Reset Semua Filter
    </button>
  `;

  stateCard.querySelector('.btn-reset-filter').addEventListener('click', onReset);
  container.appendChild(stateCard);
}

/**
 * Render Error State if API fails
 * @param {HTMLElement} container
 * @param {string} errorMsg
 * @param {Function} onRetry
 */
export function renderErrorState(container, errorMsg, onRetry) {
  container.innerHTML = '';
  const stateCard = document.createElement('div');
  stateCard.className = 'state-container animate-fade-in-up';
  stateCard.innerHTML = `
    <div class="state-icon error">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </div>
    <h3 class="state-title">Gagal Memuat Data Mobil</h3>
    <p class="state-desc">${errorMsg || 'Terjadi gangguan saat menghubungi server API. Pastikan koneksi internet stabil.'}</p>
    <button class="btn-main-cta btn-retry" type="button" style="margin-top:0.5rem; background:#ef4444;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Muat Ulang Data
    </button>
  `;

  stateCard.querySelector('.btn-retry').addEventListener('click', onRetry);
  container.appendChild(stateCard);
}

/**
 * Show a sleek toast notification
 * @param {string} title
 * @param {string} message
 * @param {'success'|'info'|'warning'|'error'} type
 */
export function showToast(title, message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  if (type === 'info') {
    iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  } else if (type === 'warning' || type === 'error') {
    iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" aria-label="Tutup notifikasi">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  const closeToast = () => {
    toast.classList.add('hiding');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', closeToast);
  container.appendChild(toast);

  // Auto remove after 3.8s
  setTimeout(closeToast, 3800);
}
