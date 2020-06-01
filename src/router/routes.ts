import { AsyncComponent } from 'vue';
import { RouteConfig } from 'vue-router'; // Location, Route,
import store from '../store/index';
import { makeHot, reload } from '../util/hot-reload';

const homeComponent = () => import('../components/home').then(({ HomeComponent }) => HomeComponent);
const Component = () => import('../components/timeline').then(({ TimelineComponent }) => TimelineComponent);
// const homeComponent = () => import(/* webpackChunkName: 'home' */'../components/home').then(({ HomeComponent }) => HomeComponent);
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'../components/about').then(({ AboutComponent }) => AboutComponent);
// const Component = () => import(/* webpackChunkName: 'list' */'../components/list').then(({ TimelineComponent }) => TimelineComponent);
if (process.env.ENV === 'development' && module.hot) {
  const homeModuleId = '../components/home';
  const postModuleId = '../components/posts';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('../components/home', () => reload(homeModuleId, (require('../components/home') as any).HomeComponent)));

  makeHot(postModuleId, Component,
    module.hot.accept('../components/timeline', () => reload(postModuleId, (require('../components/timeline') as any).TimelineComponent)));
}

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    name: 'home',
    component: homeComponent as AsyncComponent
  },
  {
    name: 'posts',
    path: '/posts',
    component: Component as AsyncComponent,
    beforeEnter(to, from, next) {
        // If the user is already logged in
      if (!store.getters['auth/isAuthentificated']) {
          // Redirect to the home page instead
        next({ name: 'home' });
      } else {
          // Continue to the login page
        next();
      }
    },
    meta: {
      authRequired: true,
    },
  }
];
