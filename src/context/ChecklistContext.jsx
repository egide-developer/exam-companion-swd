import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const sections = [
  {
    id: 'preliminary',
    title: '1. Preliminary Activities (ERD Design)',
    weight: '15%',
    maxScore: 20,
    indicators: [
      { id: 'p1', text: 'Entity A (first entity) is drawn', score: 1 },
      { id: 'p2', text: 'Entity B (second entity) is drawn', score: 1 },
      { id: 'p3', text: 'Entity C (third entity) is drawn', score: 1 },
      { id: 'p4', text: 'Entity D (fourth entity) is drawn', score: 1 },
      { id: 'p5', text: 'Entity symbol is used correctly', score: 1 },
      { id: 'p6', text: 'Relationship symbol is used', score: 1 },
      { id: 'p7', text: 'Link/connector lines are used', score: 1 },
      { id: 'p8', text: 'Primary key is identified for each entity', score: 1 },
      { id: 'p9', text: 'Foreign key is identified where needed', score: 1 },
      { id: 'p10', text: 'Cardinalities are indicated', score: 1 },
      { id: 'p11', text: 'Relationship between Entity A & B is shown', score: 1 },
      { id: 'p12', text: 'Relationship between Entity B & C is shown', score: 1 },
      { id: 'p13', text: 'Relationship between Entity C & D is shown', score: 1 },
      { id: 'p14', text: 'Primary key of Entity A is indicated', score: 1 },
      { id: 'p15', text: 'Primary key of Entity B is indicated', score: 1 },
      { id: 'p16', text: 'Primary key of Entity C is indicated', score: 1 },
      { id: 'p17', text: 'Primary key of Entity D is indicated', score: 1 },
      { id: 'p18', text: 'Foreign key in child entity is marked', score: 1 },
      { id: 'p19', text: 'Referential integrity is respected', score: 1 },
      { id: 'p20', text: 'All relationship lines are correctly drawn', score: 1 },
    ],
  },
  {
    id: 'process',
    title: '2. Process and Fulfillment of the Task',
    weight: '50%',
    maxScore: 111,
    indicators: [
      { id: 'pr1', text: '2.1 Project folder named per instructions', score: 1 },
      { id: 'pr2', text: '2.1 Backend runtime initialized (npm init / similar)', score: 2 },
      { id: 'pr3', text: '2.1 Server framework installed (Express / Flask / etc.)', score: 1 },
      { id: 'pr4', text: '2.1 CORS middleware installed', score: 1 },
      { id: 'pr5', text: '2.1 Dev server/auto-reload installed (nodemon / similar)', score: 1 },
      { id: 'pr6', text: '2.1 Database driver/ORM installed', score: 1 },
      { id: 'pr7', text: '2.2 Frontend project scaffolded (React / Vue / etc.)', score: 2 },
      { id: 'pr8', text: '2.2 Router library installed (react-router / vue-router)', score: 1 },
      { id: 'pr9', text: '2.2 HTTP client installed (axios / fetch / etc.)', score: 1 },
      { id: 'pr10', text: '2.3 Database created with correct name', score: 1 },
      { id: 'pr11', text: '2.3 User/Account table created', score: 1 },
      { id: 'pr12', text: '2.3 Entity A table created', score: 1 },
      { id: 'pr13', text: '2.3 Entity B table created', score: 1 },
      { id: 'pr14', text: '2.3 Entity C table created', score: 1 },
      { id: 'pr15', text: '2.3 Entity D table created', score: 1 },
      { id: 'pr16', text: '2.3 Primary key set on User table', score: 1 },
      { id: 'pr17', text: '2.3 Primary key set on Entity A table', score: 1 },
      { id: 'pr18', text: '2.3 Primary key set on Entity B table', score: 1 },
      { id: 'pr19', text: '2.3 Primary key set on Entity C table', score: 1 },
      { id: 'pr20', text: '2.3 Primary key set on Entity D table', score: 1 },
      { id: 'pr21', text: '2.3 Foreign key applied on correct table', score: 1 },
      { id: 'pr22', text: '2.3 Foreign key references correct table', score: 1 },
      { id: 'pr23', text: '2.3 All FKs properly linked', score: 1 },
      { id: 'pr24', text: '2.4 Function component is declared', score: 2 },
      { id: 'pr25', text: '2.4 Return/render method is included', score: 1 },
      { id: 'pr26', text: '2.4 Component is exported', score: 1 },
      { id: 'pr27', text: '2.4 Component is mounted to DOM', score: 2 },
      { id: 'pr28', text: '2.4 JSX/template syntax used in return', score: 1 },
      { id: 'pr29', text: '2.4 JSX/template is well structured', score: 1 },
      { id: 'pr30', text: '2.4 Login/SignIn form created', score: 1 },
      { id: 'pr31', text: '2.4 Entity A form created (add/list)', score: 1 },
      { id: 'pr32', text: '2.4 Entity B form created (add/list)', score: 1 },
      { id: 'pr33', text: '2.4 Entity C form created (add/list)', score: 1 },
      { id: 'pr34', text: '2.4 Entity D form created (add/list)', score: 1 },
      { id: 'pr35', text: '2.5 Routes are configured', score: 2 },
      { id: 'pr36', text: '2.5 Routing navigation is working', score: 1 },
      { id: 'pr37', text: '2.5 Links/menus are created', score: 2 },
      { id: 'pr38', text: '2.5 Navigation between pages works', score: 2 },
      { id: 'pr39', text: '2.6 CSS framework is installed', score: 1 },
      { id: 'pr40', text: '2.6 CSS framework is configured', score: 1 },
      { id: 'pr41', text: '2.6 CSS framework is imported in project', score: 1 },
      { id: 'pr42', text: '2.6 Utility classes are used in markup', score: 2 },
      { id: 'pr43', text: '2.6 Flexbox/grid is applied', score: 1 },
      { id: 'pr44', text: '2.7 Responsive grid layouts are used', score: 1 },
      { id: 'pr45', text: '2.7 Media breakpoints are handled', score: 1 },
      { id: 'pr46', text: '2.7 Readability is considered', score: 1 },
      { id: 'pr47', text: '2.7 Interactive elements are applied', score: 1 },
      { id: 'pr48', text: '2.8 Attractive colors are used', score: 1 },
      { id: 'pr49', text: '2.8 Text formatting is performed', score: 1 },
      { id: 'pr50', text: '2.8 UI components are attractive', score: 1 },
      { id: 'pr51', text: '2.8 Hover state is used', score: 1 },
      { id: 'pr52', text: '2.8 Focus state is used', score: 1 },
      { id: 'pr53', text: '2.9 Server entry file is created (server.js/app.js)', score: 2 },
      { id: 'pr54', text: '2.9 Server framework package is imported', score: 1 },
      { id: 'pr55', text: '2.9 CORS package is imported', score: 1 },
      { id: 'pr56', text: '2.9 Port number is configured', score: 1 },
      { id: 'pr57', text: '2.9 Server app object is created', score: 1 },
      { id: 'pr58', text: '2.9 Listen method is applied', score: 1 },
      { id: 'pr59', text: '2.9 Database package/module is used', score: 2 },
      { id: 'pr60', text: '2.9 Create/open connection method used', score: 1 },
      { id: 'pr61', text: '2.9 Host/server parameter is passed', score: 1 },
      { id: 'pr62', text: '2.9 Username parameter is passed', score: 1 },
      { id: 'pr63', text: '2.9 Password parameter is passed', score: 1 },
      { id: 'pr64', text: '2.9 Database name parameter is passed', score: 1 },
      { id: 'pr65', text: '2.9 Connection success/error messages shown', score: 1 },
      { id: 'pr66', text: '2.10 POST endpoint is created', score: 2 },
      { id: 'pr67', text: '2.10 GET endpoint is created', score: 2 },
      { id: 'pr68', text: '2.10 PUT endpoint is created', score: 2 },
      { id: 'pr69', text: '2.10 DELETE endpoint is created', score: 2 },
      { id: 'pr70', text: '2.10 INSERT/CREATE query is used', score: 2 },
      { id: 'pr71', text: '2.10 SELECT/READ query is used', score: 2 },
      { id: 'pr72', text: '2.10 UPDATE query is used', score: 2 },
      { id: 'pr73', text: '2.10 DELETE/DESTROY query is used', score: 2 },
      { id: 'pr74', text: '2.11 API service folder is created', score: 2 },
      { id: 'pr75', text: '2.11 Auth API file is created', score: 1 },
      { id: 'pr76', text: '2.11 Entity A API file is created', score: 1 },
      { id: 'pr77', text: '2.11 Entity B API file is created', score: 1 },
      { id: 'pr78', text: '2.11 Entity C API file is created', score: 1 },
      { id: 'pr79', text: '2.11 Entity D API file is created', score: 1 },
      { id: 'pr80', text: '2.11 HTTP client is imported (axios/fetch)', score: 1 },
      { id: 'pr81', text: '2.11 API client instance is configured', score: 1 },
      { id: 'pr82', text: '2.11 POST HTTP method is implemented', score: 2 },
      { id: 'pr83', text: '2.11 Base URL is configured', score: 2 },
      { id: 'pr84', text: '2.12 Form data is validated', score: 2 },
      { id: 'pr85', text: '2.12 Password is encrypted/hashed', score: 1 },
      { id: 'pr86', text: '2.12 Duplicate data entry is prevented', score: 2 },
      { id: 'pr87', text: '2.12 Password recovery is implemented', score: 2 },
    ],
  },
  {
    id: 'presentation',
    title: '3. Product Presentation / Exhibition and Quality',
    weight: '30%',
    maxScore: 37,
    indicators: [
      { id: 'pp1', text: '3.1 Product name is mentioned', score: 1 },
      { id: 'pp2', text: '3.1 Key steps of the process are stated', score: 3 },
      { id: 'pp3', text: '3.1 Use/function/importance of product stated', score: 2 },
      { id: 'pp4', text: '3.1 Challenges/difficulties are stated', score: 1 },
      { id: 'pp5', text: '3.1 Ways to overcome challenges stated', score: 1 },
      { id: 'pp6', text: '3.1 Voice is audible', score: 1 },
      { id: 'pp7', text: '3.1 Body language is used', score: 1 },
      { id: 'pp8', text: '3.2 Input validation prevents invalid data', score: 2 },
      { id: 'pp9', text: '3.2 Form submission saves data correctly', score: 2 },
      { id: 'pp10', text: '3.2 Data retrieval displays records', score: 2 },
      { id: 'pp11', text: '3.2 Update functionality works', score: 2 },
      { id: 'pp12', text: '3.2 Delete functionality works', score: 2 },
      { id: 'pp13', text: '3.3 Navigation menus are interactive', score: 1 },
      { id: 'pp14', text: '3.3 Buttons are interactive', score: 1 },
      { id: 'pp15', text: '3.3 Fonts style is consistent', score: 1 },
      { id: 'pp16', text: '3.3 Intuitive colors are used', score: 1 },
      { id: 'pp17', text: '3.3 UI colors are consistent', score: 1 },
      { id: 'pp18', text: '3.3 Invoice/bill/receipt is generated', score: 3 },
      { id: 'pp19', text: '3.3 Generated document is correct/complete', score: 3 },
      { id: 'pp20', text: '3.3 Daily report is generated', score: 3 },
      { id: 'pp21', text: '3.3 Generated report is accurate/relevant', score: 3 },
    ],
  },
  {
    id: 'closing',
    title: '4. Closing Activities',
    weight: '5%',
    maxScore: 10,
    indicators: [
      { id: 'c1', text: '4.1 Project folder is removed (if required)', score: 1 },
      { id: 'c2', text: '4.1 Database is deleted (if required)', score: 1 },
      { id: 'c3', text: '4.1 Global dependencies are removed', score: 1 },
      { id: 'c4', text: '4.1 Text editor/IDE not uninstalled', score: 1 },
      { id: 'c5', text: '4.1 Server software not uninstalled', score: 1 },
      { id: 'c6', text: '4.2 Paper is free of excessive erasures', score: 1 },
      { id: 'c7', text: '4.2 Waste materials disposed properly', score: 1 },
      { id: 'c8', text: '4.2 No unnecessary creases/tears on papers', score: 1 },
      { id: 'c9', text: '4.3 Time is respected (submitted on time)', score: 2 },
    ],
  },
]

