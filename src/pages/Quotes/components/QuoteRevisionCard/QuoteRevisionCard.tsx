import { PlusCircle } from 'lucide-react'

export default function QuoteRevisionCard() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-indigo-600 p-5 text-white shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">Revisão Necessária?</h2>
        <p className="text-sm text-indigo-100">
          Caso precise alterar algum item, crie uma nova versão deste orçamento para manter o
          histórico.
        </p>
      </div>
      <button className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50">
        <PlusCircle className="h-4 w-4" />
        Criar Nova Versão (v.2)
      </button>
    </section>
  )
}
