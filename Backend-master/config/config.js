//
// Application configuration
//
'use strict';

// Set the logging level.
const loglevel = process.env.LOGLEVEL || 'trace'
const secretkey = process.env.SECRETKEY

module.exports = {
    secretkey: "313333376d61737465726b65797468617463616e746265637261636b6564",

    webPort: process.env.PORT || 3000,
    logger: require('tracer')
        .console({
            format: [
                "{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"
            ],
            preprocess: function (data) {
                data.title = data.title.toUpperCase();
            },
            dateformat: "isoUtcDateTime",
            level: loglevel
        })
}