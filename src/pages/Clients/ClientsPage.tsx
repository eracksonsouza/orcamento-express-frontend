import { Search } from 'lucide-react'
import {
  ClientHeader,
  ClientInfoForm,
  ClientsList,
  ProductivityTip,
  RecentQuotes,
  VehiclesForm,
  VehiclesTable,
} from './components'
import { clients, recentQuotes, selectedClient, vehicleTypes, vehicles } from './client-mock'

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          <span className="text-indigo-600">Clientes</span>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{selectedClient.name}</span>
          <span className="mx-2">›</span>
          <span className="text-slate-400">Gestão de Veículos</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar veículo..."
            className="w-48 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <ClientsList clients={clients} selectedId={selectedClient.id} />

        <div className="flex flex-col gap-6">
          <ClientHeader name={selectedClient.name} createdAt={selectedClient.createdAt} />
          <ClientInfoForm
            name={selectedClient.name}
            email={selectedClient.email}
            phone={selectedClient.phone}
          />

          <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
            <VehiclesForm vehicleTypes={vehicleTypes} />
            <VehiclesTable vehicles={vehicles} />
          </div>

          <ProductivityTip />
          <RecentQuotes quotes={recentQuotes} />
        </div>
      </div>
    </div>
  )
}
