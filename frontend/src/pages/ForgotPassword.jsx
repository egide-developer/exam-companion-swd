import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Button from '../components/reusable/Button.jsx'

export default function ForgotPassword() {
  const { forgotPassword, verifySecurityAnswer, resetPassword, loading } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState('email')
  const [email, setEmail] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmail = async (e) => {
    e.preventDefault(); setError('')
    if (!email) { setError('Enter your email'); return }
    const res = await forgotPassword(email)
    if (res.ok) { setQuestion(res.question); setStep('answer') }
    else setError(res.message)
  }

  const handleAnswer = async (e) => {
    e.preventDefault(); setError('')
    if (!answer) { setError('Enter your answer'); return }
    const res = await verifySecurityAnswer(email, answer)
    if (res.ok) { setResetToken(res.resetToken); setStep('reset') }
    else setError(res.message)
  }

  const handleReset = async (e) => {
    e.preventDefault(); setError('')
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return }
    const res = await resetPassword(email, newPassword)
    if (res.ok) navigate('/')
    else setError(res.message)
  }

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold text-gray-900 text-center">Forgot Password</h1>
      <p className="mt-1 text-sm text-gray-500 text-center">Recover your account</p>

      {step === 'email' && (
        <form onSubmit={handleEmail} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
          </div>
          <Button type="submit" loading={loading} className="w-full">Find Account</Button>
          <p className="text-center text-sm"><Link to="/signin" className="text-indigo-600 hover:text-indigo-500">Back to sign in</Link></p>
        </form>
      )}

      {step === 'answer' && (
        <form onSubmit={handleAnswer} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
          <p className="text-sm text-gray-600 font-medium">{question}</p>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Answer</label>
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
          </div>
          <Button type="submit" loading={loading} className="w-full">Verify Answer</Button>
        </form>
      )}

      {step === 'reset' && (
        <form onSubmit={handleReset} className="mt-8 space-y-4">
          {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
          </div>
          <Button type="submit" loading={loading} className="w-full">Reset Password</Button>
        </form>
      )}
    </div>
  )
}
