/**
 * ==========================================================================
 * VELOCE AUTO - FILTER & SORT MODULE
 * Pure JavaScript logic for multi-criteria search, filtering, and sorting
 * ==========================================================================
 */

export const initialFilterState = {
  keyword: '',
  fuel: 'all',
  brand: 'all',
  transmission: 'all',
  status: 'all',
  sort: 'recommended'
};

/**
 * Filter and sort car list based on current active criteria
 * @param {Array} cars
 * @param {Object} state
 * @returns {Array} filtered and sorted cars
 */
export function filterAndSortCars(cars, state) {
  if (!Array.isArray(cars)) return [];

  let result = [...cars];

  // 1. Keyword search (car name or brand)
  if (state.keyword && state.keyword.trim() !== '') {
    const q = state.keyword.trim().toLowerCase();
    result = result.filter(car => 
      car.nama.toLowerCase().includes(q) || 
      car.brand.toLowerCase().includes(q)
    );
  }

  // 2. Fuel filter
  if (state.fuel && state.fuel !== 'all') {
    result = result.filter(car => car.bahan_bakar.toLowerCase() === state.fuel.toLowerCase());
  }

  // 3. Brand filter
  if (state.brand && state.brand !== 'all') {
    result = result.filter(car => car.brand.toLowerCase() === state.brand.toLowerCase());
  }

  // 4. Transmission filter
  if (state.transmission && state.transmission !== 'all') {
    result = result.filter(car => car.transmisi.toLowerCase() === state.transmission.toLowerCase());
  }

  // 5. Status filter
  if (state.status && state.status !== 'all') {
    result = result.filter(car => car.status.toLowerCase() === state.status.toLowerCase());
  }

  // 6. Sorting
  switch (state.sort) {
    case 'price-low':
      result.sort((a, b) => a.harga - b.harga);
      break;
    case 'price-high':
      result.sort((a, b) => b.harga - a.harga);
      break;
    case 'year-new':
      result.sort((a, b) => b.tahun - a.tahun);
      break;
    case 'name-az':
      result.sort((a, b) => a.nama.localeCompare(b.nama));
      break;
    case 'recommended':
    default:
      // Show available cars first, then higher year
      result.sort((a, b) => {
        if (a.status === 'tersedia' && b.status !== 'tersedia') return -1;
        if (a.status !== 'tersedia' && b.status === 'tersedia') return 1;
        return b.tahun - a.tahun;
      });
      break;
  }

  return result;
}

/**
 * Calculate dynamic counts for badges and statistics
 * @param {Array} cars
 * @returns {Object}
 */
export function getCarStatistics(cars) {
  if (!Array.isArray(cars)) return {};

  const total = cars.length;
  const available = cars.filter(c => c.status.toLowerCase() === 'tersedia').length;
  const sold = total - available;
  const uniqueBrands = new Set(cars.map(c => c.brand)).size;

  const fuelCounts = {
    all: total,
    bensin: cars.filter(c => c.bahan_bakar.toLowerCase() === 'bensin').length,
    diesel: cars.filter(c => c.bahan_bakar.toLowerCase() === 'diesel').length,
    hybrid: cars.filter(c => c.bahan_bakar.toLowerCase() === 'hybrid').length,
    listrik: cars.filter(c => c.bahan_bakar.toLowerCase() === 'listrik').length,
  };

  return {
    total,
    available,
    sold,
    uniqueBrands,
    fuelCounts
  };
}
