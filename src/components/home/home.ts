import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import LoginResponse from '../../../interfaces/LoginResponse';
import { IAuthState } from '../../store/auth/types';
import { IUserState } from '../../store/user/types';
import { FacebookLoginButton } from '../partials/FacebookLoginButton';
import './home.scss';

@Component({
  template: require('./home.html'),
  components: {
    'fb-sign' : FacebookLoginButton
  }
})
export class HomeComponent extends Vue {
  @State('auth') auth: IAuthState;
  @State('user') user: IUserState;
  @Action('logIn', { namespace: 'auth' }) logIn;
  @Action('getFacebookPosts', { namespace: 'user' }) getFacebookPosts;
  async onFacebookAuth(credentials: LoginResponse): Promise<void> {
    await this.logIn(credentials);
  }
  async getPosts(credentials: LoginResponse): Promise<void> {
    await this.getFacebookPosts(credentials);
  }
}
