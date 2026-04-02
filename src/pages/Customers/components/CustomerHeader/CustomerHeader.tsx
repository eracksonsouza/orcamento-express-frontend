import { Trash2, Save } from 'lucide-react'
import type { CustomerHeaderProps } from '../types'

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function CustomerHeader({ name, createdAt }: CustomerHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-(--accent) text-sm font-bold text-white">
          {getInitials(name)}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900 leading-tight">{name}</h1>
          <p className="text-xs text-slate-400">{createdAt}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-rose-500 transition hover:border-rose-200 hover:bg-rose-50">
          <Trash2 className="h-3.5 w-3.5" />
          Excluir
        </button>
        <button className="flex items-center gap-1.5 rounded-lg bg-(--accent) px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-90">
          <Save className="h-3.5 w-3.5" />
          Salvar Alterações
        </button>
      </div>
    </header>
  )
}
