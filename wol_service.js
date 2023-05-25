var wol = require('wol')

const  wake_device = (target) => {
    wol.wake(target, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log(`magic packet of the device ${target} was broadcasted`)
        }
    });
}


module.exports = {wake_device}