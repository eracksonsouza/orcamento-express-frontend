import {
  QuoteFiles,
  QuoteHeader,
  QuoteInfoCards,
  QuoteItemsTable,
  QuoteRevisionCard,
  QuoteStatusTimeline,
} from './components'
import { quoteMock } from './quote-mock'

export default function QuotesPage() {
  const quote = quoteMock

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        {/* Main column */}
        <main className="flex w-full flex-col gap-4 lg:w-[65%] lg:gap-6">
          <QuoteHeader
            number={quote.number}
            status={quote.status}
            createdAt={quote.createdAt}
            createdBy={quote.createdBy}
          />
          <QuoteInfoCards vehicle={quote.vehicle} client={quote.client} />
          <QuoteItemsTable items={quote.items} discount={quote.discount} />
        </main>

        {/* Sidebar column */}
        <aside className="flex w-full flex-col gap-4 lg:w-[35%] lg:gap-6">
          <QuoteStatusTimeline statusHistory={quote.statusHistory} />
          <QuoteFiles files={quote.files} />
          <QuoteRevisionCard />
        </aside>
      </div>
    </div>
  )
}
