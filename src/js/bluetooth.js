/* global riot */
const NUS_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const NUS_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const NUS_TX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const DEVICE_NAME = 'PSX-Light';

export default class Bluetooth {
    PROTOCOL_CMD_CONNECTED = 0xA0;
    PROTOCOL_CMD_SET_ICON_COLOR = 0xA1;
    PROTOCOL_CMD_SET_BRIGHTNESS = 0xA2;

    /**
     * @class Bluetooth
     * @constructs
     */
    constructor() {
        this.device = null;
        this.rx_characteristic = null;
        this.tx_characteristic = null;
        riot.observable(this);
    }

    /**
     * Connects to the PSX-Light
     */
    connect() {
        return new Promise((resolve, reject) => {
            if (this.device) {
                if (this.device.gatt.connected) {
                    resolve();
                } else {
                    this.device.gatt.connect()
                        .then(server => {
                            return server.getPrimaryServices();
                        }).then(services => {
                            let queue = Promise.resolve();
                            services.forEach(service => {
                                queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                                    characteristics.forEach(characteristic => {
                                        if (characteristic.uuid == NUS_RX_CHARACTERISTIC_UUID) {
                                            this.rx_characteristic = characteristic;
                                        } else if (characteristic.uuid == NUS_TX_CHARACTERISTIC_UUID) {
                                            this.tx_characteristic = characteristic;
                                            this.tx_characteristic.startNotifications()
                                            // Set up event listener for when characteristic value changes.
                                            this.tx_characteristic.addEventListener('characteristicvaluechanged',
                                                this.onReceive.bind(this));
                                        }
                                    });
                                }));
                            });
                            return queue;
                        }).catch(error => reject(error));
                }
            } else {
                navigator.bluetooth.requestDevice({
                    filters: [{
                        services: [NUS_SERVICE_UUID]
                    }, {
                        name: DEVICE_NAME
                    }]
                }).then(device => {
                    this.device = device;
                    this.device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));
                    return device.gatt.connect();
                }).then(server => {
                    return server.getPrimaryServices();
                }).then(services => {
                    let queue = Promise.resolve();
                    services.forEach(service => {
                        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                            characteristics.forEach(characteristic => {
                                if (characteristic.uuid == NUS_RX_CHARACTERISTIC_UUID) {
                                    this.rx_characteristic = characteristic;
                                } else if (characteristic.uuid == NUS_TX_CHARACTERISTIC_UUID) {
                                    this.tx_characteristic = characteristic;
                                    this.tx_characteristic.startNotifications()
                                    // Set up event listener for when characteristic value changes.
                                    this.tx_characteristic.addEventListener('characteristicvaluechanged',
                                        this.onReceive.bind(this));
                                }
                            });
                        }));
                    });
                    return queue;
                }).then(() => {
                    resolve();
                }).catch(error => { reject(error); });
            }
        });
    }

    /**
     * Close bluetooth connection
     */
    disconnect() {
        if (this.device && this.device.gatt.connected) {
            this.device.gatt.disconnect();
            this.device = null;
        }
    }

    /**
     * Send data to the PSX-Light
     * @param {Array} data - Data to send
     */
    send(data) {
        return new Promise((resolve, reject) => {
            if (!this.device || !this.device.gatt.connected || !this.rx_characteristic) {
                reject('Not connected');
                return;
            }

            this.rx_characteristic.writeValue(new Uint8Array(data))
                .then(() => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
        });
    }

    /**
     * @private
     */
    onDisconnected() {
        this.rx_characteristic = null;
        this.tx_characteristic = null;
        this.trigger('disconnect');
    }

    onReceive(event) {
        this.trigger('receive', event.currentTarget.value.buffer);
    }
}
