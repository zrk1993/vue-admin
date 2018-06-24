const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push({
        path: view.path,
        title: view.meta.title || 'no-name',
      });
      if (!view.meta.noCache) {
        state.cachedViews.push([view.path, Date.now()].join()); // notice!!! 这里拼接时间
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      const visitedViewIndex = state.visitedViews.findIndex(item => item.path === view.path);
      if (visitedViewIndex !== -1) state.visitedViews.splice(visitedViewIndex, 1);

      const cachedViewIndex = state.cachedViews.findIndex(item => item.startsWith(view.path));
      if (cachedViewIndex !== -1) state.cachedViews.splice(cachedViewIndex, 1);
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
    },
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        state.visitedViews.filter(item => item.path !== view.path).forEach((item) => {
          commit('DEL_VISITED_VIEWS', item);
        });
        resolve([...state.visitedViews]);
      });
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS');
        resolve([...state.visitedViews]);
      });
    },
  },
};

export default tagsView;
