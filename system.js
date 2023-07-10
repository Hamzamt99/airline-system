'use strict'
const { eventsPool } = require('./components/events')

require('./components/manager')
require('./components/pilot')
const { payload } = require('./components/events')

setInterval(() => {
    eventsPool.emit('new-flight', payload)
    setTimeout(() => {
        eventsPool.emit('took-off', payload)
    }, 4000)
    setTimeout(() => {
        eventsPool.emit('arrived', payload)
        console.log("Manager: we’re greatly thankful for the amazing flight", payload.pilotes);
    }, 7000)
}, 10000)

