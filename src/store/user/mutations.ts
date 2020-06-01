import { MutationTree } from 'vuex';
import IFacebookPost from '../../interfaces/IFacebookPost';
import { IUserState } from './types';

export const mutations: MutationTree<IUserState> = {
  SET_USER_POSTS(state: IUserState, value: IFacebookPost[]): void {
    state.posts = value;
  }
};
