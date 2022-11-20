const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    roll: {
        type: Number,
        required: true,
        unique: true,
    },

})

const Student = mongoose.model('Student', studentSchema)
module.exports = Student