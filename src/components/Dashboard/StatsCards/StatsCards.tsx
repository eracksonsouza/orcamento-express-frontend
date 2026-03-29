import StatCard from './StatCard'
import type { StatsCardsProps } from '../types'

const animationDelayByIndex = ['animation-delay-100', 'animation-delay-200', 'animation-delay-300']

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((item, index) => (
        <div key={item.id} className={`animate-fade-in-up ${animationDelayByIndex[index] ?? ''}`}>
          <StatCard data={item} />
        </div>
      ))}
    </section>
  )
}
