import { Plus, Search } from 'lucide-react'
import type { CustomersListProps } from '../types'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function CustomersList({ customers, selectedId, onSelect, onOpenCreate }: CustomersListProps) {
  return (
    <aside className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="flex items-center justify-between pb-1">
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Clientes</h2>
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-2.5 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Novo
        </button>
      </header>
      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <Search className="h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Pesquisar cliente..."
          className="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        {customers.map((customer) => {
          const isSelected = customer.id === selectedId
          return (
            <button
              key={customer.id}
              onClick={() => onSelect(customer)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                isSelected
                  ? 'bg-(--accent-bg) ring-1 ring-(--accent-border)'
                  : 'hover:bg-slate-50'
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                  isSelected
                    ? 'bg-(--accent) text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {getInitials(customer.name)}
              </span>
              <div className="min-w-0">
                <div className={`truncate text-sm font-semibold ${isSelected ? 'text-(--accent)' : 'text-slate-800'}`}>
                  {customer.name}
                </div>
                <div className="truncate text-xs text-slate-400">{customer.phone}</div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
