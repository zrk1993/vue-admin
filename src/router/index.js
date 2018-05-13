import Vue from 'vue';
import Router from 'vue-router';
import { constantRouterMap, asyncRouterMap } from './routerMap';

Vue.use(Router);

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap),
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
