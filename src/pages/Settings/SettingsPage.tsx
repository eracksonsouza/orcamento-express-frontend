import { useState } from 'react'
import {
  Bell,
  Car,
  Check,
  Contrast,
  FileText,
  Info,
  LogOut,
  Moon,
  RotateCcw,
  Settings,
  Sun,
  Type,
  User,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessibilitySettings } from '@/components/shared/Accessibility/useAccessibilitySettings'
import type { FontSize, Theme } from '@/components/shared/Accessibility/types'

type Section = 'perfil' | 'aparencia' | 'notificacoes' | 'sistema'

const SECTIONS: { id: Section; label: string; sub: string; icon: typeof User; num: string }[] = [
  { id: 'perfil', label: 'Perfil', sub: 'Conta e identidade', icon: User, num: '01' },
  { id: 'aparencia', label: 'Aparência', sub: 'Tema e tipografia', icon: Settings, num: '02' },
  { id: 'notificacoes', label: 'Notificações', sub: 'Alertas e eventos', icon: Bell, num: '03' },
  { id: 'sistema', label: 'Sistema', sub: 'Versão e conta', icon: Info, num: '04' },
]

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-300 ease-in-out',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
        checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md',
          'ring-0 transition-transform duration-300 ease-in-out',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}

// ─── Section: Perfil ──────────────────────────────────────────────────────────

function SectionPerfil() {
  const [name, setName] = useState('Ricardo M.')
  const [role, setRole] = useState('Consultor Técnico')
  const [email, setEmail] = useState('ricardo@oficina.com.br')
  const [saved, setSaved] = useState(false)

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      {/* ── hero banner ── */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #4f46e5 100%)',
        }}
      >
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 -left-6 h-56 w-56 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-20 bottom-0 h-32 w-32 rounded-full bg-indigo-400/10" />

        <div className="relative flex flex-wrap items-center gap-5">
          {/* avatar with glow */}
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-full bg-indigo-400/25 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/30 text-2xl font-black tracking-tight text-white ring-2 ring-white/20 backdrop-blur-sm">
              {initials}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-2xl font-black tracking-tight text-white">{name || 'Sem nome'}</p>
            <p className="text-sm text-indigo-200">{role}</p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-sm">
                Plano Profissional
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Conta Ativa
              </span>
            </div>
          </div>

          {/* mini stats */}
          <div className="ml-auto hidden flex-col gap-2 sm:flex">
            <Stat icon={<FileText className="h-3.5 w-3.5" />} label="Orçamentos" value="24" />
            <Stat icon={<Car className="h-3.5 w-3.5" />} label="Veículos" value="18" />
          </div>
        </div>
      </div>

      {/* ── form card ── */}
      <div className="rounded-2xl border border-(--border) bg-(--bg) p-5 shadow-sm sm:p-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
          Editar Informações
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileField label="Nome Completo" value={name} onChange={setName} />
          <ProfileField label="Cargo / Função" value={role} onChange={setRole} />
          <ProfileField label="E-mail" value={email} onChange={setEmail} type="email" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs text-(--text-muted)">
            Suas alterações são salvas localmente.
          </p>
          <button
            onClick={handleSave}
            className={cn(
              'flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold',
              'transition-all duration-300 active:scale-95',
              saved
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200/60'
                : 'bg-indigo-600 text-white shadow-md shadow-indigo-200/60 hover:bg-indigo-700',
            )}
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" />
                Salvo!
              </>
            ) : (
              'Salvar Alterações'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm">
      <span className="text-indigo-200">{icon}</span>
      <span className="text-xs text-indigo-200">{label}</span>
      <span className="ml-auto text-xs font-bold text-white">{value}</span>
    </div>
  )
}

function ProfileField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="group flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-(--text-muted) transition-colors duration-150 group-focus-within:text-indigo-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'rounded-xl border border-(--border) bg-(--bg-subtle) px-3 py-2.5',
          'text-sm text-(--text-h) placeholder:text-(--text-muted)',
          'transition-all duration-150',
          'focus:border-indigo-400 focus:outline-none focus:ring-3 focus:ring-indigo-100',
          'hover:border-indigo-200',
        )}
      />
    </label>
  )
}

// ─── Section: Aparência ───────────────────────────────────────────────────────

