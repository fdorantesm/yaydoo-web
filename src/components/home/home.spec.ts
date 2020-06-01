import { expect } from 'chai';
import { ComponentTest } from '../../util/component-test';
import { HomeComponent } from './home';

describe('Home component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><home></home></div>', { home: HomeComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      const mode = process.env.ENV;
      expect(vm.$el.querySelector('.mode').textContent).to.equal(`${mode} mode`);
      expect(vm.$el.querySelector('.package').textContent).to.equal('vue-webpack-typescript');
    });
  });
});
