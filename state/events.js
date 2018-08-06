const nanobus = require('nanobus')
const nanotick = require('nanotick')

const tick = nanotick()
const bus = nanobus()
const emit = tick(bus.emit)

const queue = {}

const queueEvent = (e, data) => {
  queue[e] = data
}

const emptyQueue = () => {
  Object.keys(queue).forEach((e) => {
    emit(e, queue[e])
  })
}

setInterval(() => {
  if (Object.keys(queue).length) {
    emptyQueue()
  }
}, 1000)

module.exports = {
  emit: queueEvent,
  on: bus.on.bind(bus)
}