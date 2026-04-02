import type {
  QuoteRowData,
  ServiceDistributionItem,
  StatCardData,
} from '../../components/Dashboard'

export const dashboardStats: StatCardData[] = [
  {
    id: 'total-quotes',
    title: 'Total Quotes',
    value: '124',
    subtitle: 'Vs. last month: 110',
    delta: '+12%',
    deltaType: 'positive',
    icon: 'file',
  },
  {
    id: 'total-value',
    title: 'Total Value',
    value: 'R$ 45.200,00',
    subtitle: 'Monthly target: R$ 50k',
    delta: '+5%',
    deltaType: 'positive',
    icon: 'wallet',
  },
  {
    id: 'pending-items',
    title: 'Pending Items',
    value: '8',
    subtitle: 'Quotes needing action',
    delta: '-2%',
    deltaType: 'negative',
    icon: 'clock',
  },
]

export const recentQuotes: QuoteRowData[] = [
  {
    id: 'quote-1',
    clientName: 'Ricardo Mendes',
    vehicle: 'Toyota Corolla (ABC-1234)',
    date: 'Oct 24, 2023',
    value: 'R$ 2.450,00',
    status: 'GENERATING',
  },
  {
    id: 'quote-2',
    clientName: 'Ana Luiza Silva',
    vehicle: 'Honda HR-V (XYZ-9876)',
    date: 'Oct 23, 2023',
    value: 'R$ 890,00',
    status: 'READY',
  },
  {
    id: 'quote-3',
    clientName: 'Carlos Eduardo',
    vehicle: 'VW Golf (GTI-0001)',
    date: 'Oct 23, 2023',
    value: 'R$ 5.120,00',
    status: 'DRAFT',
  },
  {
    id: 'quote-4',
    clientName: 'Mariana Costa',
    vehicle: 'Jeep Compass (JEE-4433)',
    date: 'Oct 22, 2023',
    value: 'R$ 1.200,00',
    status: 'GENERATING',
  },
]

export const serviceDistribution: ServiceDistributionItem[] = [
  {
    id: 'painting',
    label: 'Pintura',
    percentage: 65,
    colorClass: '#3b82f6',
  },
  {
    id: 'body',
    label: 'Funilaria',
    percentage: 25,
    colorClass: '#f59e0b',
  },
  {
    id: 'detailing',
    label: 'Polimento',
    percentage: 10,
    colorClass: '#94a3b8',
  },
]
