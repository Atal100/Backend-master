const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MusicSchema = new Schema({
 
    name: {
        type: String,
        minLength: 1,
        required: [true, 'Name is required'],
    },
    artists: {
        type: Schema.Types.Array,
        ref: 'artist',
        required: [true, "Artist is required"],
    },
    duration: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    country: {
        type: String,
        required: true
    },
     user: {
         type:Schema.Types.ObjectId,
         ref: "user",
         required: [true,"User is required"]

     }
})

module.exports = mongoose.model('music', MusicSchema)