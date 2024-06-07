const mongoose = require('mongoose')

const recSchema = new mongoose.Schema({
    recname: {
        type: String,
        required: true
    },
    ts: {
        type: Date,
        default: Date.now
    },
    recid: {
        type: String,
        default: Math.random().toString(36).substring(2)
    },
    user:{
        type: Array,
        default: []
    },
    expense:{
        type: int,
        required: true
    },
    duration:{
        type: int,
        required: true
    },
    description:{
        type: String,
        default: ''
    },
    countfor:{
        type: Array,
        default: []
    },
    kindodish:{
        type: Array,
        required: true
    },
    labels:{
        type: Array,
        default: []
    },
    ingredients:{
        type: Array,
        default: []
    },
    directions:{
        type: Array,
        default: []
    },
    extra:{
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Rec', recSchema)