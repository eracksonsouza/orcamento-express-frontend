import { describe, test, expect, beforeEach } from 'vitest'
import { createVehicleSchema } from './schema'

type ParseInput = Record<string, unknown>

let valid: ParseInput

function parse(data: unknown) {
  return createVehicleSchema.safeParse(data)
}

function errors(data: unknown) {
  const result = parse(data)
  if (result.success) return {} as Record<string, string>
  const map: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = String(issue.path[0])
    if (!(key in map)) map[key] = issue.message
  }
  return map
}

describe('Create Vehicle Schema', () => {
  beforeEach(() => {
    valid = {
      type: 'CAR',
      licensePlate: 'ABC1234',
      brand: 'Toyota',
      year: 2024,
      model: 'Corolla XEI 2.0',
    }
  })

  describe('type', () => {
    test('should accept all valid vehicle types', () => {
      const types = ['CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'SUV']
      for (const type of types) {
        expect(parse({ ...valid, type }).success, `failed for ${type}`).toBe(true)
      }
    })

    test('should not accept an invalid vehicle type', () => {
      expect(errors({ ...valid, type: 'BIKE' }).type).toBeTruthy()
    })

    test('should not accept a lowercase vehicle type', () => {
      expect(errors({ ...valid, type: 'car' }).type).toBeTruthy()
    })
  })

  describe('licensePlate', () => {
    test('should accept a traditional license plate (ABC1234)', () => {
      expect(parse({ ...valid, licensePlate: 'ABC1234' }).success).toBe(true)
    })

    test('should accept a Mercosul license plate (ABC1D23)', () => {
      expect(parse({ ...valid, licensePlate: 'ABC1D23' }).success).toBe(true)
    })

    test('should accept a plate with hyphen (ABC-1234)', () => {
      expect(parse({ ...valid, licensePlate: 'ABC-1234' }).success).toBe(true)
    })

    test('should accept a lowercase plate', () => {
      expect(parse({ ...valid, licensePlate: 'abc1234' }).success).toBe(true)
    })

    test('should not accept a plate with wrong format', () => {
      expect(errors({ ...valid, licensePlate: 'AB1234' }).licensePlate).toBe(
        'Placa inválida. Use o formato ABC1234 ou ABC1D23',
      )
    })

    test('should not accept a plate with too many characters', () => {
      expect(errors({ ...valid, licensePlate: 'ABCD1234' }).licensePlate).toBe(
        'Placa inválida. Use o formato ABC1234 ou ABC1D23',
      )
    })

    test('should not accept an empty plate', () => {
      expect(errors({ ...valid, licensePlate: '' }).licensePlate).toBeTruthy()
    })
  })

  describe('brand', () => {
    test('should accept a valid brand', () => {
      expect(parse({ ...valid, brand: 'Honda' }).success).toBe(true)
    })

    test('should not accept an empty brand', () => {
      expect(errors({ ...valid, brand: '' }).brand).toBe('Marca é obrigatória')
    })

    test('should not accept a brand with only whitespace', () => {
      expect(errors({ ...valid, brand: '   ' }).brand).toBe('Marca é obrigatória')
    })
  })

  describe('year', () => {
    test('should accept a valid year', () => {
      expect(parse({ ...valid, year: 2020 }).success).toBe(true)
    })

    test('should accept the minimum valid year (1900)', () => {
      expect(parse({ ...valid, year: 1900 }).success).toBe(true)
    })

    test('should not accept a year before 1900', () => {
      expect(errors({ ...valid, year: 1899 }).year).toBe('Ano inválido')
    })

    test('should not accept a year far in the future', () => {
      const futureYear = new Date().getFullYear() + 2
      expect(errors({ ...valid, year: futureYear }).year).toBeTruthy()
    })

    test('should not accept a non-number year', () => {
      expect(errors({ ...valid, year: 'dois mil' }).year).toBe('Ano inválido')
    })
  })

  describe('model', () => {
    test('should accept a valid model', () => {
      expect(parse({ ...valid, model: 'Corolla XEI 2.0' }).success).toBe(true)
    })

    test('should not accept an empty model', () => {
      expect(errors({ ...valid, model: '' }).model).toBe('Modelo é obrigatório')
    })

    test('should not accept a model with only whitespace', () => {
      expect(errors({ ...valid, model: '   ' }).model).toBe('Modelo é obrigatório')
    })
  })
})
