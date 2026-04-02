import { Info } from 'lucide-react'
import type { ProductivityTipProps } from '../types'

export default function ProductivityTip({
  title = 'Dica de Produtividade',
  description = 'O sistema identifica automaticamente o tipo de placa (Mercosul ou Tradicional) enquanto você digita. Veículos cadastrados serão vinculados automaticamente às ordens de serviço futuras.',
}: ProductivityTipProps) {
  return (
    <section className="flex gap-3 rounded-xl border border-(--accent-border) bg-(--accent-bg) p-4">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-(--accent)" />
      <div>
        <h3 className="text-sm font-semibold text-(--accent)">{title}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </section>
  )
}
