import Realm from 'realm';

import { Device } from '../../../types/device';

class DeviceSchema extends Realm.Object {
  /**
   * The device's unique identifier.
   */
  public id!: string;

  /**
   * date of the device bonded with the host device.
   */
  public addedTime!: Date;

  /**
   * date of the last time the device connect to host device.
   */
  public updateTime!: Date;

  /**
   * the features of the device
   */
  public features!: string;

  /**
   * ble name
   */
  public name!: string;

  /**
   * ble mac address
   */
  public mac!: string | null;

  public static schema: Realm.ObjectSchema = {
    name: 'Device',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      mac: 'string?',
      features: 'string',
      addedTime: 'date',
      updateTime: 'date',
    },
  };

  get internalObj(): Device {
    return {
      id: this.id,
      name: this.name,
      mac: this.mac,
      features: this.features,
      addedTime: this.addedTime,
      updateTime: this.updateTime,
    };
  }
}

export { DeviceSchema };
