import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import { Message } from 'element-ui';
import store from '../store';
import { constantRouterMap } from './routerMap';

NProgress.configure({ showSpinner: false });
Vue.use(Router);

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    next();
  } else if (store.state.user.uname) {
    next();
  } else {
    store.dispatch('GetUserInfo').then((user) => {
      store.dispatch('GenerateRoutes', user.roleList).then((addRouters) => {
        router.addRoutes(addRouters);
        next({ ...to, replace: true });
      });
    }).catch((err) => {
      next({ path: '/login' });
    });
  }
});

router.afterEach(() => {
  NProgress.done();
});

router._push = router.push;
router.push = (...args) => {
  router._push(...args);
  // 注入修改标签的标题功能
  if (typeof args[0] === 'object' && args[0].title) {
    router.app.$route.meta.title = args[0].title;
  }
};

export default router;
