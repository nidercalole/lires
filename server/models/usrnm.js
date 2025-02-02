const mongoose = require('mongoose')

const usrnmSchema = new mongoose.Schema({
    usrnm: {
        type: String,
        required: true
    },
    usrid: {
        type: String,
        unique: true,
    },
    ts: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Usrnm', usrnmSchema)