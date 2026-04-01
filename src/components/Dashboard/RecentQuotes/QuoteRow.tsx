import { useState, useRef, useEffect } from 'react'
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import type { QuoteRowProps, QuoteRowStatusConfig, QuoteStatus } from '../types'

const statusAppearanceByQuoteStatus: Record<QuoteStatus, QuoteRowStatusConfig> = {
  GENERATING: {
    dot: 'var(--status-generating)',
    badge: '',
    label: 'Gerando',
    pulse: true,
  },
  READY: {
    dot: 'var(--status-ready)',
    badge: '',
    label: 'Pronto',
    pulse: false,
  },
  DRAFT: {
    dot: 'var(--status-draft)',
    badge: '',
    label: 'Rascunho',
    pulse: false,
  },
}

export default function QuoteRow({ data }: QuoteRowProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const statusAppearance = statusAppearanceByQuoteStatus[data.status]

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <tr
      className="group relative text-sm transition-colors duration-100"
      style={{ borderTop: '1px solid var(--border)' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
    >
      <td className="px-5 py-3.5">
        <div className="font-medium" style={{ color: 'var(--text-h)' }}>
          {data.clientName}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {data.vehicle}
        </div>
      </td>
      <td className="px-4 py-3.5 tabular-nums" style={{ fontFamily: 'var(--font-data)', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        {data.date}
      </td>
      <td className="px-4 py-3.5 font-medium tabular-nums" style={{ fontFamily: 'var(--font-data)', color: 'var(--text-h)' }}>
        {data.value}
      </td>
      <td className="px-4 py-3.5">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium"
          style={{ color: statusAppearance.dot }}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${statusAppearance.pulse ? 'animate-pulse' : ''}`}
            style={{ background: statusAppearance.dot }}
          />
          {statusAppearance.label}
        </span>
      </td>
      <td className="px-4 py-3.5 text-right">
        <div className="relative inline-flex items-center justify-end gap-0.5" ref={menuRef}>
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <button
              className="rounded p-1.5 transition-colors duration-100"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--accent-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
              title="Visualizar"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
            <button
              className="rounded p-1.5 transition-colors duration-100"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--brand-bg)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
              title="Editar"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded p-1.5 transition-colors duration-100"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
            title="Mais opções"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg shadow-lg"
              style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
            >
              <button
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs transition-colors"
                style={{ color: 'var(--text)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
              >
                <Eye className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                Visualizar
              </button>
              <button
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs transition-colors"
                style={{ color: 'var(--text)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-subtle)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
              >
                <Pencil className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
                Editar
              </button>
              <div style={{ borderTop: '1px solid var(--border)', margin: '0 12px' }} />
              <button
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs transition-colors"
                style={{ color: 'var(--status-failed)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--status-failed-bg)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  )
}
