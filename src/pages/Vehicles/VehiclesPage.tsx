import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { VehiclesTable } from './components'
import { api } from '@/lib/api'
import type { VehicleSummary } from './types'

type VehiclesResponse = {
  vehicles: VehicleSummary[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleSummary[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true)
      const query = search.trim() ? `?search=${encodeURIComponent(search)}` : ''
      api
        .get<VehiclesResponse>(`/vehicles${query}`)
        .then(({ vehicles }) => setVehicles(vehicles))
        .finally(() => setIsLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [search])

  function handleDelete(vehicleId: string) {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId))
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Veículos</h1>
          <p className="text-sm text-slate-500">
            Busque veículos cadastrados na frota de clientes.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por marca, modelo ou placa..."
            className="w-64 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </header>

      {isLoading ? (
        <p className="text-sm text-slate-400">Buscando...</p>
      ) : (
        <VehiclesTable vehicles={vehicles} onDelete={handleDelete} />
      )}
    </div>
  )
}
