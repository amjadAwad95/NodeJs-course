import express from "express"
import User from "../models/user.js"
import auth from "../middleware/auth.js";
import multer from "multer"
import sharp from "sharp"
import { sendWelcomeEmail, sendWhenUserRemoveAccount } from "../emails/account.js"

const router = express.Router();


router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        sendWelcomeEmail(req.body.email, req.body.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }


    // user.save().then(() => {
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByEmailAndPassword(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(404).send(error);
    }
})

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        req.status(500).send(error)
    }
})

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get("/users", auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(500).send(error);
    }


    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
})

router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send({ error: "Not Found" });
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error)
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(400).send();
    //     }
    //     res.send(user);
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })
})

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const alloweUpdats = ["name", "age", "email", "password"];
    const isValiedUpdate = updates.every((update) => alloweUpdats.includes(update));
    if (!isValiedUpdate) {
        return res.status(400).send({ error: "Invalid update" });
    }
    try {
        const user = await User.findById(req.user._id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send({ error: "Not Found" });
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // if (!user) {
        //     return res.status(404).send({ error: "Not Found" });
        // }
        const user = await User.findByIdAndDelete(req.user._id);
        sendWhenUserRemoveAccount(req.user.email, req.user.name);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
})

const upload = multer({
    // dest: "avatar",
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            cb(new Error("You should upload a file end with jpeg or jpg or png"));
        }
        cb(undefined, true);
    }
})

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get("/users/:id/avatar", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set("Content-Type", "image/png");
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send();
    }
})

export default router;