export type ClientType = 'pf' | 'pj'

export type VehicleType = 'car' | 'moto' | 'truck' | 'van' | 'suv'

export interface DraftItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export interface DraftClient {
  type: ClientType
  name: string
  doc: string
  phone: string
  email: string
}

export interface DraftVehicle {
  type: VehicleType
  plate: string
  brand: string
  model: string
  year: string
  color: string
  mileage: string
}

export interface DraftQuote {
  client: DraftClient
  vehicle: DraftVehicle
  items: DraftItem[]
  discount: number
  notes: string
}

export type WizardStep = 1 | 2 | 3 | 4
