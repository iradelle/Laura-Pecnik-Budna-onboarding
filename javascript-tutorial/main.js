// console.log('Hello from main.js')
// // comment
// // ctrl+?

// // variables
// let age = 25
// console.log(age)

// // constant
// const salary = 80000
// console.log(salary)

// let sum = 0
// sum = 5
// console.log(sum)

// TYPES
// string
const name = 'Laura'
const surname = "Budna"
const job = `student`

// // float
// const total = 0
// const PI = 3.14

// // bool
// const isPrimaryNumber = true
// const isNew = false

// // undefined
// let result
// const res = undefined

// // null
// const data = null

// // bigint, symbol

// // NON PREEMITIVE TYPE
// // object - comblex data type
// const person = {
//     firstName: 'Bruce',
//     lastName: 'Novak',
//     age: 30
// }

// console.log(person.firstName)

// //array
// const oddNumbers = [1, 3, 5, 7, 9]
// console.log(oddNumbers[0])

// // data types are converted by themselves
// let a = 10
// a = 'Laura'
// a = true
// console.log(a) 
// // output: true

// OPERATORS
// assignment operators - assign values to operators
let x = 10
let y = 5
console.log(x+y)
console.log(x-y)
console.log(x*y)
console.log(x/y)
console.log(x%y)

// COMPARISON
// == preverja value; === preverja value + data type

// LOGICAL OPERATORS
// && AND; || OR; ! NOT

// STRINGS
console.log('Laura ' + 'Budna') // sestavi skup

// if v spremenljivkah
const isEven = 10 % 2 === 0 ? 'Even' : 'Odd'
console.log(isEven)
// const preveri = preverba ? Value_if_true : Value_if_false

// TYPE CONVERSION
console.log(2 + '3') // concat! -> rez:23
console.log('2' + '3') // rez: 23 -> pretvori v int in izračuna
console.log(true + 2) // rez: 3 (false = 0, true = 1)
console.log('4' - '2') // rez: 2 (pretvori v int)
console.log('4' - null) // rez: 4
console.log(5 + undefined) // rez: NaN - not a number

// manual conversion
console.log(Number('5'))
console.log(Number(false))
console.log(Number(null))

console.log(parseInt('23'))
console.log(parseFloat('3.14'))

console.log(String(false))
console.log(String(25))
console.log(String(null))

console.log((500).toString()) // ne deluje na null in undefined

console.log(Boolean(10)) // true; null, undefined, 0, '', NaN -> false


// ko peverjamo enakost, == pretvori tip in je true, če je preveden value enak
// === ne pretvori tipa, ker ga tudi preverja po enakosti
// '5' == 5 true; '5' === 5 false

// CONDITIONAL STATEMENTS
// IF, ELSE, ELSE IF, SWITCH
const num = 5

if ( num > 0 ) {
    console.log('Number is positive.')
} else if ( num < 0 ) {
    console.log('Not positive')
} else {
    console.log('num is 0')
}

const color = 'red'

switch(color) {
    case 'red':
        console.log('color is red')
        break
    case 'blue':
        console.log('color is blue')
        break
    case 'green':
        console.log('Color is green')
        break
    default:
        console.log('Not a valid color')
        // if there is no match
}

// LOOPS
// for loop
for (let i = 1; i <= 5; i++) {
    console.log('For loop ' + i)
}

// while loop
let j = 1
while (j <= 5) {
    console.log('While loop ' + j)
    j++
}

// do while loop
let l = 1
do {
    console.log('Do While loop ' +l)
} while (l <= 5)

// for..of loop
const numArray = [1, 2, 3, 4, 5]
for (const num of numArray) {
    console.log('For .. of loop ' + num)
}

// FUNCTIONS
function greet() {
    console.log('Zdravo')
}
greet()

function greet_name(username) {
    console.log('Zdravo ' + username)
}
greet('Laura')

function add(x, y) {
    return x + y
}
const rez_add = add(3, 4)
console.log(rez_add)

// arrow functions
const arrowSum = (x, y) => {
    return x + y
}
const rez_arrowSum = arrowSum(5, 5)
console.log(rez_arrowSum)

const arrowSumAlt = (x, y) => x + y
const rez_arrowSumAlt = arrowSumAlt(5, 5)
console.log(rez_arrowSumAlt)

// SCOPE
// block scope
// kar je definirano v {}, ni direktno dosegljivo izven njih (const)

// function scope
// kar je definirano v funkciji, ni direktno dosegljivo izven njih

// global scope
// variable, ki je dosegljiva tako v funkcijah kot izven njih -> definirana zunaj funkcij
// NE OVERWRITA VREDNOSTI V FUNKCIJAH ALI {}