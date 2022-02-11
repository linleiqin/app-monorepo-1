import OneKeyConnect from '@onekeyfe/connect';

import { Handler } from './handler';
import bleUtils from './utils';

class BleOnekeyConnect {
  initialized = false;

  async init(): Promise<boolean> {
    const bleMac = 'E2:DA:EE:36:7C:4A';
    await bleUtils.connect(bleMac);
    if (!this.initialized) {
      // OneKeyConnect.on('UI_EVENT', (event) => {
      //   console.log('UI_EVENT', event);
      // });

      // OneKeyConnect.on('DEVICE_EVENT', (event) => {
      //   console.log('DEVICE_EVENT', event);
      // });

      // OneKeyConnect.on('TRANSPORT_EVENT', (event) => {
      //   console.log('TRANSPORT_EVENT', event);
      // });

      // OneKeyConnect.on('BLOCKCHAIN_EVENT', (event) => {
      //   console.log('BLOCKCHAIN_EVENT', event);
      // });
      try {
        await OneKeyConnect.init({
          env: 'react-native',
          // @ts-ignore
          ble: Handler,
          debug: false,
        });
        this.initialized = true;
        console.log('OneKeyConnect 初始化成功');
        const features = await OneKeyConnect.getFeatures();
        console.log('OneKeyConnect features', features);
      } catch (error) {
        console.error('OneKeyConnect 初始化失败', error);
        return false;
      }
    }
    return true;
  }
}

export const bleOnekeyConnect = new BleOnekeyConnect();
