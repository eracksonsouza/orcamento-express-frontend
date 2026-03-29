import { Search } from 'lucide-react'
import { ActionCards, VehiclesForm, VehiclesTable } from './components'
import { quickActions, vehicleTypes, vehicles } from './vehicle-mock'

export default function VehiclesPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Quarta-feira, 25 de março
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">Veículos</h1>
          <p className="text-sm text-slate-500">
            Gestão completa da frota de clientes.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">
            <Search className="h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar veículo..."
              className="w-48 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            Novo
          </button>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
        <VehiclesForm vehicleTypes={vehicleTypes} />
        <div className="flex flex-col gap-6">
          <VehiclesTable vehicles={vehicles} />
          <ActionCards actions={quickActions} />
        </div>
      </div>
    </div>
  )
}
