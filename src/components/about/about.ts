import { Component, Vue } from 'vue-property-decorator';
import { Logger } from '../../util/log';

@Component({
  template: require('./about.html'),
  metaInfo: {
    title: 'About Us'
  }
})
export class AboutComponent extends Vue {

  repo: string = 'https://github.com/BegeMode/vue-vuex-typescript-webpack';
  protected logger: Logger;

  mounted () {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info('about is ready!'));
  }
}
