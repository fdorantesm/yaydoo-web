import { expect } from 'chai';

export const testAction = (action, payload, state, getters, expectedMutations, done) => {
  let count = 0;

  // tslint:disable-next-line:no-debugger
  debugger;
  // fake function for mutation's call
  const commit = (type, _payload) => {
    const mutation = expectedMutations[count];

    try {
      expect(mutation.type).to.equal(type);
      if (_payload) {
        expect(mutation.payload).to.deep.equal(_payload);
      }
    } catch (error) {
      done(error);
    }

    count++;
    if (count >= expectedMutations.length) {
      done();
    }
  };
  // call action with fake store, commit and getters
  action({ commit, state, getters }, payload);

  // check: were mutations call?
  if (expectedMutations.length === 0) {
    expect(count).to.equal(0);
    done();
  }
};
