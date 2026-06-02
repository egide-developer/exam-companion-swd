import { Link } from 'react-router-dom'
import { CheckSquare, Bell, FolderTree, FileText, TrendingUp } from 'lucide-react'
import { useChecklist } from '../context/ChecklistContext.jsx'
import StatCard from '../components/reusable/StatCard.jsx'
import Button from '../components/reusable/Button.jsx'

export default function Dashboard() {
  const { stats, totalEarned, totalMax, totalPercentage } = useChecklist()

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your progress across all assessment criteria
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={TrendingUp} label="Overall Progress" value={`${totalPercentage}%`} color="indigo" trend={0} trendLabel="of max score" />
        <StatCard icon={CheckSquare} label="Total Earned" value={`${totalEarned}/${totalMax}`} color="green" />
        <StatCard icon={FolderTree} label="Criteria" value={`${stats.filter((s) => s.percentage >= 100).length}/${stats.length}`} color="blue" trendLabel="completed" />
        <StatCard icon={Bell} label="Pending Items" value={stats.reduce((s, st) => s + (st.totalItems - st.checkedCount), 0)} color="amber" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Assessment Criteria Progress</h2>
        <div className="mt-6 space-y-5">
          {stats.map((s) => (
            <div key={s.id}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{s.title}</span>
                <span className="text-gray-500">
                  {s.earnedScore}/{s.maxScore} ({s.percentage}%) &middot; {s.weight}
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-gray-100">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    s.percentage >= 80 ? 'bg-green-500' : s.percentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${s.percentage}%` }}
                />
              </div>
              <p className="mt-0.5 text-xs text-gray-400">
                {s.checkedCount}/{s.totalItems} items checked
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-gray-700 font-medium">
              {totalEarned}/{totalMax} ({totalPercentage}%)
            </span>
          </div>
          <div className="mt-1.5 h-3 w-full rounded-full bg-gray-100">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                totalPercentage >= 80 ? 'bg-green-500' : totalPercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/checklist" className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
          <CheckSquare className="h-8 w-8 text-indigo-600" />
          <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-indigo-600">Checklist</h3>
          <p className="mt-1 text-sm text-gray-500">Full assessment criteria with marks</p>
        </Link>
        <Link to="/dont-forget" className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all">
          <Bell className="h-8 w-8 text-amber-600" />
          <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-amber-600">Don't Forget</h3>
          <p className="mt-1 text-sm text-gray-500">Critical items you must check</p>
        </Link>
        <Link to="/structure" className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
          <FolderTree className="h-8 w-8 text-blue-600" />
          <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-blue-600">Structure</h3>
          <p className="mt-1 text-sm text-gray-500">Universal folder & code patterns</p>
        </Link>
        <Link to="/summary" className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-green-300 hover:shadow-md transition-all">
          <FileText className="h-8 w-8 text-green-600" />
          <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-green-600">Summary</h3>
          <p className="mt-1 text-sm text-gray-500">Final review before submission</p>
        </Link>
      </div>

      <div className="text-center">
        <Link to="/checklist">
          <Button variant="primary" className="px-8">Go to Checklist</Button>
        </Link>
      </div>
    </div>
  )
}
