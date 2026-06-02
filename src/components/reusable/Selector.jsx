import { useState, useRef, useEffect } from 'react'
import { X, ChevronDown } from 'lucide-react'

export default function Selector({ options, values, onChange, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggle = (val) => {
    onChange(values.includes(val) ? values.filter((v) => v !== val) : [...values, val])
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full min-h-[38px] items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer flex-wrap"
      >
        {values.length === 0 ? (
          <span className="text-gray-400">{placeholder}</span>
        ) : (
          values.map((val) => {
            const opt = options.find((o) => o.value === val)
            return (
              <span key={val} className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {opt?.label || val}
                <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggle(val) }} />
              </span>
            )
          })
        )}
        <ChevronDown className={`ml-auto h-4 w-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={values.includes(opt.value)}
                onChange={() => toggle(opt.value)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
