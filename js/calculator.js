/**
 * ==========================================================================
 * VELOCE AUTO - CREDIT CALCULATOR MODULE (Ref 7 - Financial Analytics)
 * Real-time auto loan simulation mathematics, market comparison slider,
 * and dynamic DOM updates.
 * ==========================================================================
 */

import { formatRupiah } from './dom.js';

// Annual flat interest rate approximations
const ANNUAL_INTEREST_RATE = 0.055; // 5.5% per annum

/**
 * Calculate loan breakdown
 * @param {number} carPrice 
 * @param {number} dpPercent (e.g. 20)
 * @param {number} tenorMonths (e.g. 36)
 * @returns {Object}
 */
export function calculateLoan(carPrice, dpPercent, tenorMonths) {
  if (!carPrice || carPrice <= 0) {
    return {
      monthlyInstallment: 0,
      dpAmount: 0,
      loanPrincipal: 0,
      totalInterest: 0,
      totalPayment: 0
    };
  }

  const dpAmount = Math.round(carPrice * (dpPercent / 100));
  const loanPrincipal = carPrice - dpAmount;
  const years = tenorMonths / 12;
  const totalInterest = Math.round(loanPrincipal * ANNUAL_INTEREST_RATE * years);
  const totalLoanWithInterest = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoanWithInterest / tenorMonths);
  const totalPayment = dpAmount + totalLoanWithInterest;

  return {
    carPrice,
    dpPercent,
    tenorMonths,
    dpAmount,
    loanPrincipal,
    totalInterest,
    monthlyInstallment,
    totalPayment
  };
}

/**
 * Attach live calculation listeners to calculator section
 * @param {Array} cars - list of available cars to populate select
 */
export function initCalculator(cars) {
  const carSelect = document.getElementById('calcCarSelect');
  const dpRange = document.getElementById('calcDpRange');
  const dpValue = document.getElementById('calcDpValue');
  const tenorContainer = document.getElementById('calcTenorPills');
  
  const displayMonthly = document.getElementById('calcResultMonthly');
  const displayDp = document.getElementById('calcResultDp');
  const displayPrincipal = document.getElementById('calcResultPrincipal');
  const displayTotal = document.getElementById('calcResultTotal');

  // Ref 7: Market Comparison & Pin Indicator elements
  const youPin = document.getElementById('calcYouPin');
  const tierBadge = document.getElementById('calcTierBadge');

  if (!carSelect || !dpRange) return;

  // Populate car select if empty
  if (cars && cars.length > 0 && carSelect.options.length <= 1) {
    carSelect.innerHTML = '';
    cars.forEach(car => {
      const option = document.createElement('option');
      option.value = car.harga;
      option.textContent = `${car.brand} - ${car.nama} (${formatRupiah(car.harga)})`;
      carSelect.appendChild(option);
    });
  }

  let selectedTenor = 36; // Default 3 years

  function update() {
    const price = parseFloat(carSelect.value) || 0;
    const dp = parseInt(dpRange.value, 10) || 20;
    
    if (dpValue) dpValue.textContent = `${dp}%`;

    const result = calculateLoan(price, dp, selectedTenor);

    if (displayMonthly) {
      displayMonthly.innerHTML = `${formatRupiah(result.monthlyInstallment)} <span class="rate-sub">/ bln</span>`;
    }
    if (displayDp) displayDp.textContent = `${formatRupiah(result.dpAmount)} (${dp}%)`;
    if (displayPrincipal) displayPrincipal.textContent = formatRupiah(result.loanPrincipal);
    if (displayTotal) displayTotal.textContent = formatRupiah(result.totalPayment);

    // Update Interactive Market Comparison Pin ("YOU") (Ref 7)
    // Scale from 15% (min) to 60% (max) -> 0% to 100% position
    const minDp = 15;
    const maxDp = 60;
    const clampedDp = Math.min(Math.max(dp, minDp), maxDp);
    const pinPosPercent = Math.round(((clampedDp - minDp) / (maxDp - minDp)) * 100);

    if (youPin) {
      youPin.style.left = `${pinPosPercent}%`;
    }

    if (tierBadge) {
      if (dp <= 20) {
        tierBadge.textContent = 'DP Ringan (Tier Reguler)';
        tierBadge.style.color = 'var(--text-muted)';
      } else if (dp <= 35) {
        tierBadge.textContent = 'Rekomendasi (Tier Prioritas A)';
        tierBadge.style.color = 'var(--accent-cognac)';
      } else {
        tierBadge.textContent = 'Bunga Super Hemat (Tier Platinum)';
        tierBadge.style.color = 'var(--status-available-text)';
      }
    }
  }

  // Event Listeners
  carSelect.addEventListener('change', update);
  dpRange.addEventListener('input', update);

  if (tenorContainer) {
    const buttons = tenorContainer.querySelectorAll('.tenor-choice-btn, .tenor-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTenor = parseInt(btn.dataset.tenor, 10);
        update();
      });
    });
  }

  // Initial trigger
  update();
}
