import type { StatusTone } from '@/types/vehicle'
import type { CustomerSummary, QuoteItem, VehicleItem, VehicleTypeOption } from '../types'

export type CustomerHeaderProps = {
  name: string
  createdAt: string
}

export type CustomerInfoFormProps = {
  name: string
  email: string
  phone: string
}

export type CustomersListProps = {
  customers: CustomerSummary[]
  selectedId?: string
  onSelect: (customer: CustomerSummary) => void
  onOpenCreate: () => void
}

export type ProductivityTipProps = {
  title?: string
  description?: string
}

export type CustomerRecentQuotesProps = {
  quotes: QuoteItem[]
}

export type CustomerVehiclesFormProps = {
  vehicleTypes: VehicleTypeOption[]
  customerId: string
  onVehicleCreated?: (vehicle: VehicleItem) => void
  vehicleToEdit?: VehicleItem | null
  onVehicleUpdated?: (vehicle: VehicleItem) => void
  onCancelEdit?: () => void
}

export type CustomerVehiclesTableProps = {
  vehicles: VehicleItem[]
  onDelete?: (vehicleId: string) => void
  onEdit?: (vehicle: VehicleItem) => void
}

export type StatusToneClassMap = Record<StatusTone, string>
