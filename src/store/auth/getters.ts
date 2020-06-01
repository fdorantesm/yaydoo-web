import { GetterTree } from 'vuex';
import { IRootState } from '../types';
import { IAuthState } from './types';

export const getters: GetterTree<IAuthState, IRootState> = {
  isAuthentificated(state: IAuthState) {
    const { user } = state;
    return user !== null;
  }
};
