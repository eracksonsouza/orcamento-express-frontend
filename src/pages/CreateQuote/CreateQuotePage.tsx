import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Truck,
  User,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react'
import type { DraftItem, DraftQuote, VehicleType, WizardStep } from './types'

// ─── helpers ────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const uid = () => Math.random().toString(36).slice(2, 9)

const VEHICLE_ICONS: Record<VehicleType, typeof Car> = {
  car: Car,
  moto: Zap,
  truck: Truck,
  van: Warehouse,
  suv: Car,
}

const VEHICLE_LABELS: Record<VehicleType, string> = {
  car: 'Carro',
  moto: 'Moto',
  truck: 'Caminhão',
  van: 'Van',
  suv: 'SUV',
}

const BRANDS = ['Honda', 'Toyota', 'Volkswagen', 'Fiat', 'Chevrolet', 'Ford', 'Hyundai', 'Renault', 'Nissan', 'Jeep']

const STEPS: { label: string; short: string }[] = [
  { label: 'Dados do Cliente', short: 'Cliente' },
  { label: 'Dados do Veículo', short: 'Veículo' },
  { label: 'Peças e Serviços', short: 'Itens' },
  { label: 'Revisão e Envio', short: 'Revisão' },
]

const EMPTY_DRAFT: DraftQuote = {
  client: { type: 'pf', name: '', doc: '', phone: '', email: '' },
  vehicle: { type: 'car', plate: '', brand: 'Honda', model: '', year: '', color: '', mileage: '' },
  items: [{ id: uid(), name: '', description: '', quantity: 1, unitPrice: 0 }],
  discount: 0,
  notes: '',
}

