import type { Quote } from './types'

export const quoteMock: Quote = {
  id: '1',
  number: '001',
  status: 'READY',
  createdAt: '24 de Outubro, 2023',
  createdBy: 'Ricardo M.',
  vehicle: {
    name: 'Honda Civic 2020',
    plate: 'ABC-1234',
    vin: 'I4RCVF',
  },
  client: {
    name: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'joao.silva@email.com',
  },
  items: [
    {
      id: '1',
      name: 'Parachoque Dianteiro',
      description: 'Peça Original Honda',
      quantity: 1,
      unitPrice: 1200,
    },
    {
      id: '2',
      name: 'Serviço de Pintura',
      description: 'Mão de obra especializada',
      quantity: 1,
      unitPrice: 450,
    },
  ],
  discount: 0,
  files: [
    { id: '1', type: 'pdf', name: 'Orcamento_001_Final.pdf', size: '1.3MB' },
    { id: '2', type: 'xlsx', name: 'Orcamento_001_Data.xlsx', size: '0KB' },
  ],
  statusHistory: [
    { label: 'Draft', date: 'Oct 24, 2023 10:30 AM', completed: true, current: false },
    { label: 'Review', date: 'Oct 25, 2023 02:15 PM', completed: true, current: false },
    { label: 'Ready', date: 'Oct 26, 2023 09:00 AM', completed: false, current: true },
  ],
}
