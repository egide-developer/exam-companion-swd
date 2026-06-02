import { Link } from 'react-router-dom'
import { ClipboardCheck, Menu, X } from 'lucide-react'

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:px-6">
      <button
        type="button"
        className="lg:hidden -ml-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <div className="flex items-center gap-3">
        <ClipboardCheck className="h-7 w-7 text-indigo-600" />
        <Link to="/" className="text-xl font-bold text-gray-900">
          Exam Checklist
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-3 text-sm text-gray-500">
        <span className="hidden sm:inline">Practical Exam Checklist</span>
      </div>
    </header>
  )
}
