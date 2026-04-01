import { Bell, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { DashboardHeaderProps } from '../types'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatCurrentDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

export default function DashboardHeader({
  subtitle = 'Visão geral do desempenho da sua oficina',
  userName = 'Studio Prime',
  notificationCount = 3,
}: DashboardHeaderProps) {
  const [currentDate, setCurrentDate] = useState(formatCurrentDate)

  useEffect(() => {
    const id = setInterval(() => setCurrentDate(formatCurrentDate()), 60_000)
    return () => clearInterval(id)
  }, [])

  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const firstName = userName.split(' ')[0]

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 animate-fade-in-up">
      <div className="space-y-0.5">
        <p
          className="text-xs font-semibold uppercase tracking-widest capitalize"
          style={{ color: 'var(--text-muted)' }}
        >
          {currentDate}
        </p>
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-h)' }}
        >
          {getGreeting()},{' '}
          <span style={{ color: 'var(--brand)' }}>{firstName}</span>
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative grid h-9 w-9 place-items-center rounded-lg transition-colors duration-150"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text-muted)',
          }}
          aria-label="Notificações"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white leading-none"
              style={{ background: 'var(--accent)' }}
            >
              {notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="group flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors duration-150"
          style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
        >
          <div
            className="grid h-6 w-6 flex-shrink-0 place-items-center rounded text-[11px] font-bold text-white"
            style={{ background: 'var(--brand)' }}
          >
            {initials}
          </div>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            {userName}
          </span>
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
            style={{ color: 'var(--text-muted)' }}
          />
        </button>
      </div>
    </header>
  )
}
