const mongoose = require('mongoose')

const taskSchemas = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {
    timestamps: true
})

const tasks = mongoose.model('Tasks', taskSchemas)

module.exports = tasks