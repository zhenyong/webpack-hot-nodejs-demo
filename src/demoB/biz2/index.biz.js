module.exports = function (robot) {
    robot.addListener('logout', () => {
        console.log('logout in biz 2');
    });
};
