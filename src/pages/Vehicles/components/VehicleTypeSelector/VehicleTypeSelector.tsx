import { Bike, Car, Truck, Van, Warehouse } from 'lucide-react'
import type { VehicleTypeSelectorProps } from '../types'

const vehicleIconByType = {
  car: Car,
  bike: Bike,
  truck: Truck,
  van: Van,
  suv: Warehouse,
}

export default function VehicleTypeSelector({ options }: VehicleTypeSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {options.map((option, index) => {
        const Icon = vehicleIconByType[option.icon]
        return (
          <button
            key={option.id}
            className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 text-xs font-semibold transition ${
              index === 0
                ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
