import { Bike, Car, Truck, Van, Warehouse, Bookmark } from 'lucide-react'
import type { ClientVehiclesFormProps } from '../types'

const vehicleIconByType = {
  car: Car,
  bike: Bike,
  truck: Truck,
  van: Van,
  suv: Warehouse,
}

export default function VehiclesForm({ vehicleTypes }: ClientVehiclesFormProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header>
        <h2 className="text-lg font-semibold text-slate-800">Novo Veículo</h2>
        <p className="text-xs text-slate-400">Tipo de Veículo</p>
      </header>
      <div className="grid grid-cols-5 gap-2">
        {vehicleTypes.map((type, index) => {
          const Icon = vehicleIconByType[type.icon]
          return (
            <button
              key={type.id}
              className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                index === 0
                  ? 'border-indigo-400 bg-indigo-50 text-indigo-600'
                  : 'border-slate-200 text-slate-400 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {type.label}
            </button>
          )
        })}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          Placa
          <input
            type="text"
            defaultValue="BRA2E19"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
          <span className="text-[10px] font-normal text-slate-400">
            Formato Mercosul ou Tradicional
          </span>
        </label>
        <div className="flex items-end justify-center">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
            <Bookmark className="h-4 w-4 text-indigo-600" />
            BRA2E19
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          Marca
          <select className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
            <option>Toyota</option>
            <option>Honda</option>
            <option>Volkswagen</option>
          </select>
        </label>
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          Ano
          <input
            type="text"
            defaultValue="2024"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </label>
      </div>
      <label className="space-y-2 text-xs font-semibold text-slate-500">
        Modelo
        <input
          type="text"
          placeholder="Ex: Corolla XEI 2.0"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
        />
      </label>
      <button className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
        <Car className="h-4 w-4" />
        Salvar Veículo
      </button>
    </section>
  )
}
