import { z } from 'zod'

const TRADITIONAL_PLATE = /^[A-Z]{3}[0-9]{4}$/
const MERCOSUL_PLATE = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/

const currentYear = new Date().getFullYear()

export const VEHICLE_TYPES = ['CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV'] as const
export type VehicleTypeValue = (typeof VEHICLE_TYPES)[number]

export function isValidLicensePlate(value: string) {
  const normalized = value.toUpperCase().replace(/[-\s]/g, '')
  return TRADITIONAL_PLATE.test(normalized) || MERCOSUL_PLATE.test(normalized)
}

export const createVehicleSchema = z.object({
  type: z.enum(VEHICLE_TYPES, { required_error: 'Tipo de veículo é obrigatório' }),
  licensePlate: z
    .string()
    .trim()
    .min(1, 'Placa é obrigatória')
    .refine(isValidLicensePlate, { message: 'Placa inválida. Use o formato ABC1234 ou ABC1D23' }),
  brand: z.string().trim().min(1, 'Marca é obrigatória'),
  year: z
    .number({ invalid_type_error: 'Ano inválido' })
    .int()
    .min(1900, 'Ano inválido')
    .max(currentYear + 1, `Ano não pode ser maior que ${currentYear + 1}`),
  model: z.string().trim().min(1, 'Modelo é obrigatório'),
})

export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>
