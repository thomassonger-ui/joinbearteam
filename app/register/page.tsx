'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function RegisterPage() {
  const [mode, setMode] = useState<'choose' | 'new' | 'sent'>('choose')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSendLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: 'https://bearteam-os-dashboard.vercel.app/onboarding',
      },
    })
    setLoading(false)
    if (err) { setError(err.message); return }
    setMode('sent')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b1d3a', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400, backgroundColor: '#fff',
        borderRadius: 12, padding: '48px 40px', textAlign: 'center' }}>

        {/* BT Logo */}
        <div style={{ width: 64, height: 64, border: '3px solid #0b1d3a', borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          fontWeight: 900, fontSize: 22, color: '#0b1d3a', letterSpacing: -1 }}>
          BT
        </div>

        <div style={{ fontSize: 24, fontWeight: 800, color: '#0b1d3a', marginBottom: 4 }}>
          BearTeamOS&#8482;
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 32 }}>
          Bear Team Real Estate &middot; Orlando, Florida
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: 32 }} />

        {mode === 'choose' && (
          <>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                color: '#9ca3af', textTransform: 'uppercase', marginBottom: 16 }}>
                Returning Agent
              </div>
              <a href="https://bearteam-os-dashboard.vercel.app/login"
                style={{ display: 'block', width: '100%', padding: '11px 0', fontSize: 15,
                  fontWeight: 600, backgroundColor: '#0b1d3a', color: '#fff',
                  borderRadius: 6, textDecoration: 'none', boxSizing: 'border-box' }}>
                Enter System
              </a>
            </div>

            <div style={{ fontSize: 12, color: '#d1d5db', marginBottom: 28 }}>— or —</div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                color: '#9ca3af', textTransform: 'uppercase', marginBottom: 16 }}>
                New Agent
              </div>
              <button onClick={() => setMode('new')}
                style={{ width: '100%', padding: '11px 0', fontSize: 15, fontWeight: 600,
                  backgroundColor: '#fff', color: '#0b1d3a', border: '2px solid #0b1d3a',
                  borderRadius: 6, cursor: 'pointer' }}>
                Set Up Your Profile &rarr;
              </button>
            </div>
          </>
        )}

        {mode === 'new' && (
          <form onSubmit={handleSendLink}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
              color: '#9ca3af', textTransform: 'uppercase', marginBottom: 16 }}>
              New Agent Setup
            </div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Your email address" required
              style={{ width: '100%', padding: '11px 14px', fontSize: 15, marginBottom: 12,
                border: '1px solid #d1d5db', borderRadius: 6, outline: 'none',
                boxSizing: 'border-box' }} />
            {error && <div style={{ fontSize: 13, color: '#dc2626', marginBottom: 10 }}>{error}</div>}
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '11px 0', fontSize: 15, fontWeight: 600,
                backgroundColor: '#0b1d3a', color: '#fff', border: 'none',
                borderRadius: 6, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Sending…' : 'Send My Access Link'}
            </button>
            <button type="button" onClick={() => setMode('choose')}
              style={{ background: 'none', border: 'none', color: '#9ca3af',
                fontSize: 13, cursor: 'pointer', marginTop: 12 }}>
              &larr; Back
            </button>
          </form>
        )}

        {mode === 'sent' && (
          <div>
            <div style={{ fontSize: 32, marginBottom: 16 }}>📬</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0b1d3a', marginBottom: 8 }}>
              Check your email
            </div>
            <div style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Your access link is on the way to <strong>{email}</strong>.<br /><br />
              Click the link to complete your profile setup.
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
