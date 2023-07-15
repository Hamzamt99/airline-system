'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

// require the client socket
const server = require('socket.io-client');

// connect the socket to the server
const socket = server(`http://localhost:${port}`);

// import faker to get random data
const { faker } = require('@faker-js/faker');

// set time to loop through to get random data every 10 sec
setInterval(() => {
    let data = {
        event: 'new-fligh',
        time: new Date(),
        details: {
            id: faker.string.uuid(),
            pilotes: faker.internet.userName(),
            destinations: faker.location.country(),
            airline: faker.definitions.airline.airline[0].name,
        }
    }
    // emit the faker data to the new flight event
    socket.emit('new-flight', data)
}, 10000)

// event the flight to get the data from the new flight
socket.on('flight', flighthandler)

// handle the flight event hanlder which we already give it the data from the new flight
function flighthandler(payload) {
    console.log(`Manager: new flight with ID: ${payload.details.id} have been scheduled:`, new Date())
    payload.event = 'new-flight'
    payload.data = new Date()
    socket.emit('logStatus', payload)
}

socket.on('notifyManager', payload => {
    console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.details.pilotes}`);
})