// ─── Stepper ─────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: WizardStep }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => {
        const num = (i + 1) as WizardStep
        const done = step > num
        const active = step === num

        return (
          <div key={num} className="flex flex-1 items-center">
            {/* circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  done
                    ? 'bg-emerald-500 text-white'
                    : active
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : num}
              </div>
              <span
                className={`hidden text-[10px] font-semibold uppercase tracking-wide sm:block ${
                  active ? 'text-indigo-600' : done ? 'text-emerald-500' : 'text-slate-400'
                }`}
              >
                {s.short}
              </span>
            </div>
            {/* connector line */}
            {i < STEPS.length - 1 && (
              <div className="mx-2 h-px flex-1 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: step > num ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Live Summary Sidebar ─────────────────────────────────────────────────────

function LiveSummary({ draft, step }: { draft: DraftQuote; step: WizardStep }) {
  const subtotal = draft.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
  const total = subtotal - draft.discount

  return (
    <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:gap-4 xl:shrink-0">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
          Prévia do Orçamento
        </p>

        {/* client */}
        <div
          className={`mb-3 rounded-xl p-3 transition-all duration-300 ${step >= 1 && draft.client.name ? 'bg-indigo-50' : 'bg-slate-50'}`}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Cliente
            </span>
          </div>
          {draft.client.name ? (
            <>
              <p className="text-sm font-semibold text-slate-800">{draft.client.name}</p>
              {draft.client.phone && (
                <p className="text-xs text-slate-500">{draft.client.phone}</p>
              )}
            </>
          ) : (
            <p className="text-xs text-slate-400 italic">Não preenchido</p>
          )}
        </div>

        {/* vehicle */}
        <div
          className={`mb-3 rounded-xl p-3 transition-all duration-300 ${step >= 2 && draft.vehicle.model ? 'bg-indigo-50' : 'bg-slate-50'}`}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Car className="h-3.5 w-3.5 text-indigo-500" />
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Veículo
            </span>
          </div>
          {draft.vehicle.model ? (
            <>
              <p className="text-sm font-semibold text-slate-800">
                {draft.vehicle.brand} {draft.vehicle.model}
              </p>
              {draft.vehicle.plate && (
                <span className="mt-1 inline-block rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-white">
                  {draft.vehicle.plate.toUpperCase()}
                </span>
              )}
            </>
          ) : (
            <p className="text-xs text-slate-400 italic">Não preenchido</p>
          )}
        </div>

        {/* items */}
        {draft.items.some((it) => it.name) && (
          <div className="mb-3 rounded-xl bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Wrench className="h-3.5 w-3.5 text-indigo-500" />
              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Itens
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {draft.items
                .filter((it) => it.name)
                .map((it) => (
                  <li key={it.id} className="flex justify-between text-xs">
                    <span className="text-slate-600 truncate max-w-[120px]">{it.name}</span>
                    <span className="text-slate-500 shrink-0">{fmt(it.quantity * it.unitPrice)}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* total */}
        <div className="border-t border-slate-100 pt-3">
          {draft.discount > 0 && (
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Desconto</span>
              <span className="text-red-500">- {fmt(draft.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-slate-600">Total</span>
            <span className="text-base font-bold text-indigo-600">{fmt(total)}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Step 1: Client ───────────────────────────────────────────────────────────

function StepClient({ draft, onChange }: { draft: DraftQuote; onChange: (d: DraftQuote) => void }) {
  const c = draft.client
  const set = (patch: Partial<typeof c>) => onChange({ ...draft, client: { ...c, ...patch } })

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Dados do Cliente</h2>
        <p className="text-sm text-slate-500">Informe quem solicitou o orçamento.</p>
      </div>

      {/* PF / PJ toggle */}
      <div className="flex gap-2">
        {(['pf', 'pj'] as const).map((t) => (
          <button
            key={t}
            onClick={() => set({ type: t, doc: '' })}
            className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
              c.type === t
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            {t === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={c.type === 'pf' ? 'Nome Completo' : 'Razão Social'}
          value={c.name}
          onChange={(v) => set({ name: v })}
          placeholder={c.type === 'pf' ? 'Ex: João Silva' : 'Ex: Oficina ABC Ltda'}
        />
        <Field
          label={c.type === 'pf' ? 'CPF' : 'CNPJ'}
          value={c.doc}
          onChange={(v) => set({ doc: v })}
          placeholder={c.type === 'pf' ? '000.000.000-00' : '00.000.000/0001-00'}
        />
        <Field
          label="Telefone / WhatsApp"
          value={c.phone}
          onChange={(v) => set({ phone: v })}
          placeholder="(11) 99999-9999"
        />
        <Field
          label="E-mail"
          value={c.email}
          onChange={(v) => set({ email: v })}
          placeholder="cliente@email.com"
          type="email"
        />
      </div>
    </div>
  )
}

// ─── Step 2: Vehicle ──────────────────────────────────────────────────────────

function StepVehicle({ draft, onChange }: { draft: DraftQuote; onChange: (d: DraftQuote) => void }) {
  const v = draft.vehicle
  const set = (patch: Partial<typeof v>) => onChange({ ...draft, vehicle: { ...v, ...patch } })

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Dados do Veículo</h2>
        <p className="text-sm text-slate-500">Identifique o veículo a ser orçado.</p>
      </div>

      {/* type chips */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Tipo de Veículo
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(VEHICLE_LABELS) as VehicleType[]).map((t) => {
            const Icon = VEHICLE_ICONS[t]
            return (
              <button
                key={t}
                onClick={() => set({ type: t })}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                  v.type === t
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {VEHICLE_LABELS[t]}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* plate with live preview */}
        <div className="flex flex-col gap-2">
          <Field
            label="Placa"
            value={v.plate}
            onChange={(val) => set({ plate: val })}
            placeholder="ABC-1234"
          />
          {v.plate && (
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-lg bg-slate-800 px-3 py-1.5 font-mono text-sm font-bold tracking-[0.2em] text-white">
                {v.plate.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
          Marca
          <select
            value={v.brand}
            onChange={(e) => set({ brand: e.target.value })}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {BRANDS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>

        <Field
          label="Modelo"
          value={v.model}
          onChange={(val) => set({ model: val })}
          placeholder="Ex: Civic EXL 1.5T"
        />
        <Field
          label="Ano"
          value={v.year}
          onChange={(val) => set({ year: val })}
          placeholder="2023"
          type="number"
        />
        <Field
          label="Cor"
          value={v.color}
          onChange={(val) => set({ color: val })}
          placeholder="Ex: Branco Perolado"
        />
        <Field
          label="Quilometragem"
          value={v.mileage}
          onChange={(val) => set({ mileage: val })}
          placeholder="Ex: 45.000 km"
        />
      </div>
    </div>
  )
}

// ─── Step 3: Items ────────────────────────────────────────────────────────────

function StepItems({ draft, onChange }: { draft: DraftQuote; onChange: (d: DraftQuote) => void }) {
  const items = draft.items

  const update = (id: string, patch: Partial<DraftItem>) =>
    onChange({
      ...draft,
      items: items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    })

  const add = () =>
    onChange({
      ...draft,
      items: [...items, { id: uid(), name: '', description: '', quantity: 1, unitPrice: 0 }],
    })

  const remove = (id: string) =>
    onChange({ ...draft, items: items.filter((it) => it.id !== id) })

  const subtotal = items.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
  const total = subtotal - draft.discount

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Peças e Serviços</h2>
        <p className="text-sm text-slate-500">Adicione os itens do orçamento.</p>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Item #{idx + 1}</span>
              {items.length > 1 && (
                <button
                  onClick={() => remove(item.id)}
                  className="grid h-6 w-6 place-items-center rounded-full text-slate-300 hover:bg-red-50 hover:text-red-400"
                >
                  <Minus className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Nome / Peça"
                value={item.name}
                onChange={(v) => update(item.id, { name: v })}
                placeholder="Ex: Parachoque Dianteiro"
              />
              <Field
                label="Descrição"
                value={item.description}
                onChange={(v) => update(item.id, { description: v })}
                placeholder="Ex: Peça Original Honda"
              />
              <Field
                label="Quantidade"
                value={String(item.quantity)}
                onChange={(v) => update(item.id, { quantity: Math.max(1, Number(v) || 1) })}
                type="number"
                placeholder="1"
              />
              <Field
                label="Preço Unitário (R$)"
                value={item.unitPrice === 0 ? '' : String(item.unitPrice)}
                onChange={(v) => update(item.id, { unitPrice: Number(v) || 0 })}
                type="number"
                placeholder="0,00"
              />
            </div>
            {item.name && item.unitPrice > 0 && (
              <div className="mt-3 flex justify-end">
                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  Subtotal: {fmt(item.quantity * item.unitPrice)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-sm font-semibold text-slate-400 transition-colors hover:border-indigo-300 hover:text-indigo-500"
      >
        <Plus className="h-4 w-4" />
        Adicionar Item
      </button>

      {/* Totals */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-slate-500">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Desconto (R$)</span>
            <input
              type="number"
              value={draft.discount === 0 ? '' : draft.discount}
              onChange={(e) => onChange({ ...draft, discount: Number(e.target.value) || 0 })}
              placeholder="0,00"
              className="w-28 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm text-red-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-bold">
            <span className="text-slate-700">Total</span>
            <span className="text-indigo-600">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
        Observações (opcional)
        <textarea
          value={draft.notes}
          onChange={(e) => onChange({ ...draft, notes: e.target.value })}
          placeholder="Prazo de execução, condições de pagamento, garantia..."
          rows={3}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </label>
    </div>
  )
}

// ─── Step 4: Review ───────────────────────────────────────────────────────────

function StepReview({ draft }: { draft: DraftQuote }) {
  const subtotal = draft.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
  const total = subtotal - draft.discount

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Revisão e Envio</h2>
        <p className="text-sm text-slate-500">Confirme os dados antes de gerar o orçamento.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* client summary */}
        <ReviewBlock title="Cliente" icon={<User className="h-4 w-4" />}>
          <ReviewRow label={draft.client.type === 'pf' ? 'Nome' : 'Razão Social'} value={draft.client.name || '—'} />
          <ReviewRow label={draft.client.type === 'pf' ? 'CPF' : 'CNPJ'} value={draft.client.doc || '—'} />
          <ReviewRow label="Telefone" value={draft.client.phone || '—'} />
          <ReviewRow label="E-mail" value={draft.client.email || '—'} />
        </ReviewBlock>

        {/* vehicle summary */}
        <ReviewBlock title="Veículo" icon={<Car className="h-4 w-4" />}>
          <ReviewRow label="Modelo" value={`${draft.vehicle.brand} ${draft.vehicle.model}` || '—'} />
          <ReviewRow label="Ano" value={draft.vehicle.year || '—'} />
          <ReviewRow
            label="Placa"
            value={
              draft.vehicle.plate ? (
                <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] font-bold tracking-widest text-white">
                  {draft.vehicle.plate.toUpperCase()}
                </span>
              ) : '—'
            }
          />
          <ReviewRow label="Cor" value={draft.vehicle.color || '—'} />
          <ReviewRow label="KM" value={draft.vehicle.mileage || '—'} />
        </ReviewBlock>
      </div>

      {/* items table */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Wrench className="h-4 w-4 text-indigo-500" />
          Peças e Serviços
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-2 py-1.5">Descrição</th>
                <th className="px-2 py-1.5 text-center">Qtd</th>
                <th className="px-2 py-1.5 text-right">Unit.</th>
                <th className="px-2 py-1.5 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.map((it) => (
                <tr key={it.id} className="border-t border-slate-100">
                  <td className="px-2 py-2">
                    <div className="font-medium text-slate-700">{it.name || '—'}</div>
                    {it.description && (
                      <div className="text-xs text-slate-400">{it.description}</div>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center text-slate-500">{it.quantity}</td>
                  <td className="px-2 py-2 text-right text-slate-500">{fmt(it.unitPrice)}</td>
                  <td className="px-2 py-2 text-right font-semibold text-slate-700">
                    {fmt(it.quantity * it.unitPrice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-col items-end gap-1 border-t border-slate-100 pt-3 text-sm">
          <div className="flex w-52 justify-between text-slate-500">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          {draft.discount > 0 && (
            <div className="flex w-52 justify-between text-slate-500">
              <span>Desconto</span>
              <span className="text-red-500">- {fmt(draft.discount)}</span>
            </div>
          )}
          <div className="flex w-52 justify-between border-t border-slate-100 pt-2 text-base font-bold">
            <span className="text-slate-700">Total</span>
            <span className="text-indigo-600">{fmt(total)}</span>
          </div>
        </div>
      </div>

      {draft.notes && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <span className="mr-2 font-semibold text-slate-500">Obs:</span>
          {draft.notes}
        </div>
      )}

      {/* send options */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Gerar e Enviar
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50">
            <FileText className="h-4 w-4 text-red-500" />
            Gerar PDF
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50">
            <Mail className="h-4 w-4 text-indigo-500" />
            Enviar por E-mail
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50">
            <MessageCircle className="h-4 w-4 text-emerald-500" />
            Enviar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-semibold text-slate-500">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </label>
  )
}

function ReviewBlock({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-indigo-500">{icon}</span>
        {title}
      </p>
      <dl className="flex flex-col gap-2">{children}</dl>
    </div>
  )
}

function ReviewRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-medium text-slate-700">{value}</dd>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CreateQuotePage() {
  const [step, setStep] = useState<WizardStep>(1)
  const [draft, setDraft] = useState<DraftQuote>(EMPTY_DRAFT)

  const prev = () => setStep((s) => Math.max(1, s - 1) as WizardStep)
  const next = () => setStep((s) => Math.min(4, s + 1) as WizardStep)

  const isLast = step === 4

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* page header */}
      <header>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Orçamentos
        </span>
        <h1 className="text-2xl font-semibold text-slate-900 lg:text-3xl">Novo Orçamento</h1>
        <p className="text-sm text-slate-500">
          Preencha as etapas abaixo para criar um orçamento completo.
        </p>
      </header>

      {/* stepper */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:p-5">
        <Stepper step={step} />
        <p className="mt-3 text-center text-xs font-semibold text-slate-400 sm:text-left sm:text-sm">
          Etapa {step} de {STEPS.length} —{' '}
          <span className="text-slate-600">{STEPS[step - 1].label}</span>
        </p>
      </div>

      {/* content */}
      <div className="flex gap-6">
        <div className="min-w-0 flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:p-6">
          {step === 1 && <StepClient draft={draft} onChange={setDraft} />}
          {step === 2 && <StepVehicle draft={draft} onChange={setDraft} />}
          {step === 3 && <StepItems draft={draft} onChange={setDraft} />}
          {step === 4 && <StepReview draft={draft} />}

          {/* navigation */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
            <button
              onClick={prev}
              disabled={step === 1}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>

            {isLast ? (
              <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95">
                <Check className="h-4 w-4" />
                Criar Orçamento
              </button>
            ) : (
              <button
                onClick={next}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
              >
                Próximo
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <LiveSummary draft={draft} step={step} />
      </div>
    </div>
  )
}
