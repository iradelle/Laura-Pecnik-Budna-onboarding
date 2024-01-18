console.log('test')

const os = require('os');
const path = require('path')
const {add, subtr, divide, multiply} = require('./math')

console.log(add(2,5))
console.log(subtr(2,5))
console.log(multiply(2,5))
console.log(divide(2,5))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename)) // isto kot line 11
// console.log(path.basename(__filename)) // server.js
// console.log(path.extname(__filename)) // .js

// console.log(path.parse(__filename)) // ves info
