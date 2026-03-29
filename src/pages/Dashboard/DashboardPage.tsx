import {
  DashboardHeader,
  HelpCard,
  RecentQuotes,
  ServiceDistribution,
  StatsCards,
} from '../../components/Dashboard'
import { dashboardStats, recentQuotes, serviceDistribution } from './dashboard-mock'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <StatsCards stats={dashboardStats} />
      <RecentQuotes quotes={recentQuotes} />
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <ServiceDistribution services={serviceDistribution} />
        <HelpCard />
      </div>
    </div>
  )
}
