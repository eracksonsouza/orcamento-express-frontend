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
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 capitalize">
          {currentDate}
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900">
          {getGreeting()},{' '}
          <span className="text-brand-gradient">{firstName}</span>
        </h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
          aria-label="Notificações"
        >
          <Bell className="h-[18px] w-[18px]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[9px] font-bold text-white leading-none">
              {notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
          <div className="bg-brand-gradient grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-xs font-bold text-white">
            {initials}
          </div>
          <span className="text-sm font-semibold text-slate-700">{userName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
        </button>
      </div>
    </header>
  )
}
