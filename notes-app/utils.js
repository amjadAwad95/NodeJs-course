console.log("utils.js")

// const name = "amjad"

// const student = {
//     name: "amjad",
//     age: 19
// }
// student.type="m"

const add = function (number1, number2) {
    return number1 + number2
}

const sub = function (number1, number2) {
    return number1 - number2;
}

module.exports = {
    add, sub
}