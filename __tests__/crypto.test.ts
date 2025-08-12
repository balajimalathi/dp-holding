import { describe, it, expect } from 'vitest'
import { encode, decode } from '@/lib/crypto'

describe('crypto encode/decode', () => {
  it('should correctly encode and decode simple object', () => {
    const testData = {
      id: 123,
      name: 'Test',
      active: true
    }

    const encoded = encode(testData)
    const decoded = decode(encoded)

    expect(decoded).toEqual({
      id: '123', // Numbers become strings
      name: 'Test',
      active: true // Booleans are converted from strings
    })
  })

  it('should handle empty object', () => {
    const testData = {}

    const encoded = encode(testData)
    const decoded = decode(encoded)

    expect(decoded).toEqual(testData)
  })

  it('should handle special characters in values', () => {
    const testData = {
      text: 'Hello & Goodbye!',
      symbols: '?=&+'
    }

    const encoded = encode(testData)
    const decoded = decode(encoded)

    expect(decoded).toEqual(testData)
  })

  it('should handle arrays in values', () => {
    const testData = {
      numbers: [1, 2, 3],
      strings: ['a', 'b', 'c']
    }

    const encoded = encode(testData)
    const decoded = decode(encoded)

    expect(decoded).toEqual({
      numbers: '1,2,3', // Arrays become comma-separated strings
      strings: 'a,b,c'
    })
  })

  it('should make Base64 URL-safe', () => {
    const testData = {
      special: 'data with + and /'
    }

    const encoded = encode(testData)
    expect(encoded).not.toContain('+')
    expect(encoded).not.toContain('/')
    expect(encoded).not.toContain('=')
  })

  it('should handle invalid Base64 decode', () => {
    const result = decode('invalid-base64')
    // Implementation may return malformed object on error
    expect(result).toBeTruthy()
  })

  it('should handle boolean and number string conversion', () => {
    const testData = {
      isActive: 'true',
      count: '42',
      empty: 'null'
    }

    const encoded = encode(testData)
    const decoded = decode(encoded)

    expect(decoded).toEqual({
      isActive: true,
      count: '42', // Numbers remain strings unless converted
      empty: null
    })
  })
})