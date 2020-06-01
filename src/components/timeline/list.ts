import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import IFacebookAuthResponse from '../../interfaces/IFacebookAuthResponse';
import { IUserState } from '../../store/user/types';
import { FacebookLoginButton } from '../partials/FacebookLoginButton';

@Component({
  template: require('./list.html'),
  components: {
    'fb-sign' : FacebookLoginButton
  },
  metaInfo: {
    title: 'List of posts',
  }
})

export class TimelineComponent extends Vue {
  @State('user') user: IUserState;
  @Action('getFacebookPosts', { namespace: 'user' }) getFacebookPosts;
  async loadPosts (credentials: IFacebookAuthResponse): Promise<void> {
    await this.getFacebookPosts(credentials);
  }
}
