import { useState, useMemo, useCallback } from 'react'
import { useChecklist } from '../context/ChecklistContext.jsx'
import { AlertTriangle, CheckCircle, Code, Database, Layout, Lock, Shield, FileBarChart, Puzzle } from 'lucide-react'
import SearchInput from '../components/reusable/Search.jsx'

const categoryIcons = {
  Layout,
  Authentication: Lock,
  'Data Validation': Shield,
  Reports: FileBarChart,
  'Reusable Components': Puzzle,
  Architecture: Code,
}

const FILTERS = [
  { value: 'all', label: 'All Items' },
  { value: 'done', label: 'Done' },
  { value: 'pending', label: 'Pending' },
]

const SORT_OPTIONS = [
  { value: 'category', label: 'By Category' },
  { value: 'alpha', label: 'Alphabetical' },
]

export default function DontForget() {
  const { dontForgetState, toggleDontForgetItem } = useChecklist()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('category')
  const [animatingId, setAnimatingId] = useState(null)

  const handleToggle = useCallback((category, text, id) => {
    setAnimatingId(id)
    setTimeout(() => {
      toggleDontForgetItem(category, text)
      setAnimatingId(null)
    }, 300)
  }, [toggleDontForgetItem])

  const items = useMemo(() => {
    const flat = []
    for (const group of dontForgetState) {
      for (const item of group.items) {
        flat.push({ ...item, category: group.category })
      }
    }

    let result = flat

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((i) => i.text.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))
    }

    if (filter === 'done') result = result.filter((i) => i.checked)
    else if (filter === 'pending') result = result.filter((i) => !i.checked)

    if (sort === 'alpha') {
      result.sort((a, b) => a.text.localeCompare(b.text))
    } else {
      const catOrder = dontForgetState.map((g) => g.category)
      result.sort((a, b) => catOrder.indexOf(a.category) - catOrder.indexOf(b.category))
    }

    return result
  }, [dontForgetState, filter, search, sort])

  const totalItems = dontForgetState.reduce((s, g) => s + g.items.length, 0)
  const doneItems = dontForgetState.reduce((s, g) => s + g.items.filter((i) => i.checked).length, 0)
  const percentage = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0

  const categoryProgress = dontForgetState.map((group) => {
    const total = group.items.length
    const done = group.items.filter((i) => i.checked).length
    return { category: group.category, total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 }
  })

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
        <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" />
        <div className="flex-1">
          <h1 className="text-lg font-bold text-amber-800">Don't Forget These!</h1>
          <p className="text-sm text-amber-700">
            Critical items examiners check. Tick them off before submission.
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-amber-800">{doneItems}/{totalItems}</p>
          <p className="text-xs text-amber-600">{percentage}% done</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Search items..." className="min-w-[200px] flex-1" />
          <div className="flex gap-1 rounded-lg border border-gray-200 p-1">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  filter === f.value ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-lg border border-gray-200 p-1">
            {SORT_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSort(s.value)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  sort === s.value ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categoryProgress.map((cp) => (
            <div key={cp.category} className="flex items-center gap-2 rounded-md bg-gray-50 px-2.5 py-1.5 text-xs">
              <span className="text-gray-600 font-medium">{cp.category}</span>
              <span className="text-gray-400">
                {cp.done}/{cp.total}
              </span>
              <div className="h-1.5 w-12 rounded-full bg-gray-200">
                <div
                  className={`h-1.5 rounded-full ${cp.pct === 100 ? 'bg-green-500' : cp.pct > 0 ? 'bg-amber-400' : 'bg-gray-300'}`}
                  style={{ width: `${cp.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${percentage === 100 ? 'bg-green-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-gray-400">
          Showing {items.length} of {totalItems} items
        </p>
        {items.map((item, i) => {
          const Icon = categoryIcons[item.category] || CheckCircle
          const id = `${item.category}-${item.text}-${i}`
          const isAnimating = animatingId === id
          return (
            <div
              key={id}
              onClick={() => !isAnimating && handleToggle(item.category, item.text, id)}
              className={`group relative flex items-center gap-3 rounded-xl border px-4 py-3.5 shadow-sm transition-all duration-300 select-none cursor-pointer overflow-hidden ${
                item.checked
                  ? 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50'
                  : 'border-gray-100 bg-white hover:border-indigo-200 hover:shadow-md hover:bg-indigo-50/40'
              } ${isAnimating ? 'scale-[1.02]' : ''}`}
            >
              {isAnimating && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 animate-pulse" />
              )}
              <div className={`relative z-10 flex items-center gap-3 w-full transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                <div className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  item.checked
                    ? 'bg-emerald-400 text-white shadow-lg shadow-emerald-200'
                    : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-100 group-hover:text-indigo-500'
                }`}>
                  {item.checked ? (
                    <span className="text-xs font-bold animate-bounce-in">✓</span>
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span
                  className={`flex-1 text-sm transition-all duration-300 ${
                    item.checked
                      ? 'text-emerald-700 line-through decoration-emerald-400 decoration-2'
                      : 'text-gray-700 group-hover:text-indigo-700'
                  } ${isAnimating ? 'tracking-wide' : ''}`}
                >
                  {item.text}
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300 ${
                  item.checked
                    ? 'bg-emerald-100 text-emerald-700'
                    : item.category === 'Architecture' ? 'bg-purple-50 text-purple-700' :
                    item.category === 'Authentication' ? 'bg-blue-50 text-blue-700' :
                    item.category === 'Data Validation' ? 'bg-red-50 text-red-700' :
                    item.category === 'Reports' ? 'bg-green-50 text-green-700' :
                    item.category === 'Reusable Components' ? 'bg-orange-50 text-orange-700' :
                    'bg-gray-50 text-gray-600'
                }`}>
                  {item.category}
                </span>
              </div>
            </div>
          )
        })}
        {items.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            {filter === 'done' ? 'No completed items yet.' : filter === 'pending' ? 'All items are done!' : 'No items match your search.'}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <Database className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
          <div>
            <h2 className="font-semibold text-indigo-800">Universal Quick Checklist</h2>
            <ul className="mt-2 space-y-1 text-sm text-indigo-700">
              <li>&bull; Context API / global state management set up</li>
              <li>&bull; HTTP client instance with base URL + interceptors</li>
              <li>&bull; JWT / session tokens stored with requests</li>
              <li>&bull; Seed keyphrase / security question for password recovery</li>
              <li>&bull; Validations on every form input</li>
              <li>&bull; Duplicate data check before insert/update</li>
              <li>&bull; Search/filter on every data table page</li>
              <li>&bull; Reports (daily / monthly / annual) generated</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
