import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { IAuthState } from '../../../store/auth/types';
import { Logger } from '../../../util/log';

const namespace = 'auth';

@Component({
  template: require('./navbar.html'),
  components: {

  }
})

export class NavbarComponent extends Vue {
  object: { default: string } = { default: 'Default object property!' };
  @State('auth') auth: IAuthState;
  @Action('logOut', { namespace }) logOut;
  protected logger: Logger;
  mounted () {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info(this.object.default));
  }
  async logout() {
    await this.logOut();
  }
}
