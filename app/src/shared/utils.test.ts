import { describe, it, expect } from 'vitest'
import { getScale, parseErrorMessage, UNEXPECTED_ERROR } from './utils'

describe('getScale', () => {
  it('should return correct scale class for exact values', () => {
    expect(getScale(0.25)).toBe('scale-[0.25]')
    expect(getScale(0.5)).toBe('scale-[0.5]')
    expect(getScale(0.75)).toBe('scale-[0.75]')
    expect(getScale(1)).toBe('scale-[1]')
    expect(getScale(1.25)).toBe('scale-[1.25]')
    expect(getScale(1.5)).toBe('scale-[1.5]')
    expect(getScale(1.75)).toBe('scale-[1.75]')
    expect(getScale(2)).toBe('scale-[2]')
    expect(getScale(2.25)).toBe('scale-[2.25]')
    expect(getScale(2.5)).toBe('scale-[2.5]')
  })

  it('should return default scale for invalid values', () => {
    expect(getScale(NaN)).toBe('scale-[1]')
  })
})

describe('parseErrorMessage', () => {
  it('should return error message for Error instance', () => {
    expect(parseErrorMessage(new Error('Custom error'))).toBe('Custom error')
    expect(parseErrorMessage(new Error('Network failed'))).toBe(
      'Network failed'
    )
  })

  describe('should return UNEXPECTED_ERROR for non-Error values', () => {
    const cases: Array<[string, unknown]> = [
      ['string', 'error message'],
      ['number', 404],
      ['null', null],
      ['undefined', undefined],
      ['object without message', { code: 500 }],
      ['empty object', {}],
      ['array', ['error']],
      ['boolean false', false],
      ['boolean true', true],
      ['symbol', Symbol('error')],
      ['function', () => {}]
    ]

    it.each(cases)('%s', (_, value) => {
      expect(parseErrorMessage(value)).toBe(UNEXPECTED_ERROR)
    })
  })
})
