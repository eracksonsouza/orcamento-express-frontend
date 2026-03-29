export type VehicleTypeIcon = 'car' | 'bike' | 'truck' | 'van' | 'suv'

export type StatusTone = 'success' | 'warning' | 'info'

export type VehicleTypeOption = {
  id: string
  label: string
  icon: VehicleTypeIcon
}

export type VehicleRecord = {
  id: string
  model: string
  plate: string
  year: string
  status: string
  statusTone: StatusTone
}
