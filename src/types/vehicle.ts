export type VehicleTypeIcon = 'car' | 'bike' | 'truck' | 'van' | 'suv'

export type StatusTone = 'success' | 'warning' | 'info'

export type VehicleTypeOption = {
  id: string
  label: string
  icon: VehicleTypeIcon
}

export type VehicleRecord = {
  id: string
  brand: string
  model: string
  year: number
  licensePlate: string
  type: string
  createdAt: string
  updatedAt: string
}
