import { MongoClient, ObjectId } from "mongodb"

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();

// console.log(id)

MongoClient.connect(connectionURL, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected correctly');
        const db = client.db(databaseName);

        // db.collection("tasks").deleteOne({
        //     _id: new ObjectId("65da012828b9ca0d96bd76b1")
        // }).then(result => {
        //     console.log(result)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("users").deleteMany({
        //     name: "ahmad"
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })

        // db.collection("tasks").updateMany({
        //     completed: false
        // }, {
        //     $set: {
        //         completed: true
        //     }
        // }).then(result => {
        //     console.log(result)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("users").updateOne({
        //     _id: new ObjectId("65d9ffc2e883daa52a31758d")
        // }, {
        //     $set: {
        //         age: 18
        //     }
        // }).then(user => {
        //     console.log(user)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("users").updateMany({
        //     name: "ahmad"
        // }, {
        //     $set: {
        //         age: 18
        //     }
        // }).then(user => {
        //     console.log(user)
        // }).catch(error => {
        //     console.log(error)
        // })


        // db.collection("tasks").findOne({ _id: new ObjectId("65da012828b9ca0d96bd76b1") }).then(task => {
        //     console.log(task)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("tasks").find({ completed: false }).toArray().then(tasks => {
        //     console.log(tasks)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("users").findOne({ name: "amjad" }).then((user) => {
        //     console.log(user)
        // }).catch(error => {
        //     console.log(error)
        // })
        // db.collection("users").find({ age:19 }).toArray().then((users) => {
        //     console.log(users)
        // }).catch(error => {
        //     console.log(error)
        // })
        // db.collection("users").insertOne({
        //     name: "amjad",
        //     age: 19
        // }, (error, result) => {
        //     if (error) {
        //         return console.log("error: ", error)
        //     }
        //     console.log(result.ops)
        // })
        // db.collection("users").insertMany([{
        //     name: "omar",
        //     age: 20
        // }, {
        //     name: "ahmad",
        //     age: 19
        // }, {
        //     name: "abood",
        //     age: 19
        // }]).then((error, result) => {
        //     if (error) {
        //         return console.log(error)
        //     }
        //     console.log(result.ops)
        // }).catch(error => {
        //     console.log(error)
        // })

        // db.collection("tasks").insertMany([
        //     {
        //         description: "Learn node js",
        //         completed: true
        //     },
        //     {
        //         description: "Learn SW",
        //         completed: true
        //     },
        //     {
        //         description: "Learn AI",
        //         completed: false
        //     }
        // ]).then((error, result) => {
        //     if (error) {
        //         return console.log(error)
        //     }
        //     console.log(result.ops)
        // }).catch(error => {
        //     console.log(error)
        // })
        // insert("tasks", db, {
        //     description: "test ops",
        //     completed: true
        // })

    })
    .catch(error => {
        console.log('Unable to connect to database!', error);
    });

// const insert = async (collectionName, db, value) => {
//     const insertedData = await db.collection(collectionName).insertOne(value);
//     console.log(insertedData.ops)
// }