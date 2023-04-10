const ticket_controller = require('../controllers/ticket.controller.js');
const express = require('express');
const router = express.Router();

router.get('/ticket/:id/',ticket_controller.getTicket)
router.get('/ticket', ticket_controller.getAllTickets)
router.post('/ticket', ticket_controller.createTicket)
router.delete('/ticket/:id', ticket_controller.deleteTicket)
router.put('/ticket/:id', ticket_controller.updateTicket)

module.exports = router;