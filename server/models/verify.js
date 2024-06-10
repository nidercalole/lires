const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    ings: {
        type: Array,
        default: []
    },
    recs: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('Verify', verifySchema)