function SectionAparencia() {
  const { fontSize, setFontSize, highContrast, setHighContrast, theme, setTheme, reset } =
    useAccessibilitySettings()

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      <GroupLabel>Tema</GroupLabel>

      {/* theme picker with mini previews */}
      <div className="grid grid-cols-2 gap-3">
        {(['dark', 'light'] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-pressed={theme === t}
            className={cn(
              'group flex flex-col rounded-2xl border-2 p-3 text-left transition-all duration-200 hover:scale-[1.02]',
              theme === t
                ? 'border-indigo-500 bg-(--accent-bg) shadow-md shadow-indigo-100/50'
                : 'border-(--border) bg-(--bg) hover:border-indigo-200',
            )}
          >
            {/* mini UI mockup */}
            <div
              className={cn(
                'mb-3 overflow-hidden rounded-xl p-2.5',
                t === 'dark' ? 'bg-slate-900' : 'border border-slate-100 bg-white shadow-sm',
              )}
            >
              <div className="mb-2 flex items-center gap-1.5">
                <div className={cn('h-1.5 w-1.5 rounded-full', t === 'dark' ? 'bg-indigo-500' : 'bg-indigo-400')} />
                <div className={cn('h-1 w-10 rounded-full', t === 'dark' ? 'bg-slate-700' : 'bg-slate-200')} />
                <div className={cn('ml-auto h-1 w-4 rounded-full', t === 'dark' ? 'bg-slate-800' : 'bg-slate-100')} />
              </div>
              <div className={cn('mb-1.5 h-1 w-full rounded-full', t === 'dark' ? 'bg-slate-800' : 'bg-slate-100')} />
              <div className={cn('mb-3 h-1 w-3/4 rounded-full', t === 'dark' ? 'bg-slate-800' : 'bg-slate-100')} />
              <div className={cn('h-4 w-full rounded-lg', t === 'dark' ? 'bg-indigo-950/80' : 'bg-indigo-50')} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-(--text-h)">
                {t === 'dark' ? 'Escuro' : 'Claro'}
              </span>
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200',
                  theme === t ? 'bg-indigo-600' : 'border-2 border-(--border)',
                )}
              >
                {theme === t && <Check className="h-3 w-3 text-white" />}
              </span>
            </div>
          </button>
        ))}
      </div>

      <GroupLabel>Tamanho do Texto</GroupLabel>

      <div className="grid grid-cols-3 gap-2">
        {(Object.entries({ small: 'Aa', medium: 'Aa', large: 'Aa' }) as [FontSize, string][]).map(
          ([size]) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              aria-pressed={fontSize === size}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border-2 py-4 transition-all duration-200 hover:scale-[1.02]',
                fontSize === size
                  ? 'border-indigo-500 bg-(--accent-bg) shadow-md shadow-indigo-100/50'
                  : 'border-(--border) bg-(--bg) hover:border-indigo-200',
              )}
            >
              <span
                className={cn(
                  'font-black text-(--text-h) leading-none transition-all duration-200',
                  size === 'small' && 'text-lg',
                  size === 'medium' && 'text-2xl',
                  size === 'large' && 'text-3xl',
                )}
              >
                Aa
              </span>
              <span className="text-xs font-semibold text-(--text-muted)">
                {size === 'small' ? 'Pequeno' : size === 'medium' ? 'Médio' : 'Grande'}
              </span>
            </button>
          ),
        )}
      </div>

      {/* live text preview */}
      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--bg)">
        <div className="border-b border-(--border) px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-(--text-muted)">
            Prévia
          </span>
        </div>
        <div className="p-4">
          <p
            className={cn(
              'font-semibold text-(--text-h) transition-all duration-300',
              fontSize === 'small' && 'text-sm',
              fontSize === 'medium' && 'text-base',
              fontSize === 'large' && 'text-lg',
            )}
          >
            Orçamento #001 — Honda Civic
          </p>
          <p
            className={cn(
              'text-(--text-muted) transition-all duration-300',
              fontSize === 'small' && 'text-xs',
              fontSize === 'medium' && 'text-sm',
              fontSize === 'large' && 'text-base',
            )}
          >
            Parachoque Dianteiro · R$ 1.200,00
          </p>
        </div>
      </div>

      <GroupLabel>Acessibilidade</GroupLabel>

      {/* high contrast row */}
      <div
        className={cn(
          'flex items-center justify-between rounded-2xl border-2 p-4 transition-all duration-200',
          highContrast
            ? 'border-indigo-500 bg-(--accent-bg)'
            : 'border-(--border) bg-(--bg)',
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
              highContrast ? 'bg-indigo-600 text-white' : 'bg-(--bg-subtle) text-(--text-muted)',
            )}
          >
            <Contrast className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-semibold text-(--text-h)">Alto Contraste</p>
            <p className="text-xs text-(--text-muted)">Melhora a legibilidade em ambientes claros</p>
          </div>
        </div>
        <Toggle
          checked={highContrast}
          onChange={setHighContrast}
          label="Alternar alto contraste"
        />
      </div>

      {/* reset */}
      <button
        onClick={reset}
        className="group flex items-center gap-3 rounded-2xl border-2 border-dashed border-red-200 p-4 text-left transition-all duration-200 hover:border-red-400 hover:bg-red-50/50 dark:border-red-900/40 dark:hover:bg-red-950/20"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-400 transition-colors duration-150 group-hover:bg-red-100 dark:bg-red-950/30">
          <RotateCcw className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-500">Restaurar Padrões</p>
          <p className="text-xs text-red-400">Volta tema, tamanho e contraste ao estado inicial</p>
        </div>
      </button>
    </div>
  )
}

