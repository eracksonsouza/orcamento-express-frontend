import { Pencil, Trash2, SlidersHorizontal } from 'lucide-react'
import type { CustomerVehiclesTableProps } from '../types'

export default function VehiclesTable({ vehicles }: CustomerVehiclesTableProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Veículos do Cliente</h2>
          <p className="text-xs text-slate-400">{vehicles.length} veículos cadastrados</p>
        </div>
        <button className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-2 py-2">Veículo</th>
              <th className="px-2 py-2">Placa</th>
              <th className="px-2 py-2">Tipo</th>
              <th className="px-2 py-2 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="border-t border-slate-100">
                <td className="px-2 py-3">
                  <div className="font-medium text-slate-800">
                    {vehicle.brand} {vehicle.model}
                  </div>
                  <div className="text-xs text-slate-400">{vehicle.year}</div>
                </td>
                <td className="px-2 py-3 text-slate-500">{vehicle.licensePlate}</td>
                <td className="px-2 py-3 text-slate-500 capitalize">{vehicle.type}</td>
                <td className="px-2 py-3">
                  <div className="flex justify-end gap-3 text-slate-400">
                    <button>
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="text-xs font-semibold text-indigo-600">
        Ver histórico completo de veículos
      </button>
    </section>
  )
}
