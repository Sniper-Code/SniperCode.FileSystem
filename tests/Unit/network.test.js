// Package Import : src
const { Network } = require('../../'),
    os = require('os'),
    network = new Network();

describe('Network Testing 🧪', () => {
    it('Should be instance of Network', () => {
        expect(network).toBeInstanceOf(Network);
    });

    it('Should list all the network devices', () => {
        expect(network.network).toBeInstanceOf(Object);
    })

    it('Should have os information', () => {
        expect(typeof network.os_type).toBe('string');
        expect(network.os_type).toBe(os.platform());
    })
});
