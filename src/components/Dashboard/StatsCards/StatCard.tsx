import { FileText, WalletMinimal, Clock } from 'lucide-react'
import type { StatCardData, StatCardProps } from '../types'

const iconMap = {
  file: FileText,
  wallet: WalletMinimal,
  clock: Clock,
}

const accentColorByIcon: Record<StatCardData['icon'], string> = {
  file: 'var(--accent)',
  wallet: 'var(--status-ready)',
  clock: 'var(--brand)',
}

export default function StatCard({ data }: StatCardProps) {
  const Icon = iconMap[data.icon]
  const accentColor = accentColorByIcon[data.icon]

  const deltaColor =
    data.deltaType === 'positive'
      ? 'var(--status-ready)'
      : data.deltaType === 'negative'
        ? 'var(--status-failed)'
        : 'var(--text-muted)'

  return (
    <article
      className="group relative flex flex-col gap-3 rounded-lg p-5 transition-shadow duration-200 hover:shadow-md"
      style={{
        border: '1px solid var(--border)',
        background: 'var(--bg)',
        borderTop: `2.5px solid ${accentColor}`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: accentColor }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            {data.title}
          </span>
        </div>
        {data.delta && (
          <span
            className="text-xs font-medium tabular-nums"
            style={{ fontFamily: 'var(--font-data)', color: deltaColor }}
          >
            {data.delta}
          </span>
        )}
      </div>

      <p
        className="text-3xl font-medium tabular-nums leading-none"
        style={{ fontFamily: 'var(--font-data)', color: 'var(--text-h)' }}
      >
        {data.value}
      </p>

      {data.subtitle && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {data.subtitle}
        </p>
      )}
    </article>
  )
}
