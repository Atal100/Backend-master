const music = require('../models/music');
const Error = require("../models/ApiError");


module.exports = {
    createMusic(req, res, next) {
        const properties = req.body

        music.create(properties)
            .then(music => res.status(201).json({
                "message": "Music has been succesfully created.",
                "code": 201,
                "music": music
            }))
            .catch((err) => {
                res.status(500).json({message: req.body + err}).end();
            })
    },

    getMusic(req, res, next) {
        const musicId = req.params.id

        music.findById(musicId)
            .then((music) => {
                if (music !== null) {
                    res.status(200).json({
                        music
                    })
                } else {
                    next(new Error('music not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('music not found, wrong identifier', 422))
            })
    },
    getAllMusic(req, res, next) {
        music.find({})
            .then((music) => {
                res.status(200).json(
                    music
                )
            })
            .catch(() => {
                next(new Error({ message: 'music not found, no movies have been posted yet', code: 404 }))
            })
    },
    updateMusic(req, res, next) {
 
  

            music.findByIdAndUpdate(req.params.id, {$set:req.body })
            .then(music => res.status(201).json({
                "message": "music has been updated.",
                "code": 201,
                "music": music
            }))
            .catch((err) => {
                res.status(500).json({message: "Something went wrong with updating the music. Try again a later time"}).end();
            })
    },

    deletemMusic(req, res, next) {
        const musicId = req.params.id

        music.findOneAndDelete({ _id: musicId })
            .then(() => res.status(200).json({
                "message": "music has been deleted",
                "code": 200,
                "musicId": musicId
            }))
            .catch(() => {
                res.status(500).json({message: "Something went wrong with deleting the music. Try again a later time"}).end();
            })
    }
}