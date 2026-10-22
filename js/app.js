/**
 * ==========================================================================
 * VELOCE AUTO — MAIN APPLICATION CONTROLLER (Vanilla JS)
 * High-performance state management, event orchestration, and comparisons
 * ==========================================================================
 */

import { getCars } from './api.js';
import { 
  renderCars, 
  renderSkeletons, 
  renderEmptyState, 
  renderErrorState, 
  showToast, 
  formatRupiah 
} from './dom.js';
import { 
  initialFilterState, 
  filterAndSortCars, 
  getCarStatistics 
} from './filters.js';
import { initCalculator, calculateLoan } from './calculator.js';

class VeloceApp {
  constructor() {
    this.allCars = [];
    this.filterState = { ...initialFilterState };
    this.wishlist = new Set();
    this.comparedIds = new Set();

    // DOM Elements
    this.carsGrid = document.getElementById('carsGrid');
    this.resultsCountEl = document.getElementById('resultsCount');
    this.searchInput = document.getElementById('searchInput');
    this.searchClearBtn = document.getElementById('searchClearBtn');
    this.sortSelect = document.getElementById('sortSelect');
    this.brandSelect = document.getElementById('brandSelect');
    this.transSelect = document.getElementById('transmissionSelect');
    this.statusSelect = document.getElementById('statusSelect');
    this.resetBtn = document.getElementById('resetFiltersBtn');
    this.fuelChips = document.querySelectorAll('.chip-btn');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.navMenu = document.getElementById('navMenu');
    this.wishlistBtn = document.getElementById('wishlistBtn');
    this.wishlistBadge = document.getElementById('wishlistBadge');

    // Modals & Floating Bars
    this.carModal = document.getElementById('carDetailModal');
    this.wishlistModal = document.getElementById('wishlistModal');
    this.compareModal = document.getElementById('compareModal');
    this.compareBar = document.getElementById('floatingCompareBar');
    this.compareCountText = document.getElementById('compareCountText');
    this.compareLaunchBtn = document.getElementById('btnLaunchCompare');
    this.compareClearBtn = document.getElementById('btnClearCompare');

    this.init();
  }

  async init() {
    this.initTheme();
    this.loadWishlist();
    this.bindEvents();
    await this.fetchData();
  }

