// ============================================================
// COMMIT 3 — Phase 1: Skeleton — src/App.jsx
// ============================================================
// import { Routes, Route } from 'react-router-dom'
//
// export default function App() {
//   return (
//     <Routes>
//       <Route path="/"             element={<div>Home</div>} />
//       <Route path="/login"        element={<div>Login</div>} />
//       <Route path="/register"     element={<div>Register</div>} />
//       <Route path="/dashboard"    element={<div>Dashboard</div>} />
//       <Route path="/problems"     element={<div>Problems</div>} />
//       <Route path="/add-problem"  element={<div>Add Problem</div>} />
//       <Route path="/profile"      element={<div>Profile</div>} />
//       <Route path="/badges"       element={<div>Badges</div>} />
//     </Routes>
//   )
// }
// ============================================================
// COMMIT 4 — Phase 2: Core Logic — src/App.jsx
// ============================================================
// Full routes wired to real page components (see below)
// ============================================================
// COMMIT 5 — Phase 3: ProtectedRoute + polish — src/App.jsx
// ============================================================

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// ── Page imports ──────────────────────────────────────────
import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/auth/LoginPage'
import RegisterPage   from './pages/auth/RegisterPage'
import DashboardPage  from './pages/DashboardPage'
import ProblemsPage   from './pages/ProblemsPage'
import AddProblemPage from './pages/AddProblemPage'
import ProfilePage    from './pages/ProfilePage'
import BadgesPage     from './pages/BadgesPage'
import NotFoundPage   from './pages/NotFoundPage'
import Layout         from './components/layout/Layout'

// ── ProtectedRoute ────────────────────────────────────────
/**
 * Wraps authenticated routes. If no JWT token is found in
 * localStorage, the user is redirected to /login.
 * Preserves the intended destination via React Router's
 * "state" so the user lands back after sign-in.
 */
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    // Prevent flash of redirect while auth state is resolving
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return token
    ? children
    : <Navigate to="/login" replace />
}

// ── App ───────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      {/* ── Public routes ── */}
      <Route path="/"         element={<LandingPage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ── Protected routes (wrapped in shared Layout) ── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <Layout>
              <ProblemsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-problem"
        element={
          <ProtectedRoute>
            <Layout>
              <AddProblemPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/badges"
        element={
          <ProtectedRoute>
            <Layout>
              <BadgesPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ── 404 catch-all ── */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
