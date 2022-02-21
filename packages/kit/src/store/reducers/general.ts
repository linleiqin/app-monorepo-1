import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import type { Account } from '@onekeyhq/engine/src/types/account';
import type { Wallet } from '@onekeyhq/engine/src/types/wallet';

import type { Network } from './network';

export type GeneralInitialState = {
  activeAccount: Account | null;
  activeWallet: Wallet | null;
  activeNetwork: {
    network: Network;
    sharedChainName: string;
  } | null;
};

const initialState: GeneralInitialState = {
  activeAccount: null,
  activeNetwork: null,
  activeWallet: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    $changeActiveAccount(
      state,
      action: PayloadAction<{ account: Account | null; wallet: Wallet }>,
    ) {
      const { account, wallet } = action.payload;
      state.activeAccount = account;
      state.activeWallet = wallet;
    },
    $changeActiveNetwork(
      state,
      action: PayloadAction<NonNullable<GeneralInitialState['activeNetwork']>>,
    ) {
      // TODO chainId, networkVersion required in activeNetwork
      state.activeNetwork = action.payload;
    },
  },
});

const { $changeActiveAccount, $changeActiveNetwork } = generalSlice.actions;

export const changeActiveAccount =
  (state: { account: Account | null; wallet: Wallet }) =>
  async (dispatch: Dispatch) => {
    dispatch($changeActiveAccount(state));
    // use global var to avoid cycle-deps
    global.$backgroundApiProxy.notifyAccountsChanged();
    return Promise.resolve();
  };

export const changeActiveNetwork =
  (state: NonNullable<GeneralInitialState['activeNetwork']>) =>
  async (dispatch: Dispatch) => {
    dispatch($changeActiveNetwork(state));
    global.$backgroundApiProxy.notifyChainChanged();
    return Promise.resolve();
  };

export default generalSlice.reducer;
