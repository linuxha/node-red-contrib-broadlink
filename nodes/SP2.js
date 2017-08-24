var Device = require("./Device.js");
class SP2 extends Device {
    constructor(host, mac, timeout = 10) {
        super(host, mac, timeout);

        this.on("payload", (err, payload) => {
            var param = payload[0];
            //console.log(payload.join(' '))
            switch (param) {
                case 1:
                    this.emit("data", Boolean(payload[0x4]));
                    break;
            }
        });
    }
    set_power(state) {
        //"""Sets the power state of the smart plug."""
        var packet = Buffer.alloc(16, 0);
        packet[0] = 2;
        packet[4] = state ? 1 : 0;
        this.sendPacket(0x6a, packet);
    }

    check_power() {
        //"""Returns the power state of the smart plug."""
        var packet = Buffer.alloc(16, 0);
        packet[0] = 1;
        this.sendPacket(0x6a, packet);
        /*
           err = response[0x22] | (response[0x23] << 8);
           if(err == 0){
           aes = AES.new(bytes(this.key), AES.MODE_CBC, bytes(self.iv));
           payload = aes.decrypt(bytes(response[0x38:]));
           return bool(payload[0x4]);
           }
           */
    }
}
module.exports = SP2;