import { useState, useRef, useEffect } from 'react'
import { Eye, Pencil, Trash2, MoreHorizontal } from 'lucide-react'
import type { QuoteRowProps, QuoteRowStatusConfig, QuoteStatus } from '../types'

const statusAppearanceByQuoteStatus: Record<QuoteStatus, QuoteRowStatusConfig> = {
  GENERATING: {
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    label: 'Gerando',
    pulse: true,
  },
  READY: {
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    label: 'Pronto',
    pulse: false,
  },
  DRAFT: {
    dot: 'bg-slate-300',
    badge: 'bg-slate-50 text-slate-500 border border-slate-200',
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
    <tr className="group relative border-t border-slate-50 text-sm transition-colors duration-150 hover:bg-slate-50/80">
      <td className="relative px-5 py-3.5 pl-4">
        <div className="absolute left-0 top-0 h-full w-0.5 scale-y-0 rounded-r bg-blue-500 transition-transform duration-200 origin-center group-hover:scale-y-100" />
        <div className="font-semibold text-slate-800">{data.clientName}</div>
        <div className="text-xs text-slate-400">{data.vehicle}</div>
      </td>
      <td className="px-4 py-3.5 text-slate-500">{data.date}</td>
      <td className="px-4 py-3.5 font-bold tabular-nums text-slate-800">{data.value}</td>
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusAppearance.badge}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusAppearance.dot} ${statusAppearance.pulse ? 'animate-pulse' : ''}`}
          />
          {statusAppearance.label}
        </span>
      </td>
      <td className="px-4 py-3.5 text-right">
        <div className="relative inline-flex items-center justify-end gap-0.5" ref={menuRef}>
          <div className="flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              className="rounded-lg p-1.5 text-slate-400 transition-all duration-150 hover:bg-blue-50 hover:text-blue-600"
              title="Visualizar"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
            <button
              className="rounded-lg p-1.5 text-slate-400 transition-all duration-150 hover:bg-amber-50 hover:text-amber-600"
              title="Editar"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-1.5 text-slate-400 transition-all duration-150 hover:bg-slate-100 hover:text-slate-700"
            title="Mais opções"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50">
                <Eye className="h-3.5 w-3.5 text-slate-400" />
                Visualizar
              </button>
              <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs text-slate-600 transition-colors hover:bg-slate-50">
                <Pencil className="h-3.5 w-3.5 text-slate-400" />
                Editar
              </button>
              <div className="mx-3 border-t border-slate-100" />
              <button className="flex w-full items-center gap-2.5 px-3 py-2.5 text-xs text-rose-600 transition-colors hover:bg-rose-50">
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
