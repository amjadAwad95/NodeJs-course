import express from "express"
import "./db/mongoose.js"
import userRouter from "./routers/user.js";
import taskRouter from "./routers/task.js";



const app = express();

// import multer from "multer"

// const upload = multer({
//     dest: "images"
// })

// app.post("/upload", upload.single("upload"), (req, res) => {
//     res.send();
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

const port = process.env.PORT;


app.listen(port, () => {
    console.log("The server listen  at port " + port)
})

// import jwt from "jsonwebtoken"

// const test = async () => {
//     const token = jwt.sign({ _id: "abc123" }, "thisis");
//     const data = jwt.verify(token, "thisis")
//     console.log(data)
// }
// test();

// import Task from "./models/task.js";
// import User from "./models/user.js";

// const main = async () => {
//     // const task = await Task.findById("65e4b3594f807a2e8a5fd92d")
//     // await task.populate("owner")
//     // console.log(task)

//     const user = await User.findById("65e4b33f4f807a2e8a5fd927");
//     await user.populate("tasks");
//     console.log(user.tasks)
// }

// main();

