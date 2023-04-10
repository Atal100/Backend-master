const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistSchema = new Schema({
 
    name: {
        type: String,
        minLength: 1,
        required: [true, 'Name is required'],
    },
    genre: {
        type: String,
        minLength: 1,
        maxLentgth: 15,
        required: [true, "Genre is required"],
    },
    country: {
        type: String,
        required: false
    },
    // user: {
    //     type:Schema.Types.ObjectId,
    //     ref: "user",
    //     required: [true,"User is required"]

    // }
})

module.exports = mongoose.model('artist', ArtistSchema)