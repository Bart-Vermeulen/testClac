const mongoose = require('mongoose');

const post = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: Date,
    weight: {
        type: Number,
        required: true,
    },
    steps: {
        type: Number,
        default: 0,
    },
    isRunning: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('posts', post)