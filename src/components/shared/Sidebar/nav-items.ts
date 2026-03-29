import { LayoutDashboard, Users, Car, FileText, Settings } from 'lucide-react'
import type { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', href: '/clientes', icon: Users },
  { label: 'Veículos', href: '/veiculos', icon: Car },
  { label: 'Orçamentos', href: '/orcamentos', icon: FileText },
  { label: 'Configurações', href: '/configuracoes', icon: Settings },
]
