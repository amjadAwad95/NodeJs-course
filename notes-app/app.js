//const fs=require("fs")
// fs.writeFileSync("notes.txt","hi this is a new wirte")
//fs.appendFileSync("notes.txt","\nthis is a append")

// const math=require("./utils")
// console.log(math.add(5,10),"     ",math.sub(20,10))

//const validator = require("validator");
// console.log(validator.isEmail("amjadawad129@gmail.com"));
// console.log(validator.isURL("https://amjad.com"));

//const chalk = require("chalk")
// console.log(chalk.bgGreen.bold.inverse("Success"));
// console.log(chalk.green.bold.inverse("Success"));
//console.log(process.argv[2])

// const command = process.argv[2];
// if (command === "add") {
//     console.log("Adding new note...")
// } else if (command === "remove") {
//     console.log("Removing note")
// }

// console.log(getNotes());
// console.log(process.argv);
// console.log(yargs.argv);
// const getNotes = require("./notes");

const yargs = require("yargs")
const notes = require("./notes")

yargs.version("1.1.0");

yargs.command({
    command: "add",
    describe: "Adding new note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: "remove",
    describe: "Removing a note",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: "read",
    describe: "read notes",
    builder: {
        title: {
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: "list",
    describe: "list a note",
    handler() {
        notes.listNote();
    }
})

yargs.parse();






