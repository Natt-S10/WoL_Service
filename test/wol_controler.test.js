var dgram = require("dgram");
var dotenv = require('dotenv')

dotenv.config()

test("test controler", () => {
    var client = dgram.createSocket('udp4');
    client.send('50:EB:F6:B9:5C:D3',0, 17, 12580, '192.168.1.192',function(err, bytes) {
        client.close();
    });
})