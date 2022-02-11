import BigNumber from 'bignumber.js';

export interface TransferParams {
  networkId: string;
  accountId: string;
  to: string;
  value: BigNumber;
  /** token address */
  tokenIdOnNetwork?: string;
  gasPrice?: BigNumber;
  gasLimit?: BigNumber;
  extra?: { [key: string]: any };
}
/**
 * used for software wallet
 */
export interface SecretParams {
  password?: string;
  // seed?: Buffer;
}
