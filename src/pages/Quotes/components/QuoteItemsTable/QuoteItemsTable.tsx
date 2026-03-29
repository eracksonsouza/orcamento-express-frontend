import type { QuoteItemsTableProps } from '../types'

const formatCurrency = (value: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export default function QuoteItemsTable({ items, discount }: QuoteItemsTableProps) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const total = subtotal - discount

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header>
        <h2 className="text-lg font-semibold text-slate-800">Peças e Serviços</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-2 py-2">Descrição</th>
              <th className="px-2 py-2 text-center">Qtd</th>
              <th className="px-2 py-2 text-right">Preço Unit.</th>
              <th className="px-2 py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-slate-100">
                <td className="px-2 py-3">
                  <div className="font-medium text-slate-800">{item.name}</div>
                  <div className="text-xs text-slate-400">{item.description}</div>
                </td>
                <td className="px-2 py-3 text-center text-slate-500">{item.quantity}</td>
                <td className="px-2 py-3 text-right text-slate-500">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="px-2 py-3 text-right text-slate-700">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-end gap-1 border-t border-slate-100 pt-4 text-sm">
        <div className="flex w-56 justify-between text-slate-500">
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex w-56 justify-between text-slate-500">
          <span>Descontos:</span>
          <span className={discount > 0 ? 'text-red-500' : ''}>
            {discount > 0 ? `- ${formatCurrency(discount)}` : formatCurrency(0)}
          </span>
        </div>
        <div className="flex w-56 justify-between border-t border-slate-100 pt-2 text-base font-bold text-slate-900">
          <span>Total:</span>
          <span className="text-indigo-600">{formatCurrency(total)}</span>
        </div>
      </div>
    </section>
  )
}
