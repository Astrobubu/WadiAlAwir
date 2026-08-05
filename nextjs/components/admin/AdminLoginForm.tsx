'use client'

import { useEffect, useState } from 'react'
import { getBrowserSupabaseClient } from '@/lib/supabase/browser'

const REMEMBER_KEY = 'wadi-admin-remember'
const EMAIL_KEY = 'wadi-admin-email'

function makeAuthCookiesSessionOnly() {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''

  for (const cookie of document.cookie.split(';')) {
    const separator = cookie.indexOf('=')
    if (separator < 0) continue

    const name = cookie.slice(0, separator).trim()
    if (!name.startsWith('sb-') || !name.includes('-auth-token')) continue

    const value = cookie.slice(separator + 1)
    document.cookie = `${name}=${value}; Path=/; SameSite=Lax${secure}`
  }
}

export default function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const remembered = window.localStorage.getItem(REMEMBER_KEY) !== 'false'
    setRememberMe(remembered)
    if (remembered) setEmail(window.localStorage.getItem(EMAIL_KEY) ?? '')
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')

    const supabase = getBrowserSupabaseClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    window.localStorage.setItem(REMEMBER_KEY, String(rememberMe))
    if (rememberMe) {
      window.localStorage.setItem(EMAIL_KEY, email)
    } else {
      window.localStorage.removeItem(EMAIL_KEY)
      makeAuthCookiesSessionOnly()
    }

    window.location.assign('/admin')
  }

  return (
    <form className="admin-login__form" onSubmit={handleSubmit}>
      <label className="admin-field">
        <span>Email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="admin-field">
        <span>Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <label className="admin-remember">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <span><strong>Remember me</strong><small>Keep me signed in on this device</small></span>
      </label>
      {error && <p className="admin-form-error" role="alert">{error}</p>}
      <button className="admin-button admin-button--primary" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
