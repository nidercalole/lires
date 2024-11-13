const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    listname: {
        type: String,
        required: true
    },
    ts: {
        type: Date,
        default: Date.now
    },
    addTs: {
        type: Date,
        default: Date.now
    },
    listid: {
        type: String,
        default: Math.random().toString(36).substring(2, 12)
    },
    list: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('List', listSchema)