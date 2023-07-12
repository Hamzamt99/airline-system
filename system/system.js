'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io')(port);

const airline = server.of('/airline')

server.on('connection', socket => {
    console.log('the server is connceted to id:', socket.id);
    socket.on('new-flight', data => {
        server.emit('flight', data)
        server.emit('getData', data)
    })
    socket.on('logStatus', data => {
        console.log(data);
    })
    socket.on('notifyArrived', data => {
        server.emit('notifyManager', data)
    })
})
airline.on('connection', socket => {
    console.log('pilot has been connected with id', socket.id);
    socket.on('getFlight', data => {
        airline.emit('took-off', data)
        airline.emit('arrived', data)
    })
    socket.on('logStatus', data => {
        console.log(data);
    })
})
