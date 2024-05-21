
const createMessage = (userName, message) => {
    return {
        userName,
        message,
        createdAt: new Date().getTime()
    }
}

const createLocationMessage = (userName, url) => {
    return {
        userName,
        url,
        createdAt: new Date().getTime()
    }
}

export {
    createMessage,
    createLocationMessage
}