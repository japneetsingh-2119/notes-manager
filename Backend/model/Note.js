const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    }
}, {timestamps: true})

module.exports = mongoose.model('Note', noteSchema);
