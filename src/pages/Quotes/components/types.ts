import type { Quote, QuoteFile, QuoteItem, StatusStep } from '../types'

export type QuoteHeaderProps = {
  number: string
  status: string
  createdAt: string
  createdBy: string
}

export type QuoteInfoCardsProps = {
  vehicle: Quote['vehicle']
  client: Quote['client']
}

export type QuoteItemsTableProps = {
  items: QuoteItem[]
  discount: number
}

export type QuoteStatusTimelineProps = {
  statusHistory: StatusStep[]
}

export type QuoteFilesProps = {
  files: QuoteFile[]
}
