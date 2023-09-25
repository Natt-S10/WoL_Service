const wol_service = require("../wol_service.js")

test('test broadcasting a specific magic packet', ()=> {
    target = "AA:BB:CC:DD:EE:FF"
    wol_service.wake_device(target)
    // just wireshark it out
})


