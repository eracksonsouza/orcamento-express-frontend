import { NavLink } from 'react-router-dom'
import { Plus, PanelLeftClose, PanelLeftOpen, Zap, Accessibility } from 'lucide-react'
import { cn } from '@/lib/utils'
import AccessibilityPanel from '@/components/shared/Accessibility/Accessibility'
import { NAV_ITEMS } from './nav-items'
import { useSidebarState } from './useSidebarState'

export default function Sidebar() {
  const { collapsed, accessibilityOpen, toggleCollapsed, toggleAccessibility, closeAccessibility } =
    useSidebarState()

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col bg-(--bg) border-r border-(--border)',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-17' : 'w-55',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-5 overflow-hidden',
          collapsed && 'justify-center px-0',
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
          <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
        </span>

        <span
          className={cn(
            'whitespace-nowrap text-[15px] font-semibold tracking-tight text-(--text-h)',
            'transition-[opacity,width] duration-200',
            collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100',
          )}
        >
          Orçamento Express
        </span>
      </div>

      <nav className="mt-1 flex flex-1 flex-col gap-0.5 px-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium',
                'transition-colors duration-150',
                isActive
                  ? 'bg-(--accent-bg) text-(--accent)'
                  : 'text-(--text-muted) hover:bg-(--bg-subtle) hover:text-(--text-h)',
                collapsed && 'justify-center px-0',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'h-4.5 w-4.5 shrink-0 transition-colors duration-150',
                    isActive ? 'text-(--accent)' : 'text-(--text-muted) group-hover:text-(--text)',
                  )}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <span
                  className={cn(
                    'whitespace-nowrap overflow-hidden',
                    'transition-[opacity,max-width] duration-200',
                    collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100',
                  )}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-3 p-3">
        <button
          onClick={toggleAccessibility}
          aria-label="Abrir painel de acessibilidade"
          aria-expanded={accessibilityOpen}
          className={cn(
            'group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium',
            'transition-colors duration-150',
            accessibilityOpen
              ? 'bg-(--accent-bg) text-(--accent)'
              : 'text-(--text-muted) hover:bg-(--bg-subtle) hover:text-(--text-h)',
            collapsed && 'justify-center px-0',
          )}
        >
          <Accessibility
            className={cn(
              'h-4.5 w-4.5 shrink-0 transition-colors duration-150',
              accessibilityOpen
                ? 'text-(--accent)'
                : 'text-(--text-muted) group-hover:text-(--text)',
            )}
            strokeWidth={accessibilityOpen ? 2.2 : 1.8}
          />
          <span
            className={cn(
              'whitespace-nowrap overflow-hidden',
              'transition-[opacity,max-width] duration-200',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100',
            )}
          >
            Acessibilidade
          </span>
        </button>

        <AccessibilityPanel isOpen={accessibilityOpen} onClose={closeAccessibility} />

        <NavLink
          to="/criarOrcamento"
          className={cn(
            'flex items-center justify-center gap-2 rounded-xl',
            'bg-(--accent) text-white text-sm font-semibold',
            'shadow-md shadow-(--accent)/20',
            'transition-all duration-150 hover:opacity-90 active:scale-[0.97]',
            collapsed ? 'h-10 w-10 mx-auto' : 'h-10 w-full px-4',
          )}
        >
          <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span
            className={cn(
              'whitespace-nowrap overflow-hidden',
              'transition-[opacity,max-width] duration-200',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-35 opacity-100',
            )}
          >
            Novo Orçamento
          </span>
        </NavLink>
      </div>

      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? 'Expandir menu' : 'Minimizar menu'}
        className={cn(
          'absolute -right-3 top-18 z-10',
          'flex h-6 w-6 items-center justify-center rounded-full',
          'border border-(--border) bg-(--bg) shadow-sm',
          'text-(--text-muted) hover:text-(--text-h)',
          'transition-colors duration-150',
        )}
      >
        {collapsed ? (
          <PanelLeftOpen className="h-3 w-3" strokeWidth={2} />
        ) : (
          <PanelLeftClose className="h-3 w-3" strokeWidth={2} />
        )}
      </button>
    </aside>
  )
}
