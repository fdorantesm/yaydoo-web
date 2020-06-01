import { expect } from 'chai';
import { assert, spy } from 'sinon';
import Component from 'vue-class-component';
import { ComponentTest, MockLogger } from '../../util/component-test';
import { AboutComponent } from './about';

const loggerSpy = spy();

@Component({
  template: require('./about.html')
})
class MockAboutComponent extends AboutComponent {
  constructor () {
    super();
    this.logger = new MockLogger(loggerSpy);
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><about></about></div>', { about: MockAboutComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link').getAttribute('href')).to.equal('https://github.com/BegeMode/vue-vuex-typescript-webpack');
      assert.calledWith(loggerSpy, 'about is ready!');
    });
  });
});
