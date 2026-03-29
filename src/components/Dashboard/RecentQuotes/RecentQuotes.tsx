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
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-slate-800">Orçamentos Recentes</h2>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600">
            {quotes.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm transition-all duration-200 focus-within:border-blue-300 focus-within:bg-white">
            <Search className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar cliente ou veículo…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-44 bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-slate-400 transition-colors hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md">
            <Plus className="h-3.5 w-3.5" />
            Novo
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1 border-b border-slate-100 px-4 py-1.5">
        {quoteFilters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              activeFilter === key
                ? 'bg-blue-50 text-blue-600'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {label}
            <span
              className={`min-w-[18px] rounded-full px-1 py-0 text-[10px] font-bold leading-4 text-center transition-colors ${
                activeFilter === key ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'
              }`}
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
              <th className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Cliente & Veículo
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Data
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Valor
              </th>
              <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-slate-400">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((quote) => <QuoteRow key={quote.id} data={quote} />)
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-400">
                  Nenhum orçamento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3">
        <p className="text-xs text-slate-400">
          Exibindo <span className="font-bold text-slate-600">{filtered.length}</span> de{' '}
          <span className="font-bold text-slate-600">124</span> resultados
        </p>
        <div className="flex items-center gap-1.5">
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700">
            Anterior
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`h-7 w-7 rounded-lg text-xs font-bold transition-all duration-200 ${
                n === 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700">
            Próximo
          </button>
        </div>
      </div>
    </section>
  )
}
