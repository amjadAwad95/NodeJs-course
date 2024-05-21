import "../src/db/mongoose"
import Task from "../src/models/task"

// Task.findByIdAndDelete("64e9cadbe665d908a0e64e64").then((user) => {
//     console.log(user)
//     return Task.countDocuments({ completed: false })
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount("64e9d49d7ce1cf35a04bb33c").then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})