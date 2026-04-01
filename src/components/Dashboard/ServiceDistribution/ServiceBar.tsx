import { useEffect, useState } from 'react'
import type { ServiceBarProps } from '../types'

export default function ServiceBar({ data }: ServiceBarProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 shrink-0 rounded-sm"
            style={{ background: data.colorClass }}
          />
          <span className="text-xs font-medium" style={{ color: 'var(--text)' }}>
            {data.label}
          </span>
        </div>
        <span
          className="text-xs tabular-nums"
          style={{ fontFamily: 'var(--font-data)', color: 'var(--text-muted)' }}
        >
          {data.percentage}%
        </span>
      </div>
      <div
        className="relative h-1.5 overflow-hidden rounded-sm"
        style={{ background: 'var(--border)' }}
      >
        <div
          className="absolute left-0 top-0 h-full rounded-sm"
          style={{
            width: animated ? `${data.percentage}%` : '0%',
            background: data.colorClass,
            transition: 'width 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  )
}
