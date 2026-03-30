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
}

export type CustomerVehiclesTableProps = {
  vehicles: VehicleItem[]
}

export type StatusToneClassMap = Record<StatusTone, string>
