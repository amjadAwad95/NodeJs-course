const users = []

const addUser = ({ id, userName, room }) => {
    userName = userName.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!userName || !room) {
        return {
            error: "User name And rome are required!"
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.userName === userName
    })


    if (existingUser) {
        return {
            error: "User name Must be unique"
        }
    }

    const user = { id, userName, room }
    users.push(user)
    return {
        user
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return { error: "couldn't find the user" };
}

const getUser = (id) => {
    const user = users.find((user) => user.id === id);
    return user;
}

const getUsersInRoom = (room) => {
    room = room?.trim().toLowerCase()
    const usersInRoom = users.filter((user) => user.room === room)
    return usersInRoom
}

export {
    addUser, removeUser, getUser, getUsersInRoom
}

// addUser({
//     id: 22,
//     userName: "amjad",
//     room: "Nablus"
// })
// addUser({
//     id: 23,
//     userName: "Omar",
//     room: "Nablus"
// })
// addUser({
//     id: 24,
//     userName: "abood",
//     room: "Nablus"
// })

// console.log(users)

// let user = getUser(22);
// console.log(user);
// user = getUser(25);
// console.log(user);

// user = getUsersInRoom("Nablus");
// console.log(user);

// user = getUsersInRoom("1");
// console.log(user);