const fs = require("fs");

// console.log(bookJson);

// const JSONData=JSON.parse(bookJson);

// console.log(JSONData);

// const book = {
//     title: "New city",
//     author: "amjad"
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJson);

// const dataBuffer = fs.readFileSync("1-json.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON)
// console.log(data);


const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
data.name = "Amjad";
data.age = 19;
const jsonData=JSON.stringify(data)
fs.writeFileSync("1-json.json", jsonData)