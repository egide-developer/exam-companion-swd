import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Dropdown({ options, value, onChange, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>{selected?.label || placeholder}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-indigo-50 cursor-pointer ${value === opt.value ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
