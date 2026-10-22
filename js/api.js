/**
 * ==========================================================================
 * VELOCE AUTO - API SERVICE
 * Handles fetching vehicle data from the DNCC official BTNG endpoint
 * ==========================================================================
 */

const API_BASE_URL = 'https://api-web.dnccudinus.org/api/mobil';

/**
 * Fetch list of all cars from official API
 * @returns {Promise<{success: boolean, data: Array, message: string}>}
 */
export async function getCars() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari server (${response.status}: ${response.statusText})`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}
