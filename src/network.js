/**
 * @class Network
 * @description Network class for scanning network devices on host machine
 */
module.exports = class Network {
    #networkInterfaces = {}
    /**
     * Creates an instance of Network.
     * @memberof Network
     */
    constructor() {
        const { networkInterfaces, platform } = require('os');
        this.#networkInterfaces = networkInterfaces();
        this.os_type = platform();
        this.network = {};
        this.#getNetwork();
    }
    /**
     * @description Get the network interfaces of the host machine
     * @returns {Object}
     * @memberof Network
     * @example
     *      const network = new Network();
     *      console.log(network.getNetwork());
     *      {
     *          'en0': '192.168.1.123',
     *          'en1': '192.168.23.113',
     *          'en2': '192.168.23.12'
     *      }
     */
    #getNetwork() {
        for (const name of Object.keys(this.#networkInterfaces)) {
            for (const net of this.#networkInterfaces[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!this.network[name]) {
                        this.network[name] = [];
                    }
                    this.network[name] = (net.address);
                }
            }
        }
        return this.network;
    }
}
