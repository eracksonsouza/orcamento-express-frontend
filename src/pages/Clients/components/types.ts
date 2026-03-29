import type { StatusTone } from '@/types/vehicle'
import type { ClientSummary, QuoteItem, VehicleItem, VehicleTypeOption } from '../types'

export type ClientHeaderProps = {
  name: string
  createdAt: string
}

export type ClientInfoFormProps = {
  name: string
  email: string
  phone: string
}

export type ClientsListProps = {
  clients: ClientSummary[]
  selectedId?: string
}

export type ProductivityTipProps = {
  title?: string
  description?: string
}

export type ClientRecentQuotesProps = {
  quotes: QuoteItem[]
}

export type ClientVehiclesFormProps = {
  vehicleTypes: VehicleTypeOption[]
}

export type ClientVehiclesTableProps = {
  vehicles: VehicleItem[]
}

export type StatusToneClassMap = Record<StatusTone, string>
