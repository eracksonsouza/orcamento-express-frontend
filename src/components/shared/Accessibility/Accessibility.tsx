import { X, Type, Sun, Moon, RotateCcw, Check, Settings, Contrast } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FontSize, Theme, AccessibilityProps } from './types'
import { useAccessibilitySettings } from './useAccessibilitySettings'

const FONT_SIZE_LABELS: Record<FontSize, string> = {
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
}

const FEATURES = [
  'Todas as configurações são salvas automaticamente',
  'Suas preferências são mantidas entre as páginas',
  'Compatível com leitores de tela',
  'Navegação simplificada e intuitiva',
  'Use "Restaurar Padrões" para resetar tudo',
]

export default function Accessibility({ isOpen, onClose }: AccessibilityProps) {
  const { fontSize, setFontSize, highContrast, setHighContrast, theme, setTheme, reset } =
    useAccessibilitySettings()

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Painel de acessibilidade"
      className={cn(
        'absolute left-full top-0 z-50 ml-2',
        'w-65 max-h-[calc(100vh-32px)] overflow-y-auto',
        'rounded-2xl border border-(--border)',
        'bg-(--bg) shadow-xl',
        'flex flex-col gap-3 p-3',
      )}
    >
      <div className="flex items-center justify-between px-1 pt-1">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-(--accent)" strokeWidth={2} />
          <span className="text-sm font-semibold text-(--text-h)">Acessibilidade</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Fechar painel de acessibilidade"
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full',
            'text-(--text-muted) hover:bg-(--bg-subtle) hover:text-(--text-h)',
            'transition-colors duration-150',
          )}
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>

      <p className="px-1 text-xs text-(--text-muted)">Personalize sua experiência no site</p>

      <div className="rounded-xl border border-(--border) bg-(--bg-subtle) p-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          {theme === 'dark' ? (
            <Moon className="h-4 w-4 text-(--accent)" strokeWidth={2} />
          ) : (
            <Sun className="h-4 w-4 text-(--accent)" strokeWidth={2} />
          )}
          <span className="text-xs font-medium text-(--text-h)">Tema</span>
        </div>
        <p className="text-xs text-(--text-muted)">Escolha entre tema claro ou escuro</p>
        <div className="flex gap-1.5">
          {(['dark', 'light'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              aria-pressed={theme === t}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium',
                'border transition-all duration-150',
                theme === t
                  ? 'bg-(--accent) text-white border-(--accent)'
                  : 'bg-(--bg) text-(--text-muted) border-(--border) hover:border-(--accent) hover:text-(--text-h)',
              )}
            >
              {t === 'dark' ? (
                <Moon className="h-3 w-3" strokeWidth={2} />
              ) : (
                <Sun className="h-3 w-3" strokeWidth={2} />
              )}
              {t === 'dark' ? 'Escuro' : 'Claro'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-(--border) bg-(--bg-subtle) p-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-(--accent)" strokeWidth={2} />
          <span className="text-xs font-medium text-(--text-h)">Tamanho do texto</span>
        </div>
        <p className="text-xs text-(--text-muted)">Ajuste o tamanho do texto para melhor leitura</p>
        <div className="flex gap-1.5">
          {(Object.keys(FONT_SIZE_LABELS) as FontSize[]).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              aria-pressed={fontSize === size}
              className={cn(
                'flex-1 rounded-lg py-1.5 text-xs font-medium',
                'border transition-all duration-150',
                fontSize === size
                  ? 'bg-(--accent) text-white border-(--accent)'
                  : 'bg-(--bg) text-(--text-muted) border-(--border) hover:border-(--accent) hover:text-(--text-h)',
              )}
            >
              {FONT_SIZE_LABELS[size]}
            </button>
          ))}
        </div>
        <div
          className={cn(
            'rounded-lg border border-(--border) bg-(--bg) px-3 py-2',
            'text-(--text-h) text-center font-medium',
            fontSize === 'small' && 'text-xs',
            fontSize === 'medium' && 'text-sm',
            fontSize === 'large' && 'text-base',
          )}
        >
          Exemplo de texto
        </div>
      </div>

      <div className="rounded-xl border border-(--border) bg-(--bg-subtle) p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Contrast className="h-4 w-4 text-(--accent)" strokeWidth={2} />
            <span className="text-xs font-medium text-(--text-h)">Alto Contraste</span>
          </div>
          <button
            role="switch"
            aria-checked={highContrast}
            aria-label="Alternar alto contraste"
            onClick={() => setHighContrast((v) => !v)}
            className={cn(
              'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
              'transition-colors duration-200 ease-in-out',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)',
              highContrast ? 'bg-(--accent)' : 'bg-(--border)',
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow',
                'transform transition duration-200 ease-in-out',
                highContrast ? 'translate-x-4' : 'translate-x-0',
              )}
            />
          </button>
        </div>
        <p className="text-xs text-(--text-muted)">Contraste elevado para maior legibilidade</p>
        {highContrast && (
          <div
            className={cn(
              'flex items-center justify-center gap-2 rounded-lg py-1.5',
              'border border-(--accent-border) bg-(--accent-bg)',
              'text-xs font-medium text-(--accent)',
            )}
          >
            <Check className="h-3 w-3" strokeWidth={2.5} />
            Alto Contraste Ativo
          </div>
        )}
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-3 flex flex-col gap-2 dark:border-red-900/40 dark:bg-red-950/20">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-red-400" strokeWidth={2} />
          <span className="text-xs font-medium text-red-500">Restaurar Padrões</span>
        </div>
        <button
          onClick={reset}
          className={cn(
            'flex items-center justify-center gap-2 rounded-lg py-2',
            'bg-(--text-h) text-(--bg) text-xs font-semibold',
            'transition-all duration-150 hover:opacity-80 active:scale-[0.97]',
          )}
        >
          <RotateCcw className="h-3 w-3" strokeWidth={2.5} />
          Resetar Configurações
        </button>
      </div>

      <div className="rounded-xl border border-(--border) bg-(--bg-subtle) p-3">
        <p className="mb-2 text-xs font-medium text-(--accent)">Recursos de Acessibilidade</p>
        <ul className="flex flex-col gap-1">
          {FEATURES.map((feat) => (
            <li key={feat} className="flex items-start gap-1.5 text-[11px] text-(--text-muted)">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent)" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
