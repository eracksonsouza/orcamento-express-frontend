import { UserRound } from 'lucide-react'
import type { CustomerInfoFormProps } from '../types'

export default function CustomerInfoForm({ name, email, phone }: CustomerInfoFormProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
        <UserRound className="h-4 w-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-700">Informações Pessoais</h2>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
          Nome Completo
          <input
            type="text"
            defaultValue={name}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
          E-mail
          <input
            type="email"
            defaultValue={email}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
          Telefone
          <input
            type="text"
            defaultValue={phone}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-normal text-slate-700 transition focus:border-(--accent-border) focus:bg-white focus:outline-none focus:ring-2 focus:ring-(--accent-bg)"
          />
        </label>
      </div>
    </section>
  )
}