const dontForgetItems = [
  {
    category: 'Layout',
    items: [
      'Header component on every page',
      'Footer component on every page',
    ],
  },
  {
    category: 'Authentication',
    items: [
      'SignIn page with form validation',
      'SignUp page with form validation',
      'SignOut functionality',
      'Forgot Password via security question (asked at registration)',
      'Password Reset using seed keyphrase',
      'JWT token stored in localStorage/sessionStorage',
    ],
  },
  {
    category: 'Data Validation',
    items: [
      'Validations on every input field (required, email, phone, etc.)',
      'Prevent data duplication (check before insert)',
      'Search / filters on every table / page',
    ],
  },
  {
    category: 'Reports',
    items: [
      'Daily report generation',
      'Monthly report generation',
      'Annual report generation (if applicable)',
    ],
  },
  {
    category: 'Reusable Components',
    items: [
      'Dropdown — configurable options, searchable',
      'Search — input with debounce, filter callback',
      'Table — sortable columns, pagination, row click',
      'Button — variants (primary, secondary, danger, ghost), loading state',
      'Splitter — resizable panel divider',
      'Selector — multi-select with tags',
      'Loader — spinner/skeleton loading indicator',
      'StatCard — icon, label, value, trend indicator',
    ],
  },
  {
    category: 'Architecture',
    items: [
      'Context API for global state management',
      'Axios instance with base URL, interceptors, error handling',
      'JWT or Session-based authentication',
    ],
  },
]