  /* ---------------- Theme & Persistence ---------------- */
  initTheme() {
    const saved = localStorage.getItem('veloce_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateThemeIcon(saved);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('veloce_theme', next);
    this.updateThemeIcon(next);
  }

  updateThemeIcon(theme) {
    if (!this.themeToggleBtn) return;
    const isDark = theme === 'dark';
    this.themeToggleBtn.innerHTML = isDark ? `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ` : `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }

  loadWishlist() {
    try {
      const stored = localStorage.getItem('veloce_wishlist');
      if (stored) this.wishlist = new Set(JSON.parse(stored));
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
    this.updateWishlistCount();
  }

  saveWishlist() {
    try {
      localStorage.setItem('veloce_wishlist', JSON.stringify([...this.wishlist]));
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
    this.updateWishlistCount();
  }

  updateWishlistCount() {
    if (this.wishlistBadge) {
      const count = this.wishlist.size;
      this.wishlistBadge.textContent = count;
      this.wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  toggleWishlist(car, btnEl) {
    if (this.wishlist.has(car.id)) {
      this.wishlist.delete(car.id);
      if (btnEl) {
        btnEl.classList.remove('active');
        btnEl.querySelector('svg')?.setAttribute('fill', 'none');
      }
      showToast('Favorit', `${car.nama} dihapus dari daftar favorit.`, 'info');
    } else {
      this.wishlist.add(car.id);
      if (btnEl) {
        btnEl.classList.add('active');
        btnEl.classList.add('heart-pop');
        btnEl.querySelector('svg')?.setAttribute('fill', '#ef4444');
        setTimeout(() => btnEl.classList.remove('heart-pop'), 350);
      }
      showToast('Disimpan', `${car.nama} ditambahkan ke favorit.`, 'success');
    }
    this.saveWishlist();
  }

  /* ---------------- Data Ingestion ---------------- */
  async fetchData() {
    renderSkeletons(this.carsGrid, 6);

    try {
      const res = await getCars();
      if (!res.data || !Array.isArray(res.data)) {
        throw new Error('Format data tidak sesuai.');
      }

      this.allCars = res.data;
      this.populateBrands();
      this.updateCounters();
      initCalculator(this.allCars);
      this.render();

    } catch (err) {
      console.error('Fetch error:', err);
      renderErrorState(this.carsGrid, err.message, () => this.fetchData());
    }
  }

  populateBrands() {
    if (!this.brandSelect) return;
    const brands = [...new Set(this.allCars.map(c => c.brand))].sort();
    this.brandSelect.innerHTML = '<option value="all">Semua Brand</option>';
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      this.brandSelect.appendChild(opt);
    });
  }

  updateCounters() {
    const stats = getCarStatistics(this.allCars);

    const totalEl = document.getElementById('metaTotalUnits');
    const availEl = document.getElementById('metaAvailUnits');
    const brandsEl = document.getElementById('metaBrandsCount');

    if (totalEl) totalEl.textContent = stats.total;
    if (availEl) availEl.textContent = stats.available;
    if (brandsEl) brandsEl.textContent = stats.uniqueBrands;

    // Fuel pill counts
    const pillAll = document.querySelector('[data-fuel="all"] .chip-count');
    const pillBensin = document.querySelector('[data-fuel="bensin"] .chip-count');
    const pillDiesel = document.querySelector('[data-fuel="diesel"] .chip-count');
    const pillHybrid = document.querySelector('[data-fuel="hybrid"] .chip-count');
    const pillListrik = document.querySelector('[data-fuel="listrik"] .chip-count');

    if (pillAll) pillAll.textContent = `(${stats.total})`;
    if (pillBensin) pillBensin.textContent = `(${stats.fuelCounts.bensin})`;
    if (pillDiesel) pillDiesel.textContent = `(${stats.fuelCounts.diesel})`;
    if (pillHybrid) pillHybrid.textContent = `(${stats.fuelCounts.hybrid})`;
    if (pillListrik) pillListrik.textContent = `(${stats.fuelCounts.listrik})`;
  }

  /* ---------------- Render & Filters ---------------- */
  render() {
    const filtered = filterAndSortCars(this.allCars, this.filterState);

    if (this.resultsCountEl) {
      this.resultsCountEl.innerHTML = `Menampilkan <strong>${filtered.length}</strong> dari <strong>${this.allCars.length}</strong> mobil`;
    }

    if (filtered.length === 0) {
      renderEmptyState(this.carsGrid, () => this.resetFilters());
      return;
    }

    renderCars(this.carsGrid, filtered, {
      onDetail: (car) => this.openDetailModal(car),
      onToggleWishlist: (car, btn) => this.toggleWishlist(car, btn),
      onToggleCompare: (car) => this.toggleCompareCar(car),
      isWishlisted: (id) => this.wishlist.has(id),
      isCompared: (id) => this.comparedIds.has(id)
    });
  }

  resetFilters() {
    this.filterState = { ...initialFilterState };

    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchClearBtn?.classList.remove('visible');
    }
    if (this.sortSelect) this.sortSelect.value = 'recommended';
    if (this.brandSelect) this.brandSelect.value = 'all';
    if (this.transSelect) this.transSelect.value = 'all';
    if (this.statusSelect) this.statusSelect.value = 'all';

    this.fuelChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.fuel === 'all');
    });

    this.render();
    showToast('Filter Direset', 'Kriteria pencarian telah dikembalikan ke awal.', 'info');
  }

  /* ---------------- Compare Functionality ---------------- */
  toggleCompareCar(car) {
    if (this.comparedIds.has(car.id)) {
      this.comparedIds.delete(car.id);
      showToast('Perbandingan', `${car.nama} dibatalkan dari perbandingan.`, 'info');
    } else {
      if (this.comparedIds.size >= 2) {
        showToast('Batas Perbandingan', 'Maksimal 2 mobil dapat dibandingkan sekaligus. Hapus salah satu unit terlebih dahulu.', 'warning');
        return;
      }
      this.comparedIds.add(car.id);
      showToast('Perbandingan', `${car.nama} ditambahkan untuk dibandingkan.`, 'success');
    }
    this.updateCompareBar();
    this.render(); // Update compare button state on cards
  }

  updateCompareBar() {
    const count = this.comparedIds.size;
    if (!this.compareBar) return;

    if (count > 0) {
      this.compareBar.classList.add('visible');
      if (this.compareCountText) {
        this.compareCountText.textContent = `${count}/2 Mobil Terpilih`;
      }
      if (this.compareLaunchBtn) {
        this.compareLaunchBtn.textContent = count === 2 ? 'Bandingkan Sekarang' : 'Pilih 1 Mobil Lagi';
        this.compareLaunchBtn.disabled = count < 2;
        this.compareLaunchBtn.style.opacity = count === 2 ? '1' : '0.65';
      }
    } else {
      this.compareBar.classList.remove('visible');
    }
  }

  clearCompare() {
    this.comparedIds.clear();
    this.updateCompareBar();
    this.render();
    showToast('Perbandingan Dikosongkan', 'Pilihan unit perbandingan telah dibersihkan.', 'info');
  }

  openCompareModal() {
    if (this.comparedIds.size < 2 || !this.compareModal) return;

    const cars = this.allCars.filter(c => this.comparedIds.has(c.id));
    if (cars.length < 2) return;

    const [carA, carB] = cars;
    const simA = calculateLoan(carA.harga, 20, 36);
    const simB = calculateLoan(carB.harga, 20, 36);

    const wrap = document.getElementById('compareColsWrap');
    if (wrap) {
      wrap.innerHTML = `
        <div class="compare-card-col">
          <img src="${carA.foto}" alt="${carA.nama}" style="width:100%; height:180px; object-fit:cover; border-radius:var(--r-sm);">
          <div>
            <span style="font-size:0.75rem; color:var(--accent-blue-text); font-weight:700;">${carA.brand}</span>
            <h4 style="font-size:1.15rem; color:var(--text-main); margin-top:2px;">${carA.nama}</h4>
            <div style="font-size:1.25rem; font-weight:800; color:var(--text-main); margin-top:0.35rem;">${formatRupiah(carA.harga)}</div>
          </div>
          <div>
            <div class="compare-item-row"><span>Tahun</span><span>${carA.tahun}</span></div>
            <div class="compare-item-row"><span>Bahan Bakar</span><span>${carA.bahan_bakar}</span></div>
            <div class="compare-item-row"><span>Transmisi</span><span>${carA.transmisi}</span></div>
            <div class="compare-item-row"><span>Status</span><span style="color:${carA.status === 'tersedia' ? '#10b981':'#ef4444'}; font-weight:700;">${carA.status}</span></div>
            <div class="compare-item-row"><span>Est. Cicilan (36 Bln)</span><span style="color:#10b981;">${formatRupiah(simA.monthlyInstallment)}/bln</span></div>
          </div>
          <a href="https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Veloce Auto, saya ingin konsultasi tentang ${carA.nama}`)}" target="_blank" class="btn-chat-wa" style="width:100%; height:40px;">
            Tanya Unit Ini
          </a>
        </div>

        <div class="compare-card-col">
          <img src="${carB.foto}" alt="${carB.nama}" style="width:100%; height:180px; object-fit:cover; border-radius:var(--r-sm);">
          <div>
            <span style="font-size:0.75rem; color:var(--accent-blue-text); font-weight:700;">${carB.brand}</span>
            <h4 style="font-size:1.15rem; color:var(--text-main); margin-top:2px;">${carB.nama}</h4>
            <div style="font-size:1.25rem; font-weight:800; color:var(--text-main); margin-top:0.35rem;">${formatRupiah(carB.harga)}</div>
          </div>
          <div>
            <div class="compare-item-row"><span>Tahun</span><span>${carB.tahun}</span></div>
            <div class="compare-item-row"><span>Bahan Bakar</span><span>${carB.bahan_bakar}</span></div>
            <div class="compare-item-row"><span>Transmisi</span><span>${carB.transmisi}</span></div>
            <div class="compare-item-row"><span>Status</span><span style="color:${carB.status === 'tersedia' ? '#10b981':'#ef4444'}; font-weight:700;">${carB.status}</span></div>
            <div class="compare-item-row"><span>Est. Cicilan (36 Bln)</span><span style="color:#10b981;">${formatRupiah(simB.monthlyInstallment)}/bln</span></div>
          </div>
          <a href="https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Veloce Auto, saya ingin konsultasi tentang ${carB.nama}`)}" target="_blank" class="btn-chat-wa" style="width:100%; height:40px;">
            Tanya Unit Ini
          </a>
        </div>
      `;
    }

    this.compareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ---------------- Modals ---------------- */
  openDetailModal(car) {
    if (!this.carModal) return;

    const imgEl = document.getElementById('detailModalImg');
    const brandEl = document.getElementById('detailModalBrand');
    const nameEl = document.getElementById('detailModalName');
    const priceEl = document.getElementById('detailModalPrice');
    const statusEl = document.getElementById('detailModalStatus');
    const yearEl = document.getElementById('detailModalYear');
    const fuelEl = document.getElementById('detailModalFuel');
    const transEl = document.getElementById('detailModalTrans');
    const calcEl = document.getElementById('detailModalCalc');
    const bookingInput = document.getElementById('bookingCarTarget');

    if (imgEl) imgEl.src = car.foto;
    if (brandEl) brandEl.textContent = car.brand;
    if (nameEl) nameEl.textContent = car.nama;
    if (priceEl) priceEl.textContent = formatRupiah(car.harga);
    if (yearEl) yearEl.textContent = car.tahun;
    if (fuelEl) fuelEl.textContent = car.bahan_bakar;
    if (transEl) transEl.textContent = car.transmisi;
    if (bookingInput) bookingInput.value = `${car.brand} ${car.nama} (${car.tahun})`;

    const isAvailable = car.status.toLowerCase() === 'tersedia';
    if (statusEl) {
      statusEl.className = `clean-badge ${isAvailable ? 'available' : 'sold'}`;
      statusEl.textContent = isAvailable ? 'Unit Tersedia' : 'Sudah Terjual';
    }

    if (calcEl) {
      const sim = calculateLoan(car.harga, 20, 36);
      calcEl.textContent = `${formatRupiah(sim.monthlyInstallment)} / bln (DP 20%, 36 Bln)`;
    }

    this.carModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  openWishlistModal() {
    if (!this.wishlistModal) return;

    const list = document.getElementById('wishlistContainerList');
    if (list) {
      list.innerHTML = '';
      const savedCars = this.allCars.filter(c => this.wishlist.has(c.id));

      if (savedCars.length === 0) {
        list.innerHTML = `
          <div style="text-align:center; padding:3rem 1rem;">
            <p style="color:var(--text-muted); font-size:0.92rem;">Belum ada mobil yang disimpan di favorit Anda.</p>
          </div>
        `;
      } else {
        savedCars.forEach(car => {
          const item = document.createElement('div');
          item.style = 'display:flex; align-items:center; gap:0.85rem; padding:0.75rem; background:var(--bg-surface-elevated); border:1px solid var(--border-default); border-radius:var(--r-sm); margin-bottom:0.6rem;';
          item.innerHTML = `
            <img src="${car.foto}" alt="${car.nama}" style="width:65px; height:45px; object-fit:cover; border-radius:4px;">
            <div style="flex:1;">
              <div style="font-size:0.75rem; color:var(--accent-blue-text); font-weight:700;">${car.brand}</div>
              <div style="font-size:0.92rem; font-weight:700; color:var(--text-main);">${car.nama}</div>
              <div style="font-size:0.85rem; font-weight:700; color:#10b981;">${formatRupiah(car.harga)}</div>
            </div>
            <button class="btn-remove-fav" style="color:#ef4444; padding:0.4rem;" title="Hapus">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          `;
          item.querySelector('.btn-remove-fav').addEventListener('click', () => {
            this.toggleWishlist(car, null);
            this.openWishlistModal();
            this.render();
          });
          list.appendChild(item);
        });
      }
    }

    this.wishlistModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modal) {
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('active');
      modal.classList.remove('closing');
      document.body.style.overflow = '';
    }, 180);
  }

  /* ---------------- Event Listeners ---------------- */
  bindEvents() {
    this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
    this.wishlistBtn?.addEventListener('click', () => this.openWishlistModal());

    // Compare bar actions
    this.compareLaunchBtn?.addEventListener('click', () => this.openCompareModal());
    this.compareClearBtn?.addEventListener('click', () => this.clearCompare());

    // Mobile nav
    this.mobileMenuBtn?.addEventListener('click', () => {
      this.navMenu?.classList.toggle('open');
    });

    this.navMenu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => this.navMenu?.classList.remove('open'));
    });

    // Search input
    this.searchInput?.addEventListener('input', (e) => {
      this.filterState.keyword = e.target.value;
      this.searchClearBtn?.classList.toggle('visible', e.target.value.length > 0);
      this.render();
    });

    this.searchClearBtn?.addEventListener('click', () => {
      if (this.searchInput) this.searchInput.value = '';
      this.filterState.keyword = '';
      this.searchClearBtn?.classList.remove('visible');
      this.render();
      this.searchInput?.focus();
    });

    // Fuel Chips
    this.fuelChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.fuelChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.filterState.fuel = chip.dataset.fuel;
        this.render();
      });
    });

    // Dropdowns
    this.sortSelect?.addEventListener('change', (e) => {
      this.filterState.sort = e.target.value;
      this.render();
    });

    this.brandSelect?.addEventListener('change', (e) => {
      this.filterState.brand = e.target.value;
      this.render();
    });

    this.transSelect?.addEventListener('change', (e) => {
      this.filterState.transmission = e.target.value;
      this.render();
    });

    this.statusSelect?.addEventListener('change', (e) => {
      this.filterState.status = e.target.value;
      this.render();
    });

    this.resetBtn?.addEventListener('click', () => this.resetFilters());

    // Modal Close
    document.querySelectorAll('.modal-layer').forEach(modal => {
      modal.querySelector('.modal-btn-x')?.addEventListener('click', () => this.closeModal(modal));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-layer.active').forEach(m => this.closeModal(m));
      }
    });

    // Booking test drive form
    const bookingForm = document.getElementById('testDriveForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetCar = document.getElementById('bookingCarTarget')?.value || 'Mobil';
        const name = document.getElementById('bookingCustName')?.value || 'Pelanggan';
        const phone = document.getElementById('bookingCustPhone')?.value || '';
        const date = document.getElementById('bookingCustDate')?.value || '';

        this.closeModal(this.carModal);
        showToast(
          'Jadwal Test Drive Terkirim',
          `Terima kasih Kak ${name}. Tim showroom akan segera menghubungi nomor ${phone} untuk konfirmasi test drive ${targetCar} pada ${date}.`,
          'success'
        );
        bookingForm.reset();
      });
    }

    // Set minimum booking date to tomorrow
    const dateInput = document.getElementById('bookingCustDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const str = tomorrow.toISOString().split('T')[0];
      dateInput.min = str;
      dateInput.value = str;
    }

    // Sticky nav scroll shadow
    window.addEventListener('scroll', () => {
      document.querySelector('.site-nav')?.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VeloceApp();
});
