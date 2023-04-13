const Error = require("../models/ApiError");
const artist = require('../models/artist');


module.exports = {
    createArtist(req, res, next ) {
        const properties = req.body

        artist.create(properties)
            .then(artist => res.status(200).json({
                artist
            }))
            .catch((err) => {
                res.status(500).json({message: "Something went wrong with making the artist. Try again a later time"}).end();
            })
    },

    getArtist(req, res, next) {
        const artistId = req.params.id

        artist.findById(artistId)
            .then((artist) => {
                if (artist !== null) {
                    let _id = artist.id
                    let name = artist.name
                    let genre = artist.genre
                    let country = artist.country
                    let user = artist.user
                    res.status(200).json({
                        _id,name,genre,country,user
                    })
                } else {
                    next(new Error('Artist not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Artist not found, wrong identifier', 422))
            })
    },
    getAllArtists(req, res, next) {
        artist.find({})
            .then((artist) => {
                res.status(200).json(
                    artist
                )
            })
            .catch(() => {
                next(new Error({ message: 'Artists not found, no artists have been posted yet', code: 404 }))
            })
    },
    updateArtist(req, res, next) {
 
  

            artist.findByIdAndUpdate(req.params.id, {$set:req.body })
            .then(artist => res.status(200).json({            
                artist
            }))
            .catch((err) => {
                res.status(500).json({message: "Something went wrong with updating the artist. Try again a later time"}).end();
            })
    },

    deleteArtist(req, res, next) {
        const artistId = req.params.id

        artist.findOneAndDelete({ _id: artistId })
            .then(() => res.status(200).json({        
                artistId
            }))
            .catch(() => {
                res.status(500).json({message: "Something went wrong with deleting the artist. Try again a later time"}).end();
            })
    }
}