// ─── Section: Notificações ────────────────────────────────────────────────────

const NOTIFICATION_GROUPS = [
  {
    category: 'Orçamentos',
    color: 'bg-indigo-500',
    items: [
      {
        id: 'new-quote',
        label: 'Novo orçamento criado',
        description: 'Quando um orçamento for gerado no sistema.',
        default: true,
      },
      {
        id: 'status-change',
        label: 'Mudança de status',
        description: 'Quando um orçamento mudar de etapa.',
        default: true,
      },
      {
        id: 'expiry',
        label: 'Próximo do vencimento',
        description: 'Alerta 2 dias antes do prazo expirar.',
        default: false,
      },
    ],
  },
  {
    category: 'Clientes',
    color: 'bg-emerald-500',
    items: [
      {
        id: 'new-client',
        label: 'Novo cliente cadastrado',
        description: 'Quando um novo cliente for adicionado.',
        default: false,
      },
      {
        id: 'client-update',
        label: 'Dados do cliente atualizados',
        description: 'Quando informações de contato mudarem.',
        default: false,
      },
    ],
  },
]

function SectionNotificacoes() {
  const allIds = NOTIFICATION_GROUPS.flatMap((g) => g.items)
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(allIds.map((item) => [item.id, item.default])),
  )

  const activeCount = Object.values(enabled).filter(Boolean).length

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      {/* summary pill */}
      <div className="flex items-center justify-between rounded-2xl border border-(--border) bg-(--bg) px-5 py-4">
        <div>
          <p className="font-semibold text-(--text-h)">Alertas configurados</p>
          <p className="text-sm text-(--text-muted)">Gerencie o que você deseja ser notificado</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--accent-bg)">
          <span className="text-lg font-black text-(--accent)">{activeCount}</span>
        </div>
      </div>

      {NOTIFICATION_GROUPS.map((group) => (
        <div key={group.category} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-1">
            <span className={cn('h-2 w-2 rounded-full', group.color)} />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-(--text-muted)">
              {group.category}
            </span>
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--bg) shadow-sm">
            {group.items.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'group flex items-center justify-between px-5 py-4 transition-colors duration-150 hover:bg-(--bg-subtle)',
                  i > 0 && 'border-t border-(--border)',
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'h-2 w-2 shrink-0 rounded-full transition-all duration-200',
                      enabled[item.id] ? group.color : 'bg-(--border)',
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-(--text-h)">{item.label}</p>
                    <p className="text-xs text-(--text-muted)">{item.description}</p>
                  </div>
                </div>
                <Toggle
                  checked={enabled[item.id]}
                  onChange={(v) => setEnabled((s) => ({ ...s, [item.id]: v }))}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Section: Sistema ─────────────────────────────────────────────────────────

function SectionSistema() {
  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      {/* app info card */}
      <div className="overflow-hidden rounded-2xl border border-(--border) bg-(--bg) shadow-sm">
        <div className="flex items-center gap-3 border-b border-(--border) p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200/50">
            <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-semibold text-(--text-h)">Orçamento Express</p>
            <p className="font-mono text-xs text-(--text-muted)">v1.0.0 · build 2024.03</p>
          </div>
        </div>
        <div className="divide-y divide-(--border)">
          <SysRow label="Ambiente" value="Produção" mono />
          <SysRow label="Plano" value="Profissional" accent />
          <SysRow label="Região" value="sa-east-1 (BR)" mono />
          <SysRow label="Última sincronização" value="Hoje, 09:42" />
        </div>
      </div>

      {/* quick links */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <FileText className="h-4 w-4" />, label: 'Exportar dados', sub: 'Backup em JSON' },
          { icon: <Info className="h-4 w-4" />, label: 'Termos de uso', sub: 'Política de privacidade' },
        ].map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-2xl border border-(--border) bg-(--bg) p-4 text-left transition-all duration-150 hover:border-indigo-200 hover:bg-(--bg-subtle)"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--bg-subtle) text-(--text-muted)">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-(--text-h)">{item.label}</p>
              <p className="text-xs text-(--text-muted)">{item.sub}</p>
            </div>
          </button>
        ))}
      </div>

      {/* danger zone */}
      <div className="rounded-2xl border-2 border-dashed border-red-200 p-1 dark:border-red-900/40">
        <button className="group flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-150 hover:bg-red-50/50 dark:hover:bg-red-950/20">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-400 transition-colors duration-150 group-hover:bg-red-100 dark:bg-red-950/30 dark:group-hover:bg-red-950/50">
            <LogOut className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-500">Sair da Conta</p>
            <p className="text-xs text-red-400">Encerra a sessão atual neste dispositivo</p>
          </div>
          <span className="ml-auto text-xs font-semibold text-red-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            Confirmar →
          </span>
        </button>
      </div>
    </div>
  )
}

