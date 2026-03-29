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
    <section className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Distribuição de Serviços</h2>
          <p className="mt-0.5 text-xs text-slate-400">Orçamentos do mês atual</p>
        </div>
        <span className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
          Out 2023
        </span>
      </header>
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
        {services.map((service) => (
          <div
            key={service.id}
            className={`h-full ${service.colorClass} transition-all duration-700 ease-out`}
            style={{
              width: segAnimated ? `${service.percentage}%` : '0%',
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
