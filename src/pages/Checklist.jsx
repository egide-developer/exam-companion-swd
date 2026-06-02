import { useState, useCallback } from 'react'
import { useChecklist } from '../context/ChecklistContext.jsx'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'

export default function Checklist() {
  const { sections, checklist, toggleItem, updateNote, stats } = useChecklist()
  const [expanded, setExpanded] = useState(sections.map(() => true))
  const [expandedNotes, setExpandedNotes] = useState({})
  const [animatingId, setAnimatingId] = useState(null)

  const toggleSection = (i) => {
    setExpanded((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  const handleToggle = useCallback((sectionId, itemId) => {
    setAnimatingId(itemId)
    setTimeout(() => {
      toggleItem(sectionId, itemId)
      setAnimatingId(null)
    }, 300)
  }, [toggleItem])

  const sectionState = (id) => stats.find((s) => s.id === id)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assessment Checklist</h1>
        <p className="mt-1 text-sm text-gray-500">
          Check off each item as you complete it. Add notes for things to remember during presentation.
        </p>
      </div>

      {sections.map((section, si) => {
        const state = sectionState(section.id)
        const sectionData = checklist.find((s) => s.id === section.id)

        return (
          <div key={section.id} className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection(si)}
              className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-gray-50 rounded-t-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                {expanded[si] ? <ChevronDown className="h-5 w-5 text-gray-400" /> : <ChevronRight className="h-5 w-5 text-gray-400" />}
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
                  <p className="text-xs text-gray-500">
                    Weight: {section.weight} &middot; Max Score: {section.maxScore} &middot; {state?.checkedCount}/{section.indicators.length} items
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${state?.percentage >= 80 ? 'text-green-600' : state?.percentage >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                  {state?.earnedScore}/{section.maxScore}
                </span>
                <div className="h-2 w-20 rounded-full bg-gray-100">
                  <div
                    className={`h-2 rounded-full ${state?.percentage >= 80 ? 'bg-green-500' : state?.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${state?.percentage || 0}%` }}
                  />
                </div>
              </div>
            </button>

            {expanded[si] && (
              <div className="border-t border-gray-100 px-6 py-3">
                <div className="space-y-1.5">
                  {section.indicators.map((ind, ii) => {
                    const item = sectionData?.items[ii]
                    const isAnimating = animatingId === ind.id
                    return (
                      <div key={ind.id} className="space-y-1">
                        <div
                          onClick={() => !isAnimating && handleToggle(section.id, ind.id)}
                          className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm transition-all duration-300 select-none cursor-pointer overflow-hidden ${
                            item?.checked
                              ? 'border-emerald-200 bg-emerald-50/60'
                              : 'border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/40'
                          } ${isAnimating ? 'scale-[1.02]' : ''}`}
                        >
                          {isAnimating && (
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 animate-pulse" />
                          )}
                          <div className={`relative z-10 flex items-center gap-3 w-full transition-all duration-300 ${isAnimating ? 'scale-110' : ''}`}>
                            <div className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                              item?.checked
                                ? 'bg-emerald-400 text-white shadow-lg shadow-emerald-200'
                                : 'bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-500'
                            }`}>
                              {item?.checked ? (
                                <span className="text-[10px] font-bold animate-bounce-in">✓</span>
                              ) : (
                                <span className="text-xs">{ind.score}</span>
                              )}
                            </div>
                            <span
                              className={`flex-1 text-sm transition-all duration-300 ${
                                item?.checked
                                  ? 'text-emerald-700 line-through decoration-emerald-400 decoration-2'
                                  : 'text-gray-700'
                              } ${isAnimating ? 'tracking-wide' : ''}`}
                            >
                              {ind.text}
                            </span>
                            <span className="shrink-0 text-xs font-medium text-gray-400">
                              {ind.score} pt{ind.score > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="ml-2">
                          <button
                            type="button"
                            onClick={() => setExpandedNotes((prev) => ({ ...prev, [ind.id]: !prev[ind.id] }))}
                            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 cursor-pointer"
                          >
                            <FileText className="h-3 w-3" />
                            {item?.note ? 'Edit note' : 'Add note'}
                          </button>

                          {expandedNotes[ind.id] && (
                            <textarea
                              value={item?.note || ''}
                              onChange={(e) => updateNote(section.id, ind.id, e.target.value)}
                              placeholder="Write notes about this item (e.g., what to say during presentation)..."
                              className="mt-1 w-full rounded-md border border-gray-200 p-2 text-xs focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y min-h-[60px]"
                              rows={2}
                            />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
