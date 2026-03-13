// ============================================================
// COMMIT 22 — Phase 2: Core Logic — src/components/layout/Layout.jsx
// ============================================================

import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {children}
      </main>
    </div>
  )
}
