import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest } from '../../util/component-test';
import { TimelineComponent } from './list';

@Component({
  template: require('./list.html')
})

class MockTimelineComponent extends TimelineComponent {
  constructor () {
    super();
  }
}

describe('Timeline component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><list></list></div>', { list: MockTimelineComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      // tslint:disable-next-line:no-console
      console.log(vm.$el.querySelectorAll('.content ul li'));
      expect(vm.$el.querySelectorAll('.content ul li').length).to.equal(3);
    });
  });
});
