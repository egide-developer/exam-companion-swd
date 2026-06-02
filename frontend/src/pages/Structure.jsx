import { useState } from 'react'
import { useChecklist } from '../context/ChecklistContext.jsx'
import { Folder, File, ChevronRight, ChevronDown, Code } from 'lucide-react'

function TreeNode({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = node.children && node.children.length > 0
  const isFile = !hasChildren && !node.name.endsWith('/')

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 cursor-pointer text-sm ${depth === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
        ) : (
          <span className="w-3.5" />
        )}
        {isFile ? (
          <File className="h-4 w-4 shrink-0 text-gray-400" />
        ) : (
          <Folder className={`h-4 w-4 shrink-0 ${open ? 'text-amber-500' : 'text-gray-400'}`} />
        )}
        <span>{node.name}</span>
      </div>
      {hasChildren && open && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Structure() {
  const { structureData } = useChecklist()

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Universal Project Structure</h1>
        <p className="mt-1 text-sm text-gray-500">
          Folder layout and code patterns you can apply to any full-stack project
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-3">
            <h2 className="font-semibold text-gray-900">Folder Structure</h2>
          </div>
          <div className="p-4 text-sm">
            <TreeNode node={structureData.folder} />
          </div>
        </div>

        <div className="space-y-6">
          {structureData.codePatterns.map((pattern, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-3">
                <Code className="h-4 w-4 text-indigo-600" />
                <h2 className="font-semibold text-gray-900">{pattern.title}</h2>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="rounded-lg bg-gray-950 p-4 text-xs text-gray-100 overflow-x-auto leading-relaxed">
                  <code>{pattern.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
