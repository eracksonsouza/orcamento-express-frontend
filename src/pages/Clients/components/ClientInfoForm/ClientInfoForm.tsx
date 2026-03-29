import type { ClientInfoFormProps } from '../types'

export default function ClientInfoForm({ name, email, phone }: ClientInfoFormProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-indigo-100" />
        <h2 className="text-sm font-semibold text-slate-800">Informações Pessoais</h2>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          Nome Completo
          <input
            type="text"
            defaultValue={name}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </label>
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          E-mail
          <input
            type="email"
            defaultValue={email}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </label>
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          Telefone
          <input
            type="text"
            defaultValue={phone}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
          />
        </label>
      </div>
    </section>
  )
}
