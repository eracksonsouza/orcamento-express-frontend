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
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${data.colorClass}`} />
          <span className="font-medium text-slate-700">{data.label}</span>
        </div>
        <span className="tabular-nums text-xs font-bold text-slate-600">{data.percentage}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${data.colorClass}`}
          style={{
            width: animated ? `${data.percentage}%` : '0%',
            transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>
    </div>
  )
}
