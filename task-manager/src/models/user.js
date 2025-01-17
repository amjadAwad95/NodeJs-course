import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Task from "./task.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("The value must not contain a password keyword")
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("The email invalid")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("The age invalid")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// userSchema.methods.getPublicProfile = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;
//     delete userObject.tokens;
//     return userObject;
// }

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token;
}

userSchema.statics.findByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Not Found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Not Found");
    }
    return user;
}

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

userSchema.pre("remove", async function (next) {
    const user = this;

    await Task.deleteMany({ owner: user._id });

    next();
})

const User = mongoose.model("User", userSchema)

export default User