const add = (a, b) => a + b;
const subtr = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// export functions, da se importajo na server
module.exports = {
    add, subtr, multiply, divide
}