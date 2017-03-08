/* global beforeEach describe test expect */
const FORECAST = require('../../src/js/forecast')
const dataFixture = require('./fixtures/data.json')

beforeEach(() => {
  FORECAST.reset()
})

describe('reset()', () => {
  test('any previously recorded data will be discarded', () => {
    const output = FORECAST.parse(dataFixture.singleEntry)
    expect(output).toHaveLength(1)
    expect(typeof output[0] === 'object').toBeTruthy()
    FORECAST.reset()
    expect(FORECAST.parse([])).toEqual([])
  })
})

describe('parse()', () => {
  test('empty data will result in an empty array returned', () => {
    expect(FORECAST.parse([])).toEqual([])
  })

  test('multiple entries with the same day will result in a single object in the array', () => {
    const output = FORECAST.parse(dataFixture.oneDay)
    expect(output).toHaveLength(1)
    expect(typeof output[0] === 'object').toBeTruthy()
  })

  test('multiple entries over two days will result in two objects in the array', () => {
    const output = FORECAST.parse(dataFixture.multiDay)
    expect(output).toHaveLength(2)
    expect(typeof output[0] === 'object').toBeTruthy()
  })
})
