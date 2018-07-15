import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';
import store from '../store';
import { constantRouterMap } from './routerMap';

Vue.use(Router);

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else if (store.state.user.uname) {
    next();
  } else {
    store.dispatch('GetUserInfo').then((user) => {
      store.dispatch('GenerateRoutes', user.permList).then((addRouters) => {
        router.addRoutes(addRouters);
        next({ ...to, replace: true });
      });
    }).catch((err) => {
      Message.error(err.message);
      next({ path: '/login' });
    });
  }
});

export default router;
