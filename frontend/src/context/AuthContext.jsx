import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const signup = useCallback(async (data) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/signup', data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Signup failed' }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Login failed' }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const forgotPassword = useCallback(async (email) => {
    try {
      const res = await api.post('/auth/forgot-password', { email })
      return { ok: true, question: res.data.question }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Error' }
    }
  }, [])

  const verifySecurityAnswer = useCallback(async (email, answer) => {
    try {
      const res = await api.post('/auth/verify-answer', { email, answer })
      return { ok: true, resetToken: res.data.resetToken }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Incorrect answer' }
    }
  }, [])

  const resetPassword = useCallback(async (email, newPassword) => {
    try {
      const res = await api.post('/auth/reset-password', { email, newPassword })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: err.response?.data?.message || 'Reset failed' }
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !user) {
      api.get('/auth/me')
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data.user))
          setUser(res.data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        })
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user, loading, login, signup, logout,
      forgotPassword, verifySecurityAnswer, resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
