/**
 * ==========================================================================
 * VELOCE AUTO - MAIN APPLICATION ORCHESTRATOR
 * Vanilla JS App Controller
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
    this.fuelPills = document.querySelectorAll('.filter-pill');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.menuToggleBtn = document.getElementById('menuToggleBtn');
    this.navMenu = document.getElementById('navMenu');
    this.wishlistBtn = document.getElementById('wishlistBtn');
    this.wishlistBadge = document.getElementById('wishlistCount');

    // Modals
    this.carModal = document.getElementById('carDetailModal');
    this.wishlistModal = document.getElementById('wishlistModal');

    this.init();
  }

  async init() {
    this.initTheme();
    this.loadWishlist();
    this.bindEvents();
    await this.fetchAndRenderCars();
  }

  /* ---------------- Theme & Storage ---------------- */
  initTheme() {
    const savedTheme = localStorage.getItem('veloce_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('veloce_theme', nextTheme);
    this.updateThemeIcon(nextTheme);
    showToast('Tema Diubah', `Tampilan beralih ke mode ${nextTheme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'}`, 'info');
  }

  updateThemeIcon(theme) {
    if (!this.themeToggleBtn) return;
    const isDark = theme === 'dark';
    this.themeToggleBtn.innerHTML = isDark ? `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    this.themeToggleBtn.setAttribute('title', isDark ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap');
  }

  loadWishlist() {
    try {
      const stored = localStorage.getItem('veloce_wishlist');
      if (stored) {
        this.wishlist = new Set(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read wishlist from localStorage', e);
    }
    this.updateWishlistBadge();
  }

  saveWishlist() {
    try {
      localStorage.setItem('veloce_wishlist', JSON.stringify([...this.wishlist]));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
    this.updateWishlistBadge();
  }

  updateWishlistBadge() {
    if (this.wishlistBadge) {
      const count = this.wishlist.size;
      this.wishlistBadge.textContent = count;
      this.wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  toggleWishlistCar(car, btnElement) {
    const isSaved = this.wishlist.has(car.id);
    if (isSaved) {
      this.wishlist.delete(car.id);
      if (btnElement) {
        btnElement.classList.remove('active');
        btnElement.querySelector('svg').setAttribute('fill', 'none');
      }
      showToast('Dihapus dari Garasi', `${car.nama} dihapus dari daftar favorit.`, 'info');
    } else {
      this.wishlist.add(car.id);
      if (btnElement) {
        btnElement.classList.add('active');
        btnElement.classList.add('heart-pop');
        btnElement.querySelector('svg').setAttribute('fill', '#ef4444');
        setTimeout(() => btnElement.classList.remove('heart-pop'), 450);
      }
      showToast('Disimpan ke Garasi Favorit!', `${car.nama} berhasil ditambahkan ke garasi impian Anda.`, 'success');
    }
    this.saveWishlist();
  }

  /* ---------------- Data Fetching ---------------- */
  async fetchAndRenderCars() {
    renderSkeletons(this.carsGrid, 6);

    try {
      const response = await getCars();
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Format data tidak sesuai.');
      }

      this.allCars = response.data;

      // Update brand dropdown
      this.populateBrandDropdown();

      // Update statistics
      this.updateStatisticsDisplay();

      // Setup Calculator
      initCalculator(this.allCars);

      // Render car catalog
      this.applyFilterAndRender();

      // Show welcome toast
      setTimeout(() => {
        showToast('Koneksi API Berhasil', `Berhasil memuat ${this.allCars.length} koleksi mobil resmi BTNG.`, 'success');
      }, 600);

    } catch (error) {
      console.error('Fetch error:', error);
      renderErrorState(this.carsGrid, error.message, () => this.fetchAndRenderCars());
    }
  }

  populateBrandDropdown() {
    if (!this.brandSelect) return;
    const brands = [...new Set(this.allCars.map(c => c.brand))].sort();
    
    // Keep first option "Semua Brand"
    this.brandSelect.innerHTML = '<option value="all">Semua Brand</option>';
    brands.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      this.brandSelect.appendChild(opt);
    });
  }

  updateStatisticsDisplay() {
    const stats = getCarStatistics(this.allCars);

    const totalEl = document.getElementById('heroStatTotal');
    const availEl = document.getElementById('heroStatAvail');
    const brandsEl = document.getElementById('heroStatBrands');

    if (totalEl) totalEl.textContent = stats.total;
    if (availEl) availEl.textContent = stats.available;
    if (brandsEl) brandsEl.textContent = `${stats.uniqueBrands}+`;

    // Update fuel pill badges
    const pillAll = document.querySelector('[data-fuel="all"] .pill-count');
    const pillBensin = document.querySelector('[data-fuel="bensin"] .pill-count');
    const pillDiesel = document.querySelector('[data-fuel="diesel"] .pill-count');
    const pillHybrid = document.querySelector('[data-fuel="hybrid"] .pill-count');
    const pillListrik = document.querySelector('[data-fuel="listrik"] .pill-count');

    if (pillAll) pillAll.textContent = stats.total;
    if (pillBensin) pillBensin.textContent = stats.fuelCounts.bensin;
    if (pillDiesel) pillDiesel.textContent = stats.fuelCounts.diesel;
    if (pillHybrid) pillHybrid.textContent = stats.fuelCounts.hybrid;
    if (pillListrik) pillListrik.textContent = stats.fuelCounts.listrik;
  }

  /* ---------------- Filtering & Render ---------------- */
  applyFilterAndRender() {
    const filtered = filterAndSortCars(this.allCars, this.filterState);

    // Update result count display
    if (this.resultsCountEl) {
      this.resultsCountEl.innerHTML = `Menampilkan <strong>${filtered.length}</strong> dari <strong>${this.allCars.length}</strong> mobil`;
    }

    if (filtered.length === 0) {
      renderEmptyState(this.carsGrid, () => this.resetFilters());
      return;
    }

    renderCars(this.carsGrid, filtered, {
      onDetailClick: (car) => this.openCarModal(car),
      onTestDriveClick: (car) => this.openCarModal(car, true),
      onWishlistToggle: (car, btn) => this.toggleWishlistCar(car, btn),
      isWishlisted: (id) => this.wishlist.has(id)
    });
  }

  resetFilters() {
    this.filterState = { ...initialFilterState };

    if (this.searchInput) {
      this.searchInput.value = '';
      if (this.searchClearBtn) this.searchClearBtn.classList.remove('visible');
    }

    if (this.sortSelect) this.sortSelect.value = 'recommended';
    if (this.brandSelect) this.brandSelect.value = 'all';
    if (this.transSelect) this.transSelect.value = 'all';
    if (this.statusSelect) this.statusSelect.value = 'all';

    this.fuelPills.forEach(pill => {
      pill.classList.toggle('active', pill.dataset.fuel === 'all');
    });

    this.applyFilterAndRender();
    showToast('Filter Direset', 'Semua kriteria filter telah dikembalikan ke awal.', 'info');
  }

  /* ---------------- Modal Handlers ---------------- */
  openCarModal(car, scrollToBooking = false) {
    if (!this.carModal) return;

    const imgEl = this.carModal.querySelector('#modalCarImg');
    const titleEl = this.carModal.querySelector('#modalCarTitle');
    const brandEl = this.carModal.querySelector('#modalCarBrand');
    const yearEl = this.carModal.querySelector('#modalCarYear');
    const fuelEl = this.carModal.querySelector('#modalCarFuel');
    const transEl = this.carModal.querySelector('#modalCarTrans');
    const priceEl = this.carModal.querySelector('#modalCarPrice');
    const statusBadge = this.carModal.querySelector('#modalCarStatus');
    const bookCarInput = this.carModal.querySelector('#bookingCarName');

    if (imgEl) imgEl.src = car.foto;
    if (titleEl) titleEl.textContent = car.nama;
    if (brandEl) brandEl.textContent = car.brand;
    if (yearEl) yearEl.textContent = car.tahun;
    if (fuelEl) fuelEl.textContent = car.bahan_bakar;
    if (transEl) transEl.textContent = car.transmisi;
    if (priceEl) priceEl.textContent = formatRupiah(car.harga);

    const isAvailable = car.status.toLowerCase() === 'tersedia';
    if (statusBadge) {
      statusBadge.className = `status-badge ${isAvailable ? 'tersedia' : 'sold'}`;
      statusBadge.innerHTML = `<span class="status-dot"></span>${isAvailable ? 'Unit Tersedia' : 'Sudah Terjual'}`;
    }

    if (bookCarInput) {
      bookCarInput.value = `${car.brand} ${car.nama} (${car.tahun})`;
    }

    // Modal quick simulation calculation
    const modalMonthly = this.carModal.querySelector('#modalCalcMonthly');
    if (modalMonthly) {
      const sim = calculateLoan(car.harga, 20, 36);
      modalMonthly.textContent = formatRupiah(sim.monthlyInstallment) + ' / bln (DP 20%)';
    }

    // Open modal animation
    this.carModal.classList.remove('closing');
    this.carModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (scrollToBooking) {
      setTimeout(() => {
        const form = this.carModal.querySelector('#modalBookingForm');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }

  closeModal(modal) {
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('active');
      modal.classList.remove('closing');
      document.body.style.overflow = '';
    }, 250);
  }

  openWishlistModal() {
    if (!this.wishlistModal) return;

    const listContainer = this.wishlistModal.querySelector('#wishlistItemsList');
    if (listContainer) {
      listContainer.innerHTML = '';

      const savedCars = this.allCars.filter(c => this.wishlist.has(c.id));

      if (savedCars.length === 0) {
        listContainer.innerHTML = `
          <div style="text-align:center; padding:3rem 1rem;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" style="margin-bottom:1rem;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <h4 style="font-size:1.1rem; color:var(--text-heading); margin-bottom:0.5rem;">Garasi Favorit Anda Masih Kosong</h4>
            <p style="font-size:0.9rem; color:var(--text-secondary);">Klik ikon hati pada mobil yang Anda minati untuk menyimpannya di sini.</p>
          </div>
        `;
      } else {
        savedCars.forEach(car => {
          const item = document.createElement('div');
          item.className = 'wishlist-card-item';
          item.style = 'display:flex; align-items:center; gap:1rem; padding:1rem; background:var(--bg-tertiary); border:1px solid var(--border-light); border-radius:var(--radius-sm); margin-bottom:0.75rem;';
          item.innerHTML = `
            <img src="${car.foto}" alt="${car.nama}" style="width:75px; height:50px; object-fit:cover; border-radius:6px; flex-shrink:0;">
            <div style="flex:1;">
              <div style="font-size:0.75rem; color:#38bdf8; font-weight:700;">${car.brand}</div>
              <div style="font-size:0.95rem; font-weight:700; color:var(--text-heading);">${car.nama}</div>
              <div style="font-size:0.9rem; font-weight:700; color:#34d399;">${formatRupiah(car.harga)}</div>
            </div>
            <button class="btn-remove-wishlist" style="color:#ef4444; padding:0.5rem; border-radius:6px;" title="Hapus dari favorit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          `;

          item.querySelector('.btn-remove-wishlist').addEventListener('click', () => {
            this.toggleWishlistCar(car, null);
            this.openWishlistModal(); // Re-render list
            this.applyFilterAndRender(); // Re-sync cards in grid
          });

          listContainer.appendChild(item);
        });
      }
    }

    this.wishlistModal.classList.remove('closing');
    this.wishlistModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ---------------- Event Listeners ---------------- */
  bindEvents() {
    // Theme toggle
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Wishlist open
    if (this.wishlistBtn) {
      this.wishlistBtn.addEventListener('click', () => this.openWishlistModal());
    }

    // Mobile Menu toggle
    if (this.menuToggleBtn && this.navMenu) {
      this.menuToggleBtn.addEventListener('click', () => {
        this.navMenu.classList.toggle('open');
      });

      // Close menu on nav link click
      this.navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.navMenu.classList.remove('open');
        });
      });
    }

    // Search input
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.filterState.keyword = e.target.value;
        if (this.searchClearBtn) {
          this.searchClearBtn.classList.toggle('visible', e.target.value.length > 0);
        }
        this.applyFilterAndRender();
      });
    }

    // Search clear button
    if (this.searchClearBtn) {
      this.searchClearBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.filterState.keyword = '';
        this.searchClearBtn.classList.remove('visible');
        this.applyFilterAndRender();
        this.searchInput.focus();
      });
    }

    // Fuel filter pills
    this.fuelPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.fuelPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.filterState.fuel = pill.dataset.fuel;
        this.applyFilterAndRender();
      });
    });

    // Secondary Dropdowns
    if (this.sortSelect) {
      this.sortSelect.addEventListener('change', (e) => {
        this.filterState.sort = e.target.value;
        this.applyFilterAndRender();
      });
    }

    if (this.brandSelect) {
      this.brandSelect.addEventListener('change', (e) => {
        this.filterState.brand = e.target.value;
        this.applyFilterAndRender();
      });
    }

    if (this.transSelect) {
      this.transSelect.addEventListener('change', (e) => {
        this.filterState.transmission = e.target.value;
        this.applyFilterAndRender();
      });
    }

    if (this.statusSelect) {
      this.statusSelect.addEventListener('change', (e) => {
        this.filterState.status = e.target.value;
        this.applyFilterAndRender();
      });
    }

    // Reset button
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Modal Close Buttons & Backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeModal(modal));
      }
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.active').forEach(modal => this.closeModal(modal));
      }
    });

    // Test drive booking form submit
    const bookingForm = document.getElementById('modalBookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const carName = document.getElementById('bookingCarName').value;
        const custName = document.getElementById('bookingName').value;
        const custWa = document.getElementById('bookingPhone').value;
        const custDate = document.getElementById('bookingDate').value;

        this.closeModal(this.carModal);
        showToast(
          'Permintaan Test Drive Terkirim!',
          `Terima kasih Kak ${custName}, tim konsultan Veloce Auto akan segera menghubungi Anda di ${custWa} untuk jadwal ${custDate}.`,
          'success'
        );
        bookingForm.reset();
      });
    }

    // Newsletter form submit
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        showToast('Berhasil Berlangganan', `Alamat ${email} telah terdaftar untuk menerima katalog promo mingguan Veloce Auto!`, 'success');
        newsletterForm.reset();
      });
    }

    // Setup minimum date for test drive booking (minimum tomorrow)
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      bookingDateInput.min = dateStr;
      bookingDateInput.value = dateStr;
    }

    // Scroll Navbar Effect & Scroll Spy for Active Nav Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.toggle('scrolled', scrollY > 30);
      }

      // Scroll Spy
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { passive: true });
  }
}

// Start app once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new VeloceApp();
});
