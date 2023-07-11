'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000;

const server = require('socket.io-client')

const host = `http://localhost:${port}/airline`

const socket = server(host)

socket.on('took-off', tookOffHandler)
socket.on('arrived', arrivedHandler)

function tookOffHandler(payload) {
    console.log(`Pilot: flight with ID${payload.id} took-off`);
}
// socket.emit('details', payload)
function arrivedHandler(payload) {
    console.log(` Pilot: flight with ID${payload.id} arrived`);
    socket.emit('flight-arrived', payload)
}

