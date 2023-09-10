// Exercise 1

let a1 = []

let a2 = Array(10).fill('Some')
let a3 = ['first', 'second', 'last']

console.log("Array content", a2)
console.log("Array length: ", a2.length)
console.log("First Item: ", a3[0])
console.log("Last Item: ", a3[a3.length -1])

let a4 =a3.map((v, i) => {
    return v.toUpperCase()
})
console.log("Uppercase array", a4)
