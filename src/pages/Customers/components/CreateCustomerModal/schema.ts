import { z } from 'zod'

export const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'hotmail.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'protonmail.com',
  'proton.me',
]

export function isAllowedEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() ?? ''
  return domain.endsWith('.br') || ALLOWED_EMAIL_DOMAINS.includes(domain)
}

export const createCustomerSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  email: z
    .string()
    .trim()
    .email('E-mail inválido')
    .max(254)
    .refine(isAllowedEmail, { message: 'Use um e-mail brasileiro ou de um provedor conhecido' }),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((digits) => digits.length >= 10 && digits.length <= 11, {
      message: 'Telefone deve ter 10 ou 11 dígitos',
    }),
})

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>
