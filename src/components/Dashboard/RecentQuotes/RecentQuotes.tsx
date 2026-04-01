import { Search, X, Plus } from 'lucide-react'
import { useState } from 'react'
import QuoteRow from './QuoteRow'
import type { DashboardRecentQuotesProps, QuoteFilter, QuoteFilterOption } from '../types'

const quoteFilters: QuoteFilterOption[] = [
  { key: 'ALL', label: 'Todos' },
  { key: 'GENERATING', label: 'Gerando' },
  { key: 'READY', label: 'Prontos' },
  { key: 'DRAFT', label: 'Rascunhos' },
]

export default function RecentQuotes({ quotes }: DashboardRecentQuotesProps) {
  const [activeFilter, setActiveFilter] = useState<QuoteFilter>('ALL')
  const [search, setSearch] = useState('')

  const filtered = quotes.filter((q) => {
    const matchFilter = activeFilter === 'ALL' || q.status === activeFilter
    const matchSearch =
      search === '' ||
      q.clientName.toLowerCase().includes(search.toLowerCase()) ||
      q.vehicle.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const quoteCountByFilter: Record<QuoteFilter, number> = {
    ALL: quotes.length,
    GENERATING: quotes.filter((q) => q.status === 'GENERATING').length,
    READY: quotes.filter((q) => q.status === 'READY').length,
    DRAFT: quotes.filter((q) => q.status === 'DRAFT').length,
  }

  return (
    <section
      className="overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border)', background: 'var(--bg)' }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-2.5">
          <h2 className="text-sm font-semibold" style={{ color: 'var(--text-h)' }}>
            Orçamentos Recentes
          </h2>
          <span
            className="rounded px-1.5 py-0.5 text-xs font-bold tabular-nums"
            style={{
              fontFamily: 'var(--font-data)',
              background: 'var(--accent-bg)',
              color: 'var(--accent)',
            }}
          >
            {quotes.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors duration-150 focus-within:ring-1"
            style={{
              border: '1px solid var(--border)',
              background: 'var(--bg-subtle)',
            }}
          >
            <Search className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Buscar cliente ou veículo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-44 bg-transparent text-sm focus:outline-none"
              style={{ color: 'var(--text)' }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ color: 'var(--text-muted)' }}
                className="transition-colors hover:opacity-70"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button
            className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <Plus className="h-3.5 w-3.5" />
            Novo
          </button>
        </div>
      </div>

      <div
        className="flex items-center gap-0.5 px-4 py-1"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {quoteFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className="flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium transition-colors duration-150"
            style={{
              color: activeFilter === key ? 'var(--accent)' : 'var(--text-muted)',
              background: activeFilter === key ? 'var(--accent-bg)' : 'transparent',
            }}
          >
            {label}
            <span
              className="min-w-4 text-center tabular-nums"
              style={{
                fontFamily: 'var(--font-data)',
                color: activeFilter === key ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {quoteCountByFilter[key]}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr>
              {['Cliente & Veículo', 'Data', 'Valor', 'Status', ''].map((col, i) => (
                <th
                  key={col || i}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest ${i === 4 ? 'text-right' : ''}`}
                  style={{
                    color: 'var(--text-muted)',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--bg-subtle)',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((quote) => <QuoteRow key={quote.id} data={quote} />)
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Nenhum orçamento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Exibindo{' '}
          <span className="font-semibold tabular-nums" style={{ fontFamily: 'var(--font-data)', color: 'var(--text)' }}>
            {filtered.length}
          </span>{' '}
          de{' '}
          <span className="font-semibold tabular-nums" style={{ fontFamily: 'var(--font-data)', color: 'var(--text)' }}>
            124
          </span>{' '}
          resultados
        </p>
        <div className="flex items-center gap-1">
          <button
            className="rounded px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            Anterior
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className="h-7 w-7 rounded text-xs font-semibold tabular-nums transition-colors"
              style={{
                fontFamily: 'var(--font-data)',
                background: n === 1 ? 'var(--accent)' : 'transparent',
                color: n === 1 ? '#fff' : 'var(--text-muted)',
                border: n === 1 ? 'none' : '1px solid var(--border)',
              }}
            >
              {n}
            </button>
          ))}
          <button
            className="rounded px-3 py-1.5 text-xs font-medium transition-colors hover:opacity-80"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            Próximo
          </button>
        </div>
      </div>
    </section>
  )
}
