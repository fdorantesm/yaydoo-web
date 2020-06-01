import Vue from 'vue';
import vuex, { StoreOptions } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { auth } from './auth/index';
import { IRootState } from './types';
import { user } from './user/index';

Vue.use(vuex);

const vuexLocal = new VuexPersistence<IRootState>({
  storage: window.localStorage
});

const store: StoreOptions<IRootState> = {
  state: {
    version: '1.0.0' // a simple property
  },
  modules: {
    auth,
    user
  },
  plugins: [vuexLocal.plugin]
};

export default new vuex.Store<IRootState>(store);
