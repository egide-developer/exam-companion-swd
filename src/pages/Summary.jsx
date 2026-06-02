import { Link } from 'react-router-dom'
import { useChecklist } from '../context/ChecklistContext.jsx'
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import Button from '../components/reusable/Button.jsx'

export default function Summary() {
  const { sections, checklist, stats, totalEarned, totalMax, totalPercentage } = useChecklist()

  const ready = totalPercentage >= 80

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Final Review Summary</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review your progress before submission
        </p>
      </div>

      <div className={`rounded-xl border-2 px-6 py-5 ${ready ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
        <div className="flex items-center gap-3">
          {ready ? (
            <CheckCircle className="h-8 w-8 shrink-0 text-green-600" />
          ) : (
            <AlertTriangle className="h-8 w-8 shrink-0 text-amber-600" />
          )}
          <div>
            <h2 className={`text-lg font-bold ${ready ? 'text-green-800' : 'text-amber-800'}`}>
              {ready ? 'Ready for Submission!' : 'Still Needs Work'}
            </h2>
            <p className={`text-sm ${ready ? 'text-green-700' : 'text-amber-700'}`}>
              {ready
                ? 'You have completed 80% or more of the checklist. You are well prepared.'
                : `You are at ${totalPercentage}%. Aim for at least 80% before submission.`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-500">{s.title.split('.')[0]}</p>
            <p className="mt-1 text-lg font-bold text-gray-900">{s.earnedScore}/{s.maxScore}</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
              <div
                className={`h-1.5 rounded-full ${
                  s.percentage >= 80 ? 'bg-green-500' : s.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${s.percentage}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-400">{s.percentage}% &middot; {s.weight}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-gray-900">Item-by-Item Breakdown</h2>
        </div>
        <div className="divide-y divide-gray-100 px-6">
          {sections.map((section) => {
            const sectionData = checklist.find((s) => s.id === section.id)
            return (
              <div key={section.id} className="py-4">
                <h3 className="text-sm font-medium text-gray-700">{section.title}</h3>
                <div className="mt-2 space-y-1">
                  {section.indicators.map((ind, ii) => {
                    const item = sectionData?.items[ii]
                    return (
                      <div key={ind.id} className="flex items-center gap-2 text-sm">
                        {item?.checked ? (
                          <CheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                        )}
                        <span className={item?.checked ? 'text-gray-500 line-through' : 'text-gray-700'}>
                          {ind.text}
                        </span>
                        <span className="ml-auto text-xs text-gray-400">+{ind.score}pt</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-700">Total Score</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalEarned}/{totalMax} <span className="text-base font-normal text-gray-500">({totalPercentage}%)</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/checklist">
            <Button variant="secondary">Back to Checklist</Button>
          </Link>
          <Link to="/dont-forget">
            <Button variant="primary">
              Review Don't Forget
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
