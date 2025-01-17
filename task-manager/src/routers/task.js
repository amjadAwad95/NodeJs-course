import express from "express"
import Task from "../models/task.js"
import auth from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/tasks", auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(() => {
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.get("/tasks", auth, async (req, res) => {
    const match = {};
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === "true"
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = (parts[1] == "desc") ? -1 : 1
    }
    try {
        // const tasks = await Task.find({});
        // const tasks = await Task.find({ owner: req.user._id });
        await req.user.populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.status(201).send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })
})

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ error: "Not Found" });
        }
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error)
    }
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(400).send();
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const alloweUpdats = ["completed", "description"];
    const isValiedUpdate = updates.every((update) => alloweUpdats.includes(update))
    if (!isValiedUpdate) {
        return res.status(400).send({ error: "Invalid update" });
    }
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        // const task = await Task.findById(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ error: "Not Found" });
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send({ error: "Not Found" });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router