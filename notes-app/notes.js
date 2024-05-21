const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
    return "Your Notes....";
}

const addNote = (title, body) => {
    const notes = loadNodes();

    const dublicateNotes = notes.filter((note) => {
        return note.title === title;
    })

    if (dublicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        return console.log(chalk.green.bold("new note added"));
    }
    return console.log(chalk.red.bold("Note title taken"));
}

const removeNote = (title) => {
    const notes = loadNodes();
    const filteringList = notes.filter((note) => {
        return note.title != title;
    })
    saveNotes(filteringList);
    console.log(chalk.green.bold("Note that has a title " + title + " removing"))
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
}

const loadNodes = () => {
    try {
        const dataBuffer = fs.readFileSync("notes.json");
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

const listNote = () => {
    const notes = loadNodes();
    notes.map((note) => {
        console.log(chalk.green.bold("Title: " + note.title) + chalk.white.bold(",body: " + note.body));
    })
}

const readNote = (title) => {
    const notes = loadNodes();
    const note = notes.find((note) => {
        return note.title === title;
    })
    if (note) {
        return console.log(chalk.green.bold("Title: " + note.title) + chalk.white.bold(",body: " + note.body));
    }
    return console.log(chalk.red.bold("Note not found"));
}

module.exports = {
    getNotes, addNote, removeNote, listNote, readNote
}