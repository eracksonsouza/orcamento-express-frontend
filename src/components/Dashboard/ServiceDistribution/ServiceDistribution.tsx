import { useEffect, useState } from 'react'
import ServiceBar from './ServiceBar'
import type { ServiceDistributionProps } from '../types'

export default function ServiceDistribution({ services }: ServiceDistributionProps) {
  const [segAnimated, setSegAnimated] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setSegAnimated(true), 100)
    return () => clearTimeout(id)
  }, [])

  return (
    <section
      className="flex flex-col gap-5 rounded-lg p-5"
      style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
    >
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
            Distribuição de Serviços
          </h2>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            Orçamentos do mês atual
          </p>
        </div>
        <span
          className="rounded px-2 py-0.5 text-xs font-medium tabular-nums"
          style={{
            fontFamily: 'var(--font-data)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          Out 2023
        </span>
      </header>

      <div
        className="flex h-2 overflow-hidden rounded-sm"
        style={{ background: 'var(--border)' }}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className="h-full"
            style={{
              width: segAnimated ? `${service.percentage}%` : '0%',
              background: service.colorClass,
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
      </div>

      <div className="space-y-3">
        {services.map((service) => (
          <ServiceBar key={service.id} data={service} />
        ))}
      </div>
    </section>
  )
}
