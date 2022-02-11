/**
 * hardware interface warper
 */

import { UnsignedTransaction } from '@ethersproject/transactions';
import OneKeyConnect, {
  ApplySettings,
  EthereumTransaction,
  Features,
} from '@onekeyfe/connect';
import BigNumber from 'bignumber.js';

import { OneKeyHardwareError } from './errors';

/**
 * Get hardware wallet info
 * @returns {Promise<Features>}
 * @throws {OneKeyInternalError}
 * @throws {OneKeyHardwareError}
 */
export async function getFeatures(): Promise<Features> {
  let response;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    response = await OneKeyConnect.getFeatures();
  } catch (error: any) {
    throw new OneKeyHardwareError(error);
  }
  if (response.success) {
    return response.payload;
  }
  console.error(response.payload);
  throw new OneKeyHardwareError(`getFeatures: ${response.payload.error}`);
}

/**
 * Change the pin of the hardware wallet
 * @param remove {boolean}
 * @returns {Promise<void>}
 * @throws {OneKeyHardwareError}
 * @throws {OneKeyInternalError}
 */
export async function changePin(remove = false): Promise<void> {
  let response;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    response = await OneKeyConnect.changePin({ remove });
  } catch (error: any) {
    console.error(error);
    throw new OneKeyHardwareError(error);
  }
  if (response.success) {
    return;
  }
  console.error(response.payload);
  throw new OneKeyHardwareError(`changePin: ${response.payload.error}`);
}

/**
 * apply settings to the hardware wallet
 */
export async function applySettings(settings: ApplySettings): Promise<void> {
  let response;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    response = await OneKeyConnect.applySettings(settings);
  } catch (error: any) {
    console.error(error);
    throw new OneKeyHardwareError(error);
  }
  if (response.success) {
    return;
  }
  console.error(response.payload);
  throw new OneKeyHardwareError(`applySettings: ${response.payload.error}`);
}
/**
 * get Eth address from the hardware wallet with the specified derivation path
 * @param path drivation path
 * @param display show address on the screen
 * @returns
 * @throws {OneKeyHardwareError}
 */
export async function ethereumGetAddress(
  path: string | number[],
  display = false,
): Promise<string> {
  let response;
  try {
    response = await OneKeyConnect.ethereumGetAddress({
      path,
      showOnTrezor: display,
    });
  } catch (error: any) {
    console.error(error);
    throw new OneKeyHardwareError(error);
  }
  if (response.success) {
    return response.payload.address;
  }
  console.error(response.payload);
  throw new OneKeyHardwareError(
    `ethereumGetAddress: ${response.payload.error}`,
  );
}

/**
 * get Solana address from the hardware wallet with the specified derivation path
 * @param path drivation path
 * @param display show address on the screen
 * @returns
 * @throws {OneKeyHardwareError}
 */
export async function solanaGetAddress(
  path: string | number[],
  display = false,
): Promise<string> {
  // let response;
  // try {
  //   response = await OneKeyConnect.solanaGetAddress(
  //     path,
  //     // showOnTrezor: display,
  //   );
  // } catch (error: any) {
  //   console.error(error);
  //   throw new OneKeyHardwareError(error);
  // }
  // if (response.success) {
  //   return response.payload.address;
  // }
  // console.error(response.payload);
  // throw new OneKeyHardwareError(`solanaGetAddress: ${response.payload.error}`);
  return Promise.reject(new Error('not implemented'));
}

/**
 * sign Eth transaction with the hardware wallet
 * @param params
 * @returns
 * @throws {OneKeyHardwareError}
 */
export async function ethereumSignTransaction(
  path: string | number[],
  params: UnsignedTransaction & EthereumTransaction,
): Promise<[Buffer, number]> {
  let response;
  try {
    response = await OneKeyConnect.ethereumSignTransaction({
      path,
      transaction: {
        to: params.to,
        value: params.value,
        gasPrice: params.gasPrice,
        gasLimit: params.gasLimit,
        nonce: new BigNumber(params.nonce).integerValue().toString(16),
        data: params.data,
        chainId: params.chainId,
      },
    });
  } catch (error: any) {
    console.error(error);
    throw new OneKeyHardwareError(error);
  }
  if (response.success) {
    const { v, r, s } = response.payload;
    // this translate is in order to compatible with the blockchain-libs implementation
    const recoveryParam = 1 - (Number(v) % 2);
    const signature = Buffer.concat([
      Buffer.from(r.slice(2), 'hex'),
      Buffer.from(s.slice(2), 'hex'),
    ]);
    return [signature, recoveryParam];
  }
  console.error(response.payload);
  throw new OneKeyHardwareError(
    `ethereumSignTransaction: ${response.payload.error}`,
  );
}

export async function ethereumSignTxEIP1559(
  _params: any,
): Promise<[Buffer, number]> {
  return Promise.reject(new Error('not implemented'));
}
