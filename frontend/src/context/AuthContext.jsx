// ============================================================
// COMMIT 6 — Phase 1: Skeleton — src/context/AuthContext.jsx
// ============================================================
// Basic context + provider scaffold
// ============================================================
// COMMIT 7 — Phase 2: Core Logic — src/context/AuthContext.jsx
// ============================================================
// Login / register / logout actions, JWT persistence
// ============================================================
// COMMIT 8 — Phase 3: Error Handling — src/context/AuthContext.jsx
// ============================================================
// Token expiry check on mount, clear stale state

import { createContext, useContext, useEffect, useReducer } from 'react'
import axiosInstance from '../api/axiosInstance'

// ── State shape ───────────────────────────────────────────
const initialState = {
  user:    JSON.parse(localStorage.getItem('ct_user'))   || null,
  token:   localStorage.getItem('ct_token')               || null,
  loading: false,
  error:   null,
}

// ── Reducer ───────────────────────────────────────────────
function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null }
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token, error: null }
    case 'AUTH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { user: null, token: null, loading: false, error: null }
    default:
      return state
  }
}

// ── Context ───────────────────────────────────────────────
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Persist token + user to localStorage whenever they change
  useEffect(() => {
    if (state.token) {
      localStorage.setItem('ct_token', state.token)
      localStorage.setItem('ct_user',  JSON.stringify(state.user))
    } else {
      localStorage.removeItem('ct_token')
      localStorage.removeItem('ct_user')
    }
  }, [state.token, state.user])

  // ── Actions ─────────────────────────────────────────────

  async function login(email, password) {
    dispatch({ type: 'AUTH_START' })
    try {
      const { data } = await axiosInstance.post('/auth/login', { email, password })
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: data.user, token: data.token } })
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please try again.'
      dispatch({ type: 'AUTH_ERROR', payload: msg })
      return { success: false, error: msg }
    }
  }

  async function register(name, email, password) {
    dispatch({ type: 'AUTH_START' })
    try {
      const { data } = await axiosInstance.post('/auth/register', { name, email, password })
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: data.user, token: data.token } })
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.'
      dispatch({ type: 'AUTH_ERROR', payload: msg })
      return { success: false, error: msg }
    }
  }

  function logout() {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user:    state.user,
        token:   state.token,
        loading: state.loading,
        error:   state.error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ── Custom hook ───────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export default AuthContext
