import { MessageCircle, ArrowRight } from 'lucide-react'
import type { HelpCardProps } from '../types'

export default function HelpCard({
  title = 'Precisa de ajuda?',
  description = 'Nossa equipe está disponível para te ajudar pelo WhatsApp agora mesmo.',
  ctaLabel = 'Falar com suporte',
}: HelpCardProps) {
  return (
    <section className="help-card-bg relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-5">
      <div className="help-card-glow-top pointer-events-none absolute inset-0" />
      <div className="help-card-glow-bottom pointer-events-none absolute inset-0" />

      <div className="relative space-y-3">
        <div
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <MessageCircle className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <p
            className="mt-1.5 text-xs leading-relaxed"
            style={{ color: 'rgba(203, 213, 225, 0.75)' }}
          >
            {description}
          </p>
        </div>
      </div>

      <button
        className="relative mt-6 flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--brand)' }}
      >
        {ctaLabel}
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  )
}
