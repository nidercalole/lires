const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    primUsr: {
        type: String,
        required: true
    },
    primUsrId: {
        type: String,
        required: true
    },
    requests: {
        type: Array,
        default: []
    },
    rejected: {
        type: Array,
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    extra: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('Friend', friendSchema)