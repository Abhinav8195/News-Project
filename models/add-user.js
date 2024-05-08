const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin:{
        type:Boolean,
    }
});

module.exports = mongoose.model('register', regSchema);