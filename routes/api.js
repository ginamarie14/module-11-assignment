const path = require('path');
const fs = require('fs').promises;
const { uuid } = require('uuid');
const router = require('express').Router();

module.exports = (app) => {
  // get notes
  app.get("/api/notes", (req, res) => {
    getNotes().then(data => res.json(data)).catch((err) => console.log(err));
  });

  // post notes
  app.post("/api/notes", (req, res) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid,
    };
    createNote(newNote).then(data => res.json(data)).catch((err) => console.log(err));
  });
   
  // delete notes
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    deleteNote(id).then(data => res.json(data)).catch((err) => console.log(err));

  });

  // get notes async for promise chaining
  async function getNotes () {
    const file = path.join(__dirname, "../db/db.json");
    const data = fs.readFile(file);
    const notes = JSON.parse(data);
    return notes;
  };

  // creating & pushing new note to notes database
  async function createNote () {
    const allNotes = await getNotes();
    allNotes.push(note);
    const file = path.join(__dirname, "../db/db.json");
    fs.createFile(file, JSON.stringify(allNotes));
    return note;
  };

  // delete note using search by id
  async function deleteNote () {
    const allNotes = await getNotes();
    const filteredNotes = await allNotes.filter((note) => id !== note.id);
    const file = path.join(__dirname, "../db/db.json");
    fs.createFile(file, JSON.stringify(filteredNotes));
    return updatedNotes = getNotes();
  };
};