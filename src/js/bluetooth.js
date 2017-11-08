/* global riot */
const NUS_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const NUS_RX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const DEVICE_NAME = 'DD-Booster';

export default class Bluetooth {
    /**
     * @class Bluetooth
     * @constructs
     */
    constructor() {
        this.device = null;
        this.characteristic = null;
        riot.observable(this);
    }

    /**
     * Connects to the DD-Booster
     */
    connect() {
        return new Promise((resolve, reject) => {
            if (this.device) {
                if (this.device.gatt.connected) {
                    resolve();
                } else {
                    this.device.gatt.connect()
                        .then(server => {
                            return server.getPrimaryService(NUS_SERVICE_UUID);
                        }).then(service => {
                            return service.getCharacteristic(NUS_RX_CHARACTERISTIC_UUID);
                        }).then(characteristic => {
                            this.characteristic = characteristic;
                        }).then(() => {
                            resolve();
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
                    return server.getPrimaryService(NUS_SERVICE_UUID);
                }).then(service => {
                    return service.getCharacteristic(NUS_RX_CHARACTERISTIC_UUID);
                }).then(characteristic => {
                    this.characteristic = characteristic;
                }).then(() => {
                    resolve();
                }).catch(error => {
                    reject(error);
                });
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
     * Send data to the DD-Booster
     * @param {Array} data - Data to send
     */
    send(data) {
        return new Promise((resolve, reject) => {
            if (!this.device || !this.device.gatt.connected || !this.characteristic) {
                reject('Not connected');
                return;
            }

            this.characteristic.writeValue(new Uint8Array(data))
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
        this.characteristic = null;
        this.trigger('disconnect');
    }

}