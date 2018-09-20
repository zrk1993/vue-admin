import { asyncRouterMap, constantRouterMap } from '@/router/routerMap';

function hasPermission(route, roleList) {
  if (route.meta && route.meta.roles && route.meta.roles.length > 0) {
    if (roleList && roleList.some(item => route.meta.roles.some(i => i === item))) {
      return true;
    }
    return false;
  }
  return true;
}

function filterAsyncRouter(routerMap, roleList) {
  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(route, roleList)) {
      if (route.children && route.children.length) {
        /* eslint-disable-next-line */
        route.children = filterAsyncRouter(route.children, roleList);
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
    GenerateRoutes({ commit }, roleList) {
      return new Promise((resolve) => {
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roleList);
        commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      });
    },
  },
};

export default permission;
