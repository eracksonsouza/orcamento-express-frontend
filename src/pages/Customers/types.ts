import type { StatusTone, VehicleRecord } from '@/types/vehicle'

export type CustomerSummary = {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

export type VehicleItem = VehicleRecord

export type QuoteItem = {
  id: string
  vehicle: string
  status: string
  date: string
  total: string
  statusTone: StatusTone
}

export type { VehicleTypeOption } from '@/types/vehicle'
