const express = require("express");
const {getNotes, createNote, updateNote, deleteNote} = require("../Controller/notesController")

const router = express.Router()

router.get('/', getNotes);
router.post('/createNote', createNote);
router.put('/:id',updateNote);
router.delete('/:id', deleteNote);


module.exports = router
