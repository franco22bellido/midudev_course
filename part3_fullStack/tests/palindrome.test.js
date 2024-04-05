const { palindrome } = require('../utils/for_testing.js')

test.skip('palindrome, normal use', () => {
    const result = palindrome('midudev')

    expect(result).toBe('vedudim')
})
test.skip('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})
test.skip('palindrome when type is not a "string"', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})
