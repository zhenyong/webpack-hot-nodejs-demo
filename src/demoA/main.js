const Emitter = require('events');
const robot = new Emitter();

require('./biz')(
    robot.addListener.bind(robot),
    robot.removeListener.bind(robot)
);

setInterval(() => {
    robot.emit('msg');
    robot.emit('friend');
    robot.emit('logout');
    console.log('---------------' + Date.now())
}, 2000);