const Emitter = require('events');
const robot = new Emitter();

if (module.hot) {
    require('./livereload')(robot);
} else {
    require('./simpleload')(robot);
}

// mock robot events
setInterval(() => {
    robot.emit('msg');
    robot.emit('friend');
    robot.emit('logout');
    console.log('---------------' + Date.now())
}, 2000);