const artist_controller = require('../controllers/artist.controller.js');
const express = require('express');
const router = express.Router();

router.get('/artist/:id/',artist_controller.getArtist)
router.get('/artist', artist_controller.getAllArtists)
router.post('/artist', artist_controller.createArtist)
router.delete('/artist/:id', artist_controller.deleteArtist)
router.put('/artist/:id', artist_controller.updateArtist)

module.exports = router;