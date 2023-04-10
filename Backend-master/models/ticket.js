const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
 
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'artist',
        required: [true, 'Artist is required'],
    },
    music: {
        type: Schema.Types.ObjectId,
        ref: 'music',
        required: [true, "Music is required"],
    },
    concert: {
        type: Schema.Types.ObjectId,
        ref: 'concert',
        required: [true, "Concert is required"],
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: Number,
        required: [true,"User is required"]
    }
})

module.exports = mongoose.model('ticket', TicketSchema)