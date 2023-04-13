const Error = require("../models/ApiError");
const concert = require('../models/concert');
const music = require("../models/music");


module.exports = {
    createConcert(req, res, next) {
        const properties = req.body

        concert.create(properties)
            .then(concert => res.status(201).json({
                "message": "Concert has been succesfully created.",
                "code": 201,
                "concert": concert
            }))
            .catch((err) => {
                res.status(500).json({message: "Something went wrong with making the Concert. Try again a later time"}).end();
            })
    },

    getConcert(req, res, next) {
        const concertId = req.params.id

        concert.findById(concertId)
            .then((concert) => {
                if (concert !== null) {
                    let _id = concert.id
                    let artists = concert.artists
                    let date = concert.date
                    let adres = concert.adres
                    let user = concert.user
                    res.status(200).json({
                        _id,artists,date,adres,user
                    })
                } else {
                    next(new Error('Concert not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('Concert not found, wrong identifier', 422))
            })
    },
    getAllConcert(req, res, next) {
        concert.find({})
            .then((concert) => {
                res.status(200).json(
                    concert
                )
            })
            .catch(() => {
                next(new Error({ message: 'concert not found, no movies have been posted yet', code: 404 }))
            })
    },
    updateConcert(req, res, next) {
 
  

            concert.findByIdAndUpdate(req.params.id, {$set:req.body })
            .then(concert => res.status(201).json({
                "message": "Concert has been updated.",
                "code": 201,
                "concert": concert
            }))
            .catch((err) => {
                res.status(500).json({message: "Something went wrong with updating the concert. Try again a later time"}).end();
            })
    },

    deleteConcert(req, res, next) {
        const concertId = req.params.id

        concert.findOneAndDelete({ _id: concertId })
            .then(() => res.status(200).json({
                "message": "Concert has been deleted",
                "code": 200,
                "concertId": concertId
            }))
            .catch(() => {
                res.status(500).json({message: "Something went wrong with deleting the concert. Try again a later time"}).end();
            })
    }
}