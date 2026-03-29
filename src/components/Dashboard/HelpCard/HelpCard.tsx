import { MessageCircle, ArrowRight } from 'lucide-react'
import type { HelpCardProps } from '../types'

export default function HelpCard({
  title = 'Precisa de ajuda?',
  description = 'Nossa equipe está disponível para te ajudar pelo WhatsApp agora mesmo.',
  ctaLabel = 'Falar com suporte',
}: HelpCardProps) {
  return (
    <section className="help-card-bg relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-sm">
      <div className="help-card-glow-top pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full" />
      <div className="help-card-glow-bottom pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full" />

      <div className="relative space-y-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-green-100/80">{description}</p>
        </div>
      </div>

      <button className="relative mt-5 flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-bold text-green-700 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-lg">
        {ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  )
}
