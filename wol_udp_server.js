var udp = require('dgram');
var { wake_device } = require('./wol_service')

registered_devs = process.env.TARGET_MAC_ADDRESS.split(",").map((e) => {
    return e.trim();
})

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

// emits on new datagram msg
server.on('message', function (msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    req_dev =  msg.toString().trim()
    if (registered_devs.find((e)=>{return e == req_dev}) ) {
        wake_device(req_dev);
    }
    else {
        console.log('MAC address is not matched')
    }
});

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    var address = server.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipaddr);
    console.log('Server is IP4/IP6 : ' + family);
    console.log('Targets: '+registered_devs)
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log('Socket is closed !');
});

server.bind(process.env.PORT);

