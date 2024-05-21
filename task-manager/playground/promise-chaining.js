import "../src/db/mongoose"
import User from "../src/models/user"
// User.findByIdAndUpdate("64e9cccfaeb6582e5470942c", { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}
updateAgeAndCount("64e9cccfaeb6582e5470942c", 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})