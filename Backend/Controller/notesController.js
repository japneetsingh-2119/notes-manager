const Note = require('../model/Note')
const mongoose = require('mongoose');

const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json({
            result: "success",
            data: notes
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const createNote = async (req, res, next) => {
    try {
        const note = new Note(req.body);
        const savedNote = await note.save();
        console.log("Data sent");
        
        res.status(200).json({
            result: "success",
            data: savedNote
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const updateNote = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                result: "error",
                error: "Invalid Id"
            });
        }
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            result: "success",
            data: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

const deleteNote = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                result: "error",
                error: "Invalid Id"
            });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({
            result: "success",
            message: "Id Deleted"
        });
    } catch (error) {
        res.status(500).json({
            result: "error",
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };
