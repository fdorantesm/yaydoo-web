import { MutationTree } from 'vuex';
import { setDefaultAuthHeaders } from '../../helpers/axios';
import { IUser } from '../user/types';
import { IAuthState } from './types';

export const mutations: MutationTree<IAuthState> = {
  SET_CURRENT_USER(state: IAuthState, newValue: IUser): void {
    state.user = newValue;
    setDefaultAuthHeaders(state);
  },
  SET_ACCESS_TOKEN(state: IAuthState, newValue: string): void {
    state.accessToken = newValue;
    setDefaultAuthHeaders(state);
  }
};
