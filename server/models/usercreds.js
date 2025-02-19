const mongoose = require('mongoose')

const userCreds = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    reccreated: {
        type: Array,
        default: []
    },
    recmarked: {
        type: Array,
        default: [[], []]
    },
})

module.exports = mongoose.model('UserCreds', userCreds)