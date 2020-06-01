import { ActionTree } from 'vuex';
import IToken from '../../../interfaces/IToken';
import LoginResponse from '../../../interfaces/LoginResponse';
import FacebookResponse from '../../components/partials/FacebookLoginButton/FacebookResponse';
import { setDefaultAuthHeaders } from '../../helpers/axios';
import { router } from '../../router';
import * as AuthService from '../../services/auth';
import { IRootState } from '../types';
import { IUser } from '../user/types';
import { IAuthState } from './types';

export const actions: ActionTree<IAuthState, IRootState> = {
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state.accessToken);
    dispatch('me');
  },

  // Logs in the current user.
  async logIn({ commit }, credentials: FacebookResponse): Promise<{ user: IUser, token: IToken }> {
    const loginResponse = await AuthService.login(credentials);
    const tokenResponse: LoginResponse = loginResponse.data;
    const token = tokenResponse.token;
    commit('SET_ACCESS_TOKEN', token.accessToken);
    setDefaultAuthHeaders(token.accessToken);
    const meResponse = await AuthService.me();
    const user: IUser = meResponse.data.data;
    commit('SET_CURRENT_USER', user);
    return { user, token };
  },

  logOut({ commit }): void {
    commit('SET_CURRENT_USER', null);
    commit('SET_ACCESS_TOKEN', null);
    commit('user/SET_USER_POSTS', null, { root: true });
    router.push('/');
  },

  async me({ commit, state }): Promise<IUser | null> {
    try {
      if (!state.accessToken || !state.user) {
        return Promise.resolve(null);
      }
      const response = await AuthService.me();
      const user: IUser = response.data.data;
      commit('SET_CURRENT_USER', user);
      return user;
    } catch (error) {
      if (error.response.status === 401) {
        commit('SET_CURRENT_USER', null);
      }
      return null;
    }
  },

  validate({ state }): IUser | undefined {
    return state.user && state.accessToken ? state.user : undefined;
  }
};
