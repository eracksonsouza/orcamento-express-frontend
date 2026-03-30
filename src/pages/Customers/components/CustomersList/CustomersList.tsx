import { Plus, Search } from 'lucide-react'
import type { CustomersListProps } from '../types'

export default function CustomersList({ customers, selectedId, onSelect, onOpenCreate }: CustomersListProps) {
  return (
    <aside className="flex h-full flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Clientes</h2>
        <button
          onClick={onOpenCreate}
          className="grid h-9 w-9 place-items-center rounded-full bg-indigo-500 text-white shadow-sm"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </header>
      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
        <Search className="h-4 w-4" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        {customers.map((customer) => (
          <button
            key={customer.id}
            onClick={() => onSelect(customer)}
            className={`rounded-xl px-3 py-3 text-left transition ${
              customer.id === selectedId ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50'
            }`}
          >
            <div className="text-sm font-semibold text-slate-800">{customer.name}</div>
            <div className="text-xs text-slate-400">{customer.phone}</div>
          </button>
        ))}
      </div>
    </aside>
  )
}
