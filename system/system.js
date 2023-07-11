'use strict'

require('dotenv').config()

const port = process.env.PORT || 3000

const server = require('socket.io')(port);

const { faker } = require('@faker-js/faker');

const airline = server.of('/airline')

server.on('connection', socket => {
    console.log('the server is connceted to id:', socket.id);
    setInterval(() => {
        let data = {
            id: faker.string.uuid(),
            pilotes: faker.internet.userName(),
            destinations: faker.location.country(),
            airline: faker.definitions.airline.airline[0].name,
        }
        socket.emit('new-flight', data)
        console.log("Flight:",
            {
                event: 'new-flight',
                time: new Date(),
                Details: {
                    airLine: data.airline,
                    flightID: data.id,
                    pilot: data.pilotes,
                    destination: data.destinations
                }
            });
    }, 6000)
    airline.on('connection', socket => {
        setTimeout(() => {
            socket.emit('took-off', data)
            console.log(
                console.log("Flight:",
                    {
                        event: 'took-off',
                        time: new Date(),
                        Details: {
                            airLine: data.airline,
                            flightID: data.id,
                            pilot: data.pilotes,
                            destination: data.destinations
                        }
                    }));
        }, 4000)


    })
    // socket.on('details', data => {
    //     console.log("Flight:",
    //         {
    //             event: 'new-flight',
    //             time: new Date(),
    //             Details: {
    //                 airLine: data.airline,
    //                 flightID: data.id,
    //                 pilot: data.pilotes,
    //                 destination: data.destinations
    //             }
    //         });
    // })
})




        // socket.on('details', data => {
        // console.log("Flight:",
        //     {
        //         event: 'took-off',
        //         time: new Date(),
        //         Details: {
        //             airLine: data.airline,
        //             flightID: data.id,
        //             pilot: data.pilotes,
        //             destination: data.destinations
        //         }
        //     });
        // })
        // setTimeout(() => {
            //     socket.emit('arrived', payload())
            //     socket.on('details', data => {
                //         console.log("Flight:",
//             {
//                 event: 'arrived',
//                 time: new Date(),
//                 Details: {
//                     airLine: data.airline,
//                     flightID: data.id,
//                     pilot: data.pilotes,
//                     destination: data.destinations
//                 }
//             });
//     })
// }, 4000)