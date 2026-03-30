import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { createCustomerSchema, type CreateCustomerFormData } from './schema'

type FormData = CreateCustomerFormData

type Props = {
  onClose: () => void
  onSubmit: (data: FormData & { customerId: string }) => Promise<void>
}

export default function CreateCustomerModal({ onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(createCustomerSchema),
  })

  async function submit(data: FormData) {
    try {
      await onSubmit({ ...data, customerId: crypto.randomUUID() })
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      if (message.includes('Phone already in use')) {
        setError('phone', { message: 'Telefone já cadastrado' })
      } else if (message.includes('Email already in use')) {
        setError('email', { message: 'E-mail já cadastrado' })
      } else {
        throw err
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <header className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800">Novo Cliente</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </header>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <label className="space-y-1 text-xs font-semibold text-slate-500">
            Nome Completo
            <input
              {...register('name')}
              type="text"
              placeholder="Ex: João Silva"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {errors.name && (
              <span className="text-xs font-normal text-rose-500">{errors.name.message}</span>
            )}
          </label>

          <label className="space-y-1 text-xs font-semibold text-slate-500">
            E-mail
            <input
              {...register('email')}
              type="email"
              placeholder="joao@email.com"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {errors.email && (
              <span className="text-xs font-normal text-rose-500">{errors.email.message}</span>
            )}
          </label>

          <label className="space-y-1 text-xs font-semibold text-slate-500">
            Telefone
            <input
              {...register('phone')}
              type="text"
              placeholder="(11) 99999-9999"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            {errors.phone && (
              <span className="text-xs font-normal text-rose-500">{errors.phone.message}</span>
            )}
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? 'Salvando...' : 'Criar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
