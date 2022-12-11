const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
 
// // get notes
  // router.get("/notes", (req, res) => {
  // getNotes().then(data => res.json(data)).catch((err) => console.log(err));
  // });

  // post notes
  router.post("/notes", (req, res) => {
    console.log('----------- /api/notes post route hit!! -----------')
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    console.log(newNote)
    createNote(newNote).then(data => res.json(data)).catch((err) => console.log(err));
  });
   
  // delete notes
  router.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    deleteNote(id).then(data => res.json(data)).catch((err) => console.log(err));

  });

  // get notes async for promise chaining
  async function getNotes () {
    const file = path.join(__dirname, "../db/db.json");
    const data = await fs.readFile(file);
    const notes = JSON.parse(data);
    return notes;
  };

  // creating & pushing new note to notes database
  async function createNote (note) {
    const allNotes = await getNotes();
    allNotes.push(note);
    const file = path.join(__dirname, "../db/db.json");
    await fs.writeFile(file, JSON.stringify(allNotes));
    return note;
  };

  // delete note using search by id
  async function deleteNote (updatedNotes) {
    const allNotes = await getNotes();
    const filteredNotes = await allNotes.filter((note) => id !== note.id);
    const file = path.join(__dirname, "../db/db.json");
    fs.createFile(file, JSON.stringify(filteredNotes));
    return updatedNotes = getNotes();
  };

module.exports = router;