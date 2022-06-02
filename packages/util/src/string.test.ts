import { capitalize, capitalizeEachWord } from './string'

describe('@bothrs/util ~ String', () => {
  it('Should correctly capitalize the first letter', () => {
    const originalValue = 'bothrs'
    const capitalizedValue = capitalize(originalValue)

    expect(capitalizedValue).toBe('Bothrs')
  })

  it('Should correctly capitalize the first letter of each word', () => {
    const originalValue = 'from idea to solution in a matter of weeks'
    const capitalizedValue = capitalizeEachWord(originalValue)

    expect(capitalizedValue).toBe('From Idea To Solution In A Matter Of Weeks')
  })
})
