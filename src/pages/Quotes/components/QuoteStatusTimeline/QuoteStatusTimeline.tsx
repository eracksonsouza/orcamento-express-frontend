import { Check } from 'lucide-react'
import type { QuoteStatusTimelineProps } from '../types'

export default function QuoteStatusTimeline({ statusHistory }: QuoteStatusTimelineProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header>
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          Status do Processo
        </h2>
      </header>
      <ol className="flex flex-col gap-0">
        {statusHistory.map((step, index) => {
          const isLast = index === statusHistory.length - 1

          return (
            <li key={step.label} className="flex gap-3">
              {/* Icon + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                    step.current
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : step.completed
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-200 bg-white text-slate-400'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" />
                </div>
                {!isLast && <div className="my-1 w-px flex-1 bg-slate-200" />}
              </div>

              {/* Content */}
              <div className={`pb-4 ${isLast ? 'pb-0' : ''}`}>
                <p
                  className={`text-sm font-semibold ${
                    step.current ? 'text-indigo-600' : 'text-slate-700'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-slate-400">{step.date}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
