import { Info } from 'lucide-react'
import type { ProductivityTipProps } from '../types'

export default function ProductivityTip({
  title = 'Dica de Produtividade',
  description = 'O sistema identifica automaticamente o tipo de placa (Mercosul ou Tradicional) enquanto você digita. Veículos cadastrados serão vinculados automaticamente às ordens de serviço futuras.',
}: ProductivityTipProps) {
  return (
    <section className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-indigo-700">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100">
        <Info className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-indigo-600">{description}</p>
      </div>
    </section>
  )
}
