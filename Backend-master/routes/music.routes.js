const  music_controller= require('../controllers/music.controller.js');
const express = require('express');
const router = express.Router();

router.get('/music/:id/',music_controller.getMusic)
router.get('/music', music_controller.getAllMusic)
router.post('/music', music_controller.createMusic)
router.delete('/music/:id', music_controller.deletemMusic)
router.put('/music/:id', music_controller.updateMusic)

module.exports = router;