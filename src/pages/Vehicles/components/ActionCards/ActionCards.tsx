import type { ActionCardsProps } from '../types'

export default function ActionCards({ actions }: ActionCardsProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {actions.map((action) => (
        <div key={action.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800">{action.label}</h3>
          <p className="text-xs text-slate-500">{action.description}</p>
        </div>
      ))}
    </section>
  )
}
