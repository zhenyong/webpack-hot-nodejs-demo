module.exports = function (robot) {
    robot.addListener('friend', () => {
        console.log('friend One in biz 1');
    });
    robot.addListener('msg', () => {
        console.log('msg in biz 1');
    });
};