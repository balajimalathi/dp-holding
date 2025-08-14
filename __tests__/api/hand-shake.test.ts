import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST, PUT } from '@/app/api/redirect-url/route'
import { encode, decode } from '@/lib/crypto'

// Mock the crypto module
vi.mock('@/lib/crypto', () => ({
  encode: vi.fn().mockImplementation((data) => {
    const jsonStr = JSON.stringify(data)
    return Buffer.from(jsonStr).toString('base64')
  }),
  decode: vi.fn().mockImplementation((encoded) => {
    const jsonStr = Buffer.from(encoded, 'base64').toString('utf-8')
    return JSON.parse(jsonStr)
  })
}))

describe('POST /api/hand-shake', () => {
  it('should return success response with encoded URL for valid input', async () => {
    const mockRequest = {
      json: async () => ({
        purchaseId: 'cd99f25a-f598-477b-9ead-ea2e75d50300',
        emailId: 'test@example.com',
        mobileNo: '1234567890',
        ucic: '123456'
      })
    } as any

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      status: true,
      message: 'success',
      redirectionURL: expect.stringContaining('http://localhost:3000/dp?data='),
      statusCode: 200
    })
  })

  it('should return error for missing required fields', async () => {
    const mockRequest = {
      json: async () => ({
        // Missing purchaseId and emailId
        mobileNo: '1234567890',
        ucic: '123456'
      })
    } as any

    const response = await POST(mockRequest)
    expect(response.status).toBe(400)
  })
})

describe('PUT /api/hand-shake', () => {
  it('should correctly decode valid encoded string', async () => {
    const testData = {
      purchaseId: 'cd99f25a-f598-477b-9ead-ea2e75d50300',
      emailId: 'test@example.com',
      mobileNo: '1234567890',
      ucic: '123456'
    }
    const encoded = Buffer.from(JSON.stringify(testData)).toString('base64')

    const mockRequest = {
      json: async () => ({
        data: encoded
      })
    } as any

    const response = await PUT(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual(testData)
  })

  it('should return error for invalid encoded string', async () => {
    const mockRequest = {
      json: async () => ({
        data: 'invalid-base64-string'
      })
    } as any

    const response = await PUT(mockRequest)
    expect(response.status).toBe(400)
  })
})