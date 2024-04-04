const { palindrome } = require('../utils/for_testing.js')

test('palindrome, normal use', () => {
    const result = palindrome('midudev')

    expect(result).toBe('vedudim')
})
test('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})
test('palindrome when type is not a "string"', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})
