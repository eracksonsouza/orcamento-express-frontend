import { FileText, WalletMinimal, Clock } from 'lucide-react'
import type { StatCardColorConfig, StatCardData, StatCardProps } from '../types'

const iconMap = {
  file: FileText,
  wallet: WalletMinimal,
  clock: Clock,
}

const statCardPaletteByIcon: Record<StatCardData['icon'], StatCardColorConfig> = {
  file: {
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-600',
    borderLeft: 'border-l-blue-500',
    deltaBg: {
      positive: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      negative: 'bg-rose-50 text-rose-700 border border-rose-200',
      neutral: 'bg-slate-100 text-slate-500',
    },
  },
  wallet: {
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-600',
    borderLeft: 'border-l-emerald-500',
    deltaBg: {
      positive: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      negative: 'bg-rose-50 text-rose-700 border border-rose-200',
      neutral: 'bg-slate-100 text-slate-500',
    },
  },
  clock: {
    iconBg: 'bg-amber-50',
    iconText: 'text-amber-600',
    borderLeft: 'border-l-amber-500',
    deltaBg: {
      positive: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      negative: 'bg-rose-50 text-rose-700 border border-rose-200',
      neutral: 'bg-slate-100 text-slate-500',
    },
  },
}

const statCardGlowClassByIcon: Record<StatCardData['icon'], string> = {
  file: 'stat-card-glow-file',
  wallet: 'stat-card-glow-wallet',
  clock: 'stat-card-glow-clock',
}

export default function StatCard({ data }: StatCardProps) {
  const Icon = iconMap[data.icon]
  const colors = statCardPaletteByIcon[data.icon]
  const deltaClass = data.deltaType ? colors.deltaBg[data.deltaType] : ''
  const glowClass = statCardGlowClassByIcon[data.icon]

  return (
    <article
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200 border-l-4 ${colors.borderLeft}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${glowClass}`}
      />

      <div className="relative flex items-start justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${colors.iconBg} ${colors.iconText} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {data.delta && (
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${deltaClass}`}>
            {data.delta}
          </span>
        )}
      </div>

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{data.title}</p>
        <p className="mt-1 text-2xl font-extrabold tabular-nums text-slate-900">{data.value}</p>
        {data.subtitle && <p className="mt-0.5 text-xs text-slate-400">{data.subtitle}</p>}
      </div>
    </article>
  )
}
