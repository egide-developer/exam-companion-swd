import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/reusable/Button.jsx'

export default function SignUp() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', securityQuestion: '', securityAnswer: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { name, email, password, securityQuestion, securityAnswer } = form
    if (!name || !email || !password || !securityQuestion || !securityAnswer) {
      setError('All fields are required'); return
    }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    const res = await signup(form)
    if (res.ok) navigate('/')
    else setError(res.message)
  }

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Sign Up</h1>
      <p className="mt-1 text-sm text-gray-500 text-center">Create your account</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
        {['name', 'email', 'password', 'securityQuestion', 'securityAnswer'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">
              {field === 'securityQuestion' ? 'Security Question' : field === 'securityAnswer' ? 'Security Answer' : field}
            </label>
            {field === 'securityQuestion' ? (
              <select value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="">Select a question</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What was your first pet's name?">What was your first pet's name?</option>
                <option value="What city were you born in?">What city were you born in?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
                <option value="What was the name of your first school?">What was the name of your first school?</option>
              </select>
            ) : (
              <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            )}
          </div>
        ))}
        <Button type="submit" loading={loading} className="w-full">Sign Up</Button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/signin" className="text-indigo-600 hover:text-indigo-500">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
