'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io-client');

const socket = server(`http://localhost:${port}`);

socket.on('new-flight', flighthandler)


function flighthandler(payload) {
    console.log(`Manager: new flight with ID: ${payload.id} have been scheduled:`, new Date())
}
// socket.emit('details',payload)




