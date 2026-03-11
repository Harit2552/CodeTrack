// ============================================================
// COMMIT 9 — Phase 1: Skeleton — src/api/axiosInstance.js
// ============================================================
// Basic axios create with baseURL
// ============================================================
// COMMIT 10 — Phase 2: Core Logic — src/api/axiosInstance.js
// ============================================================
// Request interceptor to attach JWT; Response interceptor for 401
// ============================================================
// COMMIT 11 — Phase 3: Polish — src/api/axiosInstance.js
// ============================================================
// Retry logic, error normalisation

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor: attach JWT ──────────────────────
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ct_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor: handle 401 ─────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale credentials and bounce to login
      localStorage.removeItem('ct_token')
      localStorage.removeItem('ct_user')
      // Only redirect if not already on an auth page
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
