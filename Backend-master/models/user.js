const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: {
        type: String,
        trim: true,
        required: [true, 'firstname is required'],
        
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, 'lastname is required'],
        
    },
    email: {
        type: String,
        trim: true,
        required: [true, " A email is required"],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        minlength: [4, "Password needs more letters"],
        required: [true, 'Password is required']
    },
})

module.exports = mongoose.model('user', UserSchema)