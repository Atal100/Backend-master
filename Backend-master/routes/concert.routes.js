const concert_controller = require('../controllers/concert.controller.js');
const express = require('express');
const router = express.Router();

router.get('/concert/:id/',concert_controller.getConcert)
router.get('/concert', concert_controller.getAllConcert)
router.post('/concert', concert_controller.createConcert)
router.delete('/concert/:id', concert_controller.deleteConcert)
router.put('/concert/:id', concert_controller.updateConcert)

module.exports = router;