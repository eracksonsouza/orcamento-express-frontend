import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/shared/Sidebar/SideBar'
import DashboardPage from './pages/Dashboard'
import CustomersPage from './pages/Customers'
import VehiclesPage from './pages/Vehicles'
import QuotesPage from './pages/Quotes'
import CreateQuotePage from './pages/CreateQuote'
import SettingsPage from './pages/Settings'

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-slate-50 p-6 md:p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clientes" element={<CustomersPage />} />
          <Route path="/veiculos" element={<VehiclesPage />} />
          <Route path="/orcamentos" element={<QuotesPage />} />
          <Route path="/criarOrcamento" element={<CreateQuotePage />} />
          <Route path="/configuracoes" element={<SettingsPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
