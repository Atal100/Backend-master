const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConcertSchema = new Schema({
 
    name: {
        type: String,
        minLength: 1,
        required: [true, 'Name is required'],
    },
    music: {
        type: Schema.Types.ObjectId,
        ref: 'artist',
        required: [true, "Music is required"],
    },
    date: {
        type: Date,
        required: true
    },
    adres: {
        type: String,
        minLength: 1,
        required: [true,"Adress is required"]
    },
    // user: {
    //     type:Schema.Types.ObjectId,
    //     ref: "user",
    //     required: [true,"User is required"]

    // }
})

module.exports = mongoose.model('concert', ConcertSchema)