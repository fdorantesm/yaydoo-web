import { Component, Vue } from 'vue-property-decorator';
import FacebookResponse from './FacebookResponse';
import FacebookSignParams from './FacebookSignParams';

@Component({
  template: require('./FacebookLoginButton.html')
})

export class FacebookLoginButton extends Vue {
  public fbSignInParams: FacebookSignParams = {
    scope: 'email,public_profile,user_likes,user_birthday,user_gender,user_hometown',
    return_scopes: true
  };
  constructor() {
    super();
  }
  async onSignInSuccess(data: FacebookResponse): Promise<void> {
    this.$emit('login', data);
  }
  onSignInError (error) {
    this.$emit('error', error);
  }
}
