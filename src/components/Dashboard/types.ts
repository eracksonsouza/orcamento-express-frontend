export type StatCardData = {
  id: string
  title: string
  value: string
  subtitle?: string
  delta?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
  icon: 'file' | 'wallet' | 'clock'
}

export type QuoteStatus = 'GENERATING' | 'READY' | 'DRAFT'

export type QuoteRowData = {
  id: string
  clientName: string
  vehicle: string
  date: string
  value: string
  status: QuoteStatus
}

export type ServiceDistributionItem = {
  id: string
  label: string
  percentage: number
  colorClass: string
}

export type DashboardHeaderProps = {
  subtitle?: string
  userName?: string
  notificationCount?: number
}

export type HelpCardProps = {
  title?: string
  description?: string
  ctaLabel?: string
}

export type DashboardRecentQuotesProps = {
  quotes: QuoteRowData[]
}

export type QuoteFilter = 'ALL' | QuoteStatus

export type QuoteFilterOption = {
  key: QuoteFilter
  label: string
}

export type QuoteRowStatusConfig = {
  dot: string
  badge: string
  label: string
  pulse: boolean
}

export type QuoteRowProps = {
  data: QuoteRowData
}

export type ServiceBarProps = {
  data: ServiceDistributionItem
}

export type ServiceDistributionProps = {
  services: ServiceDistributionItem[]
}

export type StatsCardsProps = {
  stats: StatCardData[]
}

export type StatCardColorConfig = {
  iconBg: string
  iconText: string
  borderLeft: string
  deltaBg: Record<NonNullable<StatCardData['deltaType']>, string>
}

export type StatCardProps = {
  data: StatCardData
}
