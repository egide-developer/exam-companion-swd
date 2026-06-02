import { useState, useRef, useCallback } from 'react'

export default function Splitter({ left, right, defaultPercent = 50, className = '' }) {
  const [percent, setPercent] = useState(defaultPercent)
  const dragging = useRef(false)

  const onMouseDown = useCallback((e) => {
    dragging.current = true
    e.preventDefault()
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    const parent = e.currentTarget.getBoundingClientRect()
    const pct = ((e.clientX - parent.left) / parent.width) * 100
    setPercent(Math.min(80, Math.max(20, pct)))
  }, [])

  const onMouseUp = useCallback(() => {
    dragging.current = false
  }, [])

  return (
    <div
      className={`flex ${className}`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{ height: '100%' }}
    >
      <div style={{ width: `${percent}%` }} className="overflow-auto">
        {left}
      </div>
      <div
        onMouseDown={onMouseDown}
        className="flex w-1.5 cursor-col-resize items-center justify-center bg-gray-200 hover:bg-indigo-400 shrink-0"
      >
        <div className="h-8 w-0.5 rounded-full bg-gray-300" />
      </div>
      <div style={{ width: `${100 - percent}%` }} className="overflow-auto">
        {right}
      </div>
    </div>
  )
}