function SysRow({
  label,
  value,
  accent,
  mono,
}: {
  label: string
  value: string
  accent?: boolean
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className="text-sm text-(--text-muted)">{label}</span>
      <span
        className={cn(
          'text-sm font-semibold',
          mono && 'font-mono text-xs',
          accent ? 'text-indigo-500' : 'text-(--text-h)',
        )}
      >
        {value}
      </span>
    </div>
  )
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
      {children}
    </p>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [active, setActive] = useState<Section>('perfil')
  const activeSection = SECTIONS.find((s) => s.id === active)!

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      {/* ── page header ── */}
      <header className="flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted)">
            Sistema
          </span>
          <h1 className="text-2xl font-black tracking-tight text-(--text-h) lg:text-3xl">
            Configurações
          </h1>
        </div>
        {/* current section badge */}
        <span className="hidden items-center gap-2 rounded-full border border-(--border) bg-(--bg) px-3 py-1.5 text-xs font-semibold text-(--text-muted) sm:flex">
          <activeSection.icon className="h-3.5 w-3.5 text-(--accent)" strokeWidth={2} />
          {activeSection.label}
        </span>
      </header>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        {/* ── nav: mobile = horizontal tabs, desktop = vertical ── */}
        <nav
          aria-label="Seções de configurações"
          className="flex gap-1 overflow-x-auto rounded-2xl border border-(--border) bg-(--bg) p-1.5 shadow-sm lg:w-56 lg:shrink-0 lg:flex-col"
        >
          {SECTIONS.map(({ id, label, sub, icon: Icon, num }) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  'group relative flex shrink-0 items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5',
                  'whitespace-nowrap text-left transition-all duration-200',
                  'lg:w-full',
                  isActive
                    ? 'bg-(--accent-bg) text-(--accent)'
                    : 'text-(--text-muted) hover:bg-(--bg-subtle) hover:text-(--text-h)',
                )}
              >
                {/* ghost number — desktop only */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-2 hidden select-none text-5xl font-black leading-none text-(--border) opacity-60 lg:block"
                >
                  {num}
                </span>

                <div
                  className={cn(
                    'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50'
                      : 'bg-(--bg-subtle) text-(--text-muted) group-hover:bg-(--border)',
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={isActive ? 2.2 : 1.8} />
                </div>

                <div className="hidden lg:block">
                  <p
                    className={cn(
                      'text-sm font-semibold leading-tight transition-colors duration-150',
                      isActive ? 'text-(--accent)' : 'text-(--text-h)',
                    )}
                  >
                    {label}
                  </p>
                  <p className="text-[11px] text-(--text-muted)">{sub}</p>
                </div>

                {/* mobile label */}
                <span className="text-sm font-medium lg:hidden">{label}</span>
              </button>
            )
          })}
        </nav>

        {/* ── content ── */}
        <main className="min-w-0 flex-1">
          {active === 'perfil' && <SectionPerfil />}
          {active === 'aparencia' && <SectionAparencia />}
          {active === 'notificacoes' && <SectionNotificacoes />}
          {active === 'sistema' && <SectionSistema />}
        </main>
      </div>
    </div>
  )
}
