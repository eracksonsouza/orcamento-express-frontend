import { useEffect, useState } from 'react'
import { Bike, Car, Truck, Van, Warehouse } from 'lucide-react'
import { api } from '@/lib/api'
import type { CustomerVehiclesFormProps } from '../types'
import type { VehicleItem } from '../../types'
import { createVehicleSchema } from './schema'

const vehicleIconByType = {
  car: Car,
  bike: Bike,
  truck: Truck,
  van: Van,
  suv: Warehouse,
}

export default function VehiclesForm({
  vehicleTypes,
  customerId,
  onVehicleCreated,
  vehicleToEdit,
  onVehicleUpdated,
  onCancelEdit,
}: CustomerVehiclesFormProps) {
  const [selectedType, setSelectedType] = useState(vehicleTypes[0]?.id ?? '')
  const [licensePlate, setLicensePlate] = useState('')
  const [brand, setBrand] = useState('')
  const [year, setYear] = useState('')
  const [model, setModel] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const isEditing = Boolean(vehicleToEdit)

  useEffect(() => {
    if (vehicleToEdit) {
      setSelectedType(vehicleToEdit.type)
      setLicensePlate(vehicleToEdit.licensePlate)
      setBrand(vehicleToEdit.brand)
      setYear(String(vehicleToEdit.year))
      setModel(vehicleToEdit.model)
    } else {
      setSelectedType(vehicleTypes[0]?.id ?? '')
      setLicensePlate('')
      setBrand('')
      setYear('')
      setModel('')
    }
    setFieldErrors({})
  }, [vehicleToEdit])

  function resetForm() {
    setSelectedType(vehicleTypes[0]?.id ?? '')
    setLicensePlate('')
    setBrand('')
    setYear('')
    setModel('')
    setFieldErrors({})
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()

    const result = createVehicleSchema.safeParse({
      type: selectedType,
      licensePlate,
      brand,
      year: Number(year),
      model,
    })

    if (!result.success) {
      const errs: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const key = String(issue.path[0])
        if (!(key in errs)) errs[key] = issue.message
      }
      setFieldErrors(errs)
      return
    }

    setFieldErrors({})
    setIsLoading(true)

    try {
      if (isEditing && vehicleToEdit) {
        await api.patch(`/vehicles/${vehicleToEdit.id}`, result.data)
        onVehicleUpdated?.({ ...vehicleToEdit, ...result.data })
      } else {
        const { vehicle } = await api.post<{ vehicle: VehicleItem }>('/vehicles', {
          ...result.data,
          customerId,
          vehicleId: crypto.randomUUID(),
        })
        onVehicleCreated?.(vehicle)
        resetForm()
      }
    } catch {
      // TODO: show error toast
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-700">
          {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
        </h2>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Cancelar edição
          </button>
        )}
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-500">Tipo de Veículo</span>
          <div className="grid grid-cols-5 gap-1.5">
            {vehicleTypes.map((type) => {
              const Icon = vehicleIconByType[type.icon]
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 text-[11px] font-semibold transition ${
                    selectedType === type.id
                      ? 'border-(--accent-border) bg-(--accent-bg) text-(--accent)'
                      : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </button>
              )
            })}
          </div>
          {fieldErrors.type && <p className="text-xs text-red-500">{fieldErrors.type}</p>}
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Placa
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              placeholder="ABC1234"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
            />
            {fieldErrors.licensePlate ? (
              <span className="text-[10px] font-normal text-red-500">
                {fieldErrors.licensePlate}
              </span>
            ) : (
              <span className="text-[10px] font-normal text-slate-400">
                Formato Mercosul ou Tradicional
              </span>
            )}
          </label>
          <div className="flex items-end justify-center pb-5">
            <div className="overflow-hidden rounded-md border-2 border-[#1a3a6b] bg-white shadow-sm" style={{ width: 110 }}>
              <div className="flex items-center justify-center gap-1 bg-[#1a3a6b] px-1 py-0.5">
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
                  <rect width="10" height="7" fill="#009c3b"/>
                  <ellipse cx="5" cy="3.5" rx="2.5" ry="2.5" fill="#002776"/>
                  <ellipse cx="5" cy="3.5" rx="2" ry="2" fill="#009c3b"/>
                  <path d="M2.7 3.5 Q5 1.8 7.3 3.5" stroke="#FFDF00" strokeWidth="0.6" fill="none"/>
                </svg>
                <span className="text-[7px] font-bold tracking-[0.15em] text-white">BRASIL</span>
              </div>
              <div className="flex items-center justify-center py-1">
                <span className="font-mono text-base font-black tracking-widest text-slate-900">
                  {licensePlate || <span className="text-slate-300">· · ·</span>}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Marca
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Ex: Toyota"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
            />
            {fieldErrors.brand && (
              <span className="text-[10px] font-normal text-red-500">{fieldErrors.brand}</span>
            )}
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
            Ano
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Ex: 2024"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
            />
            {fieldErrors.year && (
              <span className="text-[10px] font-normal text-red-500">{fieldErrors.year}</span>
            )}
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
          Modelo
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Ex: Corolla XEI 2.0"
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
          />
          {fieldErrors.model && (
            <span className="text-[10px] font-normal text-red-500">{fieldErrors.model}</span>
          )}
        </label>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-(--accent) px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          <Car className="h-4 w-4" />
          {isLoading ? 'Salvando...' : isEditing ? 'Atualizar Veículo' : 'Salvar Veículo'}
        </button>
      </form>
    </section>
  )
}
