import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import {
  CreateCustomerModal,
  CustomerHeader,
  CustomerInfoForm,
  CustomersList,
  ProductivityTip,
  RecentQuotes,
  VehiclesForm,
  VehiclesTable,
} from './components'
import type { CustomerSummary, VehicleItem, VehicleTypeOption } from './types'
import { api } from '@/lib/api'

const vehicleTypes: VehicleTypeOption[] = [
  { id: 'car', label: 'Carro', icon: 'car' },
  { id: 'moto', label: 'Moto', icon: 'bike' },
  { id: 'truck', label: 'Caminhão', icon: 'truck' },
  { id: 'van', label: 'Van', icon: 'van' },
  { id: 'suv', label: 'SUV', icon: 'suv' },
]

function formatCreatedAt(isoDate: string): string {
  const date = new Date(isoDate)
  return `Cadastrado em ${date.toLocaleDateString('pt-BR')}`
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null)
  const [vehicles, setVehicles] = useState<VehicleItem[]>([])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    api.get<{ customers: CustomerSummary[] }>('/customers').then(({ customers }) => {
      setCustomers(customers)
      if (customers.length > 0) {
        setSelectedCustomer(customers[0])
      }
    })
  }, [])

  useEffect(() => {
    if (!selectedCustomer) return

    api
      .get<{ vehicles: VehicleItem[] }>(`/customers/${selectedCustomer.id}/vehicles`)
      .then(({ vehicles }) => setVehicles(vehicles))
  }, [selectedCustomer])

  async function handleCreateCustomer(data: {
    customerId: string
    name: string
    email: string
    phone: string
  }) {
    const { customer } = await api.post<{ customer: CustomerSummary }>('/customers', data)
    setCustomers((prev) => [customer, ...prev])
    setSelectedCustomer(customer)
    setIsCreateModalOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {isCreateModalOpen && (
        <CreateCustomerModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateCustomer}
        />
      )}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          <span className="text-indigo-600">Clientes</span>
          <span className="mx-2">›</span>
          <span className="text-slate-600">{selectedCustomer?.name ?? '...'}</span>
          <span className="mx-2">›</span>
          <span className="text-slate-400">Gestão de Veículos</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar veículo..."
            className="w-48 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
          />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <CustomersList
          customers={customers}
          selectedId={selectedCustomer?.id}
          onSelect={setSelectedCustomer}
          onOpenCreate={() => setIsCreateModalOpen(true)}
        />

        {selectedCustomer && (
          <div className="flex flex-col gap-6">
            <CustomerHeader
              name={selectedCustomer.name}
              createdAt={formatCreatedAt(selectedCustomer.createdAt)}
            />
            <CustomerInfoForm
              name={selectedCustomer.name}
              email={selectedCustomer.email}
              phone={selectedCustomer.phone}
            />

            <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
              <VehiclesForm vehicleTypes={vehicleTypes} />
              <VehiclesTable vehicles={vehicles} />
            </div>

            <ProductivityTip />
            <RecentQuotes quotes={[]} />
          </div>
        )}
      </div>
    </div>
  )
}
