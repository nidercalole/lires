const mongoose = require('mongoose')

function getRandomId() {
    return Math.random().toString(36).substring(2);
}

const usrnmSchema = new mongoose.Schema({
    usrnm: {
        type: String,
        required: true
    },
    usrid: {
        type: String,
        default: getRandomId()
    },
    ts: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Usrnm', usrnmSchema)