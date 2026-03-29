import { Download, FileSpreadsheet, FileText, RefreshCw, Upload } from 'lucide-react'
import type { QuoteFilesProps } from '../types'
import type { QuoteFile } from '../../types'

const fileIconByType: Record<QuoteFile['type'], typeof FileText> = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
}

const fileIconColorByType: Record<QuoteFile['type'], string> = {
  pdf: 'text-red-500',
  xlsx: 'text-emerald-600',
}

export default function QuoteFiles({ files }: QuoteFilesProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800">Arquivos Gerados</h2>
        <button className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-slate-500">
          <Upload className="h-4 w-4" />
        </button>
      </header>

      <ul className="flex flex-col gap-2">
        {files.map((file) => {
          const Icon = fileIconByType[file.type]
          const iconColor = fileIconColorByType[file.type]

          return (
            <li
              key={file.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 flex-shrink-0 ${iconColor}`} />
                <div>
                  <p className="text-sm font-medium text-slate-700">{file.name}</p>
                  <p className="text-xs text-slate-400">
                    {file.type.toUpperCase()} · {file.size}
                  </p>
                </div>
              </div>
              <button className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50">
                <Download className="h-3.5 w-3.5" />
              </button>
            </li>
          )
        })}
      </ul>

      <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
        <RefreshCw className="h-4 w-4" />
        Gerar Arquivos Novamente
      </button>
    </section>
  )
}
