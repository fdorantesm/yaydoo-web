import { ActionTree } from 'vuex';
import FacebookResponse from '../../components/partials/FacebookLoginButton/FacebookResponse';
import IFacebookPost from '../../interfaces/IFacebookPost';
import { getPosts } from '../../services/user';
import { IRootState } from '../types';
import { IUserState } from './types';

export const actions: ActionTree<IUserState, IRootState> = {
  async getFacebookPosts({ commit }, credentials: FacebookResponse): Promise<IFacebookPost[]> {
    const { data: posts } = await getPosts(credentials);
    commit('SET_USER_POSTS', posts);
    return posts;
  }
};
