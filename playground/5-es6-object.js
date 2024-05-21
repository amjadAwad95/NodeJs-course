let name = "amjad";

const user = {
    name,
    age: 25
}
console.log(user)

const product = {
    lable: "book",
    stack: 201,
    price: 20,
    rating: undefined
}
const { lable, stack, lol = 5, rating = 5 } = product
console.log(lable, stack, lol, rating)

const getProudct = (type, { lable, stack }) => {
    console.log(type, lable, stack)
}

getProudct("good", product)