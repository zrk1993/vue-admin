import { asyncRouterMap, constantRouterMap } from '@/router/routerMap';

function hasPermission(route, permList) {
  return route.meta && route.meta.code && permList.some(i => i.code === route.meta.code);
}

function filterAsyncRouter(routerMap, permList) {
  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(route, permList)) {
      if (route.children && route.children.length) {
        /* eslint-disable-next-line */
        route.children = filterAsyncRouter(route.children, permList);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({ commit }, permList) {
      return new Promise((resolve) => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, permList);
        commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      });
    },
  },
};

export default permission;
