// ============================================================
// COMMIT 29 — Phase 2: Core Logic — src/components/charts/ActivityLineChart.jsx
// ============================================================
// COMMIT 30 — Phase 3: Polish — src/components/charts/ActivityLineChart.jsx
// ============================================================

import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Filler, Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip)

export default function ActivityLineChart({ weeklyData = [] }) {
  // weeklyData: [{ date: '2025-03-01', count: 3 }, ...]
  const labels = weeklyData.map(d => {
    const dt = new Date(d.date)
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })
  const values = weeklyData.map(d => d.count)

  const data = {
    labels,
    datasets: [{
      label: 'Problems Solved',
      data:  values,
      fill:  true,
      tension: 0.4,
      borderColor:     '#3b82f6',
      pointBackgroundColor: '#3b82f6',
      pointBorderColor:     '#1e3a8a',
      pointRadius: 4,
      backgroundColor: (ctx) => {
        const canvas = ctx.chart.ctx
        const grad   = canvas.createLinearGradient(0, 0, 0, 180)
        grad.addColorStop(0,   'rgba(59,130,246,0.35)')
        grad.addColorStop(1,   'rgba(59,130,246,0)')
        return grad
      },
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor:      '#f9fafb',
        bodyColor:       '#9ca3af',
        borderColor:     '#374151',
        borderWidth:     1,
        padding:         10,
        callbacks: {
          label: ctx => ` ${ctx.parsed.y} solved`,
        },
      },
    },
    scales: {
      x: {
        grid:   { display: false },
        ticks:  { color: '#6b7280', maxRotation: 0, font: { size: 11 } },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid:   { color: 'rgba(255,255,255,0.04)' },
        ticks:  { color: '#6b7280', stepSize: 1 },
        border: { display: false },
      },
    },
  }

  return (
    <div className="card h-72">
      <h3 className="text-gray-300 font-semibold mb-4">Daily Activity (Last 30 Days)</h3>
      <div className="h-52">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
