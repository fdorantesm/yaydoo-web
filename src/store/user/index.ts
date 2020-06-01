import { Module } from 'vuex';

import { IRootState } from '../types';
import { actions } from './actions';
import { mutations } from './mutations';
import { IUserState } from './types';

export const state: IUserState = {
  posts: []
};

const namespaced: boolean = true;

export const user: Module<IUserState, IRootState> = {
  namespaced,
  state,
  actions,
  mutations
};
