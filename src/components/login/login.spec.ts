import { expect } from 'chai';
import Component from 'vue-class-component';
import { ComponentTest } from '../../util/component-test';
import { LoginComponent } from './login';
// import Vue from 'vue';

@Component({
  template: require('./login.html')
})
class MockLoginComponent extends LoginComponent {
  constructor () {
    super();
  }
}

describe('Login component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><login></login></div>', { login: MockLoginComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();

    await directiveTest.execute((vm) => { // ensure Vue has bootstrapped/run change detection
      directiveTest.fillField('#login', 'Username');
      directiveTest.fillField('#psw', 'password');
      directiveTest.nextTick(() => {
        const login = vm.$children[0] as MockLoginComponent;
        expect(login.username).to.equal('Username');
        expect(login.password).to.equal('password');
      });
    });
  });
});
