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
    model: 'Toyota Corolla',
    plate: 'ABC1D23',
    year: '2022',
    status: 'Ativo',
    statusTone: 'success',
  },
  {
    id: 'vehicle-2',
    model: 'Honda CB 500X',
    plate: 'KTM-9081',
    year: '2024',
    status: 'Em Reparo',
    statusTone: 'info',
  },
  {
    id: 'vehicle-3',
    model: 'Fiat Toro',
    plate: 'BRA2E19',
    year: '2021',
    status: 'Pendente',
    statusTone: 'warning',
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