const structureData = {
  folder: {
    name: '📁 project-root',
    children: [
      {
        name: '📁 backend-project',
        children: [
          { name: '📄 server.js / app.js — entry point' },
          {
            name: '📁 config/',
            children: [
              { name: '📄 db.js — database connection' },
              { name: '📄 env.js — environment variables' },
            ],
          },
          {
            name: '📁 models/',
            children: [
              { name: '📄 User.js / User.model.js' },
              { name: '📄 EntityA.js' },
              { name: '📄 EntityB.js' },
              { name: '📄 EntityC.js' },
              { name: '📄 EntityD.js' },
            ],
          },
          {
            name: '📁 routes/',
            children: [
              { name: '📄 authRoutes.js' },
              { name: '📄 entityARoutes.js' },
              { name: '📄 entityBRoutes.js' },
              { name: '📄 entityCRoutes.js' },
              { name: '📄 entityDRoutes.js' },
            ],
          },
          {
            name: '📁 controllers/',
            children: [
              { name: '📄 authController.js' },
              { name: '📄 entityAController.js' },
              { name: '📄 entityBController.js' },
              { name: '📄 entityCController.js' },
              { name: '📄 entityDController.js' },
            ],
          },
          {
            name: '📁 middleware/',
            children: [
              { name: '📄 auth.js — JWT / session verification' },
              { name: '📄 validation.js — input sanitization' },
            ],
          },
          { name: '📁 utils/ — helper functions, constants' },
          { name: '📄 package.json' },
          { name: '📄 .env' },
        ],
      },
      {
        name: '📁 frontend-project',
        children: [
          { name: '📄 index.html' },
          { name: '📄 package.json' },
          { name: '📄 vite.config.js / next.config.js / etc.' },
          {
            name: '📁 src/',
            children: [
              { name: '📄 main.jsx / index.jsx — entry point' },
              { name: '📄 App.jsx — routes & layout' },
              { name: '📄 index.css — global styles / CSS framework import' },
              {
                name: '📁 components/',
                children: [
                  {
                    name: '📁 layout/',
                    children: [
                      { name: '📄 Header.jsx' },
                      { name: '📄 Sidebar.jsx' },
                      { name: '📄 Footer.jsx' },
                      { name: '📄 Layout.jsx' },
                    ],
                  },
                  {
                    name: '📁 reusable/',
                    children: [
                      { name: '📄 Button.jsx' },
                      { name: '📄 Dropdown.jsx' },
                      { name: '📄 Search.jsx' },
                      { name: '📄 Table.jsx' },
                      { name: '📄 Splitter.jsx' },
                      { name: '📄 Selector.jsx' },
                      { name: '📄 Loader.jsx' },
                      { name: '📄 StatCard.jsx' },
                    ],
                  },
                  {
                    name: '📁 forms/',
                    children: [
                      { name: '📄 SignInForm.jsx' },
                      { name: '📄 SignUpForm.jsx' },
                      { name: '📄 EntityAForm.jsx (Create/Edit)' },
                      { name: '📄 EntityBForm.jsx' },
                      { name: '📄 EntityCForm.jsx' },
                      { name: '📄 EntityDForm.jsx' },
                    ],
                  },
                ],
              },
              {
                name: '📁 pages/',
                children: [
                  { name: '📄 Dashboard.jsx' },
                  { name: '📄 EntityAList.jsx' },
                  { name: '📄 EntityBList.jsx' },
                  { name: '📄 Reports.jsx' },
                ],
              },
              { name: '📁 context/ — AuthContext, AppContext' },
              { name: '📁 services/ — api.js (axios instance)' },
              { name: '📁 hooks/ — custom hooks' },
              { name: '📁 assets/ — images, icons' },
            ],
          },
        ],
      },
    ],
  },
  codePatterns: [
    {
      title: 'Axios Instance (services/api.js)',
      code: `import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem('token')
    return Promise.reject(err)
  },
)

export default api`,
    },
    {
      title: 'Context + Provider Pattern (context/AuthContext.jsx)',
      code: `import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      setUser(data.user)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)`,
    },
    {
      title: 'Reusable Component Pattern (components/reusable/Button.jsx)',
      code: `export default function Button({
  children, onClick, variant = 'primary', loading = false, disabled, className = '', ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={\`\${base} \${variants[variant]} \${className}\`}
      {...props}
    >
      {loading && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
      {children}
    </button>
  )
}`,
    },
    {
      title: 'Form with Validation Pattern',
      code: `import { useState } from 'react'
import Button from '../components/reusable/Button'
import api from '../services/api'

const validators = {
  required: (v) => (!v ? 'This field is required' : null),
  email: (v) => (/^\\S+@\\S+\\.\\S+$/.test(v) ? null : 'Invalid email'),
  phone: (v) => (/^\\d{10,}$/.test(v) ? null : 'Invalid phone number'),
}

function validate(fields, values) {
  const errors = {}
  for (const [name, rules] of Object.entries(fields)) {
    for (const rule of rules) {
      const err = validators[rule](values[name])
      if (err) { errors[name] = err; break }
    }
  }
  return errors
}

export default function SignUpForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const fieldRules = { name: ['required'], email: ['required', 'email'], password: ['required'] }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fieldRules, form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setLoading(true)
    try {
      await api.post('/auth/register', form)
      // redirect
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(fieldRules).map((name) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 capitalize">{name}</label>
          <input
            className={\`mt-1 block w-full rounded-md border \${errors[name] ? 'border-red-500' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none\`}
            value={form[name]}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          />
          {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]}</p>}
        </div>
      ))}
      <Button loading={loading} type="submit">Submit</Button>
    </form>
  )
}`,
    },
    {
      title: 'Table with Search & Filter Pattern',
      code: `import { useState, useMemo } from 'react'
import Search from '../components/reusable/Search'
import Dropdown from '../components/reusable/Dropdown'

export default function DataTable({ columns, data }) {
  const [search, setSearch] = useState('')
  const [filterKey, setFilterKey] = useState('')

  const filtered = useMemo(() => {
    let result = data
    if (search) {
      result = result.filter((row) =>
        Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
      )
    }
    if (filterKey) result = result.filter((row) => row.status === filterKey)
    return result
  }, [data, search, filterKey])

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Search value={search} onChange={setSearch} placeholder="Search..." />
        <Dropdown options={[/*...*/]} value={filterKey} onChange={setFilterKey} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-sm text-gray-900">{row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}`,
    },
  ],
}

