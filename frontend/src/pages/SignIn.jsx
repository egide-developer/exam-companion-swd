import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/reusable/Button.jsx'

export default function SignIn() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('All fields are required'); return }
    const res = await login(form.email, form.password)
    if (res.ok) navigate('/')
    else setError(res.message)
  }

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Sign In</h1>
      <p className="mt-1 text-sm text-gray-500 text-center">Access your exam checklist</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
        </div>
        <Button type="submit" loading={loading} className="w-full">Sign In</Button>
        <div className="flex justify-between text-sm">
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">Create account</Link>
          <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
        </div>
      </form>
    </div>
  )
}
