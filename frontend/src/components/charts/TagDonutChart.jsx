// ============================================================
// COMMIT 27 — Phase 2: Core Logic — src/components/charts/TagDonutChart.jsx
// ============================================================
// COMMIT 28 — Phase 3: Polish — src/components/charts/TagDonutChart.jsx
// ============================================================

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const PALETTE = [
  '#3b82f6','#8b5cf6','#06b6d4','#10b981',
  '#f59e0b','#ef4444','#ec4899','#6366f1',
]

export default function TagDonutChart({ tagCounts = {} }) {
  const entries = Object.entries(tagCounts).sort((a,b) => b[1]-a[1]).slice(0, 8)
  const labels  = entries.map(([k]) => k)
  const values  = entries.map(([,v]) => v)

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: PALETTE,
      borderColor:     '#111827',
      borderWidth:     3,
      hoverOffset:     6,
    }],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color:    '#9ca3af',
          padding:  12,
          boxWidth: 12,
          font:     { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor:      '#f9fafb',
        bodyColor:       '#9ca3af',
        borderColor:     '#374151',
        borderWidth:     1,
        padding:         10,
        callbacks: {
          label: ctx => ` ${ctx.parsed} problems`,
        },
      },
    },
  }

  if (entries.length === 0) {
    return (
      <div className="card h-72 flex items-center justify-center text-gray-600 text-sm">
        No tag data yet
      </div>
    )
  }

  return (
    <div className="card h-72">
      <h3 className="text-gray-300 font-semibold mb-4">Problems by Tag</h3>
      <div className="h-52">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  )
}
