'use client'

import { useState, useEffect } from 'react'

const AGENT_NAME = 'Bethanne'
const AGENT_FULL = 'Bethanne Baer'

const STATS = [
  { icon: '📈', value: '#1', label: 'Top Producing Team in Central FL' },
  { icon: '👥', value: '12+', label: 'Active Agents' },
  { icon: '📅', value: '10+', label: 'Years in Business' },
]

const RESOURCES = [
  { icon: '⭐', title: 'Agent Results', desc: 'Meet the agents on our team' },
  { icon: '📞', title: 'Hear Live Calls', desc: 'Listen to actual warm transfer calls' },
  { icon: '💬', title: 'Meet the Team', desc: '12+ team members ready to support you' },
  { icon: '💰', title: 'Earnings', desc: 'Calculate your projected income' },
  { icon: '❓', title: 'FAQs', desc: 'Common questions answered' },
  { icon: '🚀', title: 'Next Steps', desc: 'What happens after you partner' },
]

export default function PresentationPage() {
  const [stage, setStage] = useState<'envelope' | 'welcome' | 'presentation'>('envelope')
  const [envelopeOpen, setEnvelopeOpen] = useState(false)

  useEffect(() => {
    // Auto-open envelope after 1.5s
    const t1 = setTimeout(() => setEnvelopeOpen(true), 1500)
    // Transition to welcome after envelope animation
    const t2 = setTimeout(() => setStage('welcome'), 3000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (stage === 'envelope') {
    return <EnvelopeScreen open={envelopeOpen} />
  }

  if (stage === 'welcome') {
    return <WelcomeScreen onContinue={() => setStage('presentation')} />
  }

  return <PresentationScreen />
}

/* ════════════════════════════════════════
   ENVELOPE SCREEN
   ════════════════════════════════════════ */
function EnvelopeScreen({ open }: { open: boolean }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4">
      <div className="relative w-[320px] sm:w-[380px] h-[280px] sm:h-[320px]" style={{ perspective: '1000px' }}>

        {/* Card inside envelope */}
        <div className={`absolute inset-x-4 top-4 bottom-16 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 transition-all duration-700 ${open ? 'animate-card-rise' : 'opacity-0'}`}>
          <div className="text-xs font-semibold tracking-[0.2em] text-[var(--bt-blue)] uppercase">Prepared For</div>
          <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-[var(--bt-blue)]">
            {AGENT_FULL.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="text-xl font-bold text-[var(--bt-text)]">{AGENT_FULL}</div>
          <div className="text-sm font-semibold text-[var(--bt-blue)]">BearTeam</div>
        </div>

        {/* Envelope body */}
        <div className="absolute bottom-0 left-0 right-0 h-[140px] sm:h-[160px]">
          {/* Back */}
          <div className="absolute inset-0 bg-[var(--bt-blue)] rounded-b-xl" />
          {/* Front flap */}
          <div className="absolute inset-0 overflow-hidden rounded-b-xl">
            <div className="absolute bottom-0 left-0 right-0"
              style={{
                height: '100%',
                background: 'linear-gradient(to bottom right, var(--bt-bg) 50%, transparent 50%)',
                opacity: 0.3,
              }}
            />
          </div>
          {/* Top flap */}
          <div
            className={`absolute left-0 right-0 top-0 h-[80px] ${open ? 'animate-envelope-open' : ''}`}
            style={{
              transformOrigin: 'top center',
              background: 'var(--bt-blue)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   WELCOME SCREEN
   ════════════════════════════════════════ */
function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4">
      <div className="animate-fade-in max-w-md w-full flex flex-col items-center gap-6 py-12">
        {/* Logo */}
        <div className="text-2xl font-bold text-[var(--bt-blue)] tracking-tight">
          🐻 BearTeam
        </div>

        {/* Profile */}
        <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-[var(--bt-blue)]">
          {AGENT_FULL.split(' ').map(n => n[0]).join('')}
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--bt-text)]">
            Welcome back, {AGENT_NAME}!
          </h1>
          <p className="text-[var(--bt-text-dim)] mt-2">
            Your personalized resources are ready for you.
          </p>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-3 mt-4">
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-xl bg-[var(--bt-blue)] text-white font-semibold text-base flex items-center justify-center gap-2 hover:bg-[var(--bt-blue-dark)] transition-colors cursor-pointer"
          >
            📅 Schedule a Time to Talk
          </button>
          <button
            onClick={onContinue}
            className="w-full py-3 rounded-xl bg-white border border-gray-200 text-[var(--bt-text)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            📖 Go to My Resources
          </button>
          <button
            onClick={onContinue}
            className="w-full py-3 rounded-xl bg-white border border-gray-200 text-[var(--bt-text)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            🎬 Watch Overview Video
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl bg-white border border-gray-200 text-[var(--bt-text-dim)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            🔄 Start Presentation Over
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PRESENTATION SCREEN
   ════════════════════════════════════════ */
function PresentationScreen() {
  return (
    <div className="flex-1">

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 text-center">
        <div className="animate-fade-in max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white shadow flex items-center justify-center text-lg font-bold text-[var(--bt-blue)]">
              {AGENT_FULL.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-[var(--bt-text-dim)] text-lg">+</span>
            <div className="w-14 h-14 rounded-full bg-white border-2 border-[var(--bt-blue)] shadow flex items-center justify-center text-sm font-bold text-[var(--bt-blue)]">
              BT
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--bt-text)]">
            Together, let&apos;s make <span className="text-[var(--bt-blue)]">2026</span>
          </h2>
          <p className="text-xl sm:text-2xl font-semibold text-[var(--bt-green)] italic mt-2">
            better than 2025
          </p>
        </div>
      </section>

      {/* Value Prop */}
      <section className="bg-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs font-bold tracking-[0.2em] text-[var(--bt-blue)] uppercase mb-4">
            Not Another Lead Source.
          </div>
          <div className="w-12 h-0.5 bg-[var(--bt-blue)] mx-auto mb-6" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--bt-text)] mb-4">
            A <span className="text-[var(--bt-blue)]">Real Partnership</span> Built to Win
          </h2>
          <p className="text-[var(--bt-text-dim)] text-lg max-w-xl mx-auto">
            For brokerages, teams, and agents done with generic lead gen.
          </p>
        </div>
      </section>

      {/* Video + Resources */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Video placeholder */}
          <div className="bg-gray-300 rounded-2xl aspect-video flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-300" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <span className="text-[var(--bt-blue)] text-2xl ml-1">▶</span>
              </div>
              <div className="bg-white/90 rounded-full px-4 py-2 flex items-center gap-3 shadow">
                <span className="text-sm font-semibold text-[var(--bt-blue)]">How it works</span>
                <span className="text-xs text-[var(--bt-text-dim)] border-l border-gray-300 pl-3">7 min video</span>
              </div>
              <div className="text-xs font-bold text-[var(--bt-blue)] tracking-wide uppercase mt-1">
                ↑ Click to Play, {AGENT_NAME}
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-[var(--bt-text)] mb-4">Resources Unlocked</h3>
            <div className="flex flex-col gap-2">
              {RESOURCES.map((r, i) => (
                <button key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-[var(--bt-blue)] hover:bg-blue-50/30 transition-colors text-left cursor-pointer w-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--bt-text)]">{r.title}</div>
                    <div className="text-xs text-[var(--bt-text-dim)]">{r.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button className="w-full mt-4 py-4 rounded-xl bg-[var(--bt-blue)] text-white font-semibold text-base flex items-center justify-center gap-2 hover:bg-[var(--bt-blue-dark)] transition-colors cursor-pointer">
              Access Resources →
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-2xl font-extrabold text-[var(--bt-text)]">{s.value}</div>
              <div className="text-xs text-[var(--bt-text-dim)] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs font-bold tracking-[0.2em] text-[var(--bt-blue)] uppercase mb-2">Our Team</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--bt-text)] mb-2">Meet the BearTeam</h2>
          <p className="text-[var(--bt-text-dim)] mb-8">The support system behind top-producing agents in Central Florida.</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-full aspect-square rounded-full bg-gray-200 border-2 border-white shadow-sm" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 text-center">
        <div className="max-w-lg mx-auto">
          <button className="w-full sm:w-auto px-12 py-5 rounded-2xl bg-[var(--bt-blue)] text-white font-bold text-lg hover:bg-[var(--bt-blue-dark)] transition-colors shadow-lg cursor-pointer">
            Show Me How This Works →
          </button>
          <p className="text-xs text-[var(--bt-text-dim)] mt-3">watch a 7 min video</p>
          <button onClick={() => window.location.reload()} className="mt-6 text-sm text-[var(--bt-text-dim)] hover:text-[var(--bt-text)] transition-colors cursor-pointer">
            🔄 Replay
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-gray-200">
        <div className="text-lg font-bold text-[var(--bt-blue)] mb-2">🐻 BearTeam</div>
        <p className="text-xs text-[var(--bt-text-dim)]">&copy; 2026 BearTeam | Bear Real Estate Team</p>
      </footer>
    </div>
  )
}
