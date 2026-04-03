import { NavLink } from 'react-router-dom'
import { Plus, PanelLeftClose, PanelLeftOpen, Zap, Accessibility } from 'lucide-react'
import { cn } from '@/lib/utils'
import AccessibilityPanel from '@/components/shared/Accessibility/Accessibility'
import { NAV_ITEMS } from './nav-items'
import { useSidebarState } from './useSidebarState'

const S = {
  bg: 'linear-gradient(180deg, #131c2e 0%, #0d1522 100%)',
  border: '1px solid rgba(255,255,255,0.07)',
  divider: 'rgba(255,255,255,0.07)',
  text: 'rgba(148,163,184,0.8)',
  textActive: '#e2e8f0',
  iconActive: '#60a5fa',
  activeBg: 'rgba(59,130,246,0.13)',
  hoverBg: 'rgba(255,255,255,0.05)',
  indicatorGradient: 'linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%)',
  indicatorShadow: '0 0 10px rgba(59,130,246,0.7)',
  ctaGradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
  ctaShadow: '0 4px 18px rgba(37,99,235,0.35)',
  logoGlow: '0 0 22px rgba(37,99,235,0.45)',
  toggleBg: '#1a2740',
  toggleBorder: 'rgba(255,255,255,0.12)',
  toggleShadow: '0 2px 10px rgba(0,0,0,0.4)',
} as const

export default function Sidebar() {
  const { collapsed, accessibilityOpen, toggleCollapsed, toggleAccessibility, closeAccessibility } =
    useSidebarState()

  return (
    <aside
      className={cn(
        'relative flex h-screen flex-col',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-17' : 'w-55',
      )}
      style={{ background: S.bg, borderRight: S.border }}
    >
      {/* ── Logo ──────────────────────────────────────────── */}
      <div
        className={cn(
          'flex items-center gap-3 px-4 pt-6 pb-5 overflow-hidden',
          collapsed && 'justify-center px-0',
        )}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ background: S.ctaGradient, boxShadow: S.logoGlow }}
        >
          <Zap className="h-3.75 w-3.75 text-white" strokeWidth={2.5} />
        </span>

        <div
          className={cn(
            'flex flex-col overflow-hidden',
            'transition-[opacity,max-width] duration-200',
            collapsed ? 'max-w-0 opacity-0' : 'max-w-35 opacity-100',
          )}
        >
          <span
            className="whitespace-nowrap text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ color: 'rgba(226,232,240,0.9)' }}
          >
            Orçamento
          </span>
          <span
            className="whitespace-nowrap text-[10px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: '#3b82f6' }}
          >
            Express
          </span>
        </div>
      </div>

      {/* ── Divider ───────────────────────────────────────── */}
      <div className="mx-3 mb-2" style={{ height: 1, background: S.divider }} />

      {/* ── Nav ───────────────────────────────────────────── */}
      <nav className="mt-1 flex flex-1 flex-col gap-0.5 px-2">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-2.5 py-2.25 text-sm font-medium overflow-hidden',
                'transition-all duration-150',
                !isActive && 'hover:bg-[rgba(255,255,255,0.05)]',
                collapsed && 'justify-center px-0',
              )
            }
            style={({ isActive }) => ({
              background: isActive ? S.activeBg : undefined,
            })}
          >
            {({ isActive }) => (
              <>
                {/* Active left-border indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 rounded-full"
                    style={{
                      height: '55%',
                      background: S.indicatorGradient,
                      boxShadow: S.indicatorShadow,
                    }}
                  />
                )}

                <Icon
                  className="shrink-0 transition-colors duration-150"
                  style={{
                    height: 17,
                    width: 17,
                    color: isActive ? S.iconActive : S.text,
                  }}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />

                <span
                  className={cn(
                    'whitespace-nowrap overflow-hidden',
                    'transition-[opacity,max-width] duration-200',
                    collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100',
                  )}
                  style={{ color: isActive ? S.textActive : S.text }}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Bottom ────────────────────────────────────────── */}
      <div className="mt-auto flex flex-col gap-2 p-3">
        <div className="mb-1" style={{ height: 1, background: S.divider }} />

        {/* Accessibility toggle */}
        <button
          onClick={toggleAccessibility}
          title={collapsed ? 'Acessibilidade' : undefined}
          aria-label="Abrir painel de acessibilidade"
          aria-expanded={accessibilityOpen}
          className={cn(
            'group relative flex items-center gap-3 rounded-lg px-2.5 py-2.25 text-sm font-medium w-full overflow-hidden',
            'transition-all duration-150',
            !accessibilityOpen && 'hover:bg-[rgba(255,255,255,0.05)]',
            collapsed && 'justify-center px-0',
          )}
          style={{ background: accessibilityOpen ? S.activeBg : undefined }}
        >
          {accessibilityOpen && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
              style={{
                height: '55%',
                background: S.indicatorGradient,
                boxShadow: S.indicatorShadow,
              }}
            />
          )}

          <Accessibility
            className="shrink-0 transition-colors duration-150"
            style={{
              height: 17,
              width: 17,
              color: accessibilityOpen ? S.iconActive : S.text,
            }}
            strokeWidth={accessibilityOpen ? 2.2 : 1.8}
          />

          <span
            className={cn(
              'whitespace-nowrap overflow-hidden',
              'transition-[opacity,max-width] duration-200',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-40 opacity-100',
            )}
            style={{ color: accessibilityOpen ? S.textActive : S.text }}
          >
            Acessibilidade
          </span>
        </button>

        <AccessibilityPanel isOpen={accessibilityOpen} onClose={closeAccessibility} />

        {/* CTA */}
        <NavLink
          to="/criarOrcamento"
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg',
            'text-white text-sm font-semibold',
            'transition-all duration-150 hover:opacity-90 active:scale-[0.97]',
            collapsed ? 'h-10 w-10 mx-auto' : 'h-10 w-full px-4',
          )}
          style={{ background: S.ctaGradient, boxShadow: S.ctaShadow }}
        >
          <Plus className="h-3.75 w-3.75 shrink-0" strokeWidth={2.5} />
          <span
            className={cn(
              'whitespace-nowrap overflow-hidden',
              'transition-[opacity,max-width] duration-200',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-32.5 opacity-100',
            )}
          >
            Novo Orçamento
          </span>
        </NavLink>
      </div>

      {/* ── Collapse toggle ───────────────────────────────── */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? 'Expandir menu' : 'Minimizar menu'}
        className={cn(
          'absolute -right-3 top-18 z-10',
          'flex h-6 w-6 items-center justify-center rounded-full',
          'transition-all duration-150 hover:scale-110',
        )}
        style={{
          background: S.toggleBg,
          border: `1px solid ${S.toggleBorder}`,
          color: S.text,
          boxShadow: S.toggleShadow,
        }}
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
