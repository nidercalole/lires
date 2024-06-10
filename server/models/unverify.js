const mongoose = require('mongoose')

const unverifySchema = new mongoose.Schema({
    ings: {
        type: Array,
        default: []
    },
    recs: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model('Unverify', unverifySchema)