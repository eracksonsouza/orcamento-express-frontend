export interface QuoteItem {
  id: string
  name: string
  description: string
  quantity: number
  unitPrice: number
}

export interface QuoteFile {
  id: string
  type: 'pdf' | 'xlsx'
  name: string
  size: string
}

export interface StatusStep {
  label: 'Draft' | 'Review' | 'Ready'
  date: string
  completed: boolean
  current: boolean
}

export interface Quote {
  id: string
  number: string
  status: string
  createdAt: string
  createdBy: string
  vehicle: {
    name: string
    plate: string
    vin: string
    imageUrl?: string
  }
  client: {
    name: string
    phone: string
    email: string
  }
  items: QuoteItem[]
  discount: number
  files: QuoteFile[]
  statusHistory: StatusStep[]
}
