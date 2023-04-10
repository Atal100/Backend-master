const ticket = require('../models/ticket');
const Error = require("../models/ApiError");


module.exports = {
    createTicket(req, res, next) {
        const properties = req.body

        ticket.create(properties)
            .then(ticket => res.status(201).json({
                "message": "ticket has been succesfully created.",
                "code": 201,
                "ticket": ticket
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 500 }))
            })
    },

    getTicket(req, res, next) {
        const ticketId = req.params.id

        ticket.findById(ticketId)
            .then((ticket) => {
                if (ticket !== null) {
                    res.status(200).json({
                        ticket
                    })
                } else {
                    next(new Error('ticket not found, wrong identifier.', 422))
                }
            })
            .catch(() => {
                next(new Error('ticket not found, wrong identifier', 422))
            })
    },
    getAllTickets(req, res, next) {
        ticket.find({})
            .then((tickets) => {
                res.status(200).json(
                    tickets
                )
            })
            .catch(() => {
                next(new Error({ message: 'tickets not found, no movies have been posted yet', code: 404 }))
            })
    },
    updateTicket(req, res, next) {
 
  

            ticket.findByIdAndUpdate(req.params.id, {$set:req.body })
            .then(ticket => res.status(201).json({
                "message": "ticket has been updated.",
                "code": 201,
                "ticket": ticket
            }))
            .catch((err) => {
                next(new Error({ message: err, code: 422 }))
            })
    },

    deleteTicket(req, res, next) {
        const ticketId = req.params.id

        ticket.findOneAndDelete({ _id: ticketId })
            .then(() => res.status(200).json({
                "message": "ticket has been deleted",
                "code": 200,
                "ticketId": ticketId
            }))
            .catch(() => {
                next(new Error('ticket not found, wrond identifier.', 422))
            })
    }
}