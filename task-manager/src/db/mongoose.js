import mongoose from "mongoose"
// import validator from "validator"

mongoose.connect(process.env.MONGOOSE_CONNECTION);







// const User = mongoose.model("User", {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes("password")) {
//                 throw new Error("The value must not contain a password keyword")
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error("The email invalid")
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error("The age invalid")
//             }
//         }
//     }
// })

// const Task = mongoose.model("Task", {
//     description: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const me = new User({
//     name: "        omar2            ",
//     email: "omar2@GMAIL.COM          ",
//     password: "123456789"
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error!", error)
// })

// const task = new Task({
//     description: "         Learn schema",
//     completed: true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log("Error!", error)
// })