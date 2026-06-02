import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  Bell,
  FolderTree,
  FileText,
  LogIn,
  LogOut,
  User,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/checklist', label: 'Checklist', icon: CheckSquare },
  { to: '/dont-forget', label: "Don't Forget", icon: Bell },
  { to: '/structure', label: 'Structure', icon: FolderTree },
  { to: '/summary', label: 'Summary', icon: FileText },
]

export default function Sidebar({ open, setOpen }) {
  const { user, logout } = useAuth()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-gray-200 bg-white pt-16 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-200 p-4 space-y-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="truncate">{user.name || user.email}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  )
}
