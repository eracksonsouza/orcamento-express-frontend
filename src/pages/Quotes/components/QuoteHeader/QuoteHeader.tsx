import { Printer, Share2 } from 'lucide-react'
import type { QuoteHeaderProps } from '../types'

export default function QuoteHeader({ number, status, createdAt, createdBy }: QuoteHeaderProps) {
  return (
    <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Orçamento Finalizado
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
            {status}
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 lg:text-3xl">
          Visualizar Orçamento #{number}
        </h1>
        <p className="text-sm text-slate-500">
          Criado em {createdAt} por {createdBy}
        </p>
      </div>
      <div className="flex items-center gap-2 lg:shrink-0">
        <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
          <Printer className="h-4 w-4" />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
