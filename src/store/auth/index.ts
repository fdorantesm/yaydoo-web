import { Module } from 'vuex';

import { IRootState } from '../types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { IAuthState } from './types';

export const state: IAuthState = {
  user: undefined,
  accessToken: undefined
};

const namespaced: boolean = true;

export const auth: Module<IAuthState, IRootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
