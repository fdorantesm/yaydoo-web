// Adds a loading bar at the top during page loads.
import * as NProgress from 'nprogress';
import Vue from 'vue';
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';
import store from '../store/index';
import { createRoutes } from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta);/*, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page',
});*/

export const router = new VueRouter({
  routes: createRoutes(),
  mode: 'history',
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();

  // If auth is required and the user is logged in...
  if (store.getters['auth/isAuthentificated']) {
    // Validate the local user token...
    return store.dispatch('auth/validate').then(validUser => {
      // Then continue if the token still represents a valid user,
      // otherwise redirect to login.
      validUser ? next() : redirectToLogin();
    });
  }
  // If auth is required and the user is NOT currently logged in,
  // redirect to login
  redirectToLogin();

  function redirectToLogin() {
    router.push({
      name: 'login',
      params: {
        retrieveRouteName: routeTo.name,
        retrieveRoutePath: routeTo.path
      }
    });
  }
});

// After navigation is confirmed, but before resolving...
router.beforeResolve((_routeTo, routeFrom, next) => {
  // If this isn't an initial page load.
  if (routeFrom.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

// When each route is finished evaluating...
router.afterEach((_routeTo, _routeFrom) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
