import { Pencil, Trash2, SlidersHorizontal, Car, Bike, Truck, Van, Warehouse, History } from 'lucide-react'
import { useState } from 'react'
import { api } from '@/lib/api'
import type { CustomerVehiclesTableProps } from '../types'

const vehicleIconByType: Record<string, React.ElementType> = {
  CAR: Car,
  MOTORCYCLE: Bike,
  TRUCK: Truck,
  VAN: Van,
  SUV: Warehouse,
}

const vehicleLabelByType: Record<string, string> = {
  CAR: 'Carro',
  MOTORCYCLE: 'Moto',
  TRUCK: 'Caminhão',
  VAN: 'Van',
  SUV: 'SUV',
}

export default function VehiclesTable({ vehicles, onDelete, onEdit }: CustomerVehiclesTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(vehicleId: string) {
    setDeletingId(vehicleId)
    try {
      await api.delete(`/vehicles/${vehicleId}`)
      onDelete?.(vehicleId)
    } catch {
      // TODO: show error toast
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-700">Veículos do Cliente</h2>
          <p className="text-xs text-slate-400">
            {vehicles.length} {vehicles.length === 1 ? 'veículo cadastrado' : 'veículos cadastrados'}
          </p>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50">
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Veículo</th>
              <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Placa</th>
              <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tipo</th>
              <th className="px-2 pb-2 pt-0 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vehicles.map((vehicle) => {
              const TypeIcon = vehicleIconByType[vehicle.type] ?? Car
              return (
                <tr key={vehicle.id} className="group">
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                        <TypeIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        <div className="text-xs text-slate-400">{vehicle.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
                      {vehicle.licensePlate}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-xs text-slate-500">
                    {vehicleLabelByType[vehicle.type] ?? vehicle.type.toLowerCase()}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={() => onEdit?.(vehicle)}
                        disabled={deletingId === vehicle.id}
                        className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-(--accent-bg) hover:text-(--accent) disabled:opacity-40"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        disabled={deletingId === vehicle.id}
                        className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <button className="flex items-center gap-1.5 text-xs font-semibold text-(--accent) transition hover:opacity-70">
        <History className="h-3.5 w-3.5" />
        Ver histórico completo de veículos
      </button>
    </section>
  )
}
