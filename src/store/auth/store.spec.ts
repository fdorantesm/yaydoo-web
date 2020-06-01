import { expect } from 'chai';
import rewiremock from 'rewiremock';
import LoginResponse from '../../../interfaces/LoginResponse';
import FacebookResponse from '../../components/partials/FacebookLoginButton/FacebookResponse';
import { testAction } from '../../util/actions-test';
import { IUser } from '../user/types';
import { getters } from './getters';
import * as mock from './mocks';
import { mutations } from './mutations';
import { IAuthState } from './types';

const user: IUser = mock.user;

const loginResponse: LoginResponse = mock.loginResponse;

const facebookResponse: FacebookResponse = mock.facebookResponse;

const { SET_CURRENT_USER } = mutations;
let fakeState: IAuthState;
let actions;

describe('auth mutations', () => {
  it('SET_CURRENT_USER', () => {
    // arrange: initial state
    const state: IAuthState = {
      user: null
    };
    // act: apply mutation
    SET_CURRENT_USER(state, user);
    // assert: evaluate the result
    expect(state.user).to.not.equal(null);
    expect(state.user.username).to.equal('Test User');
  });
});

describe('auth getters', () => {
  it('isAuthentificated', () => {
    // arrange
    fakeState = {
      user
    };

    // act
    const result = getters.isAuthentificated(fakeState, getters, null, null);

    // assert
    expect(result).to.deep.equal(true);
  });
});

rewiremock('../../services/auth').withDefault({
  login(credentials) {
    return Promise.resolve({ data: loginResponse });
  },
  // tslint:disable-next-line:no-empty
  logout() {
  },
  checkUser() {
    return Promise.reject({ response: { status: 401 } });
  }
});

describe('auth actions', () => {
  beforeEach(() => {
    fakeState = {
      user: null
    };
    rewiremock.enable();
    actions = require('./actions').actions;
  });
  afterEach(() => {
    rewiremock.disable();
  });

  it('log in', done => {
    const mockGetters = {
      isAuthentificated: false
    };
    testAction(actions.logIn, facebookResponse, fakeState, mockGetters, [
      { type: 'SET_CURRENT_USER', payload: user },
    ], done);
  });

  it('log out', done => {
    fakeState = {
      user
    };
    testAction(actions.logOut, {}, fakeState, getters, [
      { type: 'SET_CURRENT_USER', payload: null },
    ], done);
  });

  it('validate error', done => {
    fakeState = {
      user
    };
    testAction(actions.validate, {}, fakeState, getters, [
      { type: 'SET_CURRENT_USER', payload: null },
    ], done);
  });
});
