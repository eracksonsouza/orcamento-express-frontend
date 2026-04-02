import type { VehicleActionItem, VehicleSummary, VehicleTypeOption } from './types'

export const vehicleTypes: VehicleTypeOption[] = [
  { id: 'car', label: 'Carro', icon: 'car' },
  { id: 'moto', label: 'Moto', icon: 'bike' },
  { id: 'truck', label: 'Caminhão', icon: 'truck' },
  { id: 'van', label: 'Van', icon: 'van' },
  { id: 'suv', label: 'SUV', icon: 'suv' },
]

export const vehicles: VehicleSummary[] = [
  {
    id: 'vehicle-1',
    brand: 'Toyota',
    model: 'Corolla XEI 2.0',
    licensePlate: 'ABC1D23',
    year: 2022,
    type: 'CAR',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'vehicle-2',
    brand: 'Honda',
    model: 'CB 500X',
    licensePlate: 'KTM9081',
    year: 2024,
    type: 'MOTORCYCLE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'vehicle-3',
    brand: 'Fiat',
    model: 'Toro Freedom 1.3',
    licensePlate: 'BRA2E19',
    year: 2021,
    type: 'TRUCK',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const quickActions: VehicleActionItem[] = [
  {
    id: 'action-1',
    label: 'Histórico completo',
    description: 'Acompanhe revisões e manutenções do cliente.',
  },
  {
    id: 'action-2',
    label: 'Checklist rápido',
    description: 'Crie checklists para inspeções da oficina.',
  },
]
