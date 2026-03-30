import type { CustomerRecentQuotesProps, StatusToneClassMap } from '../types'

const statusToneClassByType: StatusToneClassMap = {
  success: 'bg-emerald-100 text-emerald-600',
  warning: 'bg-amber-100 text-amber-600',
  info: 'bg-indigo-100 text-indigo-600',
}

export default function RecentQuotes({ quotes }: CustomerRecentQuotesProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-indigo-100" />
        <h2 className="text-sm font-semibold text-slate-800">Últimos Orçamentos</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-2 py-2">ID</th>
              <th className="px-2 py-2">Veículo</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Data</th>
              <th className="px-2 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id} className="border-t border-slate-100">
                <td className="px-2 py-3 text-indigo-600">{quote.id}</td>
                <td className="px-2 py-3 text-slate-700">{quote.vehicle}</td>
                <td className="px-2 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      statusToneClassByType[quote.statusTone]
                    }`}
                  >
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
    </section>
  )
}
