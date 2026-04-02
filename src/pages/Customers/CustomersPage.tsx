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
  { id: 'CAR', label: 'Carro', icon: 'car' },
  { id: 'MOTORCYCLE', label: 'Moto', icon: 'bike' },
  { id: 'TRUCK', label: 'Caminhão', icon: 'truck' },
  { id: 'VAN', label: 'Van', icon: 'van' },
  { id: 'SUV', label: 'SUV', icon: 'suv' },
]

function formatCreatedAt(isoDate: string): string {
  const date = new Date(isoDate)
  return `Cadastrado em ${date.toLocaleDateString('pt-BR')}`
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerSummary[]>([])
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSummary | null>(null)
  const [vehicles, setVehicles] = useState<VehicleItem[]>([])
  const [vehicleToEdit, setVehicleToEdit] = useState<VehicleItem | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    api.get<{ customers: CustomerSummary[] }>('/customers').then(({ customers }) => {
      setCustomers(customers)
      if (customers.length > 0) {
        setSelectedCustomerId(customers[0].id)
      }
    })
  }, [])

  useEffect(() => {
    if (!selectedCustomerId) return

    api
      .get<{ customer: CustomerSummary }>(`/customers/${selectedCustomerId}`)
      .then(({ customer }) => setSelectedCustomer(customer))
  }, [selectedCustomerId])

  useEffect(() => {
    if (!selectedCustomerId) return

    api
      .get<{ vehicles: VehicleItem[] }>(`/customers/${selectedCustomerId}/vehicles`)
      .then(({ vehicles }) => setVehicles(vehicles))
  }, [selectedCustomerId])

  async function handleCreateCustomer(data: {
    customerId: string
    name: string
    email: string
    phone: string
  }) {
    const { customer } = await api.post<{ customer: CustomerSummary }>('/customers', data)
    setCustomers((prev) => [customer, ...prev])
    setSelectedCustomerId(customer.id)
    setIsCreateModalOpen(false)
  }

  function handleVehicleCreated(vehicle: VehicleItem) {
    setVehicles((prev) => [vehicle, ...prev])
  }

  function handleVehicleUpdated(vehicle: VehicleItem) {
    setVehicles((prev) => prev.map((v) => (v.id === vehicle.id ? vehicle : v)))
    setVehicleToEdit(null)
  }

  function handleDeleteVehicle(vehicleId: string) {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId))
    if (vehicleToEdit?.id === vehicleId) setVehicleToEdit(null)
  }

  const selectedCustomerSummary = selectedCustomerId
    ? customers.find((customer) => customer.id === selectedCustomerId)
    : null
  const activeCustomer = selectedCustomer ?? selectedCustomerSummary

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
          <span className="text-slate-600">{activeCustomer?.name ?? '...'}</span>
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
          selectedId={selectedCustomerId ?? undefined}
          onSelect={(customer) => setSelectedCustomerId(customer.id)}
          onOpenCreate={() => setIsCreateModalOpen(true)}
        />

        {activeCustomer && (
          <div className="flex flex-col gap-6">
            <CustomerHeader
              name={activeCustomer.name}
              createdAt={formatCreatedAt(activeCustomer.createdAt)}
            />
            <CustomerInfoForm
              name={activeCustomer.name}
              email={activeCustomer.email}
              phone={activeCustomer.phone}
            />

            <div className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
              <VehiclesForm
                vehicleTypes={vehicleTypes}
                customerId={activeCustomer.id}
                onVehicleCreated={handleVehicleCreated}
                vehicleToEdit={vehicleToEdit}
                onVehicleUpdated={handleVehicleUpdated}
                onCancelEdit={() => setVehicleToEdit(null)}
              />
              <VehiclesTable
                vehicles={vehicles}
                onDelete={handleDeleteVehicle}
                onEdit={setVehicleToEdit}
              />
            </div>

            <ProductivityTip />
            <RecentQuotes quotes={[]} />
          </div>
        )}
      </div>
    </div>
  )
}
