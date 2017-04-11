const path = require('path');
const walkSync = require('walk-sync');

module.exports = function simpleload(robot) {
    walkSync('./', { globs: ['**/*.biz.js'] })//
        .forEach(p => {
            require(path.resolve(__dirname, p))(robot);
        });
};