import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import cors from "cors"
import Filter from "bad-words"
import { createLocationMessage, createMessage } from "./utils/messages.js"
import { addUser, getUsersInRoom, getUser, removeUser } from './utils/users.js';

const app = express();

app.use(express.json());
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
});



const port = process.env.PORT | 5000;

app.get('/', (req, res) => {
    res.send('<h1> Chat APP </h1>');
});


io.on("connection", (socket) => {
    console.log("User are connected");

    socket.on("join", (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room);
        socket.to(user.room).emit("message", createMessage("Admin", "Welcome"));
        socket.broadcast.to(user.room).emit("message", createMessage("Admin", `${user.userName} has joined`));
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback();
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            callback(createMessage("Admin", "User not found"));
        }

        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback(createMessage("Admin", "This message  is profean"))
        }

        io.to(user.room).emit("message", createMessage(user.userName, message));
        callback(createMessage("Admin", "Delivierd!"))
    })


    socket.on("sendLocation", (coords, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            callback(createMessage("Admin", "User not found"));
        }
        io.to(user.room).emit("locationMessage", createLocationMessage(user.userName, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback(createMessage("Admin", "coords was sent succsesfully "))
    })


    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", createMessage("Admin", `${user.userName} has left`));
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            })

        }


    })
})

server.listen(port, () => {
    console.log(`run on port ${port}`);
});




// io.on("connection", (socket) => {
//     console.log(`a user connected ${socket.id}`);
//     socket.on("send_message", (data) => {
//         socket.broadcast.emit("receive_message", data);
//     });
// })



// let count = 0;
// socket.emit("countUpdate", count)
// socket.on("increment", () => {
//     count++;
//     // socket.emit("countUpdate", count)
//     io.emit("countUpdate", count)
// })