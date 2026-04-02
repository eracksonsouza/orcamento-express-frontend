import { ReceiptText } from 'lucide-react'
import type { CustomerRecentQuotesProps, StatusToneClassMap } from '../types'

const statusToneClassByType: StatusToneClassMap = {
  success: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-600 ring-1 ring-amber-200',
  info: 'bg-blue-50 text-blue-600 ring-1 ring-blue-200',
}

export default function RecentQuotes({ quotes }: CustomerRecentQuotesProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <ReceiptText className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-700">Últimos Orçamentos</h2>
      </header>
      {quotes.length === 0 ? (
        <p className="py-4 text-center text-xs text-slate-400">Nenhum orçamento registrado</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">ID</th>
                <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Veículo</th>
                <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Data</th>
                <th className="px-2 pb-2 pt-0 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.map((quote) => (
                <tr key={quote.id} className="group">
                  <td className="px-2 py-3 font-mono text-xs font-semibold text-(--accent)">{quote.id}</td>
                  <td className="px-2 py-3 text-slate-700">{quote.vehicle}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusToneClassByType[quote.statusTone]}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-slate-500">{quote.date}</td>
                  <td className="px-2 py-3 font-semibold text-slate-800">{quote.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
