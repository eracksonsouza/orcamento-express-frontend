import type { StatusTone } from '@/types/vehicle'
import type { VehicleActionItem, VehicleSummary, VehicleTypeOption } from '../types'

export type ActionCardsProps = {
  actions: VehicleActionItem[]
}

export type VehicleTypeSelectorProps = {
  options: VehicleTypeOption[]
}

export type VehiclesFormProps = {
  vehicleTypes: VehicleTypeOption[]
}

export type VehiclesTableProps = {
  vehicles: VehicleSummary[]
  onDelete?: (vehicleId: string) => void
}

export type StatusToneClassMap = Record<StatusTone, string>
