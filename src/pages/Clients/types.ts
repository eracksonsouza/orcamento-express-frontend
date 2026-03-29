import type { StatusTone, VehicleRecord } from '@/types/vehicle'

export type ClientSummary = {
  id: string
  name: string
  phone: string
  createdAt: string
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
