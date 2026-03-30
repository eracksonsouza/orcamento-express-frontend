import { describe, test, expect, beforeEach } from 'vitest'
import { createCustomerSchema } from './schema'

type ParseInput = Record<string, unknown>

let valid: ParseInput

function parse(data: unknown) {
  return createCustomerSchema.safeParse(data)
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

describe('Create Customer Schema', () => {
  beforeEach(() => {
    valid = {
      name: 'João Silva',
      email: 'joao@gmail.com',
      phone: '11999999999',
    }
  })

  describe('name', () => {
    test('should be able to create a customer with a valid name', () => {
      expect(parse(valid).success).toBe(true)
    })

    test('should not accept an empty name', () => {
      expect(errors({ ...valid, name: '' }).name).toBe('Nome é obrigatório')
    })

    test('should not accept a name with only whitespace', () => {
      expect(errors({ ...valid, name: '   ' }).name).toBe('Nome é obrigatório')
    })
  })

  describe('email', () => {
    test('should be able to create a customer with a .com.br email', () => {
      expect(parse({ ...valid, email: 'joao@empresa.com.br' }).success).toBe(true)
    })

    test('should be able to create a customer with a generic .br email', () => {
      expect(parse({ ...valid, email: 'joao@org.br' }).success).toBe(true)
    })

    test('should be able to create a customer with a known international provider email', () => {
      const providers = [
        'joao@gmail.com',
        'joao@outlook.com',
        'joao@hotmail.com',
        'joao@yahoo.com',
        'joao@icloud.com',
        'joao@live.com',
        'joao@protonmail.com',
        'joao@proton.me',
      ]
      for (const email of providers) {
        expect(parse({ ...valid, email }).success, `failed for ${email}`).toBe(true)
      }
    })

    test('should not accept an email from an unknown domain', () => {
      expect(errors({ ...valid, email: 'joao@tempmail.xyz' }).email).toBe(
        'Use um e-mail brasileiro ou de um provedor conhecido',
      )
    })

    test('should not accept a suspicious short TLD email (e.g. gmail.co)', () => {
      expect(errors({ ...valid, email: 'joao@gmail.co' }).email).toBe(
        'Use um e-mail brasileiro ou de um provedor conhecido',
      )
    })

    test('should not accept an email without @', () => {
      expect(errors({ ...valid, email: 'emailinvalido' }).email).toBe('E-mail inválido')
    })

    test('should not accept an empty email', () => {
      expect(errors({ ...valid, email: '' }).email).toBeTruthy()
    })
  })

  describe('phone', () => {
    test('should be able to create a customer with an 11-digit mobile phone', () => {
      expect(parse({ ...valid, phone: '11999999999' }).success).toBe(true)
    })

    test('should be able to create a customer with a 10-digit landline phone', () => {
      expect(parse({ ...valid, phone: '1133334444' }).success).toBe(true)
    })

    test('should be able to create a customer with a masked phone number', () => {
      expect(parse({ ...valid, phone: '(11) 99999-9999' }).success).toBe(true)
    })

    test('should not accept a phone number with fewer than 10 digits', () => {
      expect(errors({ ...valid, phone: '119999' }).phone).toBe(
        'Telefone deve ter 10 ou 11 dígitos',
      )
    })

    test('should not accept a phone number with more than 11 digits', () => {
      expect(errors({ ...valid, phone: '119999999999' }).phone).toBe(
        'Telefone deve ter 10 ou 11 dígitos',
      )
    })

    test('should not accept an empty phone number', () => {
      expect(errors({ ...valid, phone: '' }).phone).toBeTruthy()
    })
  })
})
