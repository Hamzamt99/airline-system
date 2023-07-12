'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000;

const server = require('socket.io-client')

const host = `http://localhost:${port}/airline`

const hostManager = `http://localhost:${port}`

const socket = server(host)

const socketManager = server(hostManager)

socketManager.on('getData', payload => {
    socket.emit('getFlight', payload)
})
socket.on('took-off', tookOffHandler)
socket.on('arrived', arrivedHandler)

function tookOffHandler(payload) {
    setTimeout(() => {
        console.log(`Pilot: flight with ID${payload.details.id} took-off`);
        payload.event = 'took-off'
        payload.data = new Date()
        socket.emit('logStatus', payload)
    }, 4000)
}

function arrivedHandler(payload) {
    setTimeout(() => {
        console.log(` Pilot: flight with ID${payload.details.id} arrived`);
        payload.event = 'arrived'
        payload.data = new Date()
        socket.emit('logStatus', payload)
    }, 7000)

}

