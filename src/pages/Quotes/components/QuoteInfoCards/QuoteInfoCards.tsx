import { Car, User } from 'lucide-react'
import type { QuoteInfoCardsProps } from '../types'

export default function QuoteInfoCards({ vehicle, client }: QuoteInfoCardsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Vehicle Card */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
          {vehicle.imageUrl ? (
            <img src={vehicle.imageUrl} alt={vehicle.name} className="h-full w-full object-cover" />
          ) : (
            <Car className="h-8 w-8 text-slate-400" />
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Veículo
          </span>
          <p className="font-semibold text-slate-800">{vehicle.name}</p>
          <p className="text-sm text-slate-500">Placa: {vehicle.plate}</p>
          <p className="text-xs text-slate-400">VIN: {vehicle.vin}</p>
        </div>
      </div>

      {/* Client Card */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-50">
          <User className="h-8 w-8 text-indigo-400" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            Cliente
          </span>
          <p className="font-semibold text-slate-800">{client.name}</p>
          <p className="text-sm text-slate-500">{client.phone}</p>
          <p className="text-sm text-slate-400">{client.email}</p>
        </div>
      </div>
    </div>
  )
}
