import type { ClientSummary, QuoteItem, VehicleItem, VehicleTypeOption } from './types'

export const clients: ClientSummary[] = [
  {
    id: 'client-1',
    name: 'João Silva',
    phone: '(11) 98765-4321',
    createdAt: 'Cadastrado em 12/05/2023',
  },
  {
    id: 'client-2',
    name: 'Maria Oliveira',
    phone: '(21) 99887-6655',
    createdAt: 'Cadastrado em 02/03/2023',
  },
  {
    id: 'client-3',
    name: 'Carlos Souza',
    phone: '(31) 97766-5544',
    createdAt: 'Cadastrado em 28/02/2023',
  },
  {
    id: 'client-4',
    name: 'Ana Paula Pereira',
    phone: '(47) 91234-5678',
    createdAt: 'Cadastrado em 12/01/2023',
  },
  {
    id: 'client-5',
    name: 'Roberto Santos',
    phone: '(11) 95544-3322',
    createdAt: 'Cadastrado em 22/12/2022',
  },
]

export const selectedClient = {
  id: 'client-1',
  name: 'João Silva',
  createdAt: 'Cadastrado em 12/05/2023',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
}

export const vehicleTypes: VehicleTypeOption[] = [
  { id: 'car', label: 'Carro', icon: 'car' },
  { id: 'moto', label: 'Moto', icon: 'bike' },
  { id: 'truck', label: 'Caminhão', icon: 'truck' },
  { id: 'van', label: 'Van', icon: 'van' },
  { id: 'suv', label: 'SUV', icon: 'suv' },
]

export const vehicles: VehicleItem[] = [
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
]

export const recentQuotes: QuoteItem[] = [
  {
    id: '#9832',
    vehicle: 'Toyota Corolla',
    status: 'Aprovado',
    date: '22/10/2023',
    total: 'R$ 1.250,00',
    statusTone: 'success',
  },
  {
    id: '#8541',
    vehicle: 'Honda HR-V',
    status: 'Pendente',
    date: '15/09/2023',
    total: 'R$ 450,00',
    statusTone: 'warning',
  },
]
