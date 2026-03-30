import type { CustomerHeaderProps } from '../types'

export default function CustomerHeader({ name, createdAt }: CustomerHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{name}</h1>
        <p className="text-xs text-slate-400">{createdAt}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="rounded-xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-500">
          Excluir
        </button>
        <button className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm">
          Salvar Alterações
        </button>
      </div>
    </header>
  )
}
