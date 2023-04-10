'use strict';

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//routes
const concertRoutes = require('./routes/concert.routes')
const artistRoutes = require('./routes/artist.routes')
const ticketRoutes = require('./routes/ticket.routes')
const musicRoutes = require('./routes/music.routes')
const userRoutes = require('./routes/authentication.routes')




const ApiError = require('./models/ApiError')
const { webPort, logger } = require('./config/config')

const port = process.env.PORT || webPort

let app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");

    next();
});

const cors = require('cors');

app.use(cors())

// bodyParser parses the body from a request
// hierin zit de inhoud van een POST request.
app.use(bodyParser.urlencoded({
    'extended': 'true'
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})) // parse application/vnd.api+json as json

// Instal Morgan as logger
app.use(morgan('dev'))

//Database connection (NOSQL, MONGODB)
 if (process.env.NODE_ENV == 'testCloud' || process.env.NODE_ENV == 'production') {
     mongoose.connect('mongodb+srv://admin:test123@cluster0.75qaetu.mongodb.net/test',
         { useNewUrlParser: true });

 } else
 if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb+srv://admin:test123@cluster0.75qaetu.mongodb.net/test',
        { useNewUrlParser: true });
}


// Routes
app.use('/api', concertRoutes)
app.use('/api', artistRoutes)
app.use('/api', ticketRoutes)
app.use('/api', musicRoutes)
app.use('/api', userRoutes)

//app.get('/movies', function (req, res) {
//    res.json({ message: 'You did it! Great Job!' })
//});

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
    // logger.error('Non-existing endpoint')
    const error = new ApiError('Non-existing endpoint', 404)
    next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
    logger.error(err)
    res.status((err.code || 404)).json(err).end()
})

app.disable('etag');

//
// When this server shuts down, we gracefully clean up all the mess behind us.
// This is where we release the database pool.
//
function shutdown() {
    logger.info('shutdown started')
    app.stop()
        // 	.then(() => {
        // pool.end((err) => {
        // 	if (err) {
        // 		logger.info('Error releasing connection in the database pool: ' + err.toString())
        // 		process.exit()
        // 	} else {
        // 		logger.info('All connections in the pool have ended')
        // 		process.exit()
        // 	}
        // })
        // })
        .then(() => {
            logger.info('process is stopping')
        })
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

// Start listening for incoming requests.
app.listen(port, () => {
    logger.info('Server running on port ' + port)
    logger.info('API documentation is available at ./api-docs/')
})

// Testcases need our app - export it.
module.exports = app