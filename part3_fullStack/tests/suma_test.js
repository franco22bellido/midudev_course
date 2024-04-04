const suma = (a, b) => {
    return a + b
}

const checks = [
    { a: 1, b: 2, result: 3 },
    { a: 0, b: 0, result: 0 },
    { a: 4, b: 4, result: 8 }
]
checks.forEach((check) => {
    const { a, b, result } = check

    console.assert(
        suma(a, b) === result,
        `addition of ${a} and ${b} expected to be ${result}`
    )
})

console.log(`${checks.length} checks performed...`)