
import { useEffect, useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { problemsApi } from '../api/problemsApi'
import ProblemCard from '../components/ui/ProblemCard'
import Modal       from '../components/ui/Modal'
import toast       from 'react-hot-toast'
import {
  FiPlusCircle, FiSearch, FiFilter, FiX,
  FiAlertCircle, FiRefreshCw, FiInbox,
} from 'react-icons/fi'

const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard']
const STATUSES     = ['All', 'Solved', 'Attempted', 'Unsolved']
const PLATFORMS    = ['All', 'LeetCode', 'HackerRank', 'Codeforces', 'GeeksforGeeks', 'Other']

export default function ProblemsPage() {
  const [problems,      setProblems]      = useState([])
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)
  const [deleteTarget,  setDeleteTarget]  = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [search,     setSearch]     = useState('')
  const [difficulty, setDifficulty] = useState('All')
  const [status,     setStatus]     = useState('All')
  const [platform,   setPlatform]   = useState('All')
  const [tagFilter,  setTagFilter]  = useState('')
  const [sortBy,     setSortBy]     = useState('newest')

  const fetchProblems = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const { data } = await problemsApi.getAll()
      setProblems(data.problems || data || [])
    } catch {
      setError('Could not load problems. Please retry.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProblems() }, [fetchProblems])

  const filtered = useMemo(() => {
    let list = [...problems]

    if (search)     list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (difficulty !== 'All') list = list.filter(p => p.difficulty === difficulty)
    if (status     !== 'All') list = list.filter(p => p.status     === status)
    if (platform   !== 'All') list = list.filter(p => p.platform   === platform)
    if (tagFilter)  list = list.filter(p => (p.tags ?? []).some(t =>
      t.toLowerCase().includes(tagFilter.toLowerCase())))

    list.sort((a, b) => {
      if (sortBy === 'newest')  return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === 'oldest')  return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === 'title')   return a.title.localeCompare(b.title)
      return 0
    })
    return list
  }, [problems, search, difficulty, status, platform, tagFilter, sortBy])

  async function confirmDelete() {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await problemsApi.remove(deleteTarget._id)
      setProblems(prev => prev.filter(p => p._id !== deleteTarget._id))
      toast.success(`"${deleteTarget.title}" deleted`)
    } catch {
      toast.error('Delete failed. Please try again.')
    } finally {
      setDeleteLoading(false)
      setDeleteTarget(null)
    }
  }

  function handleStatusChange(id, newStatus) {
    setProblems(prev => prev.map(p => p._id === id ? { ...p, status: newStatus } : p))
  }

  const allTags = useMemo(() => {
    const s = new Set()
    problems.forEach(p => (p.tags ?? []).forEach(t => s.add(t)))
    return [...s].sort()
  }, [problems])

  const clearFilters = () => {
    setSearch(''); setDifficulty('All'); setStatus('All')
    setPlatform('All'); setTagFilter(''); setSortBy('newest')
  }

  const hasFilters = search || difficulty !== 'All' || status !== 'All'
                   || platform !== 'All' || tagFilter

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Problem List</h1>
          <p className="text-gray-400 mt-0.5 text-sm">
            {loading ? '...' : `${filtered.length} of ${problems.length} problems`}
          </p>
        </div>
        <Link to="/add-problem" className="btn-primary flex items-center gap-2 self-start sm:self-auto">
          <FiPlusCircle size={18} /> Add Problem
        </Link>
      </div>

      <div className="card space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search problemsâ€¦"
              className="input pl-10"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                <FiX size={15} />
              </button>
            )}
          </div>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input w-auto">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="title">A â†’ Z</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map(d => (
            <button key={d} onClick={() => setDifficulty(d)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                ${difficulty === d
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              {d}
            </button>
          ))}

          <div className="w-px bg-gray-700 mx-1" />

          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                ${status === s
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
              {s}
            </button>
          ))}

          {hasFilters && (
            <button onClick={clearFilters}
              className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-red-400 transition-colors">
              <FiX size={13} /> Clear all
            </button>
          )}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-gray-500 text-xs flex items-center gap-1 mr-1">
              <FiFilter size={11} /> Tags:
            </span>
            {allTags.slice(0, 20).map(tag => (
              <button key={tag} onClick={() => setTagFilter(tagFilter === tag ? '' : tag)}
                className={`badge cursor-pointer transition-all
                  ${tagFilter === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-3 text-red-400 card">
          <FiAlertCircle size={20} />
          <span>{error}</span>
          <button onClick={fetchProblems} className="ml-auto btn-secondary flex items-center gap-1 text-sm">
            <FiRefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-3">
          {[...Array(6)].map((_,i) => (
            <div key={i} className="card h-20 animate-pulse bg-gray-800" />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="card text-center py-16 text-gray-500">
          <FiInbox size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-lg font-medium text-gray-400">
            {hasFilters ? 'No problems match your filters.' : 'No problems yet.'}
          </p>
          {!hasFilters && (
            <Link to="/add-problem" className="text-primary-400 hover:text-primary-300 text-sm mt-2 block">
              Add your first problem â†’
            </Link>
          )}
          {hasFilters && (
            <button onClick={clearFilters} className="text-primary-400 text-sm mt-2 hover:text-primary-300">
              Clear filters
            </button>
          )}
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map(p => (
            <ProblemCard
              key={p._id}
              problem={p}
              onStatusChange={handleStatusChange}
              onDelete={() => setDeleteTarget(p)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Problem"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        confirmClass="bg-red-600 hover:bg-red-500 text-white"
        loading={deleteLoading}
      />
    </div>
  )
}