const ChecklistContext = createContext()

export function ChecklistProvider({ children }) {
  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem('exam-checklist')
      if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return sections.map((s) => ({
      id: s.id,
      items: s.indicators.map((ind) => ({ id: ind.id, checked: false, note: '' })),
    }))
  })

  useEffect(() => {
    localStorage.setItem('exam-checklist', JSON.stringify(checklist))
  }, [checklist])

  const [dontForgetState, setDontForgetState] = useState(() => {
    try {
      const saved = localStorage.getItem('exam-dontforget')
      if (saved) return JSON.parse(saved)
    } catch { /* ignore */ }
    return dontForgetItems.map((group) => ({
      category: group.category,
      items: group.items.map((text) => ({ text, checked: false })),
    }))
  })

  useEffect(() => {
    localStorage.setItem('exam-dontforget', JSON.stringify(dontForgetState))
  }, [dontForgetState])

  const toggleDontForgetItem = useCallback((category, itemText) => {
    setDontForgetState((prev) =>
      prev.map((g) =>
        g.category === category
          ? { ...g, items: g.items.map((i) => (i.text === itemText ? { ...i, checked: !i.checked } : i)) }
          : g
      )
    )
  }, [])

  const toggleItem = useCallback((sectionId, itemId) => {
    setChecklist((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)) }
          : s
      )
    )
  }, [])

  const updateNote = useCallback((sectionId, itemId, note) => {
    setChecklist((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, note } : i)) }
          : s
      )
    )
  }, [])

  const stats = sections.map((section) => {
    const state = checklist.find((s) => s.id === section.id)
    const checkedCount = state?.items.filter((i) => i.checked).length ?? 0
    const earnedScore = section.indicators.reduce((sum, ind, idx) => {
      return sum + (state?.items[idx]?.checked ? ind.score : 0)
    }, 0)
    return {
      id: section.id,
      title: section.title,
      weight: section.weight,
      maxScore: section.maxScore,
      checkedCount,
      totalItems: section.indicators.length,
      earnedScore,
      percentage: section.maxScore > 0 ? Math.round((earnedScore / section.maxScore) * 100) : 0,
    }
  })

  const totalEarned = stats.reduce((s, st) => s + st.earnedScore, 0)
  const totalMax = sections.reduce((s, sec) => s + sec.maxScore, 0)
  const totalPercentage = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0

  return (
    <ChecklistContext.Provider
      value={{ sections, checklist, stats, totalEarned, totalMax, totalPercentage, toggleItem, updateNote, dontForgetItems, dontForgetState, toggleDontForgetItem, structureData }}
    >
      {children}
    </ChecklistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useChecklist = () => useContext(ChecklistContext)
